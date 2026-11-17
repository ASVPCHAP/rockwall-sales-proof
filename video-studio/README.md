# video-studio — long-form motivational videos for men

Open-source toolkit for 20–40 minute videos built from **one animated series per video, a steady deep voiceover, and a slow, bass-heavy instrumental bed**. It was made by studying BHATT's *"Becoming A Man God Trusts"* and the "inspire, don't copy" lesson from Danny Why's video.

---

## 1. What the reference video actually does (measured, not guessed)

Reference: **BHATT — "Becoming A Man God Trusts"** (38:47, ~275k views, 4.6% engagement, outlier score 4.8)

| Element | What BHATT does |
|---|---|
| **Visual source** | **One anime per video** (this one is all *Berserk* 1997). Its dark, lonely, warrior imagery fits the script. |
| **Cut pacing** | Slow: **~2.5–4.5 s per shot**. Lingering reaction shots, cel freeze-frames, slow push-ins (Ken Burns) on still frames. |
| **Grade / framing** | High contrast, crushed shadows, earthy reds/night blues, cinematic letterbox + vignette. |
| **Captions** | Bottom-center, phrase-by-phrase, clean bold sans with shadow, synced to each vocal chunk. |
| **Voice** | **AI TTS**: deep baritone "old mentor" voice, ~**110–120 words/min**, 0.5–1.5 s pauses between lines. Warm low end, heavy compression, dry with a faint dark reverb tail. |
| **Music** | Ambient / dark synth / neo-classical, **~60–70 BPM or beatless**, heavy sub-bass (30–60 Hz) that **swells into the pauses** (sidechain ducking under the voice). Long crossfades, no abrupt changes. |
| **Structure** | Hook in the first 30 s ("There comes a moment in every man's life…"). Then ~14 named chapters of 2–3 min each, every one a variation on the title's promise. Ends quiet and solemn ("you have become the man God trusts"), with no hard-sell CTA. |
| **Sync** | Visual matches meaning: "isolation" → lone silhouette; "inner war" → clenched jaw/eye close-up; "crown" → king imagery. **Hard cuts land on key nouns.** |
| **Script devices** | Second person ("you"), short declaratives, triplets ("discipline, rejection, loneliness"), inversions ("He doesn't promote you. He breaks you."), named stoic quotes (Marcus Aurelius, Seneca), biblical figures (Moses, David, Joseph). |
| **Monetization** | Buy Me a Coffee, Patreon, and **a Spotify podcast version of the same audio**. |

## 2. How to make it *yours*, not a copy (Danny Why's lesson)

YouTube now judges originality by title, thumbnail, script **and audience overlap**. A clone of BHATT's look/voice/topic lands on the same audience and gets suppressed. Change **at least two** of the levers below:

| Lever | BHATT | Your spin (options) |
|---|---|---|
| **Audience** | Young single men; lust, ego, spiritual warfare | **Fathers & husbands 28–50**: provider pressure, raising sons, marriage, being the steady one, legacy |
| **Visual source** | Dark seinen anime (Berserk) | **Western / classic cartoons** (one series per video), or **original AI-animated scenes** (Higgsfield, which is connected here) |
| **Voice** | Prophet / mentor baritone | e.g. **warm "big brother / coach" baritone** with a regional feel, or your own voice processed by `narrate.py --polish-only` |
| **Music** | Beatless dark ambient | **Slow trap / lo-fi boom-bap with 808 sub-bass, 70–85 BPM**: still low and heavy, but has a pulse |
| **Framing** | "The man God trusts" | e.g. "The father your kids will remember", "The man who stays", "Carry it home" |

## 3. Tools you need

