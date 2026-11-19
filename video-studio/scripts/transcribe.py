"""Transcribe a sermon/recording with word timestamps -> .json (words), .srt (captions), .txt (timestamped).

Usage:
    .venv/bin/python scripts/transcribe.py AUDIO OUT_PREFIX [--model small.en]

Outputs OUT_PREFIX.json, OUT_PREFIX.srt and OUT_PREFIX.txt. The .txt has one line per segment, prefixed
with [h:mm:ss], which makes it easy to pick clips. Scripture references found in the text are listed
in OUT_PREFIX.refs.txt with their timestamps (for on-screen verse cards).
"""
import argparse
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent))
from _audio import load_16k  # noqa: E402

BOOKS = ("Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Joshua|Judges|Ruth|Samuel|Kings|Chronicles|Ezra|"
         "Nehemiah|Esther|Job|Psalms?|Proverbs|Ecclesiastes|Song of Solomon|Isaiah|Jeremiah|Lamentations|"
         "Ezekiel|Daniel|Hosea|Joel|Amos|Obadiah|Jonah|Micah|Nahum|Habakkuk|Zephaniah|Haggai|Zechariah|"
         "Malachi|Matthew|Mark|Luke|John|Acts|Romans|Corinthians|Galatians|Ephesians|Philippians|Colossians|"
         "Thessalonians|Timothy|Titus|Philemon|Hebrews|James|Peter|Jude|Revelations?")
REF_RE = re.compile(rf"\b((?:1st|2nd|3rd|first|second|third|[123])\s+)?({BOOKS})\s+(?:chapter\s+)?(\d+)"
                    rf"(?:\s*(?:and|verse|verses|:|,)\s*(\d+))?", re.I)


def ts(s, srt=False):
    h, m, sec = int(s // 3600), int(s % 3600 // 60), s % 60
    return f"{h:02d}:{m:02d}:{sec:06.3f}".replace(".", ",") if srt else f"{h}:{m:02d}:{int(sec):02d}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("audio")
    ap.add_argument("out")
    ap.add_argument("--model", default="small.en")
    a = ap.parse_args()
    from faster_whisper import WhisperModel

    model = WhisperModel(a.model, device="cpu", compute_type="int8")
    segments, _ = model.transcribe(load_16k(a.audio), word_timestamps=True, vad_filter=True, beam_size=5)
    segs = []
    for s in segments:
        segs.append({"start": s.start, "end": s.end, "text": s.text.strip(),
                     "words": [{"w": w.word, "s": round(w.start, 2), "e": round(w.end, 2)} for w in s.words or []]})
        print(f"[{ts(s.start)}] {s.text.strip()}", flush=True)
    out = Path(a.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    Path(f"{out}.json").write_text(json.dumps(segs))
    Path(f"{out}.txt").write_text("".join(f"[{ts(s['start'])}] {s['text']}\n" for s in segs))
    Path(f"{out}.srt").write_text("".join(
        f"{i}\n{ts(s['start'], True)} --> {ts(s['end'], True)}\n{s['text']}\n\n" for i, s in enumerate(segs, 1)))
    refs = [f"[{ts(s['start'])}] {m.group(0)}" for s in segs for m in REF_RE.finditer(s["text"])]
    Path(f"{out}.refs.txt").write_text("\n".join(refs) + "\n")
    print(f"done: {len(segs)} segments, {len(refs)} scripture references")


if __name__ == "__main__":
    main()
