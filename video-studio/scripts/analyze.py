"""Break down a reference video (or your own render) into measurable style numbers.

Usage:
    .venv/bin/python scripts/analyze.py path/to/video.mp4 [--transcribe] [--out report.json]

Reports:
  * Cuts: number of shots, average / median shot length, cuts per minute
  * Music/mix: tempo (BPM), loudness (LUFS-ish RMS), how much energy sits in the bass (<150 Hz)
  * Voice (with --transcribe): words per minute, average pause length, longest pauses

Run it on a reference video to get targets, then on your own render to check you hit them.
Only analyze videos you have the right to download (your own, licensed, or for private study).
"""
import argparse
import json
import statistics
import subprocess
import sys
import tempfile
from pathlib import Path


def detect_shots(video: Path):
    from scenedetect import ContentDetector, detect

    scenes = detect(str(video), ContentDetector(threshold=27.0), show_progress=False)
    lengths = [(end - start).seconds for start, end in scenes]
    return lengths


def extract_audio(video: Path, wav: Path):
    subprocess.run(
        ["ffmpeg", "-y", "-loglevel", "error", "-i", str(video), "-ac", "1", "-ar", "22050", str(wav)],
        check=True,
    )


def analyze_audio(wav: Path):
    import librosa
    import numpy as np

    y, sr = librosa.load(str(wav), sr=22050, mono=True)
    tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
    spec = np.abs(librosa.stft(y, n_fft=4096)) ** 2
    freqs = librosa.fft_frequencies(sr=sr, n_fft=4096)
    bass = spec[freqs < 150].sum()
    total = spec.sum() + 1e-12
    rms = librosa.feature.rms(y=y)[0]
    rms_db = 20 * np.log10(np.mean(rms) + 1e-12)
    return {
        "duration_sec": round(len(y) / sr, 1),
        "tempo_bpm": round(float(np.atleast_1d(tempo)[0]), 1),
        "bass_energy_pct_below_150hz": round(float(bass / total * 100), 1),
        "mean_rms_dbfs": round(float(rms_db), 1),
    }


def analyze_voice(wav: Path, model_size: str):
    from faster_whisper import WhisperModel

    from _audio import load_16k

    model = WhisperModel(model_size, device="cpu", compute_type="int8")
    segments, _ = model.transcribe(load_16k(wav), word_timestamps=True, vad_filter=True)
    words = [w for s in segments for w in (s.words or [])]
    if len(words) < 2:
        return {"error": "no speech detected"}
    gaps = [b.start - a.end for a, b in zip(words, words[1:]) if b.start - a.end > 0.25]
    spoken = words[-1].end - words[0].start
    return {
        "word_count": len(words),
        "words_per_minute": round(len(words) / spoken * 60, 1),
        "pauses_over_250ms": len(gaps),
        "avg_pause_sec": round(statistics.mean(gaps), 2) if gaps else 0,
        "longest_pauses_sec": sorted((round(g, 2) for g in gaps), reverse=True)[:5],
        "transcript": " ".join(w.word.strip() for w in words),
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video", type=Path)
    ap.add_argument("--transcribe", action="store_true", help="run Whisper to measure voice pacing")
    ap.add_argument("--whisper-model", default="base.en")
    ap.add_argument("--out", type=Path)
    args = ap.parse_args()

    if not args.video.exists():
        sys.exit(f"not found: {args.video}")

    report = {"file": str(args.video)}
    has_video = subprocess.run(
        ["ffprobe", "-v", "error", "-select_streams", "v", "-show_entries", "stream=index", "-of", "csv=p=0",
         str(args.video)], capture_output=True, text=True,
    ).stdout.strip()
    shots = detect_shots(args.video) if has_video else []
    if shots:
        total = sum(shots)
        report["shots"] = {
            "count": len(shots),
            "avg_len_sec": round(statistics.mean(shots), 2),
            "median_len_sec": round(statistics.median(shots), 2),
            "cuts_per_minute": round(len(shots) / total * 60, 1),
        }

    with tempfile.TemporaryDirectory() as td:
        wav = Path(td) / "audio.wav"
        extract_audio(args.video, wav)
        report["audio"] = analyze_audio(wav)
        if args.transcribe:
            report["voice"] = analyze_voice(wav, args.whisper_model)

    text = json.dumps(report, indent=2)
    print(text)
    if args.out:
        args.out.write_text(text)


if __name__ == "__main__":
    main()
