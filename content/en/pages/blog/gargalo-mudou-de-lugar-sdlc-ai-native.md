---
title: 'The bottleneck moved: the AI-native SDLC in practice'
slug: the-bottleneck-moved-ai-native-sdlc
translationKey: gargalo-sdlc-ai-native
date: '2026-08-28'
excerpt: >-
  Generating code became a commodity, and the development cycle didn't just get
  faster: it changed shape. What happens to every stage of the SDLC when agents
  execute, humans decide, and half the context lives in the team's channel.
featuredImage:
  url: /images/blog/gargalo-mudou-de-lugar.webp
  altText: >-
    Two pipes of the development cycle: in the traditional SDLC the constriction
    sits at writing code; in the AI-native SDLC it moves to defining and
    reviewing
  type: ImageBlock
  width: 1200
  height: 630
  styles:
    self:
      borderRadius: medium
isFeatured: false
seo:
  metaTitle: 'The bottleneck moved: the AI-native SDLC in practice | Thiago Peraro'
  metaDescription: >-
    How the development cycle changes when agents execute and humans decide:
    spec, orchestration, continuous verification, background agents in the
    team's channel, and measuring value instead of activity.
  socialImage: /images/blog/gargalo-mudou-de-lugar.png
  metaTags:
    - property: keywords
      content: >-
        AI-native SDLC, background agents, spec-driven development, continuous
        verification, AI agents, context engineering, observability, AI-assisted
        QA
  type: Seo
colors: bg-light-fg-dark
type: PostLayout
author: content/en/data/person1.json
---

On August 27, 2026 I gave the closing segment of the **go.IAs Talks — Building with AI: the SDLC in practice** live stream, a twenty-minute talk called "The bottleneck moved." This post is the written, expanded version of it, with what didn't fit in the time slot, the source behind every number, and the answers I gave to the audience.

> **Direct answer:** writing code is no longer the most expensive stage of the development cycle. The bottleneck moved to what comes before (defining intent and specification) and to what comes after (reviewing, verifying, and proving it works). Teams that only sped up typing gained nothing; teams that redesigned the cycle around that shift gained a lot.

The line that sums up the talk is short: **generating code became a commodity.** Any decent harness writes the code today. What decides the outcome is having the spec, the context, and the acceptance criteria ready before the agent starts — and having a way to verify what it produced afterward.

## The shift already left the startups and reached big tech

New technology usually starts at small companies, and this one was no exception. What changed is that it has already left the startups and reached big tech, which is normally the last to adopt anything. Four numbers from the slide:

| Number | What it measures | Source |
|---|---|---|
| **1,300 PRs per week** | pull requests written by Stripe's internal agents, called *minions*, delivered ready for human review | Stripe Engineering, *Minions*, parts 1 and 2, Feb. 2026 |
| **1 in 9 PRs** | pull requests opened directly by background agents at Uber | The Pragmatic Engineer, *How Uber uses AI for development*, Mar. 2026 |
| **over 80%** | of code merged into production at Anthropic attributed to Claude | Anthropic Institute, Favaro and Clark, May 2026 |
| **35%** | of Cursor's internal PRs created by agents running in cloud VMs | Michael Truell, Cursor, *The third era*, Feb. 2026 |

Each of those numbers measures something different, and none of them means "agents replaced engineers." What they say together is something else: **the humans at those companies now spend more time reviewing than writing.**

The term that shows up in three of the four rows is worth explaining. A **background agent** is one that doesn't wait for your prompt: it's fired by a trigger. The server crossed 80% utilization, an alert went off, someone tagged a bot in a thread — and the agent starts working from a prompt assembled out of that event. It hasn't hit the hype cycle yet, and my bet is that it's the next evolution of coding agents.

The VM detail in Cursor's case isn't incidental either: running the agent in an isolated virtual machine keeps it away from things that matter on the developer's own machine. Autonomy without isolation is like handing production access to an intern on day one.

## The design we all learned

The traditional SDLC — the software development life cycle, from idea to maintenance — is a linear flow built on handoffs:

```
Plan → Design → Build → Test → Deploy → Maintain
```

Three properties define it:

- **Every stage has a human owner** and a cost measured in people-hours.
- **It's sequential**: the next box waits for the previous one to finish.
- **The bottleneck lives in writing.** The rest of the team is sized around that.

