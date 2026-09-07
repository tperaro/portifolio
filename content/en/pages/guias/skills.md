---
title: Agent Skills
subtitle: Folders of instructions that turn a general agent into a specialist — without bloating the context.
slug: /guides/skills
date: '2026-08-18'
updatedDate: '2026-08-18'
excerpt: >-
  What an Agent Skill is, how SKILL.md works, why progressive disclosure solves
  the context problem, and when a skill is the wrong choice compared to a
  prompt, a subagent or MCP.
kind: technique
topics:
  - multiagent
  - context
  - coding
level: intermediate
order: 60
readingTime: 11
pricing: free
vendor: Open standard
officialUrl: 'https://agentskills.io'
icon: layers
accentColor: '#0F7B6C'
tldr:
  what: >-
    A folder containing a SKILL.md file that teaches an agent how to perform a
    specific task — loaded only when that task comes up.
  when: >-
    When a real, repeatable procedure exists, with rules of its own, that you
    currently explain by hand every time you need it.
  whenNot: >-
    When the instruction fits in two sentences, when the knowledge changes daily,
    or when what you actually need is access to a system — that is MCP, not a skill.
verdict: >-
  Write a skill once you catch yourself explaining the same procedure for the
  third time — before that, a prompt is enough.
prerequisites:
  - An agent that supports the Agent Skills standard
  - A procedure you already perform manually today
related:
  - context-rot
  - claude-code
  - rag-vs-rag-empresarial
faq:
  - question: What is an Agent Skill?
    answer: >-
      It is a folder containing a SKILL.md file with metadata (name and
      description at minimum) and instructions that teach an agent how to perform
      a specific task. The folder can also include scripts, document templates
      and reference files.
  - question: Are Skills exclusive to Anthropic?
    answer: >-
      No. Anthropic published the format as an open standard in December 2025 and
      it was adopted across other ecosystems — Codex CLI, Gemini CLI, GitHub
      Copilot, Cursor and VS Code among dozens of compatible products.
  - question: How is a skill different from a system prompt?
    answer: >-
      A system prompt is always loaded and occupies context at all times. A skill
      lies dormant: the agent sees only its name and description, and reads the
      full content when the task matches. That lets you keep a large library
      without paying for it on every request.
  - question: How is a skill different from MCP?
    answer: >-
      A skill is knowledge — how to do something. MCP is access — the ability to
      talk to an external system. An agent that must read the CRM needs MCP. An
      agent that must know how your company qualifies a lead needs a skill.
      Often it needs both.
  - question: How many skills is too many?
    answer: >-
      The practical limit is not the count but the clarity of the descriptions.
      If two skills have similar descriptions, the agent picks the wrong one. The
      signal of excess is wrong activation, not the size of the folder.
seo:
  metaTitle: 'Agent Skills: what they are, when to use them and when not to | Guide'
  metaDescription: >-
    A practical guide to Agent Skills: how SKILL.md works, the three stages of
    progressive disclosure, how to write the description that triggers at the
    right time, and when a prompt, subagent or MCP is a better fit.
  metaTags:
    - property: keywords
      content: 'Agent Skills, SKILL.md, progressive disclosure, Anthropic, AI agents, MCP, Claude Code'
      type: MetaTag
  type: Seo
type: GuideLayout
author: content/en/data/person1.json
---

Everyone who uses an agent for a few weeks hits the same discomfort: you explain the same procedure again. How the company formats an incident report. Which fields are mandatory in a contract. What the team's commit convention is. You explain, the agent performs well, the session ends, and next week you explain it all over again.

The obvious fix is putting those instructions in the system prompt. It works — until you have thirty procedures. Then every request, including "what time is it", carries thirty irrelevant procedures, and you pay for that in quality through [context rot](/guides/context-rot).

Agent Skills exist precisely to resolve that dilemma.

> **Direct answer:** an Agent Skill is a folder containing a `SKILL.md` file that teaches an agent how to perform a specific task. The agent sees only each skill's name and description; the full content enters the context only when the task matches the description.

## Progressive disclosure: the core mechanism

The concept that makes it all work has a name: progressive disclosure. The agent loads knowledge in three stages, and each stage costs more than the previous one.

<Flow direction="column" title="The three loading stages" items="Discovery :: at startup, the agent reads only each skill's name and description. Cost: a few dozen tokens per skill. | Activation :: when a task matches a description, it reads the whole SKILL.md. Cost: hundreds or thousands of tokens, once. | Execution :: it follows the instructions and, if needed, opens reference files or runs scripts from the folder. Cost: only what was opened." />

