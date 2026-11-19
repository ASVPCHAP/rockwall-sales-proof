"""ElevenLabs voiceover: list voices, design new ones, and narrate a full script.

The API key is never stored in this repo. Either:
  * export ELEVENLABS_API_KEY=sk_...   (on your own computer), or
  * in a Claude cloud session, the key is saved as a network secret and injected automatically
    (the script then sends a placeholder that the proxy replaces).

Usage:
    .venv/bin/python scripts/eleven.py voices
    .venv/bin/python scripts/eleven.py say  VOICE_ID script.txt out/vo.mp3 [--speed 0.9] [--stability 0.55]
    .venv/bin/python scripts/eleven.py music music/hypnotic.txt media/music/bed.mp3 --seconds 150
    .venv/bin/python scripts/eleven.py design "deep weathered Southern baritone, 60s, slow and warm" sample.txt out/designs/

`say` reads narrate.py's format (one thought per line, blank line = pause, # comments, [pause N])
and the episode format ('=== 00:00 TITLE ===' chapters, [.] [..] [BREATH] pauses; see parse_script), sends it in paragraph-sized chunks with request stitching
so the voice stays consistent across a 25-minute script, and inserts real silence for pauses.
Then polish it:  .venv/bin/python scripts/narrate.py out/vo.mp3 out/vo.wav --polish-only --pitch 1.0
"""
import argparse
import base64
import json
import os
import re
import string
import subprocess
import sys
import tempfile
import urllib.request
from pathlib import Path

API = "https://api.elevenlabs.io"
KEY = os.environ.get("ELEVENLABS_API_KEY", "proxy-injected")
MODEL = "eleven_multilingual_v2"  # most natural long-form model
LINE_GAP, PARAGRAPH_GAP, CHAPTER_GAP = 0.45, 1.0, 2.5
# Pause markers at the end of a line (episode script format): exact silence after that line.
MARKERS = {"[.]": 0.7, "[..]": 1.4, "[BREATH]": 2.2}
MARKER_RE = re.compile(r"\s*(\[\.\.?\]|\[BREATH\])\s*$")
HEADER_RE = re.compile(r"^===\s*(?:(\d+:\d+)\s+)?(.+?)\s*===\s*$")


def call(method, path, body=None, raw=False):
    req = urllib.request.Request(
        API + path, method=method,
        data=json.dumps(body).encode() if body is not None else None,
        headers={"xi-api-key": KEY, "Content-Type": "application/json", "Accept": "*/*"},
    )
    try:
        with urllib.request.urlopen(req, timeout=300) as r:
            data = r.read()
            return (data, dict(r.headers)) if raw else json.loads(data)
    except urllib.error.HTTPError as e:
        sys.exit(f"ElevenLabs {e.code}: {e.read().decode()[:500]}")


def parse_script(text):
    """-> list of blocks: ('speak', paragraph_text) | ('pause', seconds) | ('chapter', title).

    Formats understood:
      * one thought per line; consecutive lines form a paragraph (short <break> between lines)
      * blank line = paragraph pause; [pause N] = exact silence; '# ...' = comment
      * episode format: '=== 00:00  TITLE ===' chapter headers (text before the first header is skipped),
        lines of '=' skipped, and [.] / [..] / [BREATH] at a line end = 0.7 / 1.4 / 2.2 s of silence.
    """
    lines = text.splitlines()
    if any(HEADER_RE.match(l.strip()) for l in lines):
        first = next(i for i, l in enumerate(lines) if HEADER_RE.match(l.strip()))
        lines = lines[first:]
    blocks, para = [], []

    def flush():
        if para:
            blocks.append(("speak", "\n".join(para)))
            para.clear()

    for raw in lines:
        line = raw.strip()
        if line.startswith("#") or (line and set(line) == {"="}):
            continue
        h = HEADER_RE.match(line)
        m = re.fullmatch(r"\[pause\s+([\d.]+)\]", line)
        mk = MARKER_RE.search(line)
        if h:
            flush()
            blocks.append(("chapter", string.capwords(h.group(2).lower())))
        elif m:
            flush()
            blocks.append(("pause", float(m.group(1))))
        elif not line:
            flush()
            if blocks and blocks[-1][0] == "speak":
                blocks.append(("pause", PARAGRAPH_GAP))
        elif mk:
            para.append(line[: mk.start()].rstrip())
            flush()
            blocks.append(("pause", MARKERS[mk.group(1)]))
        else:
            para.append(line)
    flush()
    return blocks


def select_chapters(blocks, spec):
    """Keep only chapters in spec like '1' or '1-3' (1-based) - for cheap test renders."""
    if not spec:
        return blocks
    lo, _, hi = spec.partition("-")
    lo, hi = int(lo), int(hi or lo)
    out, n = [], 0
    for b in blocks:
        if b[0] == "chapter":
            n += 1
        if lo <= n <= hi:
            out.append(b)
    return out


def tts(voice_id, text, speed, stability, style, prev_ids):
    body = {
        "text": text, "model_id": MODEL,
        "voice_settings": {"stability": stability, "similarity_boost": 0.8, "style": style,
                           "use_speaker_boost": True, "speed": speed},
    }
    if prev_ids:
        body["previous_request_ids"] = prev_ids[-3:]
    audio, headers = call("POST", f"/v1/text-to-speech/{voice_id}?output_format=mp3_44100_128", body, raw=True)
    return audio, headers.get("request-id") or headers.get("Request-Id")


def ff(*args):
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", *args], check=True)


