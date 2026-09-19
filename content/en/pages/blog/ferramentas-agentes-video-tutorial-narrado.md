---
title: 'Narrated video tutorials without screen recording'
slug: narrated-video-tutorials-without-screen-recording
translationKey: agent-tools-narrated-tour
date: '2026-09-19'
excerpt: >-
  The skill I taught my agent to produce video tutorials for any web app:
  highlighted screenshots, locally generated voice and ffmpeg. No screen
  recording, no paying for voice, and no redoing everything when one sentence
  changes.
featuredImage:
  url: /images/blog/video-tutorial-narrado.webp
  altText: >-
    A sequence of web app screenshots, each with one highlighted area, linked
    to narration clips and assembled into a single video
  type: ImageBlock
  width: 1200
  height: 630
  styles:
    self:
      borderRadius: medium
isFeatured: false
seo:
  metaTitle: 'Narrated video tutorials without screen recording | Thiago Peraro'
  metaDescription: >-
    How to generate narrated video tutorials of a web app with an AI agent:
    highlighted screenshots with Playwright, local TTS narration (Kokoro or
    piper) and assembly with ffmpeg, fully offline with no per-minute cost.
  socialImage: /images/blog/video-tutorial-narrado.png
  metaTags:
    - property: keywords
      content: >-
        video tutorial, product tour, Playwright, local TTS, Kokoro, piper,
        ffmpeg, Claude Code, skills, AI agents, onboarding
  type: Seo
colors: bg-light-fg-dark
type: PostLayout
author: content/en/data/person1.json
---

This is the first post in a series about the tools I built for my AI agents. Each one solves a small, concrete problem that kept showing up every week in my work. The first is the one that gets the biggest reaction when I show it: a narrated video tutorial of a web app, produced entirely by the agent, with nobody recording the screen.

> **Short answer:** the video is not a screen recording. It is a sequence of screenshots of the real app, one per narration clip, with the area being explained highlighted. Each image stays on screen for exactly as long as its audio, so the narration never drifts out of sync. Capture with Playwright, voice with local TTS and assembly with ffmpeg: it runs offline, costs nothing per minute, and changing one sentence redoes only one clip.

## Where the idea came from

I saw some very polished video tutorials for a referral platform and asked how they had been made. The answer surprised me: there was no screen recording at all. They were screenshots of the real app, one per sentence, with a highlight on the part being explained, assembled programmatically with the narration.

I asked my agent to learn the technique and turn it into a reusable Claude Code skill. Along the way I swapped the part that cost money (the voice) for models that run on my own machine, and hardened the assembly against the failures that showed up in the first tests. In under an hour I had a 38-second test video and, the same day, a 30-second teaser of the internal platform we're building at the company.

## Why not record the screen

Anyone who has recorded a tutorial knows where it hurts:

- **The narration drifts out of sync.** You speak a bit slower in one part, the mouse gets there before the sentence, and the whole video has to be recorded again.
- **The highlight gets blurry.** Zooms and animated arrows on top of compressed footage lose sharpness exactly where you want to draw attention.
- **Any change means starting over.** A button moved or one word in the script changed, and there goes the afternoon.

With one screenshot per clip, all three problems go away. The image is static and sharp, the highlight is drawn on it before the capture, and the duration comes from the audio itself: if the sentence is 6.2 seconds long, the image stays on screen for 6.2 seconds, plus a short pause so the cut doesn't swallow the last syllable.

## How it works

The pipeline has four stages, and only the first one is human work:

| Stage | What happens | Tool |
|---|---|---|
| **Script** | a markdown file with one clip per section of the screen | a text editor (or the agent itself) |
| **Capture** | opens each page, scrolls to the element, dims the rest, draws a border around it and takes a 1920×1080 screenshot | Playwright with headless Chromium |
| **Narration** | turns the text of each clip into an MP3 | Kokoro on the GPU, or piper on the CPU |
| **Assembly** | pairs each image with its audio and concatenates everything into a web-ready MP4 | ffmpeg |

The highlight is simple on purpose: four dark rectangles around the element and a glowing border on top, all injected into the page only for the capture and removed right after. No video editing involved.

## The script is the only thing you write

Each clip is a section of the markdown file. The heading says which clip it is, which page it happens on and which element should be highlighted; the body is what the voice will say:

```markdown
## 02 | /dashboard | [data-testid="stats"]
At the top you see your referrals: how many people you referred, how many became clients, and how much you have earned so far.
```

A dash instead of a selector shows the whole page, with no highlight. The agent can write the first draft of the script on its own, reading the app's DOM to find the selectors; my job is to review the text.

The rule that improves the result the most is **write for the ear, not for the eye**:

- one or two sentences per clip: what that part does and why it matters;
- short sentences, no symbols, numbers spelled out;
- no "click here and then there": the image already shows where it is.

As a reference, an end-user tour ends up with 12 to 15 clips (about 2 minutes); a full admin tour, with 30 to 40 (about 5 minutes).

## Local narration, no paying for voice

The most expensive part of this kind of video is usually the voice. I use two options that run on my machine:

| Engine | Quality | When to use it |
|---|---|---|
| **Kokoro** | natural, the better of the two | when there's a GPU; it runs in a container and has English and Brazilian Portuguese voices |
| **piper** | more robotic | when there's no GPU or Docker; zero setup |

Both produce one MP3 per clip. If I edit a sentence, I delete only that clip's files and run it again: every other clip is reused. The language follows the video's audience, not mine: the company's admin tours, for example, come out in English.

## The details that each cost a debugging cycle

These are written into the skill itself, so the agent doesn't trip over them again:

- **Explicit duration instead of "stop when the audio ends".** The ffmpeg option that is supposed to cut the video when the audio ends hangs forever when the image is looped. The skill computes each clip's duration and passes the exact value.
- **ffmpeg reads standard input without asking.** Inside a loop that reads the list of clips, it swallows the following lines and the loop stops after the first clip. Reading from standard input has to be turned off.
- **Absolute paths in the concatenation.** The file list is resolved relative to the list's own folder, not the folder where you ran the command.
- **Each clip is written atomically.** If the assembly is interrupted, running it again picks up where it stopped, with no half-written file.
- **Apps behind a login.** A special mode opens a visible browser, waits for you to log in once and saves the session for the following captures. That session file never leaves the working folder.

The compression was also picked for this case: since each clip is a still image, the encoder is tuned for static content, and the final video is small and starts playing in the browser before it finishes downloading.

## How I use it day to day

The request to the agent is one sentence: "make a two-minute narrated tour of the referrals screen". From there it starts the app with demo data (an empty screen makes a useless tutorial), writes the script, captures, narrates, assembles and checks its own output: the video's duration has to match the sum of the audio clips, and it extracts a frame from the middle to confirm the highlight landed in the right place.

What I do is review the script and watch the result. When something changes in the app, redoing the video takes minutes, not an afternoon.

## Conclusion

The lesson applies to other tools too: a lot of what seems to require expensive software is, underneath, a composition of open pieces. Here it was an automated browser, a local voice model and ffmpeg, organized as a skill the agent knows how to use.

In the next post in the series, I cover the voice tools: how the agent explains things to me in audio when I'm away from the screen, and how I dictate to it, both offline.

If you want video tutorials for your product, or want to build skills like this one for your team, [reach out on LinkedIn](https://www.linkedin.com/in/thiago-peraro/) or through the [contact page](/contact/).