That last point is the one nobody notices until they stop and look. The historical ratio of one product manager to roughly eight developers didn't come from management theory: it came from the fact that writing code was expensive and slow, so it was rational to have many people writing and few people defining.

In the conversations I've been having with people at startups abroad, that ratio became **one PM per one or two devs**. That's field data, not published research — but it's consistent with everything else. If execution got cheap, value migrates to whoever defines what to execute.

## The AI-native design: stages don't disappear, they become artifacts

The AI-native design is still evolving and changes practically every day. But there's a core that's nearly consensus among people running it: **humans define and decide, agents execute in parallel.**

The stages don't go away. They stop being sequential phases with a human owner and become **versioned artifacts** that feed agents and close a loop.

### 1. Intent and planning

Understanding what you want from the software or the new feature. Still human work, and still the part people get wrong most often.

### 2. Experimentation

It got too cheap to skip. You ask the harness for an experiment with a hypothesis and it hands you one or two working prototypes. Before discussing the spec with product or with the C-level, you already have something to point at.

### 3. Spec and design

**This is where most of the time goes today, and that's how it should be.** The ratio I've seen and practiced is roughly **40 minutes of spec for 5 to 10 minutes of execution and verification** — something close to 70% of the time on the specification.

That sounds backwards until you understand why: current models follow a human-validated spec well. The gain isn't in typing fast, it's in having written down the desired behavior precisely.

And there's one line you don't cross: **validating the spec never goes to the model.** It can write the spec, suggest, criticize, find holes. A person signs it.

