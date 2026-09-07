---
title: Context rot
subtitle: Why filling the context window makes answers worse — and what to do about it.
slug: /guides/context-rot
date: '2026-08-18'
updatedDate: '2026-08-18'
excerpt: >-
  Context rot is the degradation of model quality as context grows. This guide
  explains why it happens, what the research showed, how to recognise the
  symptom and the five techniques that fix it in practice.
kind: concept
topics:
  - context
  - nlp
  - rag
level: intermediate
order: 50
readingTime: 12
pricing: na
vendor: null
icon: decay
accentColor: '#B4441F'
tldr:
  what: >-
    The measurable drop in LLM quality as the number of input tokens grows — even
    on simple tasks and even well inside the advertised window.
  when: >-
    Use the concept whenever you decide how much context to inject: in RAG, in
    long-running agents and in any prompt that grows over time.
  whenNot: >-
    It is not an excuse to withhold context. Too little context fails faster and
    uglier than too much.
verdict: >-
  A context window is storage capacity, not a promise of attention — treat every
  token as a quality cost, not just a line on the invoice.
prerequisites:
  - A working notion of context windows and tokens
related:
  - rag-vs-rag-empresarial
  - claude-code
  - skills
faq:
  - question: What is context rot in one sentence?
    answer: >-
      It is the degradation of an LLM's answer quality as the input context
      grows, even when the relevant content is still present and even inside the
      advertised window limit.
  - question: If the model has a 1M token window, why not use all of it?
    answer: >-
      Because the window is the physical limit, not the region where performance
      holds. In tests with very large windows, a clear effect typically appears
      well before the limit, in the hundreds of thousands of tokens. Fitting is
      not the same as working well.
  - question: Did the needle-in-a-haystack benchmark not prove long context is solved?
    answer: >-
      No. NIAH measures near-literal retrieval of a sentence inserted into a long
      text, which is the easiest possible task in that format. Real tasks require
      synthesis, disambiguation and ignoring distractors — and that is where the
      drop shows up.
  - question: Does adding context always make things worse?
    answer: >-
      No. Relevant context helps. What hurts is irrelevant, duplicated,
      contradictory or unstructured context. The goal is not to minimise tokens
      but to maximise relevance density.
  - question: How do I know I am suffering from context rot?
    answer: >-
      Typical symptoms: the model ignores an instruction that was near the start,
      blends two similar sources, answers using an outdated version of a document
      that appears twice, or gets worse right after you added more supporting
      material.
seo:
  metaTitle: 'Context rot: what it is, why it happens and how to avoid it | Guide'
  metaDescription: >-
    A guide to context rot: the degradation of LLM quality as context grows, what
    Chroma's research showed, and five practical techniques for keeping relevance
    density high.
  metaTags:
    - property: keywords
      content: 'context rot, context window, long context, context engineering, needle in a haystack, RAG, LLM'
      type: MetaTag
  type: Seo
type: GuideLayout
author: content/en/data/person1.json
---

There is a comfortable intuition about language models that nearly everyone carries at first: if the model accepts a million tokens, then stuffing more material in there can only help. Worst case, it ignores what does not matter.

That is not what happens. Past a certain point, adding context makes the answer **worse** — including context you consider useful. The name that stuck for this is *context rot*.

> **Direct answer:** context rot is the measurable drop in LLM quality as the number of input tokens grows, even on simple tasks and even with the relevant information present. The context window defines what fits, not the region where performance holds.

## What the research showed

The term emerged in public discussion in mid-2025 and gained substance with a Chroma Research report published that July, which tested 18 leading models on tasks derived from the classic *needle in a haystack*.

The uncomfortable result: performance drops as input grows, even on trivial tasks. The decline is neither linear nor uniform across models — but it is present in all of them. In models with a million-token window, a clearly observable effect typically appears well before the limit, in the hundreds of thousands.

<BarChart title="The typical shape of the curve" axisLabel="Accuracy on a fixed task as context grows" unit="%" max="100" items="8k tokens :: 95 | 32k tokens :: 90 | 128k tokens :: 78 | 400k tokens :: 62 | 900k tokens :: 48" caption="Illustrative numbers showing the shape reported in the literature, not a measurement of a specific model. Values vary by model; the shape repeats." />

### Why the classic benchmark misled so many people

Needle in a haystack inserts a specific sentence into a long text and asks for it. Models do well at this — hence the widespread impression that long context was solved.

The problem is that the task measures a narrow capability: near-literal retrieval. The research showed that moving away from that ideal condition is enough for the drop to appear.