### Free / open-source (installed by `setup.sh`)
| Job | Tool |
|---|---|
| Edit, cut, grade, mix, export | **ffmpeg** (scripts below automate it) |
| Download references / licensed clips | **yt-dlp** (run on *your* computer; YouTube blocks cloud servers) |
| Measure pacing (shot length) | **PySceneDetect** |
| Measure music tempo & bass | **librosa** |
| Captions + voice pacing | **faster-whisper** |
| Free voiceover | **Piper TTS** (`en_US-ryan-high` by default; other voices at huggingface.co/rhasspy/piper-voices) |
| Manual editing (optional) | **DaVinci Resolve** (free) or **Kdenlive** / **Shotcut** |
| Music production (optional) | **Cakewalk** / **LMMS** (free DAWs) |

### Paid / higher quality (optional but this is where the "BHATT sound" comes from)
| Job | Tool | Notes |
|---|---|---|
| Premium voice | **ElevenLabs** (Voice Design: describe "deep, warm, Southern-tinged baritone, measured" → unique voice) | Don't clone a real person's voice without consent. Voice Design gives you your own. |
| Music | **Epidemic Sound / Artlist** (license covers YouTube), or **Suno / Udio paid tier** (commercial rights) for custom 808 beds | Free YouTube Audio Library works too |
| Animation | **Higgsfield** (connected), Runway, Kling | Original animated scenes = no copyright risk |
| Script help | Claude | Draft chapters → you rewrite in your own words |

## 4. Copyright, read this first

BHATT uses full anime footage. That works for some channels and gets others **claim-flagged or demonetized**. Cartoon clips are copyrighted, and studios (Disney, Warner, Toei, etc.) actively Content-ID their footage. Ways to reduce risk:
* Heavy transformation: short shots, slowed, graded, letterboxed, captioned, with commentary-like narration (that's what `build.py` does). This *helps*, but it's not a guarantee of fair use.
* Prefer **public-domain cartoons** (in the US, works published in 1930 or earlier, plus some later shorts whose copyright lapsed; check each title, and note later remasters/characters may still be protected), **licensed stock animation**, or **your own AI-generated animation**.
* Check each upload's copyright status in YouTube Studio before publishing publicly.

## 5. Workflow

```bash
./setup.sh                                   # one time
```

1. **Script** a 20–30 min script (~2,600–3,600 words at 120 wpm) in a `.txt` file using the format in `scripts/example_script.txt` (one thought per line, blank line = dramatic pause, `# chapter` comments).
2. **Voice**:
   ```bash
   .venv/bin/python scripts/narrate.py my_script.txt out/vo.wav            # free Piper voice
   .venv/bin/python scripts/narrate.py my_take.wav out/vo.wav --polish-only  # your own recording / ElevenLabs export
   ```
   Tune with `--pace` (default 1.5 ≈ 120 wpm) and `--pitch` (default 0.92, deeper).
3. **Clips**: put the episodes/scenes for this video's one series in `media/clips/` (name them `01_…`, `02_…` to control order).
4. **Music**: put 1+ instrumental tracks in `media/music/` (they're joined/looped to length).
5. **Build**:
   ```bash
   .venv/bin/python scripts/build.py --clips media/clips --voice out/vo.wav --music media/music --out out/final.mp4 --captions
   ```
   Options: `--shot 3 5` (shot length range), `--slowmo 1.15`, `--music-db -14`.
6. **Check** you hit the targets:
   ```bash
   .venv/bin/python scripts/analyze.py out/final.mp4 --transcribe
   ```
   Targets: avg shot 2.5–4.5 s · 110–125 wpm · ~1 s pauses.

### Verified in testing
The full pipeline was run end to end on generated test footage. Narration came out at **123 wpm with ~1.0 s average pauses**, matching the reference. See `samples/` for a 20 s test build and a sample voiceover (placeholder fractal footage, not real clips).

## 6. Not automated yet (good next steps)
* Hard cuts timed to key words (Whisper timestamps make this possible).
* Matching shots to meaning (tag clips "lonely", "fight", "father/child" and let the script pick).
* Chapter markers in the description, auto-generated from `# chapter` lines.