Spec-driven development frameworks like [GitHub Spec Kit](https://github.com/github/spec-kit) exist exactly to make the spec the central artifact — intent becomes the source of truth, and code, tests, and review criteria all derive from it.

### 4. Build and orchestration

Each task can have a different workflow, and different **models**. There's no such thing as "the company's model" anymore: there's the right model for that task.

In Claude Code, for example, you can raise the effort mode and have the agent **assemble and order a workflow of 40 or 50 agents** to execute the same spec. They identify for themselves what can run in parallel and what has to stay sequential. That speeds things up a lot.

### 5. Continuous verification

Observability isn't new. What's new is **pulling it inside the SDLC** instead of treating it as a production concern.

In practice that means three things:

- **Tests and evals are part of the spec.** Not a backlog item for later.
- **The agent keeps evidence.** Screenshots, logs, and traces become artifacts of the task, not ephemeral terminal output.
- **Adversarial review.** One agent contests another's plan or execution. You can convene a council of Claude, Gemini, and Codex precisely because each model was trained on a different corpus and arrives with a different worldview. That improves both the spec and the execution.

### 6. Deploy and gates

Deploy stays traditional. What changed is that the pipeline gained agents watching specific things: lint, code structure, architectural adherence.

One item became non-negotiable in my day-to-day: **dependency vulnerability checks inside CI/CD.** I use [Trivy](https://github.com/aquasecurity/trivy), which is open source. It assembles the **SBOM** (software bill of materials, the catalog of every dependency in your code) and cross-references it with reported vulnerabilities.

This matters more now than it did two years ago. With agents in the mix, red teams started attacking the dependency chain hard — npm took serious hits recently. And the reasoning is uncomfortable: **if we often don't review the generated code, we certainly aren't reviewing the libraries that code pulled in.** Every PR of mine runs that check, and a critical, medium, or even low severity finding blocks the merge before it reaches me.

### 7. Maintain and learn

The "learn" part is the genuinely new one. It watches **drift**: how far the software's behavior has strayed from the specified behavior.

The everyday example is familiar to everyone. You ship a feature on Tuesday. On Thursday someone vibe-coded something on top and knocked your behavior out without noticing. Nobody filed a bug because nobody noticed.

What we do is keep agents periodically verifying and running the tests. When a test breaks, they notify the Slack or Discord channel — where the team already is.

## Part 2: half of what the agent needs was never written down

This is where the talk turns. Everything above assumes context lives in the repository. But **half of what the agent needs was never written anywhere.** It lives in the heads of the people who decide: design, QA, data, product.

And those people aren't in the terminal where you code. **They're in Slack.**

### From the terminal to the channel

At Stripe, the *minions* aren't triggered from the harness. They live in Slack. Someone tags the bot in a thread and a pull request is born.

> "A typical minion run starts from a Slack message and ends in a pull request that passes CI and is ready for human review, with no interaction in between."
>
> — Alistair Gray, engineer on Stripe's productivity team, in the post where the company introduced the minions, Feb. 2026.

I talked with Alistair about this at a background agents conference. And the reason it works is the interesting part: **the agent knows everything that was discussed in that channel.** The requirements hashed out in the thread, the decisions from the call (they transcribe all their calls). By the time the engineer attacks the problem, the agent already arrives with context. Writing the spec gets much easier, and if it's a fix it goes straight to work, no spec needed, because it already has everything.

The day-to-day mechanic is simple: each mention becomes the equivalent of a Claude Code or Codex session, and the agent replies in sub-messages of the thread, like subtopics of a Reddit post. The session stopped being yours and became **shared memory of the channel**. Engineering, product, design, and QA end up operating on the same operational memory.

This pays off most if you've already built a **second brain** for the company — the map of its processes and decisions. That's what I spoke about at CEIA Open Day and wrote up in [this post on AIOS and the enterprise second brain](/blog/aios-enterprise-second-brain/). An agent that knows the organization's day-to-day and decision history behaves nothing like one that only read the repository.

### From the channel to the owner

This is the part that interests me most, and it's the talk's second bottleneck shift.

Once the agent is in the channel, it gains an ability it never had in the terminal: **mentioning the owner of a decision instead of guessing.** Needs a design call? It tags the design person. Needs a number? It tags whoever owns the data.

Compare that with the old flow. The agent couldn't decide something, so it told the dev in Claude Code; the dev opened Slack; asked; waited; went back to the terminal; resumed the session. Now the question goes straight to whoever has the authority to answer, and the answer lands in the same flow as the implementation. **The communication bottleneck between engineering and the rest of the team gets cut in half.**

The side effect is that squads get more unified, not more fragmented. Everyone operates on the same sequence, each contributing their specialty — and the glue is the agent.

One honest caveat: today this is behavior you configure, not something the agent does proactively on its own. No vendor ships an agent that goes around tagging people by itself.

### Background agents aren't hype, they're infrastructure

Two signals that this isn't a passing fashion.

First: the people driving technical decisions at the most advanced startups are already doing it.

The second is more concrete. The background agents conference where I met the Stripe folks was organized by **Ona** (formerly Gitpod), which provides exactly the cloud sandbox infrastructure for agents to run for hours without depending on anyone's machine. On June 11, 2026, [OpenAI announced it was acquiring Ona](https://openai.com/index/openai-to-acquire-ona/) to expand Codex with persistent environments.

When the company that makes the harness buys the company that makes the infrastructure for agents to run unattended, the roadmap stops being speculation.

### How to measure without fooling yourself

One thing has to be said alongside all of this: **code is not always value.**

If you measure productivity by effort, PR counts, or lines of code, agents will make those numbers climb beautifully. And you'll fool yourself. Activity grows easily when execution gets cheap.

Uber dropped effort metrics for exactly that reason:

> "If you can't draw a straight line to how many useful features you're delivering to users, that trade gets harder to justify."
>
> — Andrew Macdonald, COO at Uber, to Fortune, May 2026.

**PRs measure activity. Features measure value.** If you can't connect your output to what reached the user, it gets hard to justify your value inside the company — and harder still to justify what the agents cost.

## Part 3: Continuous Verify, from a runtime error to a regression test

For the practical section I could have gone deep on any stage of the cycle. I chose **continuous verification** because it's the least practiced one today, whether from lack of knowledge or lack of structure at companies.

### QA didn't disappear; its capability was amplified

QA always monitored code quality and produced tests, in TDD and in every other SDLC model. What recent models brought is that the agent now **also has the company's context, the Git history, and access to observability tools via MCP** — which is why it can alert and propose fixes in real time.

Many companies still wait for a user or a QA to report a bug. The more advanced teams do the opposite: they create personas, put an agent simulating those personas against the code in production, and when a warning or error fires inside the containers, **the error itself triggers the background agent.**

That agent first interprets: sometimes the error is intentional (using exceptions as alerts isn't a good practice, but it happens). When it isn't, it fires in parallel the agent that holds context on the codebase, on the meetings held about that code, and on the observability tooling. With that context it can **ask itself questions to validate hypotheses** about the cause.

And the corrected error becomes context for next time. Every validated fix teaches the system — both not to repeat the defect and not to repeat the dead-end search that led nowhere.

### The point where the human steps in

The agent correlates signals, finds the probable cause, turns the hypothesis into a test, and proposes the fix. **The human steps in for the first time after the proposal.**

They arrive and say: "I checked X, Y, and Z; it isn't X, Y, and Z, it could be these other two things." You come in at that moment, not while reading raw logs and raw observability.

And this rides along with build, test, and maintenance — not just production. If you're running an API locally and it throws an error because the agent itself got the application or the test wrong, it verifies and adjusts before deploy.

### The cycle, in six steps

```
QA action
  → alert shared in the channel (with link and context)
    → Loki / LogQL via MCP → hypothesis
      → RED test (reproduces the bug)
        → fix
          → GREEN + evidence
```

It's worth being precise here, because it's easy to confuse: **RED and GREEN are not two tests, they are two states of the same test.** You write one test that reproduces the bug and it fails — that's RED, and it proves both that the defect is real and that the test actually catches it. You apply the fix and the same test passes — that's GREEN, and that's what proves the fix works. The test then stays in the repository as a regression test, so nobody breaks again what was just repaired. The evidence of the cycle is the pair: the red output before the fix and the green one after.

### How this shows up in two real projects

**Sobrevidas** (the [oral cancer screening chatbot we deployed in Brazil's public health system](/blog/sobrevidas-project-ai-sus/)): backend logs and notifications centralized in Loki. The query language lets you filter exactly the event that explains the behavior, and an MCP tool gives the agent controlled access to that observability — so it can **look for evidence instead of guessing.**

**Count on Sheep** (where I work as AI Architect): real-time alerts go from the container straight to the shared channel. The bot doing that has no AI at all, it's a plain forward. The intelligence is in the protocol: when reporting, the human QA writes *"I was doing this action in this part of the software and got this error"* and **pastes the matching alert message** into the report.

That piece is underrated. QA action plus runtime signal, together, in the same document, is far richer context than either one alone. And since the agent has channel access, it often pulls those messages without being asked, simply because they're relevant to the bug at hand.

### The 429-at-checkout example

The scenario I used for the hands-on: a payment checkout returning **HTTP 429**, the code an API uses when it thinks you're hammering it.

QA runs the flow, sees the 429 on screen, and reports the action. At the same instant the channel receives the alert with a link to the screenshot. The agent queries Loki:

```logql
{service="checkout"} | json | status=429
```

And the history hands over the cause:

```
attempt=1 delay_ms=1000
attempt=2 delay_ms=1000
attempt=3 delay_ms=1000
```

Three attempts with a fixed one-second gap. Neither QA nor the dev knew that when the report was filed — the log knew.

The hypothesis becomes a RED test:

```python
def test_retry_uses_exponential_backoff():
    delays = capture_delays(lambda: checkout(retry=True))
    # RED: today it returns [1000, 1000, 1000]
    assert delays == [1000, 2000, 4000]
```

The fix is exponential backoff with an idempotency key, so no transaction gets duplicated. GREEN proves it:

```
RED   → 1s · 1s · 1s
GREEN → 1s · 2s · 4s · one transaction · error visible to the user
```

And the evidence bundle stays attached to the fix: `red.txt`, `diff.patch`, `green.txt`, `screenshot.png`, `trace.zip`, `logs.jsonl`.

The gain isn't that the agent fixed the bug. **The gain is that human review became trivial**: the reviewer sees the hypothesis, the failing test, the diff, and the proof that it now passes.

## Questions from the audience

These four came from the live chat and are worth as much as the talk.

### What tools belong in a CI/CD pipeline when the code is AI-generated?

GitHub has a PR review bot if you subscribe. But the one I recommend most is **Trivy**: open source, it builds the SBOM and cross-references published CVEs in your dependencies. Beyond that, the traditional stuff still applies — a bot checking architectural adherence, load tests, and the rest of the test suite before production. All of it belongs in the pipeline.

### If errors become context, doesn't that blow up the context window and degrade the agent?

Great question, and the answer is that **the whole pipeline doesn't run in one context.** Each task is delegated to different agents. A spec task doesn't look at production errors — you don't write a new-feature spec to fix a prod error, you just go fix it. The observability context simply doesn't enter there.

Knowing **when to inject which context** is a core part of the work in an AI-native SDLC. In practice it becomes a shortcut configured in the harness: a `/debug-prod` that injects exactly that context when you need it.

There are also two ways to split work, and they solve different problems:

- **Subagents**: the main context stays with a larger model, which spawns child agents as needed. Each child takes a slice, reasons over it, and returns only the result upward. It's hierarchical, and context stays **diluted** — the parent discards and compresses as it goes.
- **Agent teams**: agents talk to each other, with no vertical hierarchy, sharing context laterally.

Rule of thumb: to divide work and save context, subagents. For a very specific debug or to look at the same problem from several angles, a team — answer quality improves precisely because no single context gets clogged.

### Do you use a context manager?

Context was the most repeated word across both talks that night, so the question was inevitable.

The first level is the master markdown — `AGENTS.md`, or `CLAUDE.md` in Claude Code. It's loaded on every query, like a supplement to the harness's system prompt. **I don't put context in it: I put instructions on where to find each context.** Need yesterday's meeting decisions? Look in the second brain, a separate folder with organized context. Need external data? Use that MCP. Need to build something specific? Use that skill.

The second level is long-term memory, and there I use **hybrid search**: exact search (the model is excellent at grep, hunting literal terms) combined with semantic search over a vector store. The last 30 days of conversation history stay semantically indexed, to be found by meaning; structured company processes are found by exact term. The agent mixes both.

And one discipline that matters more than it seems: **keep context lean and current.** Storing everything feels safe, but at retrieval time you drag junk along, and retrieved junk is worse than missing context.

### I already have Slack and Datadog with alerts from my operation. How do I take advantage of background agents?

You're one step away. Between the container and Slack there's a point where you can **put a trigger that calls your agent** — running on a VPS or on your own machine. The moment the alert goes to the channel, the agent fires and runs that debug analysis.

After that, two things widen the gain considerably:

1. **Connect the Slack MCP to the harness**, so the agent can read the team's messages, not just error alerts.
2. **Store the learnings.** Every error you fixed and validated as a human produces a strategy. Accumulate those strategies in a store and expose that store to the agent as a tool.

The result is that the dev stops receiving raw alerts and starts receiving contextualized ones, already carrying a preview of the fix.

## Three things to take into Monday

1. **Write the spec first and validate it yourself.** If today you spend 5 minutes specifying and 40 correcting, invert the ratio and measure the difference.
2. **Bring the agent to where the team is.** An agent in the channel reaches context the repository doesn't hold, and asks the people who can actually answer.
3. **Close the loop with evidence.** Shared alert, hypothesis backed by observability, RED test before the fix, GREEN with proof attached. That's what turns human review into something fast instead of something expensive.

And change the metric: stop counting PRs, start counting features that reached the user.

## Conclusion

The development cycle didn't just get faster. It changed shape. The stages still exist, but they stopped being sequential phases with a human owner and became versioned artifacts that feed agents and feed the cycle back.

Teams that only sped up typing gained little. Teams that redesigned the cycle — spec as source of truth, execution parallel and cheap, continuous verification with evidence, and the agent inside the channel where decisions actually happen — changed the shape of the operation itself.

I closed the talk with the line that's still the best summary I have:

> **Your agent is only as good as the context it can reach, and only as accurate as the people it can ask.**

If your company is trying to move past isolated pilots and design a genuinely AI-native development cycle, [reach out on LinkedIn](https://www.linkedin.com/in/thiago-peraro/) or through the [contact page](/contact/).

## Sources used in the talk

- Stripe Engineering, [*Minions: one-shot, end-to-end coding agents*](https://stripe.dev), parts 1 and 2, Feb. 2026.
- How I AI (Lenny's), Steve Kaliski, Stripe, Mar. 2026; Background Agents Summit, May 2026.
- The Pragmatic Engineer, *How Uber uses AI for development*, Mar. 2026.
- Fortune, *Uber and value delivered through features*, May 2026.
- Anthropic Institute, *When AI builds itself*, Favaro and Clark, May 2026; *Introducing Claude Tag*, Jun. 2026.
- Cursor, [*The third era*](https://cursor.com/blog/third-era), Michael Truell, Feb. 2026.
- GitHub, [*Spec Kit*](https://github.com/github/spec-kit), Sep. 2025.
- OpenAI, [*OpenAI to acquire Ona*](https://openai.com/index/openai-to-acquire-ona/), Jun. 2026.
- [Grafana Loki and LogQL](https://grafana.com/docs/loki/latest/query/); Grafana Alerting.
- [Trivy](https://github.com/aquasecurity/trivy), Aqua Security.
- [Playwright Trace Viewer](https://playwright.dev/docs/trace-viewer) and screenshots.
- [OpenTelemetry](https://opentelemetry.io/): logs, metrics, and traces.
