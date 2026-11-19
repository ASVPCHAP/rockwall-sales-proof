"""Assemble a finished sermon episode: still images (+ optional hero clips) timed to the chapters of a
cut.py program, slow camera moves and crossfades, film grade and letterbox, a title card, chapter
titles, scripture cards, burned-in captions and the music bed.

Usage:
    .venv/bin/python scripts/assemble.py --edl ep1.edl.json --cut out/ep1 --shots ep1_shots.json \
        --images shots_dir/ --cards ep1_cards.json --music bed.wav --out final.mp4 \
        --title "THE SOUL THAT DIED" --subtitle "Pastor Clark" [--heroes clips_dir/] [--fix fixes.json]

--cut is cut.py's OUT_PREFIX (it reads <cut>.wav and <cut>.edl.resolved.json).
--heroes holds optional <shot id>.mp4 motion clips that replace that shot's still.
--fix is a JSON list of [regex, replacement] caption corrections (applied case-insensitively).
"""
import argparse
import json
import math
import re
import subprocess
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

W, H, FPS = 1920, 1080, 30
INTRO, OUTRO, XF = 4.0, 6.0, 1.0          # title seconds before voice, tail after, crossfade length
CLIP_GAP, CHAPTER_GAP = 0.6, 1.6           # must match cut.py
BAR = 104                                   # letterbox bar height (≈2.2:1)
FONTS = Path(__file__).resolve().parent.parent / "fonts"
SERIF, DISPLAY = str(FONTS / "EBGaramond-VF.ttf"), str(FONTS / "Cinzel-VF.ttf")
GRADE = f"eq=contrast=1.05:saturation=0.93,vignette=PI/6,noise=alls=7:allf=t+u," \
        f"drawbox=x=0:y=0:w=iw:h={BAR}:color=black:t=fill,drawbox=x=0:y=ih-{BAR}:w=iw:h={BAR}:color=black:t=fill"
MOVES = [  # (zoom expr, x expr, y expr): slow, varied camera moves over `n` frames
    ("1.0+0.12*on/{n}", "iw/2-(iw/zoom/2)", "ih/2-(ih/zoom/2)"),            # push in
    ("1.12-0.12*on/{n}", "iw/2-(iw/zoom/2)", "ih/2-(ih/zoom/2)"),           # pull out
    ("1.12", "(iw-iw/zoom)*on/{n}", "ih/2-(ih/zoom/2)"),                    # pan right
    ("1.12", "(iw-iw/zoom)*(1-on/{n})", "ih/2-(ih/zoom/2)"),                # pan left
    ("1.0+0.10*on/{n}", "iw/2-(iw/zoom/2)", "(ih-ih/zoom)*0.35"),           # push in, upper third
]


def run(cmd):
    subprocess.run(cmd, check=True)


def dur(p):
    return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(p)],
                                capture_output=True, text=True, check=True).stdout)


def norm(t):
    return re.sub(r"[^a-z0-9']", "", t.lower())


# ---------- program timeline (mirrors cut.py) ----------
def program_map(resolved, edl):
    base = Path(edl["_base"])
    words = {k: [w for s in json.loads((base / v["words"]).read_text()) for w in s["words"]]
             for k, v in edl["sources"].items()}
    t, prev, clips = 0.0, None, []
    for r in resolved:
        if prev is not None:
            t += CHAPTER_GAP if r["chapter"] != prev else CLIP_GAP
        clips.append({**r, "pstart": t})
        t += r["end"] - r["start"]
        prev = r["chapter"]
    prog_words = []
    for c in clips:
        for w in words[c["src"]]:
            if c["start"] <= w["s"] and w["e"] <= c["end"] + 0.05:
                off = c["pstart"] - c["start"]
                prog_words.append({"w": w["w"], "s": w["s"] + off, "e": w["e"] + off, "chapter": c["chapter"]})
    chapters = []
    for c in clips:
        if not chapters or chapters[-1][1] != c["chapter"]:
            chapters.append((c["pstart"], c["chapter"]))
    return prog_words, chapters, t


