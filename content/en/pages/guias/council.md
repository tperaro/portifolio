---
title: Model council
subtitle: How to get a second (and a third) opinion from other AIs before a high-stakes decision.
slug: /guides/model-council
date: '2026-09-19'
updatedDate: '2026-09-19'
excerpt: >-
  A council sends one model's plan to other models so they can try to break it
  before you act. This guide covers what the research showed, the formats that
  already exist, how to set one up with three or four models, and ready-to-copy
  prompts.
kind: technique
topics:
  - multiagent
  - coding
level: intermediate
order: 80
readingTime: 14
pricing: na
vendor: null
icon: agents
accentColor: '#6B3FA0'
tldr:
  what: >-
    A process in which models from other vendors receive an agent's plan or
    diagnosis and try to find what is wrong with it before the agent acts.
  when: >-
    For decisions that are hard to undo, diagnoses that rest on an unverified
    assumption, and moments when two approaches look equally good.
  whenNot: >-
    For mechanical tasks, questions the code itself answers, and line-by-line
    diff review, which has dedicated tools.
verdict: >-
  A council's value is in the disagreement: a few models from different
  origins, not knowing who wrote what, with disagreements settled by evidence,
  not by votes.
prerequisites:
  - Using at least one coding agent day to day (Claude Code, Codex or similar)
  - Access to a second model from another vendor, via CLI or API
related:
  - claude-code
  - codex
  - skills
  - context-rot
faq:
  - question: How many models does a council need?
    answer: >-
      Two to four. The biggest jump in quality happens when you go from one
      model to two different models. After that the gains drop quickly, because
      similar models make the same mistakes.
  - question: Can I use several instances of the same model?
    answer: >-
      You can, but it pays off little. Instances of the same model share the
      same blind spots. What improves results the most is mixing vendors and
      architectures.
  - question: Is it worth having the models debate over several rounds?
    answer: >-
      Usually one round, two at most. In long debates models tend to side with
      the majority and sometimes swap a right answer for a wrong one. Record
      each model's initial position before showing it the others.
  - question: Does a council replace human review?
    answer: >-
      No. It raises the odds that a mistake surfaces before you decide. The
      decision and the check of the evidence are still yours.
  - question: Can I send any context to the council?
    answer: >-
      No. The briefing leaves your machine and goes to another vendor. Strip
      secrets, tokens and customer data before sending it, every time.
seo:
  metaTitle: 'Model council: second opinions between AIs, with prompts | Guide'
  metaDescription: >-
    How to set up a council of AI models: what research says about debate and
    diversity, the formats that exist, a workflow for three or four models, and
    ready-to-copy prompts.
  metaTags:
    - property: keywords
      content: 'model council, LLM council, AI second opinion, multi-agent debate, LLM as a judge, Claude Code, Codex, review prompts'
      type: MetaTag
  type: Seo
type: GuideLayout
author: content/en/data/person1.json
---

Every model is confidently wrong from time to time. The problem isn't the mistake itself, it's the mistake reaching production with the same confidence as a correct answer. In my day-to-day work, every risky decision first goes through a "council": the plan Claude put together goes to Codex, whose only job is to try to break it. More than once that changed the final call.

This guide combines what I learned doing this with what research and the best-known tools show, for anyone who wants to set up a council with three or four models.

> **Short answer:** a council means sending one model's plan to other models, from different vendors, so they can find what's wrong before you act. It works best with two to four different models, one round of critique (two at most), anonymous responses, and someone who settles disagreements by looking at the evidence, not by counting votes.

## When to convene it

A council costs time and tokens, so it isn't for everything. I convene it when at least one of these shows up:

- **The action is hard to undo:** a database migration, deleting data, a production config change.
- **The diagnosis rests on an assumption I haven't verified.** The agent said "this looks like X", but nobody proved it's X.
- **Two approaches look equally good** and I'm about to pick one without a clear criterion.
- **I notice I'm recognizing a pattern instead of proving it.**

Outside of that, the council gets in the way. Mechanical tasks don't need a council, questions the code answers are settled by reading the code, and line-by-line diff review has its own tools.

<Decision question="Is the decision hard to undo, or does it rest on something you haven't verified?" yesLabel="Yes" noLabel="No" yes="Convene the council :: A mistake here costs more than a few minutes of review by other models." no="Go on your own :: The council doesn't pay for itself on small, reversible decisions." />

## What the research says

Over the last three years a lot has been published about models debating and judging one another. These are the findings that change how you set up a council.

