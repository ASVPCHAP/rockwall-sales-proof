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

`say` reads the same script format as narrate.py (one thought per line, blank line = pause,
# comments skipped, [pause N] honored), sends it in paragraph-sized chunks with request stitching
so the voice stays consistent across a 25-minute script, and inserts real silence for pauses.
Then polish it:  .venv/bin/python scripts/narrate.py out/vo.mp3 out/vo.wav --polish-only --pitch 1.0
"""
import argparse
import base64
import json
import os
import re
import subprocess
import sys
import tempfile
import urllib.request
from pathlib import Path

API = "https://api.elevenlabs.io"
KEY = os.environ.get("ELEVENLABS_API_KEY", "proxy-injected")
MODEL = "eleven_multilingual_v2"  # most natural long-form model
LINE_GAP, PARAGRAPH_GAP = 0.45, 1.4


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
    """-> list of blocks: ('speak', paragraph_text) or ('pause', seconds)."""
    blocks, para = [], []

    def flush():
        if para:
            blocks.append(("speak", "\n".join(para)))
            para.clear()

    for raw in text.splitlines():
        line = raw.strip()
        if line.startswith("#"):
            continue
        m = re.fullmatch(r"\[pause\s+([\d.]+)\]", line)
        if m:
            flush()
            blocks.append(("pause", float(m.group(1))))
        elif not line:
            flush()
            blocks.append(("pause", PARAGRAPH_GAP))
        else:
            para.append(line)
    flush()
    return blocks


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
    blocks = parse_script(Path(a.script).read_text())
    chars = sum(len(t) for k, t in blocks if k == "speak")
    print(f"{chars} characters to synthesize")
    out = Path(a.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory() as td:
        parts, prev = [], []
        for i, (kind, val) in enumerate(blocks):
            p = Path(td) / f"{i:04d}.wav"
            if kind == "pause":
                ff("-f", "lavfi", "-i", "anullsrc=r=44100:cl=mono", "-t", str(val), str(p))
            else:
                # each line inside a paragraph gets a breath: ElevenLabs honors <break> tags
                text = f' <break time="{LINE_GAP}s" /> '.join(val.splitlines())
                audio, rid = tts(a.voice, text, a.speed, a.stability, a.style, prev)
                if rid:
                    prev.append(rid)
                mp3 = Path(td) / f"{i:04d}.mp3"
                mp3.write_bytes(audio)
                ff("-i", str(mp3), "-ac", "1", "-ar", "44100", str(p))
                print(f"  chunk {i}: {len(text)} chars")
            parts.append(p)
        lst = Path(td) / "list.txt"
        lst.write_text("".join(f"file '{p}'\n" for p in parts))
        ff("-f", "concat", "-safe", "0", "-i", str(lst), "-b:a", "192k", str(out))
    print(f"wrote {out}")


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