def find_cue(prog_words, cue, chapter=None):
    target = [norm(x) for x in cue.split() if norm(x)]
    toks = [norm(w["w"]) for w in prog_words]
    for i in range(len(toks) - len(target) + 1):
        if toks[i:i + len(target)] == target and (chapter is None or prog_words[i]["chapter"] == chapter):
            return prog_words[i]["s"]
    raise SystemExit(f"card cue not found: {cue!r}")


# ---------- overlay graphics ----------
def wrap(draw, text, font, width):
    lines, line = [], ""
    for word in text.split():
        trial = (line + " " + word).strip()
        if draw.textlength(trial, font=font) <= width:
            line = trial
        else:
            lines.append(line)
            line = word
    return lines + [line]


def card_png(ref, text, path):
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    f_ref = ImageFont.truetype(DISPLAY, 34)
    f_ref.set_variation_by_axes([700])
    f_txt = ImageFont.truetype(SERIF, 40)
    f_txt.set_variation_by_axes([450])
    box_w = 1240
    lines = wrap(d, text, f_txt, box_w - 120)
    box_h = 70 + 56 * len(lines) + 46
    x0, y0 = (W - box_w) // 2, H - BAR - 40 - box_h
    d.rectangle([x0, y0, x0 + box_w, y0 + box_h], fill=(242, 230, 201, 228))
    d.rectangle([x0 + 12, y0 + 12, x0 + box_w - 12, y0 + box_h - 12], outline=(107, 74, 43, 230), width=3)
    d.text((W // 2, y0 + 50), ref.upper(), font=f_ref, fill=(90, 58, 30, 255), anchor="mm")
    for i, ln in enumerate(lines):
        d.text((W // 2, y0 + 106 + i * 56), ln, font=f_txt, fill=(43, 29, 16, 255), anchor="mm")
    img.save(path)


def title_png(title, sub, path, size=86):
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    f1 = ImageFont.truetype(DISPLAY, size)
    f1.set_variation_by_axes([600])
    f2 = ImageFont.truetype(SERIF, 38)
    f2.set_variation_by_axes([400])
    for dx, dy in ((3, 3), (0, 0)):  # soft shadow then text
        col = (0, 0, 0, 170) if dx else (246, 236, 214, 255)
        d.text((W // 2 + dx, H // 2 - 20 + dy), title, font=f1, fill=col, anchor="mm")
        if sub:
            d.text((W // 2 + dx, H // 2 + 60 + dy), sub, font=f2, fill=col, anchor="mm")
    img.save(path)


def chapter_png(n, name, path):
    img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    f1 = ImageFont.truetype(SERIF, 30)
    f1.set_variation_by_axes([500])
    f2 = ImageFont.truetype(DISPLAY, 52)
    f2.set_variation_by_axes([600])
    for dx, col in ((3, (0, 0, 0, 170)), (0, (246, 236, 214, 255))):
        d.text((150 + dx, BAR + 70 + dx), f"CHAPTER {n}", font=f1, fill=col, anchor="lm")
        d.text((150 + dx, BAR + 125 + dx), name.upper(), font=f2, fill=col, anchor="lm")
    img.save(path)


# ---------- captions ----------
def captions(prog_words, fixes, offset, path):
    def ts(s):
        return f"{int(s // 3600)}:{int(s % 3600 // 60):02d}:{s % 60:05.2f}"
    cues, cur = [], []
    for w in prog_words:
        if cur and (w["s"] - cur[-1]["e"] > 0.7 or w["chapter"] != cur[-1]["chapter"]):
            cues.append(cur)
            cur = []
        cur.append(w)
        if len(cur) >= 8 or (len(cur) >= 3 and w["w"].strip()[-1:] in ".?!,"):
            cues.append(cur)
            cur = []
    if cur:
        cues.append(cur)
    lines = ["[Script Info]", "ScriptType: v4.00+", f"PlayResX: {W}", f"PlayResY: {H}", "",
             "[V4+ Styles]",
             "Format: Name, Fontname, Fontsize, PrimaryColour, OutlineColour, BackColour, Bold, Italic, "
             "BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV",
             f"Style: Default,EB Garamond,46,&H00E6F0F6,&H00000000,&H64000000,0,0,1,1.5,0,2,80,80,{(BAR - 46) // 2}",
             "", "[Events]", "Format: Layer, Start, End, Style, Text"]
    for i, c in enumerate(cues):
        text = " ".join(x["w"].strip() for x in c)
        for pat, rep in fixes:
            text = re.sub(pat, rep, text, flags=re.I)
        end = c[-1]["e"] + 0.25
        if i + 1 < len(cues):  # never overlap the next caption
            end = min(end, cues[i + 1][0]["s"] - 0.02)
        lines.append(f"Dialogue: 0,{ts(c[0]['s'] + offset)},{ts(end + offset)},Default,{text}")
    Path(path).write_text("\n".join(lines) + "\n")


# ---------- shot rendering ----------
def render_shot(img, length, move, out, hero=None):
    n = int(round(length * FPS))
    if hero:  # motion clip: play at 0.6x speed, then hold its last frame
        vf = (f"scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H},setpts=PTS/0.6,fps={FPS},"
              f"tpad=stop_mode=clone:stop_duration={length},trim=duration={length},{GRADE},format=yuv420p")
        run(["ffmpeg", "-y", "-v", "error", "-i", str(hero), "-an", "-vf", vf, "-c:v", "libx264", "-preset", "veryfast",
             "-crf", "19", str(out)])
        return
    z, x, y = (e.format(n=n) for e in MOVES[move % len(MOVES)])
    vf = (f"scale=2880:-2,zoompan=z='{z}':x='{x}':y='{y}':d={n}:s={W}x{H}:fps={FPS},{GRADE},format=yuv420p")
    run(["ffmpeg", "-y", "-v", "error", "-loop", "1", "-i", str(img), "-vf", vf, "-frames:v", str(n),
         "-c:v", "libx264", "-preset", "veryfast", "-crf", "19", str(out)])


def xfade_chain(files, lengths, out):
    if len(files) == 1:
        run(["ffmpeg", "-y", "-v", "error", "-i", str(files[0]), "-c", "copy", str(out)])
        return
    inputs, graph, cur_len, last = [], [], lengths[0], "[0:v]"
    for f in files:
        inputs += ["-i", str(f)]
    for i in range(1, len(files)):
        tag = f"[v{i}]"
        graph.append(f"{last}[{i}:v]xfade=transition=fade:duration={XF}:offset={cur_len - XF:.3f}{tag}")
        cur_len += lengths[i] - XF
        last = tag
    run(["ffmpeg", "-y", "-v", "error", *inputs, "-filter_complex", ";".join(graph), "-map", last,
         "-c:v", "libx264", "-preset", "veryfast", "-crf", "19", "-pix_fmt", "yuv420p", str(out)])


def main():
    ap = argparse.ArgumentParser()
    for k in ("edl", "cut", "shots", "images", "cards", "music", "out", "title"):
        ap.add_argument(f"--{k}", required=True)
    ap.add_argument("--subtitle", default="")
    ap.add_argument("--heroes")
    ap.add_argument("--fix")
    ap.add_argument("--music-db", type=float, default=-16)
    ap.add_argument("--keep", help="keep intermediate files in this dir")
    a = ap.parse_args()

    edl = json.loads(Path(a.edl).read_text())
    edl["_base"] = str(Path(a.edl).parent)
    resolved = json.loads(Path(f"{a.cut}.edl.resolved.json").read_text())
    prog_words, chapters, prog_len = program_map(resolved, edl)
    voice = Path(f"{a.cut}.wav")
    total = INTRO + dur(voice) + OUTRO
    shots = json.loads(Path(a.shots).read_text())["shots"]
    cards = json.loads(Path(a.cards).read_text())["cards"]
    fixes = json.loads(Path(a.fix).read_text()) if a.fix else []
    images, heroes = Path(a.images), Path(a.heroes) if a.heroes else None

    # chapter spans on the final timeline
    starts = [0.0] + [INTRO + s for s, _ in chapters[1:]]
    ends = starts[1:] + [total]
    names = [n for _, n in chapters]

    work = Path(a.keep) if a.keep else Path(tempfile.mkdtemp())
    work.mkdir(parents=True, exist_ok=True)
    chapter_files, chapter_lens, move = [], [], 0
    for ci, name in enumerate(names):
        cs = [s for s in shots if s["chapter"] == name]
        if not cs:
            raise SystemExit(f"no shots for chapter {name!r}")
        span = ends[ci] - starts[ci]
        d = span / len(cs)
        files, lens = [], []
        for si, s in enumerate(cs):
            last_overall = ci == len(names) - 1 and si == len(cs) - 1
            length = d + (0 if last_overall else XF)
            out = work / f"shot_{s['id']}.mp4"
            hero = heroes / f"{s['id']}.mp4" if heroes and (heroes / f"{s['id']}.mp4").exists() else None
            if not out.exists():
                render_shot(images / f"{s['id']}.png", length, move, out, hero)
            move += 1
            files.append(out)
            lens.append(length)
        cf = work / f"chapter_{ci:02d}.mp4"
        if not cf.exists():
            xfade_chain(files, lens, cf)
        chapter_files.append(cf)
        chapter_lens.append(sum(lens) - XF * (len(lens) - 1))
        print(f"chapter {ci + 1}/{len(names)} {name}: {len(cs)} shots, {span:.0f}s", flush=True)
    bg = work / "background.mp4"
    xfade_chain(chapter_files, chapter_lens, bg)

    # overlays: title, chapter titles, scripture cards
    ov = []  # (png, start, duration)
    title_png(a.title, a.subtitle, work / "title.png")
    ov.append((work / "title.png", 0.3, INTRO + 0.4))
    for ci, name in enumerate(names):
        p = work / f"ch_{ci:02d}.png"
        chapter_png(ci + 1, name, p)
        ov.append((p, starts[ci] + (INTRO + 0.8 if ci == 0 else 0.8), 3.8))
    for k, c in enumerate(cards):
        p = work / f"card_{k:02d}.png"
        card_png(c["ref"], c["text"], p)
        ov.append((p, INTRO + find_cue(prog_words, c["cue"], c.get("chapter")) + 0.3, 7.5))
    ass = work / "captions.ass"
    captions(prog_words, fixes, INTRO, ass)

    inputs, graph, last = ["-i", str(bg)], [], "[0:v]"
    for i, (png, st, du) in enumerate(ov, 1):
        inputs += ["-loop", "1", "-t", f"{du:.2f}", "-i", str(png)]
        graph.append(f"[{i}:v]format=rgba,fade=t=in:st=0:d=0.6:alpha=1,fade=t=out:st={du - 0.7:.2f}:d=0.7:alpha=1,"
                     f"setpts=PTS+{st:.2f}/TB[o{i}]")
        graph.append(f"{last}[o{i}]overlay=eof_action=pass:enable='between(t,{st:.2f},{st + du:.2f})'[b{i}]")
        last = f"[b{i}]"
    graph.append(f"{last}subtitles='{ass}':fontsdir='{FONTS}',fade=t=out:st={total - 2.5:.2f}:d=2.5[vout]")

    audio = work / "audio.wav"
    run([str(Path(__file__).resolve().parent.parent / ".venv/bin/python"), str(Path(__file__).parent / "mix.py"),
         str(voice), a.music, str(audio).replace(".wav", ".mp3"), "--music-db", str(a.music_db),
         "--intro", str(INTRO), "--outro", str(OUTRO)])
    run(["ffmpeg", "-y", "-v", "error", *inputs, "-i", str(audio).replace(".wav", ".mp3"),
         "-filter_complex", ";".join(graph), "-map", "[vout]", "-map", f"{len(ov) + 1}:a",
         "-c:v", "libx264", "-preset", "medium", "-crf", "20", "-pix_fmt", "yuv420p",
         "-c:a", "aac", "-b:a", "192k", "-t", f"{total:.2f}", "-movflags", "+faststart", a.out])
    yt = [f"{int((x if i else 0) // 60)}:{int((x if i else 0) % 60):02d} {n}" for i, (x, n) in
          enumerate(zip([s for s in starts], names))]
    Path(a.out).with_suffix(".chapters.txt").write_text("\n".join(yt) + "\n")
    print(f"wrote {a.out} ({total / 60:.1f} min, {len(shots)} shots, {len(cards)} cards)")


if __name__ == "__main__":
    main()