### Diversity beats quantity

In ReConcile (ACL 2024), **different** models discussing at a round table beat both a single model and several copies of the same model debating. In "Replacing Judges with Juries" (2024), a panel of smaller models from different families judged better than a single large model, with less bias and at roughly one seventh of the cost. A 2026 study on agent scaling went further: two diverse agents matched or beat sixteen identical ones.

### More judges doesn't mean more votes

A 2026 study with a panel of nine frontier models showed that the panel delivered, in practice, the information of about two independent votes. The models got the same items wrong, and the group's accuracy fell 8 to 22 percentage points short of what truly independent judges would give. No aggregation method fixed it.

<BarChart title="Nine judges, two votes" axisLabel="Independent votes the panel delivers" max="10" items="On paper :: 9 | In practice :: 2 :: correlated errors" caption="Kohli, 2026, with nine frontier models on inference tasks. Adding similar models pays off little; what pays off is varying the origin." />

### Long debates can make things worse

In "Talk Isn't Always Cheap" (2025), accuracy dropped over the rounds of debate: models swapped a right answer for a wrong one to agree with their peers, even when the more capable models were the majority. That's why I run one round of critique, two at most, and record each model's initial position before showing it the others.

### Whoever wrote it shouldn't be the only judge

Models recognize and prefer their own text, even when people rate both texts as equivalent (Panickssery and colleagues, NeurIPS 2024). The model that built the plan should never be the only one to approve it.

### Anonymize before cross-review

When a model knows it's reading another model's answer, it tends to agree uncritically (and, less often, to defend its own answer out of stubbornness). Removing identity from the responses removes that bias at no performance cost ("When Identity Skews Debate", 2025). Andrej Karpathy's llm-council does exactly that: in the review stage, each model evaluates the others' answers without knowing whose they are.

### Self-critique without an external signal pays off little

Asking the same model to review its own reasoning, with nothing from outside, doesn't improve and sometimes worsens the result (Huang and colleagues, ICLR 2024). The gain shows up when an external signal comes in: a failing test, an executed command, a log, or another model.

### "Look for false premises" backfires

A 2026 paper showed that instructing a model to check premises makes it challenge both false and correct ones: 57% of challenges were unwarranted. The fix is to mark in the briefing what has already been verified and what hasn't, and to make clear that "the plan is correct" is a valid answer.

<Callout type="note" title="New evidence">
The 2023 and 2024 papers cited here are well established. The 2025 and 2026 ones are recent and still have few replications; they point in the same direction, but treat the numbers as signals, not laws.
</Callout>

## The formats that already exist

You don't need to invent the format from scratch. The three most common today:

<Compare title="Three council formats" columns="One external critic | Forced stances | Anonymous review and chair" highlight="2" criteriaLabel="Criterion" rows="How it works :: a model from another vendor receives the plan and tries to break it :: each model argues a fixed stance, for, against or neutral :: each model answers alone, then evaluates the others' anonymous answers, and a chair synthesizes | Example :: my council skill, with the Codex CLI :: the consensus tool in PAL MCP :: Karpathy's llm-council | Models :: 2 :: 2 to 4 :: 3 to 5 | Best for :: everyday use, at low cost :: forcing the opposing case on a proposal :: big decisions, with more time | Watch out :: a single outside point of view :: the synthesis rests on one model :: three stages cost more time and money" />

There is also answer fusion, such as Model Fusion, a public experiment from OpenRouter: several models answer the same prompt, an analysis step compares the outputs, and a judge model merges the best of each into one final answer.

## How to set up a council of three or four models

If you already use a main agent and have access to two more models from other vendors, this is the workflow I recommend:

<Flow direction="column" title="A council in nine steps" items="Freeze the plan in a briefing :: written before hearing any critic, so you don't anchor on their answers | Clean the briefing :: no secrets, tokens or customer data, because it leaves your machine | Send it in parallel, read-only :: the same briefing and the same answer format to every critic | A timeout counts as an abstention :: a critic that didn't answer didn't approve anything | Record each initial position :: before any critic sees another's review | Synthesize around the disagreements :: agreement gets one line, disagreement is what matters | A high risk from any critic blocks the decision :: it's a veto, not a majority | Break ties with evidence :: open the file, run the test, read the log instead of counting votes | Write down the outcome :: what changed because of the council and what stayed, with the reason" />

Three practical choices make a difference:

