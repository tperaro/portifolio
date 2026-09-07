---
title: Claude Code
subtitle: Anthropic's coding agent that lives in the terminal and works inside your repository.
slug: /guides/claude-code
date: '2026-08-18'
updatedDate: '2026-08-18'
excerpt: >-
  What Claude Code is, how it differs from IDE autocomplete, when it pays off,
  when it gets in the way, and how to build a workflow that does not turn your
  repository into a mess.
kind: tool
topics:
  - coding
  - multiagent
level: beginner
order: 10
readingTime: 11
pricing: freemium
vendor: Anthropic
officialUrl: 'https://claude.com/product/claude-code'
icon: terminal
accentColor: '#C15F3C'
tldr:
  what: >-
    A coding agent that runs in your terminal, reads and edits your project
    files, runs commands and commits — instead of only suggesting the next line.
  when: >-
    When the task spans several files, requires understanding the whole
    repository, or is repetitive enough that you can describe it in one sentence.
  whenNot: >-
    When you cannot state the expected result, when the code is critical and
    nobody will review it, or when the change is two lines you would type faster
    yourself.
verdict: >-
  Pick Claude Code over an in-IDE assistant when the bottleneck is understanding
  and changing the whole system — not writing the next line.
prerequisites:
  - Git installed and the project under version control
  - Node.js 18+ available
  - A Claude subscription or an API key
related:
  - codex
  - cursor
  - skills
faq:
  - question: Does Claude Code replace my IDE?
    answer: >-
      No. It replaces part of the typing and navigation work, not the editor. The
      common setup is keeping the IDE open to read diffs and debug, with Claude
      Code running in a terminal beside it to carry out the change.
  - question: Is Claude Code free?
    answer: >-
      No. It is included with Claude subscriptions (Pro, Max, Team and
      Enterprise) and can also be used through the API, billed per token. Paid
      plans include generous usage, but there is no permanent free tier.
  - question: What is the difference between Claude Code and Cursor?
    answer: >-
      Cursor is an editor: the AI is built into the file-editing interface.
      Claude Code is a terminal agent: it operates the repository with the same
      tools you would use (ls, grep, git, tests). Many people run both — Cursor
      to edit, Claude Code for broad tasks.
  - question: Can it delete my code?
    answer: >-
      It can edit and remove files, yes. That is why the two non-negotiable rules
      are: always work in a version-controlled repository, and never on a branch
      you cannot throw away. On top of that, permission mode asks before
      destructive commands.
  - question: Does it work in a large monorepo?
    answer: >-
      It does, and that is where it pays off most — but it demands context
      discipline. Point the work at a subdirectory, describe what matters in a
      CLAUDE.md, and avoid asking for tasks that cut across ten packages at once.
seo:
  metaTitle: 'Claude Code: what it is, when to use it and when not to | Guide'
  metaDescription: >-
    A practical guide to Claude Code, Anthropic's terminal coding agent: how it
    works, the workflow that holds up, when it pays off and when it gets in the
    way.
  metaTags:
    - property: keywords
      content: 'Claude Code, coding agent, Anthropic, AI CLI, AI programming, CLAUDE.md, subagents'
      type: MetaTag
  type: Seo
type: GuideLayout
author: content/en/data/person1.json
---

For about three years, "AI for programming" meant essentially one thing: a smarter autocomplete. You typed, a grey suggestion appeared, you pressed Tab. Useful, but bounded by a small problem — the next line.

Claude Code starts from a different premise. Instead of suggesting text inside the editor, it operates your repository with the same tools you would use: lists files, greps, reads what it needs, edits, runs the tests, reads the error, fixes it, commits. It is the difference between an intern dictating code over your shoulder and one who sits at the keyboard.

That changes the unit of work. You stop asking "write this function" and start asking "this API returns 500 when the date field is empty; find the cause and fix it with a regression test".

## What Claude Code actually is

It is a command-line program. You install it, go to your project folder, type `claude` and describe what you want in plain language. From there it works in a loop: gathers the context it needs, proposes or performs an action, observes the result, and decides the next step — until it finishes or you interrupt.

<Terminal title="Install and first run" lines="npm install -g @anthropic-ai/claude-code | cd my-project | claude" caption="It treats the current directory as the working root — which is why the cd matters." />

The loop is the whole point. Autocomplete returns text and stops; an agent returns text, looks at what happened, and continues.

<Flow title="The agent loop" items="You state the goal :: in plain language, with a definition of done | It gathers context :: reads files, searches, learns the repo conventions | It acts :: edits files, runs commands, executes tests | It observes :: reads the output, the error, the diff | It decides :: fixes and repeats, or delivers and explains" caption="Every turn of the loop costs tokens and time. Vague goals make the loop spin without converging." />

## When Claude Code pays off

The criterion is not task size — it is the **ratio between understanding and typing**. If most of the effort is figuring out where to change something, the agent wins. If most of it is typing something you already hold in your head, you win.

<DoDont title="Where it shines and where it hurts" doLabel="Big wins" dontLabel="Poor fit" do="Changes that cut across many files, like renaming a domain concept everywhere | Archaeology: understanding a module nobody has touched in two years | Bugs with a clear reproduction — it runs the test, sees it fail, fixes, sees it pass | Mechanical, repetitive migrations such as swapping a date library | Writing the first test suite for an uncovered module" dont="Two-line changes you would type in fifteen seconds | Architecture decisions that have not been made — it will make one for you | Code without a safety net: no tests, no review, no version control | Tasks whose correct outcome you cannot describe yourself" />

