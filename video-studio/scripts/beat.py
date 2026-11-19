"""Generate a royalty-free slow trap / 808 instrumental bed (placeholder or test music).

Usage:
    .venv/bin/python scripts/beat.py out/beat_pulse.wav  --mode pulse  --bpm 72 --minutes 2
    .venv/bin/python scripts/beat.py out/beat_trance.wav --mode trance --bpm 66 --minutes 2

Modes:
  pulse  - 808 + kick pattern, half-time clap on 3, 16th hi-hats with rolls, dark pad. Keeps you awake.
  trance - one long 808 per bar, no clap, soft quarter-note shaker, louder pad. Hypnotic / sleep-adjacent.

Everything is synthesized from scratch with numpy, so there are no copyright claims. It's a test bed:
for releases, a produced track (licensed, or commissioned/AI with commercial rights) will sound richer.
"""
import argparse
import subprocess
from pathlib import Path

import numpy as np
import soundfile as sf

SR = 44100
# A minor: Am - F - C - G  (808 roots, pad chords as semitones above A2=110Hz)
ROOTS = [55.0, 43.65, 65.41, 49.0]
CHORDS = [[0, 3, 7, 12], [-4, 0, 3, 8], [3, 7, 10, 15], [-2, 2, 5, 10]]


def env(n, attack, decay):
    t = np.arange(n) / SR
    a = np.clip(t / max(attack, 1e-4), 0, 1)
    return a * np.exp(-t / decay)


def eight08(freq, dur, rng):
    n = int(dur * SR)
    t = np.arange(n) / SR
    f = freq * (1 + 1.0 * np.exp(-t / 0.03))            # pitch drop at the start = the 808 "punch"
    phase = 2 * np.pi * np.cumsum(f) / SR
    x = np.sin(phase) * env(n, 0.002, dur * 0.45)
    return np.tanh(2.2 * x) * 0.9                          # saturation adds harmonics so it's audible on phones


def kick(rng):
    n = int(0.18 * SR)
    t = np.arange(n) / SR
    f = 50 + 110 * np.exp(-t / 0.02)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * env(n, 0.001, 0.07)


def noise_hit(rng, dur, decay, hp):
    n = int(dur * SR)
    x = rng.standard_normal(n)
    for _ in range(hp):                                   # crude high-pass: repeated differencing
        x = np.diff(x, prepend=0)
    x /= np.max(np.abs(x)) + 1e-9
    return x * env(n, 0.001, decay)


def clap(rng):
    x = noise_hit(rng, 0.35, 0.09, 1)
    out = np.zeros_like(x)
    for d in (0, 0.011, 0.022):                           # three quick bursts = hand clap
        s = int(d * SR)
        out[s:] += x[: len(x) - s] * 0.6
    return out


def pad(chord, dur):
    n = int(dur * SR)
    t = np.arange(n) / SR
    x = np.zeros(n)
    for semi in chord:
        f = 110 * 2 ** (semi / 12)
        for h, amp in ((1, 1), (2, 0.35), (3, 0.12)):
            x += amp * np.sin(2 * np.pi * f * h * t + semi)
    x *= np.minimum(1, t / 1.2) * np.minimum(1, (dur - t) / 0.8)   # slow swell in and out
    k = 24  # ~1.8 kHz roll-off
    return np.convolve(x, np.ones(k) / k, mode="same") / len(chord)  # soften (low-pass)


def place(track, sound, at):
    s = int(at * SR)
    e = min(len(track), s + len(sound))
    if s < len(track):
        track[s:e] += sound[: e - s]


def render(mode, bpm, minutes, seed):
    rng = np.random.default_rng(seed)
    beat = 60 / bpm
    bar = 4 * beat
    bars = int(np.ceil(minutes * 60 / bar))
    n = int(bars * bar * SR) + SR * 3
    bass, drums, hats, pads = (np.zeros(n) for _ in range(4))
    for b in range(bars):
        t0 = b * bar
        ci = b % 4
        pads_gain = 0.9 if mode == "trance" else 0.55
        place(pads, pad(CHORDS[ci], bar + 0.6) * pads_gain, t0)
        if mode == "pulse":
            for pos in (0, 1.75, 2.5) if b % 2 == 0 else (0, 1.5, 2.75, 3.5):
                place(bass, eight08(ROOTS[ci], beat * 1.6, rng), t0 + pos * beat)
                place(drums, kick(rng) * 0.8, t0 + pos * beat)
            place(drums, clap(rng) * 0.45, t0 + 2 * beat)
            step = beat / 4
            for i in range(16):
                vel = 0.55 if i % 2 == 0 else 0.32
                place(hats, noise_hit(rng, 0.06, 0.012, 3) * vel, t0 + i * step)
            if b % 4 == 3:                                # hat roll into the next phrase
                for i in range(8):
                    place(hats, noise_hit(rng, 0.04, 0.008, 3) * 0.35, t0 + 3 * beat + i * step / 2)
        else:
            place(bass, eight08(ROOTS[ci], bar * 0.95, rng), t0)
            for i in range(4):
                place(hats, noise_hit(rng, 0.12, 0.04, 2) * 0.2, t0 + (i + 0.5) * beat)
    mix = bass * 0.9 + drums * 0.7 + hats + pads
    mix /= np.max(np.abs(mix)) + 1e-9
    return np.stack([mix, mix], axis=1) * 0.89


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("out", type=Path)
    ap.add_argument("--mode", choices=["pulse", "trance"], default="pulse")
    ap.add_argument("--bpm", type=float, default=72)
    ap.add_argument("--minutes", type=float, default=2)
    ap.add_argument("--seed", type=int, default=3)
    a = ap.parse_args()
    a.out.parent.mkdir(parents=True, exist_ok=True)
    tmp = a.out.with_suffix(".raw.wav")
    sf.write(tmp, render(a.mode, a.bpm, a.minutes, a.seed), SR)
    subprocess.run(["ffmpeg", "-y", "-loglevel", "error", "-i", str(tmp),
                    "-af", "loudnorm=I=-16:TP=-1.5", "-ar", "48000", str(a.out)], check=True)
    tmp.unlink()
    print(f"wrote {a.out}")


if __name__ == "__main__":
    main()