- **Same prompt for everyone, by default.** With the same request and the same output format, the reviews can be compared line by line. Different roles per model (security, cost, pre-mortem) are worth it as a second layer, on big plans.
- **Neutral labels.** When the reviews come back, call them Reviewer A, B and C. That applies to the model that synthesizes and to you: "model X said it" pulls the decision toward the brand, not the argument.
- **A second round only if there's real disagreement.** Send each critic the others' anonymous reviews and ask whether it keeps its position. Whoever changes has to say which argument convinced it.

With coding-agent CLIs, the fan-out is simple. Codex, for example, runs read-only and takes the briefing from standard input:

```bash
codex exec --skip-git-repo-check -s read-only -C my-project - < briefing.md
```

Other CLIs, such as Gemini's, also accept the prompt from standard input in non-interactive mode. Prefer a sandbox and never use the mode that auto-approves everything.

## Anatomy of the briefing

The briefing decides the quality of the critique. A good briefing is one or two pages long and answers, in this order:

1. **The decision at stake:** what will happen if nobody objects.
2. **The current plan, with an honest confidence level.** "Medium confidence" invites critique; "I'm sure" invites agreement.
3. **The assumptions, each one marked:** VERIFIED, with the evidence (file, test, document), or UNVERIFIED.
4. **The real constraints:** deadline, budget, what can't change.
5. **What has already been rejected and why,** so the critic doesn't propose it again.
6. **The success criteria:** how you'll know it worked.
7. **What's out of scope,** so the critique doesn't sprawl.

These never go in: secrets, tokens, customer data, and any hint of which model wrote the plan.

```text
DECISION: what will happen if nobody objects
CURRENT PLAN: ... (confidence: low / medium / high)
ASSUMPTIONS:
- [VERIFIED] ... evidence: path/to/file, test name, doc
- [UNVERIFIED] ...
CONSTRAINTS: ...
ALREADY REJECTED: option X, because ...
SUCCESS CRITERIA: ...
OUT OF SCOPE: ...
```

## Ready-to-copy prompts

The first three go into every council; the others are lenses you pick depending on the risk.

### The base: always

**Critic preamble.** Goes at the top of the briefing and sets the role.

```text
You are an adversarial reviewer on a council of AI models. Another AI produced
the plan below and will act on it unless you find real flaws. Find what is
WRONG: hidden assumptions, missed edge cases, simpler alternatives, factual
errors, risks. Do not rubber-stamp. If you cannot find a real flaw after
genuine effort, say so explicitly.
```

**Answer format.** The same for every critic, so the synthesis can compare them.

```text
Answer only in this format:
VERDICT: AGREE / AGREE-WITH-CONCERNS / DISAGREE
TOP RISKS: max 3, each a concrete failure scenario, not a generic worry
WHAT I'D DO INSTEAD: only if materially different
CONFIDENCE: low / medium / high
WHAT WOULD CHANGE MY MIND: the one piece of evidence that would flip my verdict
```

**Against flattery and against invented flaws.** It explains the why, which works better than just forbidding.

```text
Do not soften your critique to be agreeable, and do not invent a flaw to look
thorough. Being right matters more to me than being polite or looking useful.
"This plan is fine" is a valid and complete answer.
```

### The lenses: pick one or two

**Pre-mortem.** For when the plan looks too solid. The technique comes from psychologist Gary Klein: imagining it already failed unlocks critiques that "what could go wrong?" doesn't.

```text
It is three months from now. This plan was executed and it failed badly.
Write the post-mortem: what broke, in what order, and which early warning
sign we ignored.
```

**Devil's advocate.** For when the critics agree too easily.

```text
You must argue AGAINST this plan, even if parts of it seem reasonable. The
burden of proof is on the plan, not on you. List every argument a smart,
well-informed opponent would make.
```

**Steelman the rejected alternative.** For when an option was dismissed too fast.

```text
Take the rejected alternative: [X]. Argue for it in its strongest form, as if
you believed it was the better choice. Use the best evidence available, not a
weakened version.
```

**Assumption check.** Uses the markings in the briefing.

```text
For each assumption marked UNVERIFIED, say what evidence would confirm or
refute it, and whether it is safe to proceed without that evidence. Do not
contest assumptions marked VERIFIED unless you have a concrete counterexample.
```

**Security.** When the plan touches data, access or external exposure.

```text
Review this plan only for security: new attack surface, handling of
credentials and data, permission scope creep, and what a user with normal
access could now do that they could not before.
```

