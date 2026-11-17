"""Mix a voiceover over a music bed -> audio master (auditions, or the Spotify/podcast version).

Usage:
    .venv/bin/python scripts/mix.py VOICE MUSIC OUT.mp3 [--music-db -10] [--intro 3] [--outro 4] [--polish]

Music loops to cover the voice, starts `--intro` seconds before the first word, ducks under the voice
(sidechain), and swells back up in the pauses — the "trance" effect. --polish adds the voice chain
(warmth, presence, compression, light room) without changing pitch. Output is normalized to -14 LUFS.
"""
import argparse
import subprocess
from pathlib import Path

VOICE_POLISH = ("highpass=f=60,bass=g=3:f=120,equalizer=f=3000:t=q:w=1:g=2,"
                "acompressor=threshold=-20dB:ratio=3:attack=10:release=200:makeup=2,"
                "aecho=0.8:0.6:40|70:0.15|0.08,")


def duration(p):
    return float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration",
                                 "-of", "csv=p=0", str(p)], capture_output=True, text=True, check=True).stdout)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("voice", type=Path)
    ap.add_argument("music", type=Path)
    ap.add_argument("out", type=Path)
    ap.add_argument("--music-db", type=float, default=-10)
    ap.add_argument("--intro", type=float, default=3)
    ap.add_argument("--outro", type=float, default=4)
    ap.add_argument("--polish", action="store_true")
    a = ap.parse_args()
    a.out.parent.mkdir(parents=True, exist_ok=True)
    total = a.intro + duration(a.voice) + a.outro
    ms = int(a.intro * 1000)
    graph = (
        f"[0:a]{VOICE_POLISH if a.polish else ''}aresample=48000,aformat=channel_layouts=stereo,"
        f"adelay={ms}|{ms},apad=whole_dur={total},asplit=2[vo][key];"
        f"[1:a]aresample=48000,aformat=channel_layouts=stereo,volume={a.music_db}dB,"
        f"afade=t=in:d=2,afade=t=out:st={total - 3}:d=3[mus];"
        f"[mus][key]sidechaincompress=threshold=0.03:ratio=5:attack=40:release=700[duck];"
        f"[vo][duck]amix=inputs=2:duration=first:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=9[a]"
    )
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(a.voice), "-stream_loop", "-1",
                    "-i", str(a.music), "-filter_complex", graph, "-map", "[a]", "-t", f"{total:.2f}",
                    "-b:a", "192k", str(a.out)], check=True)
    print(f"wrote {a.out} ({total:.0f}s)")


if __name__ == "__main__":
    main()
