"""Cut a sermon (or any recording) into an edited program from an edit list of spoken phrases.

Usage:
    .venv/bin/python scripts/cut.py EDL.json OUT_PREFIX [--resolve-only]

EDL.json:
{
  "sources": {"P1": {"audio": "part1.m4a", "words": "part1.json"}, ...},   # words = transcribe.py output
  "clean": "highpass=f=70,...",            # optional ffmpeg filter applied to each source once
  "clips": [
    {"chapter": "The Hook", "src": "P1", "near": "40:55",
     "from": "we was coming to church", "to": "it's in your soul"},
    ...
  ]
}
Each clip starts at the spoken phrase `from` (the occurrence nearest `near`) and ends after the
first `to` phrase that follows it, snapped to word boundaries. Pick phrases from transcribe.py's .txt.
Outputs OUT_PREFIX.wav (program), .chapters.txt (YouTube timestamps), .cut.txt (what was kept and
from where, for review) and .edl.resolved.json (exact source times).
"""
import argparse
import json
import re
import subprocess
import tempfile
from pathlib import Path

CLIP_GAP, CHAPTER_GAP, PAD_IN, PAD_OUT = 0.6, 1.6, 0.12, 0.30


def norm(t):
    return re.sub(r"[^a-z0-9']", "", t.lower())


def secs(s):
    parts = [float(p) for p in str(s).split(":")]
    return sum(p * 60 ** i for i, p in enumerate(reversed(parts)))


def load_words(path):
    words = [w for seg in json.loads(Path(path).read_text()) for w in seg["words"]]
    return words, [norm(w["w"]) for w in words]


def find(tokens, phrase, start_idx=0):
    target = [norm(t) for t in phrase.split() if norm(t)]
    hits = []
    for i in range(start_idx, len(tokens) - len(target) + 1):
        if tokens[i:i + len(target)] == target:
            hits.append(i)
    return hits, len(target)


def resolve(clip, words, tokens):
    near = secs(clip["near"])
    hits, _ = find(tokens, clip["from"])
    if not hits:
        raise SystemExit(f"'from' phrase not found: {clip['from']!r}")
    i0 = min(hits, key=lambda i: abs(words[i]["s"] - near))
    ends, n = find(tokens, clip["to"], i0)
    ends = [e for e in ends if words[e]["s"] - words[i0]["s"] < 600]
    if not ends:
        raise SystemExit(f"'to' phrase not found within 10 min after {clip['from']!r}: {clip['to']!r}")
    i1 = ends[0] + n - 1
    return i0, i1


def fmt(t):
    return f"{int(t // 3600)}:{int(t % 3600 // 60):02d}:{int(t % 60):02d}" if t >= 3600 else f"{int(t // 60)}:{int(t % 60):02d}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("edl")
    ap.add_argument("out")
    ap.add_argument("--resolve-only", action="store_true")
    a = ap.parse_args()
    edl_path = Path(a.edl)
    edl = json.loads(edl_path.read_text())
    base = edl_path.parent
    srcs = {k: {"audio": base / v["audio"], **dict(zip(("words", "tokens"), load_words(base / v["words"])))}
            for k, v in edl["sources"].items()}

    resolved, review = [], []
    for c in edl["clips"]:
        s = srcs[c["src"]]
        i0, i1 = resolve(c, s["words"], s["tokens"])
        start, end = max(0, s["words"][i0]["s"] - PAD_IN), s["words"][i1]["e"] + PAD_OUT
        text = "".join(w["w"] for w in s["words"][i0:i1 + 1]).strip()
        resolved.append({**c, "start": round(start, 2), "end": round(end, 2)})
        review.append((c, start, end, text))
    total = sum(r["end"] - r["start"] for r in resolved)
    print(f"{len(resolved)} clips, {total / 60:.1f} min of speech")
    out = Path(a.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    Path(f"{out}.edl.resolved.json").write_text(json.dumps(resolved, indent=1))

    # review sheet + chapter times (program time)
    t, chapters, lines, prev_ch = 0.0, [], [], None
    for (c, start, end, text), r in zip(review, resolved):
        if c.get("chapter") != prev_ch:
            if prev_ch is not None:
                t += CHAPTER_GAP - CLIP_GAP
            chapters.append((t, c["chapter"]))
            lines.append(f"\n## {fmt(t)}  {c['chapter']}\n")
            prev_ch = c.get("chapter")
        lines.append(f"[{fmt(t)}  <- {c['src']} {fmt(start)}-{fmt(end)}]  {text}\n")
        t += (end - start) + CLIP_GAP
    Path(f"{out}.cut.txt").write_text("".join(lines))
    Path(f"{out}.chapters.txt").write_text("".join(f"{fmt(x)} {n}\n" for x, n in chapters))
    if a.resolve_only:
        return

    with tempfile.TemporaryDirectory() as td:
        td = Path(td)
        cleaned = {}
        for k, s in srcs.items():  # clean each source once, at full length, so levels are consistent
            cleaned[k] = td / f"{k}.wav"
            af = edl.get("clean", "anull")
            subprocess.run(["ffmpeg", "-y", "-v", "error", "-i", str(s["audio"]), "-af", af,
                            "-ac", "1", "-ar", "48000", str(cleaned[k])], check=True)
        parts, prev_ch = [], None
        for i, r in enumerate(resolved):
            if prev_ch is not None:
                gap = CHAPTER_GAP if r.get("chapter") != prev_ch else CLIP_GAP
                g = td / f"g{i:03d}.wav"
                subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "lavfi", "-i", "anullsrc=r=48000:cl=mono",
                                "-t", str(gap), str(g)], check=True)
                parts.append(g)
            prev_ch = r.get("chapter")
            p = td / f"c{i:03d}.wav"
            d = r["end"] - r["start"]
            subprocess.run(["ffmpeg", "-y", "-v", "error", "-ss", str(r["start"]), "-t", str(d),
                            "-i", str(cleaned[r["src"]]),
                            "-af", f"afade=t=in:d=0.04,afade=t=out:st={max(0, d - 0.12)}:d=0.12", str(p)], check=True)
            parts.append(p)
        lst = td / "list.txt"
        lst.write_text("".join(f"file '{p}'\n" for p in parts))
        subprocess.run(["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0", "-i", str(lst),
                        f"{out}.wav"], check=True)
    print(f"wrote {out}.wav, {out}.cut.txt, {out}.chapters.txt")


if __name__ == "__main__":
    main()