**Blast radius and reversibility.** For any action that's hard to undo.

```text
Rate this action's blast radius (how much it affects) and its reversibility
(how easy it is to undo) separately. A wide blast radius combined with an
irreversible action must be flagged even if the plan is otherwise correct.
```

**Simplicity.** Complements the others: it attacks complexity, not correctness.

```text
Ignore whether the plan is correct. Is there a simpler plan that meets the same
success criteria with fewer moving parts? If yes, describe it in three
sentences. If not, explain why the complexity is necessary.
```

### The synthesis

**Council chair.** Receives the reviews with neutral labels.

```text
You will receive independent reviews of the same plan, labeled Reviewer A, B
and C. Summarize: (1) where they all agree, one line each; (2) where they
DISAGREE, quoting each side; (3) which disagreement, if any, changes what
should be done; (4) one recommended next action and the evidence to check
before taking it.
```

**Anonymous cross-review.** For the second round, when there is real disagreement.

```text
Below are reviews of the same plan labeled Response A, B and C, in random
order. Evaluate them only on correctness and reasoning, ignoring length and
tone. Do not try to guess which model wrote each one. Then say whether you
keep your original verdict, and if you change it, which specific argument
changed your mind.
```

## What not to do

<DoDont title="Habits that decide whether the council helps or hurts" doLabel="Do" dontLabel="Avoid" do="Mix models from different vendors | Send the same briefing and the same format to everyone | Mark each assumption as verified or not | Make clear that agreeing is a valid answer | Record the initial position before the second round | Break ties by opening the file, the test or the log | Write down what changed because of the council" dont="Asking for a general review, with no concrete decision | Pasting the whole repository into the briefing | Revealing which model wrote the plan | Always keeping the same order of answers in cross-review | Letting the author model be the only judge | Deciding by majority when one critic flags a high risk | Convening the council for a small, reversible task" />

The sentence that sums it all up: **a council that always agrees is wasted tokens.** What it produces is well-founded disagreement, and your job is to verify it before deciding.

## Sources

- Chen and colleagues, *ReConcile: Round-Table Conference Improves Reasoning via Consensus among Diverse LLMs*, ACL 2024. [arXiv 2309.13007](https://arxiv.org/abs/2309.13007)
- Verga and colleagues, *Replacing Judges with Juries: Evaluating LLM Generations with a Panel of Diverse Models*, 2024. [arXiv 2404.18796](https://arxiv.org/abs/2404.18796)
- Yang and colleagues, *Understanding Agent Scaling in LLM-Based Multi-Agent Systems via Diversity*, 2026. [arXiv 2602.03794](https://arxiv.org/abs/2602.03794)
- Kohli, *Nine Judges, Two Effective Votes: Correlated Errors Undermine LLM Evaluation Panels*, 2026. [arXiv 2605.29800](https://arxiv.org/abs/2605.29800)
- Wynn, Satija and Hadfield, *Talk Isn't Always Cheap: Understanding Failure Modes in Multi-Agent Debate*, 2025. [arXiv 2509.05396](https://arxiv.org/abs/2509.05396)
- Panickssery, Bowman and Feng, *LLM Evaluators Recognize and Favor Their Own Generations*, NeurIPS 2024. [arXiv 2404.13076](https://arxiv.org/abs/2404.13076)
- Choi, Zhu and Li, *When Identity Skews Debate: Anonymization for Bias-Reduced Multi-Agent Reasoning*, 2025. [arXiv 2510.07517](https://arxiv.org/abs/2510.07517)
- Huang and colleagues, *Large Language Models Cannot Self-Correct Reasoning Yet*, ICLR 2024. [arXiv 2310.01798](https://arxiv.org/abs/2310.01798)
- *Two Axes of LLM Abstention: Answer Correctness and Question Answerability*, 2026. [arXiv 2607.08456](https://arxiv.org/abs/2607.08456)
- Du and colleagues, *Improving Factuality and Reasoning in Language Models through Multiagent Debate*, 2023. [arXiv 2305.14325](https://arxiv.org/abs/2305.14325)
- Andrej Karpathy, [llm-council](https://github.com/karpathy/llm-council).
- PAL MCP, [consensus tool](https://github.com/BeehiveInnovations/pal-mcp-server/blob/main/docs/tools/consensus.md).
- OpenRouter, [Model Fusion](https://openrouter.ai/fusion).
- Gary Klein, [The pre-mortem method](https://www.gary-klein.com/premortem).
