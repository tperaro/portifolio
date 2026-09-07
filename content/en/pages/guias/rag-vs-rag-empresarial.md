---
title: RAG vs enterprise RAG
subtitle: Why the prototype that answers beautifully in one afternoon does not survive first contact with a real company.
slug: /guides/rag-vs-enterprise-rag
date: '2026-08-18'
updatedDate: '2026-08-18'
excerpt: >-
  The difference between a demo RAG and a RAG a company can actually operate:
  permissions, freshness, version conflict, evidence and evaluation. What
  changes in the architecture and where to start.
kind: concept
topics:
  - rag
  - nlp
  - ops
level: advanced
order: 70
readingTime: 14
pricing: na
vendor: null
icon: retrieval
accentColor: '#4F5FD5'
tldr:
  what: >-
    RAG is retrieving relevant passages and injecting them into the prompt.
    Enterprise RAG is the same idea plus permissions, freshness, conflict
    resolution, citable evidence and continuous evaluation.
  when: >-
    Use RAG when the answer depends on knowledge that changes and the model does
    not have. Use the enterprise version when a wrong answer has consequences.
  whenNot: >-
    Do not use RAG when the knowledge is stable and small enough to fit in the
    prompt, nor when the real problem is that the information does not exist
    anywhere.
verdict: >-
  The gap between a demo RAG and an enterprise RAG is almost never the model —
  it is governance of the content feeding retrieval.
prerequisites:
  - A working notion of embeddings and vector search
  - Understanding what a context window is
related:
  - context-rot
  - skills
  - claude-code
faq:
  - question: What is the difference between RAG and enterprise RAG?
    answer: >-
      RAG is the technical pattern: retrieve relevant passages and put them in
      the prompt. Enterprise RAG is that pattern plus what an organisation cannot
      do without — per-user access control, freshness guarantees, resolution of
      conflicting versions, source citation and continuous quality evaluation.
  - question: Why does my RAG work in the demo and fail in production?
    answer: >-
      Because the demo uses a small, clean, conflict-free corpus with questions
      chosen by the person who built it. Production brings duplicated documents,
      outdated versions, inconsistent jargon and questions nobody anticipated.
      Retrieval degrades far faster than generation.
  - question: Do I need a vector database to do RAG?
    answer: >-
      Not necessarily. For a few thousand documents, keyword search with good
      reranking is often competitive and much simpler to operate. A vector
      database becomes necessary with scale and with questions that are
      semantically distant from the original text.
  - question: How do I enforce permissions in RAG?
    answer: >-
      Filter at retrieval, never at generation. The user's permissions must enter
      the query as a filter so unauthorised passages never reach the prompt.
      Asking the model not to mention something it already received is not access
      control.
  - question: Should I use RAG or fine-tuning?
    answer: >-
      For knowledge that changes, RAG. Fine-tuning teaches form, behaviour and
      format; RAG supplies up-to-date facts. Fine-tuning a model to memorise
      internal policy is expensive and goes stale at the first policy change.
  - question: How do I know whether my RAG is good?
    answer: >-
      By measuring retrieval and generation separately. If the right passage
      never entered the context, no model saves the answer. Most problems blamed
      on the model are in fact retrieval failures.
seo:
  metaTitle: 'RAG vs enterprise RAG: what actually changes | Guide'
  metaDescription: >-
    The difference between a prototype RAG and a RAG a company operates:
    permissions at retrieval, freshness, version conflict, citable evidence and
    continuous evaluation. Architecture and rollout path.
  metaTags:
    - property: keywords
      content: 'RAG, enterprise RAG, retrieval augmented generation, vector search, reranking, knowledge governance, permissions'
      type: MetaTag
  type: Seo
type: GuideLayout
author: content/en/data/person1.json
---

There is a script that repeats itself at every company that decides to put AI on top of its own knowledge. Someone builds a RAG prototype in an afternoon, shows it in a meeting, and everyone is impressed. Six months later the system is in production answering badly, and the conversation has become "which model should we switch to".

It is almost never the model. It is that the prototype was solving an easier problem than anyone noticed at the time.

> **Direct answer:** RAG is retrieving relevant passages and injecting them into the prompt. Enterprise RAG is that same pattern plus five guarantees an organisation cannot do without: per-user permissions, content freshness, conflict resolution between versions, citable evidence, and continuous evaluation.

## The RAG everybody knows

The basic pattern has four steps and is genuinely simple. That simplicity is exactly what makes it work so well in a demo.

<Flow direction="row" title="Basic RAG" items="Index :: split documents into passages and embed them | Retrieve :: find the passages closest to the question | Inject :: paste the passages into the prompt | Generate :: the model answers from what it received" caption="Four steps, a few hours of work, impressive results on a small clean corpus." />

On a small, coherent, contradiction-free corpus, this answers very well. The problem is that no company has a corpus like that.

## What the enterprise adds to the problem

<Compare title="The same question in two worlds" columns="In the prototype | In the enterprise" highlight="1" criteriaLabel="Dimension" rows="Volume :: Dozens or hundreds of documents :: Hundreds of thousands, across different systems | Access :: Everyone sees everything :: Each person sees what their role allows | Freshness :: Static content :: Policy changes today and applies from today | Consistency :: One version of each thing :: Three versions of the same document, two of them wrong | Vocabulary :: Uniform :: Every department calls the same thing by a different name | Cost of error :: Embarrassment in a demo :: Wrong decision, fine, rework | Proof :: Not needed :: Must say where the answer came from" />

