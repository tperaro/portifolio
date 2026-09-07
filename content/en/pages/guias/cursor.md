---
title: Cursor
subtitle: The editor that put AI at the centre of code editing — and became the default way to program with assistance.
slug: /guides/cursor
date: '2026-08-18'
updatedDate: '2026-08-18'
excerpt: >-
  What Cursor does that an IDE extension does not, how Composer changes the unit
  of work, how credit-based usage actually behaves, and the situations where it
  is the wrong choice.
kind: tool
topics:
  - coding
level: beginner
order: 30
readingTime: 10
pricing: freemium
vendor: Anysphere
officialUrl: 'https://cursor.com'
icon: caret
accentColor: '#6E56CF'
tldr:
  what: >-
    A code editor — a VS Code fork — where AI is not a plugin but part of how you
    edit files, navigate and refactor.
  when: >-
    When you want to keep your hands on the wheel: edit, see the diff instantly,
    adjust and move on, with the least friction between thinking and applying.
  whenNot: >-
    When your team is locked to a specific IDE, when code cannot leave the
    internal network, or when you need automation with nobody watching.
verdict: >-
  Pick Cursor when the value is editing fast with instant feedback — not when it
  is dispatching a task and coming back later.
prerequisites:
  - Familiarity with VS Code (same shortcuts and extensions)
  - A local project to open
related:
  - claude-code
  - codex
  - context-rot
faq:
  - question: Is Cursor just VS Code with ChatGPT inside?
    answer: >-
      No. It is a VS Code fork, so the base is the same, but the parts that
      matter were rewritten: project indexing, applying edits across files, its
      own autocomplete model and the Composer agent. VS Code extensions and
      shortcuts still work.
  - question: How much does Cursor cost?
    answer: >-
      There is a free plan and a ladder of paid tiers from individual to
      enterprise, with prices Anysphere has adjusted several times. The number
      that matters is not the monthly fee but the model: since 2025 usage is
      credit-based, and expensive models burn credits several times faster.
  - question: Can I use Cursor without sending code outside?
    answer: >-
      There is a privacy mode that prevents code retention, and enterprise plans
      with contractual guarantees. But processing still happens on third-party
      servers. If your policy forbids that, the answer is no.
  - question: Cursor or Claude Code?
    answer: >-
      Cursor is an editor, Claude Code is a terminal agent. Cursor wins at
      interactive editing with instant feedback; Claude Code wins at broad
      changes and at understanding an unfamiliar repository. Many people use both.
  - question: Does Composer replace autocomplete?
    answer: >-
      No, they solve different things. Autocomplete acts on the line you are
      typing; Composer acts on a set of files from an instruction. Good practice
      is switching between them based on the size of the change.
seo:
  metaTitle: 'Cursor: what it is, when to use it and when not to | Guide'
  metaDescription: >-
    A practical guide to Cursor: how the editor differs from an IDE extension,
    what Composer changes in your workflow, how credits behave and when it is
    the wrong tool.
  metaTags:
    - property: keywords
      content: 'Cursor, AI editor, Composer, VS Code with AI, AI programming, Anysphere'
      type: MetaTag
  type: Seo
type: GuideLayout
author: content/en/data/person1.json
---

Cursor solved a problem that looked like a detail and was not: where the AI lives inside the editor.

When AI is an extension, it lives in a sidebar. You talk in one place, copy, paste somewhere else, resolve the conflict by hand. Each of those steps is small, which is exactly why nobody notices how much they cost in aggregate.

Cursor is a VS Code fork where that boundary does not exist. The AI sees the indexed project, proposes edits directly in the files, and shows everything as a diff for you to accept or reject. The difference is not model capability — it is friction.

## What actually changes

Three mechanisms do nearly all the work. They are worth understanding because each suits a different size of change.

<Flow title="The three editing modes" direction="row" items="Autocomplete :: predicts the next edit, not just the next word — including elsewhere in the file | Inline edit :: select a block, describe the change, get a diff in place | Composer :: an agent that edits several files from one instruction" caption="The right choice depends on the size of the change: line, block, or set of files." />

Cursor's autocomplete is the feature that converts the most sceptics. It does not just complete what you are typing: it notices the pattern of the edit in progress and suggests the next place to change. Rename a field on line 12 and it offers the same rename on line 47.

### Composer: when the unit of work stops being the file

Composer is the agent mode. You describe the goal, it locates the relevant files, applies the changes and shows the set for review. Recent versions widened its reach considerably — refactors that used to need three or four chained runs now fit in one.

<Callout type="tip" title="The habit that improves results the most">
Before asking for a big change, open the files you know matter. What is open carries weight. A well-fed Composer errs less than a Composer that has to guess where the truth lives.
</Callout>

## Credits: what actually shows up on the bill

Since 2025 usage is measured in credits rather than number of requests. The consequence is direct: **model choice matters more than question count.** A top-tier model can burn credits several times faster than a mid-tier one for the same work.

<DoDont title="How not to burn credits without noticing" doLabel="Do" dontLabel="Avoid" do="Use the cheaper model for mechanical work and save the expensive one for the hard problem | Close irrelevant tabs before a big task — open context is billed context | Split large refactors into reviewable steps | Watch your consumption for the first week until the habit calibrates" dont="Leaving the most expensive model pinned as the default for everything | Asking for a whole-project refactor in one instruction | Keeping huge conversations alive for hours | Repeating the same request with small variations instead of fixing the request" />

## Where Cursor is not the answer

Three situations where it is the wrong tool, and it is better to know upfront:

**Restrictive data policy.** If code cannot leave the internal network, privacy mode does not solve it — processing still happens outside.

**Asynchronous work.** Cursor is built for you being there. To dispatch a task and come back later, a cloud agent like [Codex](/guides/codex) fits better.

**IDE standardisation.** In environments where the IDE is mandated by regulation or internal tooling, migrating the whole editor is a team decision, not a personal one.

## Cursor, Claude Code and Codex side by side

<Compare title="The same task in three tools" columns="Cursor | Claude Code | Codex" highlight="0" criteriaLabel="Criterion" rows="Form factor :: A full editor :: A terminal agent :: An agent across four surfaces | Best unit of work :: A block or a set of files :: A task with a definition of done :: A task dispatched and reviewed later | Presence required :: High, it is interactive :: Medium, you steer and review :: Low for cloud tasks | Adoption curve :: Very low, it is VS Code :: Low, if you live in the terminal :: Low | Where it disappoints :: Unsupervised automation :: Small interactive edits :: Teams without review capacity" />

## The workflow that works

<Flow direction="column" title="A healthy cycle in Cursor" items="Open the files that matter :: explicit context beats guessed context | Pick the mode by size of change :: line, block or set | Describe the change, not the code :: what must be true at the end | Read the diff before accepting :: accepting everything in bulk is merging without reading | Run the tests :: the IDE shows what changed, not whether it still works" />

<Decision question="Do you watch the code as it is written?" yesLabel="Yes, almost always" noLabel="No, I prefer to delegate" yes="Cursor is probably your main tool :: The gain comes from the short loop between asking, seeing the diff and adjusting." no="An asynchronous agent fits better :: Codex in the cloud or Claude Code on long tasks return more than an interactive editor." />

The summary is simple: **Cursor does not make you write code faster; it shortens the distance between deciding and applying.** For anyone who spends the day editing code they know, that is most of the available gain.
