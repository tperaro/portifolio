---
title: Codex
subtitle: OpenAI's coding agent, available in your terminal, your IDE, the cloud and inside your pull requests.
slug: /guides/codex
date: '2026-08-18'
updatedDate: '2026-08-18'
excerpt: >-
  What OpenAI's Codex is, why it exists across four different surfaces, when
  delegating a task to the cloud pays off, and when it only produces a pull
  request nobody wants to review.
kind: tool
topics:
  - coding
  - ops
level: beginner
order: 20
readingTime: 10
pricing: freemium
vendor: OpenAI
officialUrl: 'https://openai.com/codex'
icon: braces
accentColor: '#10A37F'
tldr:
  what: >-
    An OpenAI coding agent that runs the same task in four places: your terminal,
    an IDE extension, a cloud sandbox and automatic pull request review.
  when: >-
    When you want to dispatch well-scoped tasks and go do something else —
    several in parallel — or when you want an automatic first review on every PR.
  whenNot: >-
    When the task needs back-and-forth with you at every step, or when nobody on
    the team has time to review what comes back from the cloud.
verdict: >-
  Pick Codex when your bottleneck is a queue of small tasks and PR review — not
  when the bottleneck is understanding a system alongside someone.
prerequisites:
  - A ChatGPT account (Plus, Pro, Business or Enterprise) or an API key
  - A GitHub repository, for cloud tasks and PR review
related:
  - claude-code
  - cursor
  - context-rot
faq:
  - question: Are Codex and ChatGPT the same thing?
    answer: >-
      No. ChatGPT is the conversation interface. Codex is the software
      engineering product: an agent that executes tasks in an environment with
      your code, runs commands and opens pull requests. The subscription is
      shared, the product is not.
  - question: Do I have to pay to use Codex?
    answer: >-
      The Codex CLI is free software, but the models behind it are billed. It is
      included in paid ChatGPT plans with an allowance shared across web, CLI,
      IDE and mobile, and it is also available through the API. Since April 2026
      billing is based on credits consumed in tokens rather than per message.
  - question: What is the difference between Codex and Claude Code?
    answer: >-
      The practical difference is surface area. Claude Code is essentially a
      terminal agent and shines at interactive, broad work inside the repository.
      Codex spreads across terminal, IDE, cloud and PRs, and shines at
      dispatching asynchronous tasks and reviewing code automatically.
  - question: Can Codex open pull requests on its own?
    answer: >-
      Yes. In cloud tasks it works in an isolated sandbox and returns the result
      as a PR. That is excellent for mechanical work and terrible for design
      changes, because reviewing a bad PR costs more than writing it.
  - question: Does it work on private repositories?
    answer: >-
      Yes, with the GitHub integration authorized. Have the security conversation
      first: your code leaves your infrastructure to run in OpenAI's sandbox.
seo:
  metaTitle: 'Codex (OpenAI): what it is, when to use it and when not to | Guide'
  metaDescription: >-
    A practical guide to OpenAI's Codex: the agent's four surfaces, the async
    task workflow, automatic PR review, costs, and when it is the wrong tool.
  metaTags:
    - property: keywords
      content: 'Codex, OpenAI, coding agent, Codex CLI, AI pull request review, AI programming'
      type: MetaTag
  type: Seo
type: GuideLayout
author: content/en/data/person1.json
---

The name Codex has meant three different things at OpenAI. First it was the model behind GitHub Copilot in 2021. Then it became a deprecated model. Since 2025 it is a software engineering product: an agent that carries programming tasks end to end.

The difference from a chat assistant is the same one that separates giving instructions from delegating work. You do not ask for code; you describe a task, and it comes back done — sometimes as a diff in your terminal, sometimes as a pull request opened while you were in another meeting.

## The four surfaces

This is the defining characteristic of Codex and the source of nearly all confusion about it. Same agent, four places, very different working modes.

<Flow title="Where Codex shows up" direction="row" items="CLI :: in your terminal, interactive, using your local environment | IDE :: an extension that brings the agent into the editor | Cloud :: an isolated sandbox that runs the task without you | PR review :: comments automatically on every pull request" caption="The same task changes nature with the surface: local is a conversation, cloud is delegation." />

The question that settles which one to use is not technical, it is about attention: **are you going to watch this task or not?**