Every row in that table becomes an architectural requirement. That is why enterprise RAG is not RAG with more servers — it is a different system.

## The five guarantees

### 1. Permissions applied at retrieval

This is the one most often built wrong, and the most serious.

The tempting path is retrieving everything and instructing the model not to reveal what the person may not see. That is not access control; it is asking a probabilistic system for discretion. If the passage entered the context, it can leave in the answer.

<Flow direction="column" title="Where the filter has to sit" items="The question arrives with the user's identity :: not just the question text | The query is filtered by permission :: the index returns only what this person may see | Authorised passages go into the prompt :: the rest is never loaded | The model answers :: having never seen the restricted material" caption="Filtering after retrieval is too late. What reaches the context can reach the answer." />

In practice this means carrying permissions alongside each passage in the index and applying them as a query filter — and reindexing when permissions change, which is the part most projects forget.

### 2. Freshness with a date and an owner

An undated document is a trap. The model has no way to know which of two similar texts is current, so it picks whichever seems more relevant to the question — a criterion with no relationship to being correct.

Every indexed passage needs, at minimum: last updated date, responsible owner, status (current, revoked, draft) and scope of validity.

### 3. Conflict resolution

With validity metadata, conflict stops being luck and becomes an explicit rule: current beats revoked, specific beats generic, most recent wins ties.

<Callout type="warn" title="The failure that goes unnoticed for months">
When two versions of the same document sit in the index with nothing distinguishing them, the system gets most questions right and a minority wrong — always the same minority. Because the average looks fine, nobody investigates. It is the most expensive failure mode in enterprise RAG.
</Callout>

### 4. Citable evidence

In a corporate setting, an answer without a source is worth close to nothing for any decision that matters. Not because people distrust AI — because they need to show someone else where it came from.

Citing the source also changes system behaviour: forcing it to point at the originating passage makes hallucination far more visible to the reader.

### 5. Evaluation split by stage

"Is the RAG good?" has no useful answer. Two questions do:

<Compare title="Two measurements, two different problems" columns="What it measures | What to do if it is bad" highlight="1" criteriaLabel="Stage" rows="Retrieval :: Did the right passage enter the context? :: Improve chunking, reranking, metadata and hybrid search | Generation :: Did the answer use well what it received? :: Adjust the prompt, the citation format, the model" />

The overwhelming majority of problems blamed on the model are retrieval failures. If the right passage never entered, no model on earth gets the answer right.

## The architecture that holds up

<OrgChart rootLabel="Orchestration layer" root="Receives question and identity :: chooses the strategy and assembles the context" nodes="Hybrid retrieval :: keyword search, vector search, reranking | Governance :: permission, validity, owner, scope | Generation with evidence :: answer citing the source passage" caption="The expensive part is not the search — it is the governance deciding what may enter the search." />

The point that usually surprises people coming from the prototype: **hybrid search almost always beats pure vector search** in a corporate setting. Product names, policy codes, contract numbers and internal acronyms are retrieved better by literal matching than by semantic similarity. Combining both and reranking is the pattern that works.

## The silent enemy: too much context

There is a constant temptation in RAG: if the answer came out wrong, increase the number of retrieved passages. It feels safe — more material, more chance it is in there.

It is the opposite. Irrelevant passages compete with relevant ones for the model's attention. That is [context rot](/guides/context-rot) applied to your case.

<DoDont title="Retrieval that helps and retrieval that hurts" doLabel="Do" dontLabel="Avoid" do="Rerank by relevance before trimming the list | Prefer few right passages to many probable ones | Summarise long documents before injecting | Remove revoked versions from the index instead of living with them | Measure correct-retrieval rate separately" dont="Raising top-k so you do not miss anything | Indexing everything because storage is cheap | Keeping drafts and final versions in the same index | Trusting the model to pick the right passage out of thirty | Evaluating only the final answer" />

## Where to start

The path that works does not start with infrastructure. It starts by choosing a scope where you can measure whether it is working.

<Flow direction="column" title="Rollout in stages" items="Pick a small domain with an owner :: one department, one document set, one person who knows the right answer | Write 30 real questions with a gold standard :: collected from the people asking, not invented by the people building | Clean before indexing :: remove revoked documents, mark validity and owner. This step delivers more quality than any model swap. | Measure retrieval before optimising generation :: if the right passage does not enter, the rest is irrelevant | Only then add permissions and scale :: with governance validated at small scale" />

<Decision question="Can you say, for every document in the index, who owns it and whether it is current?" yesLabel="I can" noLabel="I cannot" yes="You are ready to scale :: Governance already exists. Now it is retrieval engineering and evaluation." no="Start here, not with the vector database :: Without owner and validity, the system will answer confidently from the wrong material — and you will have no way to know." />

The summary is uncomfortable and true: **enterprise RAG is 20% retrieval and 80% content governance.** The part that looks technical is the part that gets solved quickly. The part that decides the outcome is knowing who owns each piece of information, when it stops being valid and who may see it — and that is organisational work, not model work.