<Compare title="Why NIAH overstates real capability" columns="In the benchmark | In your system" highlight="1" criteriaLabel="Factor" rows="Question-answer similarity :: High, nearly literal :: Low, the question uses different words | Distractors :: None or few :: Several similar, plausible passages | Material structure :: Coherent text :: Fragments from different sources, pasted together | Facts required :: One :: Several, which must be combined | Contradictions :: None :: Old and new versions of the same document" />

The four factors the research isolated all appear together in the real world. The **less** the question literally resembles the answer, the stronger the degradation as context grows. Plausible distractors make it worse. Unstructured material makes it worse.

## How it shows up day to day

Context rot rarely appears as an obvious failure. It appears as quality leaking away.

<Flow direction="column" title="The progression almost every project lives through" items="It works beautifully :: lean prompt, few documents, sharp answers | We add more sources :: coverage improves, precision starts to wobble | We raise the retrieval top-k :: to avoid missing anything, we bring in more passages | Quality drops :: and suspicion falls on the model | We switch models :: and the problem persists, because it never was the model" />

The most recognisable symptoms:

- the model ignores an instruction that was near the start of the prompt;
- it answers from an outdated version of a document that appears twice in the input;
- it blends two similar cases, attributing a detail of one to the other;
- the answer got worse right after you added more supporting material.

The last one is the most diagnostic. If adding information made the result worse, the problem is not missing information.

<Callout type="warn" title="The wrong reflex">
Faced with a bad answer, the instinct is to give more context. In an already saturated system, that accelerates the decline. The right move is the opposite: cut until you find the minimum that answers well, then grow deliberately.
</Callout>

## The five techniques that fix it

Context engineering against context rot is always the same idea under different names: **raise relevance density**, the share of the context that actually serves the question.

### 1. Retrieve better instead of retrieving more

Raising the top-k is the fix that seems to work and charges you later. Twenty passages with five relevant ones perform worse than five relevant passages. Reordering by relevance — reranking — usually beats any increase in quantity.

### 2. Compress before injecting

A whole document is rarely the right unit. Summarising each source before putting it in the prompt trades a thousand tokens of raw text for a hundred tokens of useful content.

### 3. Isolate context in subagents

When a subtask requires reading a lot of material to produce a short conclusion, delegate it. The subagent reads the forty files; only the conclusion returns to the main conversation. That is what makes [subagents in coding tools](/guides/claude-code) worthwhile, and the gain is hygiene, not speed.

<OrgChart rootLabel="Main context" root="Holds only the essentials :: goal, decisions and conclusions" nodes="Doc reader :: reads 40 pages, returns 5 lines | Code explorer :: sweeps the repo, returns 3 paths | Data analyst :: processes the table, returns the number" caption="Raw material dies in the subagent. Only the conclusion comes up." />

### 4. Load on demand

Instead of putting all knowledge in the prompt from the start, put only the index — and let the model ask for detail when it needs it. That is exactly the progressive disclosure principle behind [Agent Skills](/guides/skills).

### 5. Restart instead of stretching

A long conversation accumulates reversed decisions, abandoned paths and material that no longer applies. Finishing the task and starting a fresh session is the cheapest technique on this list, and the most ignored.

<DoDont title="Operational summary" doLabel="Do" dontLabel="Avoid" do="Measure quality with small context before growing | Rerank by relevance before increasing quantity | Summarise long sources before injecting | Delegate heavy reading to subagents | End the session when the task ends" dont="Raising top-k so you do not miss anything | Pasting whole documents because they fit | Keeping old and new versions of the same document in the input | Trusting the model to ignore the irrelevant | Blaming the model before auditing the context" />

## How to measure it in your case

You cannot manage what you do not measure, and the measurement here is simple to build.

<Flow direction="column" title="A test that fits in an afternoon" items="Write 30 questions with known answers :: from your real domain, not synthetic ones | Run with minimal context :: only the passage that answers. That is your ceiling. | Run with your current production context :: the gap to the ceiling is your loss | Run with double the context :: if it gets worse, you found the tipping point | Cut until you are back at the ceiling :: and keep that configuration as the default" />

The number that matters from this exercise is the distance between the ceiling and production. If it is large, the available gain is in context engineering — not in switching models.

<Decision question="Did adding new context improve the result last time?" yesLabel="It improved" noLabel="It got worse or stayed flat" yes="You are still in the healthy region :: Keep growing, but measure each step. The tipping point exists and arrives without warning." no="You are past the point :: Stop adding. Cut, rerank and summarise — that is where all the available gain is now." />

The sentence worth keeping: **the context window is a storage limit, not a promise of attention.** Every token you add competes with all the others for the model's attention. Context is a budget, and budgets get managed.