def cmd_voices(_):
    for v in call("GET", "/v2/voices?page_size=100")["voices"]:
        l = v.get("labels", {})
        print(f"{v['voice_id']}  {v['name']:<45} {l.get('gender', '')} {l.get('age', '')} {l.get('accent', '')}")


def cmd_say(a):
    blocks = select_chapters(parse_script(Path(a.script).read_text()), a.chapters)
    chars = sum(len(t) for k, t in blocks if k == "speak")
    print(f"{chars} characters to synthesize (~{chars} credits)")
    if a.dry_run:
        return
    out = Path(a.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as td:
        parts, prev, chapters, t = [], [], [], 0.0
        for i, (kind, val) in enumerate(blocks):
            p = Path(td) / f"{i:04d}.wav"
            if kind in ("pause", "chapter"):
                if kind == "chapter":
                    if parts:  # gap before every chapter except the first
                        silence = Path(td) / f"{i:04d}_gap.wav"
                        ff("-f", "lavfi", "-i", "anullsrc=r=44100:cl=mono", "-t", str(CHAPTER_GAP), str(silence))
                        parts.append(silence)
                        t += CHAPTER_GAP
                    chapters.append((t, val))
                    continue
                ff("-f", "lavfi", "-i", "anullsrc=r=44100:cl=mono", "-t", str(val), str(p))
            else:
                # lines inside a paragraph get a short breath: ElevenLabs honors <break> tags
                text = f' <break time="{LINE_GAP}s" /> '.join(val.splitlines())
                audio, rid = tts(a.voice, text, a.speed, a.stability, a.style, prev)
                if rid:
                    prev.append(rid)
                mp3 = Path(td) / f"{i:04d}.mp3"
                mp3.write_bytes(audio)
                ff("-i", str(mp3), "-ac", "1", "-ar", "44100", str(p))
                print(f"  chunk {i}: {len(text)} chars")
            parts.append(p)
            t += probe_duration(p)
        lst = Path(td) / "list.txt"
        lst.write_text("".join(f"file '{p}'\n" for p in parts))
        ff("-f", "concat", "-safe", "0", "-i", str(lst), "-b:a", "192k", str(out))
    if chapters:
        # YouTube chapter list. mix.py/build.py add an intro offset: pass --offset to shift.
        lines = [f"{int((s + a.offset) // 60)}:{int((s + a.offset) % 60):02d} {title}" for s, title in chapters]
        lines[0] = "0:00 " + chapters[0][1]
        Path(str(out) + ".chapters.txt").write_text("\n".join(lines) + "\n")
        print(f"chapters -> {out}.chapters.txt")
    print(f"wrote {out}  ({t / 60:.1f} min)")


def probe_duration(path):
    return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0",
                                 str(path)], capture_output=True, text=True, check=True).stdout)


def cmd_design(a):
    text = Path(a.sample).read_text().strip()
    res = call("POST", "/v1/text-to-voice/design", {
        "voice_description": a.description, "text": text, "model_id": "eleven_multilingual_ttv_v2",
    })
    outdir = Path(a.outdir)
    outdir.mkdir(parents=True, exist_ok=True)
    for i, prev in enumerate(res.get("previews", []), 1):
        f = outdir / f"{a.name}_{i}.mp3"
        f.write_bytes(base64.b64decode(prev["audio_base_64"]))
        print(f"{f}  generated_voice_id={prev['generated_voice_id']}")
    print("To keep one: POST /v1/text-to-voice with its generated_voice_id (see README).")


def cmd_music(a):
    """Instrumental bed from a text prompt (Eleven Music; cleared for commercial use on paid plans).
    Costs roughly 400 credits per minute, so generate 2-3 minutes and let build.py/mix.py loop it."""
    prompt = Path(a.prompt).read_text().strip() if Path(a.prompt).is_file() else a.prompt
    audio, _ = call("POST", "/v1/music?output_format=mp3_44100_128", {
        "prompt": prompt, "music_length_ms": int(a.seconds * 1000), "force_instrumental": True,
    }, raw=True)
    Path(a.out).parent.mkdir(parents=True, exist_ok=True)
    Path(a.out).write_bytes(audio)
    print(f"wrote {a.out}")


def main():
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("voices").set_defaults(fn=cmd_voices)
    s = sub.add_parser("say")
    s.add_argument("voice"), s.add_argument("script"), s.add_argument("out")
    s.add_argument("--speed", type=float, default=0.9, help="0.7-1.2; lower = slower delivery")
    s.add_argument("--stability", type=float, default=0.55, help="higher = steadier, more monotone")
    s.add_argument("--style", type=float, default=0.15, help="higher = more dramatic")
    s.add_argument("--chapters", help="render only these chapters, e.g. 1 or 2-4 (cheap tests)")
    s.add_argument("--offset", type=float, default=1.5, help="seconds of intro music before the voice")
    s.add_argument("--dry-run", action="store_true", help="only count characters (= credits)")
    s.set_defaults(fn=cmd_say)
    d = sub.add_parser("design")
    d.add_argument("description"), d.add_argument("sample"), d.add_argument("outdir")
    d.add_argument("--name", default="design")
    d.set_defaults(fn=cmd_design)
    mu = sub.add_parser("music")
    mu.add_argument("prompt", help="prompt text, or a .txt file holding it")
    mu.add_argument("out")
    mu.add_argument("--seconds", type=float, default=120)
    mu.set_defaults(fn=cmd_music)
    a = ap.parse_args()
    a.fn(a)


if __name__ == "__main__":
    main()
