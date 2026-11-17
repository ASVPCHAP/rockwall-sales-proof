"""Turn a plain-text script into a steady, deep motivational voiceover with a free local voice (Piper).

Usage:
    .venv/bin/python scripts/narrate.py scripts/example_script.txt out/voiceover.wav \
        [--voice voices/en_US-ryan-high.onnx] [--pace 1.15] [--pitch 0.92]

Script format:
  * One thought per line. Each line becomes its own sentence with a short breath after it.
  * A blank line = a longer, dramatic pause (paragraph / beat change).
  * A line like [pause 2.5] inserts exactly that many seconds of silence.
  * Lines starting with # are comments (chapter names etc.) and are not spoken.

The voice is then processed with ffmpeg: lowered pitch, warmth (bass shelf), gentle compression,
and a touch of room reverb — the "late-night speech" sound. Swap --voice for any Piper model,
or skip this script and record yourself / use ElevenLabs and run only the --polish step.
"""
import argparse
import re
import subprocess
import tempfile
import wave
from pathlib import Path

LINE_GAP = 0.55      # seconds of silence after each line
PARAGRAPH_GAP = 1.6  # seconds of silence for a blank line


def silence(seconds: float, rate: int) -> bytes:
    return b"\x00\x00" * int(seconds * rate)


def synthesize(lines, voice_path: Path, pace: float, out_wav: Path):
    from piper import PiperVoice, SynthesisConfig

    voice = PiperVoice.load(str(voice_path))
    rate = voice.config.sample_rate
    cfg = SynthesisConfig(length_scale=pace, noise_scale=0.5, noise_w_scale=0.6)
    frames = bytearray()
    for raw in lines:
        line = raw.strip()
        if line.startswith("#"):
            continue
        m = re.fullmatch(r"\[pause\s+([\d.]+)\]", line)
        if m:
            frames += silence(float(m.group(1)), rate)
            continue
        if not line:
            frames += silence(PARAGRAPH_GAP, rate)
            continue
        for chunk in voice.synthesize(line, syn_config=cfg):
            frames += chunk.audio_int16_bytes
        frames += silence(LINE_GAP, rate)
    with wave.open(str(out_wav), "wb") as w:
        w.setnchannels(1)
        w.setsampwidth(2)
        w.setframerate(rate)
        w.writeframes(bytes(frames))
    return rate


def polish(in_wav: Path, out_wav: Path, pitch: float, rate: int):
    """Deepen + warm + compress + small room. pitch<1 lowers the voice without changing speed."""
    chain = ",".join([
        f"asetrate={int(rate * pitch)}",
        f"atempo={1 / pitch:.4f}",
        f"aresample=48000",
        "highpass=f=60",
        "bass=g=4:f=120",            # chest / warmth
        "equalizer=f=3000:t=q:w=1:g=2",  # presence so words stay clear over music
        "acompressor=threshold=-20dB:ratio=3:attack=10:release=200:makeup=3",
        "aecho=0.8:0.6:40|70:0.18|0.10",  # subtle room, not a cathedral
        "loudnorm=I=-16:TP=-1.5:LRA=7",
    ])
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-i", str(in_wav), "-af", chain, "-ac", "1", str(out_wav)],
        check=True,
    )


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("script", type=Path, help="text script, or a wav when --polish-only")
    ap.add_argument("out", type=Path)
    ap.add_argument("--voice", type=Path, default=Path(__file__).parent.parent / "voices/en_US-ryan-high.onnx")
    ap.add_argument("--pace", type=float, default=1.5, help=">1 = slower, more deliberate delivery")
    ap.add_argument("--pitch", type=float, default=0.92, help="<1 = deeper voice")
    ap.add_argument("--polish-only", action="store_true", help="only process an existing recording")
    args = ap.parse_args()
    args.out.parent.mkdir(parents=True, exist_ok=True)

    if args.polish_only:
        with wave.open(str(args.script)) as w:
            rate = w.getframerate()
        polish(args.script, args.out, args.pitch, rate)
    else:
        with tempfile.TemporaryDirectory() as td:
            raw = Path(td) / "raw.wav"
            rate = synthesize(args.script.read_text().splitlines(), args.voice, args.pace, raw)
            polish(raw, args.out, args.pitch, rate)
    print(f"wrote {args.out}")


if __name__ == "__main__":
    main()