The practical effect is that a library of fifty skills costs almost nothing when none is in use. You stop choosing between "the agent knows a lot" and "the context is clean".

<BarChart title="Why progressive disclosure matters" axisLabel="Context tokens occupied with 50 procedures available" unit="k" max="60" items="All in the system prompt :: 55 :: loaded on every request, including irrelevant ones | Skills, none activated :: 3 :: just names and descriptions | Skills, one activated :: 5 :: descriptions plus the content of the skill in use" caption="Illustrative orders of magnitude. What matters is the ratio, not the absolute value." />

## The anatomy of a SKILL.md

The format is deliberately simple: a Markdown file with a metadata header. The minimum required is a name and a description.

<Terminal title="Structure of a skill" lines="my-skill/ | my-skill/SKILL.md | my-skill/reference/report-template.md | my-skill/scripts/generate.py" caption="Only SKILL.md is required. The files beside it load on demand." />

The body is instruction in plain language: when to use it, the steps, what to verify before claiming it is done. It is not code, it is a procedure written for a competent person who has never done this task here.

### The description is the most important part

This is the lesson that costs the most to learn. The skill's content determines the **quality** of execution; the description determines **whether it runs at all**.

A vague description means the skill never activates, or activates at the wrong time. And a skill that does not activate is the same as a skill that does not exist.

<DoDont title="Writing the description" doLabel="Descriptions that trigger" dontLabel="Descriptions that fail" do="Use when the user asks for an incident report, post-mortem or RCA | Use when drafting or reviewing a services agreement | Use to qualify a new lead before handing it to sales | Name the terms people actually type, including synonyms and team slang" dont="Helps with documents | Company best practices | Useful tools for the team | Descriptions that describe the skill instead of describing the trigger" />

The practical rule: write the description around the sentence a person will type, not the name you gave the process internally.

## Skill, prompt, subagent or MCP?

Four mechanisms that get confused because they all "teach the agent something". They solve different problems.

<Compare title="Which mechanism for which problem" columns="What it is | Use when" highlight="1" criteriaLabel="Mechanism" rows="Prompt :: An instruction in the moment :: The instruction is one-off and fits in two sentences | Skill :: A reusable procedure loaded on demand :: There is a right way to do it, repeatable, with its own rules | Subagent :: A parallel session with isolated context :: The subtask requires reading a lot to conclude a little | MCP :: A connection to an external system :: The agent must read from or write to a real tool" />

The most common confusion is between skill and MCP, and the distinction is clean: **a skill is knowing, MCP is being able.** An agent with a CRM MCP can query the CRM; it still does not know how your company decides whether a lead is qualified. That knowledge is a skill.

<Decision question="Is the agent missing knowledge or access?" yesLabel="Knowledge" noLabel="Access" yes="Write a skill :: The procedure lives in someone's head and needs to become a file." no="Connect an MCP :: No instruction compensates for lacking permission to read the system." />

## Writing your first one

The best candidate is not the company's most important process. It is the one you explained most in the last two weeks.

<Flow direction="column" title="From repeated explanation to skill" items="Pick the procedure you repeat most :: if you explained it three times, it deserves to exist as a file | Write it as you would explain it to someone competent and new :: no unexplained internal jargon, no implied steps | Include the definition of done :: what must be true for the task to be complete | Write the description last :: by then you know exactly which trigger to describe | Test it using someone else's words :: if it does not activate, the problem is the description, not the content" />

<Callout type="tip" title="The test that reveals whether a skill is any good">
Ask a teammate to describe the task in their own words and see whether the skill activates. If it only fires on your phrasing, the description was written for you — not for the people who will use it.
</Callout>

## Where skills do not help

**Knowledge that changes daily.** A skill is a versioned file; if the content changes every day, it will be stale by the time it is read. That case is [RAG](/guides/rag-vs-enterprise-rag), with a live source.

**Short instructions.** If it fits in two sentences, a prompt is enough. Skills carry maintenance cost, and maintenance cost is only repaid by reuse.

**Replacing judgement.** A skill describes how to execute an existing procedure well. It does not decide whether the procedure makes sense — that remains human work.

The summary: **skills turn tacit knowledge into a reusable asset without charging context for it.** That is the difference between a company where the right procedure lives in three people's memory and one where it lives in a file every agent knows how to find.
