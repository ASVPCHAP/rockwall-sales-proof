"""Assemble a long-form motivational video: animation clips + voiceover + bass-heavy instrumental.

Usage:
    .venv/bin/python scripts/build.py \
        --clips media/clips/ \
        --voice out/voiceover.wav \
        --music media/music/ \
        --out out/final.mp4 \
        [--captions] [--shot 3.5 6.0] [--slowmo 1.15] [--music-db -14]

What it does:
  1. Measures the voiceover length — the video is cut to exactly that length (+ a short outro tail).
  2. Walks through your clips (in name order) cutting shots of random length between --shot MIN MAX,
     so pacing feels edited, not looped. Each shot is slowed slightly (--slowmo), color graded
     (lower saturation, more contrast, vignette) and letterboxed to a 2.39:1 cinematic frame.
  3. Loops/joins the music to full length, ducks it under the voice with a sidechain compressor,
     fades in/out, and loudness-normalises the mix to YouTube's -14 LUFS.
  4. Optionally (--captions) transcribes the voiceover with Whisper and burns in clean centered captions.

Everything here is ffmpeg + open-source Python. Use clips and music you have rights to.
"""
import argparse
import json
import random
import subprocess
import tempfile
from pathlib import Path

VIDEO_EXT = {".mp4", ".mov", ".mkv", ".webm", ".m4v"}
AUDIO_EXT = {".mp3", ".wav", ".m4a", ".flac", ".ogg"}
W, H, FPS = 1920, 1080, 30
TAIL = 4.0  # seconds of music after the last word


def run(cmd):
    subprocess.run(cmd, check=True)


def duration(path: Path) -> float:
    out = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "json", str(path)],
        check=True, capture_output=True, text=True,
    ).stdout
    return float(json.loads(out)["format"]["duration"])


def files(path: Path, exts):
    if path.is_file():
        return [path]
    found = sorted(p for p in path.iterdir() if p.suffix.lower() in exts)
    if not found:
        raise SystemExit(f"no media files in {path}")
    return found


def grade_filter(slowmo: float) -> str:
    bar = int(H * (1 - (W / 2.39) / H) / 2)  # letterbox bar height for 2.39:1
    return ",".join([
        f"scale={W}:{H}:force_original_aspect_ratio=increase",
        f"crop={W}:{H}",
        f"setpts={slowmo}*PTS",
        f"fps={FPS}",
        "eq=contrast=1.12:saturation=0.82:brightness=-0.02:gamma=0.95",
        "vignette=PI/5",
        f"drawbox=x=0:y=0:w=iw:h={bar}:color=black:t=fill",
        f"drawbox=x=0:y=ih-{bar}:w=iw:h={bar}:color=black:t=fill",
        "format=yuv420p",
    ])


def cut_shots(clips, target: float, shot_range, slowmo: float, work: Path, seed: int):
    rng = random.Random(seed)
    lengths = {c: duration(c) for c in clips}
    vf = grade_filter(slowmo)
    shots, total, ci, pos = [], 0.0, 0, {c: 0.0 for c in clips}
    while total < target:
        clip = clips[ci % len(clips)]
        out_len = min(rng.uniform(*shot_range), target - total)
        src_len = out_len / slowmo
        if pos[clip] + src_len > lengths[clip]:
            pos[clip] = 0.0          # wrap around this clip
            ci += 1
            if lengths[clip] < src_len:
                continue
        out = work / f"shot_{len(shots):05d}.mp4"
        run(["ffmpeg", "-y", "-loglevel", "error", "-ss", f"{pos[clip]:.3f}", "-t", f"{src_len:.3f}",
             "-i", str(clip), "-vf", vf, "-an", "-c:v", "libx264", "-preset", "veryfast", "-crf", "20", str(out)])
        shots.append(out)
        pos[clip] += src_len + rng.uniform(0.5, 4.0)  # skip ahead so shots don't feel continuous
        total += out_len
        if pos[clip] >= lengths[clip]:
            pos[clip] = 0.0
            ci += 1
    listfile = work / "shots.txt"
    listfile.write_text("".join(f"file '{s}'\n" for s in shots))
    video = work / "video.mp4"
    run(["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", str(listfile),
         "-c", "copy", str(video)])
    return video, len(shots)