If you are, use the CLI or the IDE — you correct course early and save time. If you are not, use the cloud, and accept that you will spend the time reviewing later.

## When cloud delegation pays off

Cloud tasks are seductive: you write a sentence and go to lunch. The catch is that the cost does not disappear, it moves. It leaves writing and lands in review.

<DoDont title="What to dispatch and what to keep close" doLabel="Dispatch" dontLabel="Keep close" do="Bumping dependencies and fixing what breaks | Applying the same tweak across twenty similar files | Writing tests for a module that is already stable | Clearing accumulated lint and type warnings | Translating strings or generating docs from code" dont="Deciding how a new feature will be modelled | Touching auth, billing or anything with security impact | Anything that depends on context living only in someone's head | Tasks whose tests you do not trust" />

<Callout type="warn" title="The arithmetic nobody does">
A three-hundred-line PR generated in five minutes costs forty minutes of honest review. If the team does not have those forty minutes, the PR gets rubber-stamped — and at that point the tool stopped accelerating and started hiding problems.
</Callout>

## Automatic PR review

In my experience this is the most underrated part of the product, and the one with the best value-to-risk ratio.

The agent reads the diff of every pull request and comments on what looks wrong. It neither approves nor blocks; it raises a hand. It is a first pair of eyes that is never tired and never in a hurry to leave for lunch.

<Flow direction="column" title="Where automatic review fits" items="A PR is opened :: by a person or by the agent itself | Codex reads the diff :: with the context of the touched files | Comments are posted :: the obvious and the mechanical get out of the way | A person reviews :: with energy left for what needs judgement" />

The win is not finding deep bugs — it is clearing noise before human review. Unhandled nulls, forgotten edge cases, an inverted `if`, a leftover variable. Those are exactly the comments that drain a reviewer's patience and are never the reason anyone was hired.

## The cost model changed

Until April 2026 billing was per message. Since then it is credits consumed in input and output tokens. That has one direct practical consequence.

<BarChart title="What consumes credits in a task" axisLabel="Relative weight of consumption in a typical cloud task" unit="%" max="100" items="Reading the repository :: 45 :: usually the largest item, and the easiest to shrink | Agent reasoning :: 30 | Writing the code :: 15 | Running tests and rereading output :: 10" caption="Illustrative proportions for a typical task, not a measurement of a specific repository." />

Reading context usually weighs more than writing. Pointing the task at a specific subdirectory costs less than turning the agent loose at the root of a monorepo — and, as a bonus, produces a better result, because less irrelevant context means less [context rot](/guides/context-rot).

## Codex or Claude Code?

This is the most requested comparison, and the honest answer is that they solve differently shaped problems.

<Compare title="Where each one fits best" columns="Codex | Claude Code" highlight="0" criteriaLabel="Criterion" rows="Dominant mode :: Asynchronous delegation :: Interactive work | Surfaces :: CLI, IDE, cloud and PRs :: Terminal, as the base of the workflow | Strongest at :: Parallel task queues and PR review :: Broad changes and code archaeology | Weakest at :: Review becomes the bottleneck if nobody reviews :: Needs you present to pay off | Best for :: A team with a maintenance backlog :: A person working in an unfamiliar system" />

In practice many teams run both without conflict: the interactive agent for the hard change of the day, and the cloud for the maintenance queue nobody wants to pick up.

## How to start without getting hurt

<Terminal title="First commands" lines="npm install -g @openai/codex | cd my-project | codex" caption="The CLI is free software; model usage is what draws from your allowance." />

Your first task should not matter. Pick something you could review in two minutes — clearing lint warnings, writing tests for a pure function, bumping a minor dependency. The goal is calibrating your trust, not shipping value.

Then turn on PR review before turning on cloud tasks. That order creates the least friction: automatic review only adds comments, while cloud tasks add code someone has to audit.

<Decision question="Can your team review more PRs per week than it reviews today?" yesLabel="Yes" noLabel="No" yes="Cloud tasks will pay off :: You have spare review capacity. Delegating the maintenance queue converts that capacity into delivery." no="Start with automatic review only :: It gives review time back instead of consuming it. Cloud tasks before that just grow the queue." />

The rule that sums up Codex: **it converts writing time into review time.** That is a great trade if you have reviewers, and a terrible one if you do not.
