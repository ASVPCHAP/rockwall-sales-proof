"""Shared helper: decode any audio/video file to 16 kHz mono float32 with ffmpeg (what Whisper expects)."""
import subprocess

import numpy as np


def load_16k(path) -> np.ndarray:
    raw = subprocess.run(
        ["ffmpeg", "-loglevel", "error", "-i", str(path), "-ac", "1", "-ar", "16000", "-f", "f32le", "-"],
        check=True, capture_output=True,
    ).stdout
    return np.frombuffer(raw, dtype=np.float32).copy()