def music_bed(tracks, target: float, work: Path):
    listfile = work / "music.txt"
    reps = []
    t = 0.0
    while t < target:
        for tr in tracks:
            reps.append(tr)
            t += duration(tr)
            if t >= target:
                break
    listfile.write_text("".join(f"file '{r.resolve()}'\n" for r in reps))
    bed = work / "music.wav"
    run(["ffmpeg", "-y", "-loglevel", "error", "-f", "concat", "-safe", "0", "-i", str(listfile),
         "-t", f"{target:.3f}", "-ar", "48000", "-ac", "2", str(bed)])
    return bed


def make_srt(voice: Path, srt: Path, model_size: str):
    from faster_whisper import WhisperModel

    from _audio import load_16k

    def ts(s):
        h, m = int(s // 3600), int(s % 3600 // 60)
        return f"{h:02d}:{m:02d}:{s % 60:06.3f}".replace(".", ",")

    model = WhisperModel(model_size, device="cpu", compute_type="int8")
    segments, _ = model.transcribe(load_16k(voice), word_timestamps=True, vad_filter=True)
    words = [w for s in segments for w in (s.words or [])]
    cues, cur = [], []
    for w in words:  # short captions (max 7 words), broken at punctuation
        cur.append(w)
        if len(cur) >= 7 or (len(cur) >= 2 and w.word.strip()[-1:] in ".,!?;:"):
            cues.append(cur)
            cur = []
    if cur:
        cues.append(cur)
    srt.write_text("".join(
        f"{i}\n{ts(c[0].start)} --> {ts(c[-1].end)}\n{' '.join(x.word.strip() for x in c)}\n\n"
        for i, c in enumerate(cues, 1)
    ))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--clips", type=Path, required=True)
    ap.add_argument("--voice", type=Path, required=True)
    ap.add_argument("--music", type=Path, required=True)
    ap.add_argument("--out", type=Path, required=True)
    ap.add_argument("--shot", type=float, nargs=2, default=(3.5, 6.0), metavar=("MIN", "MAX"))
    ap.add_argument("--slowmo", type=float, default=1.15)
    ap.add_argument("--music-db", type=float, default=-14, help="music level before ducking")
    ap.add_argument("--captions", action="store_true")
    ap.add_argument("--whisper-model", default="base.en")
    ap.add_argument("--seed", type=int, default=7)
    args = ap.parse_args()
    args.out.parent.mkdir(parents=True, exist_ok=True)

    vo_len = duration(args.voice)
    target = vo_len + TAIL
    with tempfile.TemporaryDirectory() as td:
        work = Path(td)
        video, n = cut_shots(files(args.clips, VIDEO_EXT), target, args.shot, args.slowmo, work, args.seed)
        bed = music_bed(files(args.music, AUDIO_EXT), target, work)

        vf = "null"
        if args.captions:
            srt = args.out.with_suffix(".srt")
            make_srt(args.voice, srt, args.whisper_model)
            style = ("FontName=DejaVu Sans,FontSize=13,PrimaryColour=&H00FFFFFF,OutlineColour=&H00000000,"
                     "BorderStyle=1,Outline=1,Shadow=0,Alignment=2,MarginV=60")
            vf = f"subtitles={srt}:force_style='{style}'"

        audio = (
            f"[1:a]aresample=48000,aformat=channel_layouts=stereo,adelay=1500|1500,apad=whole_dur={target},"
            f"asplit=2[vo][key];"
            f"[2:a]volume={args.music_db}dB,afade=t=in:d=3,afade=t=out:st={target - 4}:d=4[mus];"
            f"[mus][key]sidechaincompress=threshold=0.03:ratio=6:attack=30:release=600[ducked];"
            f"[vo][ducked]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=9[a]"
        )
        run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(video), "-i", str(args.voice), "-i", str(bed),
             "-filter_complex", audio, "-map", "0:v", "-map", "[a]", "-vf", vf,
             "-c:v", "libx264", "-preset", "medium", "-crf", "19", "-c:a", "aac", "-b:a", "256k",
             "-t", f"{target + 1.5:.3f}", "-movflags", "+faststart", str(args.out)])
    print(f"wrote {args.out}  ({target / 60:.1f} min, {n} shots)")


if __name__ == "__main__":
    main()