One thing rarely mentioned early on: Claude Code is most valuable not when you know exactly what to do, but when you know **what must be true at the end** — "the endpoint returns 400 with a clear message when the date is invalid" — and do not know where to touch.

## The workflow that works

After a few hundred hours with tools of this kind, the pattern that holds up is always the same, and it has little to do with prompting.

<Flow direction="column" title="One task, end to end" items="New branch :: never work on main. It is your only guarantee of undoing everything. | State the definition of done :: what must pass, not what must be typed | Ask for the plan before the edits :: reviewing a ten-line plan is cheaper than reviewing a three-hundred-line diff | Let it run :: interrupt when the direction is wrong, not when the style differs from yours | Review the diff as if someone else wrote it :: because someone did | Run the tests yourself :: confirmation beats a report" />

The third step saves the most time. A wrong plan costs one sentence to correct; a wrong diff costs a full read.

### The CLAUDE.md file

Every project has conventions written down nowhere: where the tests live, which package manager is official, which folder is legacy and off-limits, which command runs the linter. Without that, the agent discovers them by trial — and sometimes discovers them wrong.

`CLAUDE.md` at the repository root is where that knowledge belongs. It is read automatically at the start of each session.

<Callout type="tip" title="What belongs in CLAUDE.md">
The commands you run constantly (tests, lint, build), the commit convention, the folders nobody should touch, and the architectural decisions already settled. What does **not** belong: a description of the folder structure, which the agent reads on its own in seconds and which goes stale with every refactor.
</Callout>

### Subagents: when splitting the work is worth it

Claude Code can delegate parts of the job to parallel sessions, each with its own context window. That solves two different problems.

<OrgChart rootLabel="Main session" root="You and the goal :: holds the plan, merges the results" nodes="Explorer :: sweeps the repo, locates the change points | Executor :: applies the change in one isolated module | Reviewer :: reads the diff with adversarial eyes" caption="Each subagent has its own context: what it read never pollutes the main session." />

The real gain is not speed — it is **context hygiene**. A search that opens forty files to find three relevant ones dumps thirty-seven irrelevant files into the conversation. Delegated, only the three conclusions come back. That is exactly the problem [context rot](/guides/context-rot) describes.

Delegate when the subtask is independent and produces a short conclusion. Do not delegate when the parts must talk to each other constantly — coordination costs more than parallelism saves.

## Where people get hurt

**Treating the agent as an oracle.** It states things with the same confidence whether it was right or guessing. Reviewing the diff is not optional; it is the step where you are still the engineer.

**Endless sessions.** Very long conversations degrade: the model starts mixing old decisions with the current goal. Finish the task, start a fresh session. It is free and it improves quality.

**Asking for everything at once.** "Refactor the whole backend" produces a diff nobody reviews and therefore nobody trusts. Three one-hour tasks beat one three-hour task.

**Forgetting the cost.** Every turn of the loop reads and writes tokens. A vague goal does not just get the result wrong — it spins the loop several times before getting it wrong.

## How it compares

<Compare title="Claude Code, Codex and Cursor day to day" columns="Claude Code | Codex | Cursor" highlight="0" criteriaLabel="Criterion" rows="Where it lives :: Terminal, inside the repo :: Terminal, IDE, cloud and PRs :: Editor (VS Code fork) | Unit of work :: A task with a definition of done :: A task, plus automatic PR review :: The open file and your selection | Best at :: Broad changes and code archaeology :: Delegating async tasks and reviewing PRs :: Interactive editing with instant feedback | Ramp-up :: Low, if you already live in the terminal :: Low :: Very low, it is an editor | Mental model :: A colleague operating the repo :: A task queue with an agent :: A pair sitting beside you editing" />

This is not winner-take-all. The common arrangement among heavy users is the editor for reading and fine-tuning, and a terminal agent for the change itself.

## A complete example

A real, tedious situation: an endpoint returns 500 when a client sends a date in an unexpected format, and nobody knows where validation should live.

The bad ask is "fix the date bug". It never says how to know you are done.

The good ask describes the end state:

<Callout type="answer" title="How to ask">
"POST /bookings returns 500 when `checkin` arrives as `31/12/2026` instead of ISO. I want a 400 with a message naming the offending field and the expected format. Find where validation should happen, follow the pattern the other endpoints already use, and add a regression test."
</Callout>

The difference is that a verifiable criterion now exists. The agent can run the test and know it is done — and so can you.

## Is it worth it for you?

<Decision question="Does your work involve changing code you did not write?" yesLabel="Yes" noLabel="No" yes="Claude Code pays off quickly :: The gain comes from navigation and comprehension, which is exactly the expensive part in that setting." no="Start with an IDE assistant :: If you write new code in a project you know well, IDE autocomplete captures most of the available gain with less setup." />

And the rule that sums it all up: **an agent in an unversioned repository is a bet, not a tool.** With git and tests, the worst case is `git checkout .`. Without them, the worst case is a bad Friday.
