---
title: 'The receipt for one conversation: harness engineering for AI startups'
slug: the-receipt-for-one-conversation-harness-engineering
translationKey: pria-day3-harness-engineering
date: '2026-11-03'
excerpt: >-
  What I brought to 30 AI startups at PRIA, inside Bradesco's innovation hub:
  what each conversation with an agent costs, where to cut, the state machine
  that builds the prompt, and the mistakes I made at Clivia.
featuredImage:
  url: /images/blog/nota-fiscal-conversa-en.webp
  altText: >-
    Receipt for one AI agent conversation: the total of R$ 4.63 is struck
    through and replaced by R$ 1.32 after fixing the harness
  type: ImageBlock
  width: 1200
  height: 630
  styles:
    self:
      borderRadius: medium
isFeatured: false
seo:
  metaTitle: 'The receipt for one conversation: harness engineering | Thiago Peraro'
  metaDescription: >-
    What each AI agent conversation costs and where to cut: prompt caching, entry
    and exit orchestrators, state machines, deterministic code, LangGraph in
    production, the dev workbench, and CI/CD security.
  socialImage: /images/blog/nota-fiscal-conversa-en.png
  metaTags:
    - property: keywords
      content: >-
        harness engineering, AI agents, LLM cost, prompt caching, context
        engineering, LangGraph, state machine, multi-agent, AI-native SDLC, CI/CD
        security, PRIA, inovabra
  type: Seo
colors: bg-light-fg-dark
type: PostLayout
author: content/en/data/person1.json
---

What a room to speak in: 30 AI startups inside Bradesco's innovation hub.

On October 16, 2026, I flew from Goiânia to São Paulo to mentor them at inovabra habitat, the hub of Brazil's second-largest private bank. It was part of PRIA, inovabra's AI Residency Program, run with two research centers at the Federal University of Goiás (UFG): CEIA, its AI Center of Excellence, with 300+ R&D projects delivered to companies and the team behind Brazil's first bachelor's degree in AI, and AKCIT, a federally funded competence center for immersive tech and AI. Google and NVIDIA are on board too. There are six in-person immersions, and this one, the third, was entirely about harness engineering.

![Mentors and participants at PRIA Day 3 with their hands up in front of the screen at inovabra habitat](/images/blog/pria-day3-turma.webp)

This post is the written version of what I brought to the room, with what didn't fit in the time and the source of every number.

> **Short answer:** the harness is everything you build around the model so AI works in the business. In a conversational agent, most of the bill comes from input, because every call rereads the prompt, the tools and the history. So the biggest cuts come from the order of the prompt, from how many times the history gets read, and from what leaves the model and moves into deterministic code. In an example I built, that takes one WhatsApp scheduling conversation from R$ 4.63 (~US$ 0.93) to R$ 1.32 (~US$ 0.26).

## There are two harnesses

LangChain summed up the term in one line: *"If you're not the model, you're the harness."* The model alone doesn't solve anything. What makes AI work is what sits around it: the tools it can reach, the knowledge it has, the context that goes into each call, and what it can do without asking.

The first thing I brought was the difference between two harnesses that tend to get mixed up:

| | The dev workbench | The product harness |
|---|---|---|
| **What it is** | the agent that writes your code, in an AI-native SDLC | the agent that serves your customer |
| **Made of** | map, spec, sensors, permissions, skills and parallelism | prompt, tools, context and cost per conversation |
| **What it decides** | your team's speed | your margin |

If you're the only developer at your startup, both of them are you. That's why the rules belong in a file, not in your head.

Most of this post is about the second one, because that's where I made the most mistakes. The first one comes back near the end, along with the SDLC and security.

## I know what these startups are going through

In 2024 I founded Clivia, a WhatsApp AI agent for clinics. Knowledge in AI goes stale in three months, yet the mistakes I made back then are still news to almost everyone in the field. Most of what I taught came from there.

Two warnings before the numbers. Clivia's come from a single case: I measured prompt sizes in the code, but I didn't measure tokens before and after, so what I have is an estimate and a formula. The receipt below comes from a fictional scheduling agent I built for the day, with its assumptions in the open. It's a model, not a measurement, and what matters is the proportion between the lines.

## The receipt for one conversation

On the price list, output costs five times as much as input: Sonnet 5.5 charges US$ 2 per million input tokens and US$ 10 per million output tokens. That's why everyone tries to shorten the answers. But in a multi-turn agent, every call rereads the prompt, the tools and the full history. In my example, 90% of the cost of a 20-turn conversation is input, and Manus reports a 100-to-1 ratio between input and output in its agents.

Seen as a receipt, with a supervisor that reads everything twice and 60 model calls, that conversation looks like this:

| Line | Why it costs | Amount |
|---|---|---|
| System prompt | reread on all 60 calls | R$ 1.44 |
| Conversation history | reread 3 times per turn | R$ 1.06 |
| Tool definitions | sent with every call | R$ 0.96 |
| WhatsApp | 20 service messages | R$ 0.70 |
| Model output | 5× per token | R$ 0.38 |
| RAG chunks | 6 turns with questions | R$ 0.08 |
| **Total** | | **R$ 4.63** |

*Assumptions: Sonnet 5.5, a 2,400-token system prompt, 1,600 tokens of tools, 180 more tokens of history per turn, a reference rate of R$ 5.00 to US$ 1, and prices from October 12, 2026. Values are rounded.*

Output, the expensive line on the price list, is one of the smallest on the receipt.

Before cutting anything, measure. The metric that matters is **cost per resolved conversation**: everything the agent spent, divided by the conversations that ended in the outcome you wanted. There are two traps. The OpenTelemetry GenAI conventions record tokens, but have no cost attribute. And LangSmith only adds up per conversation if you send a `thread_id`. For a team of one or two developers, the shortcut is to export the traces and ask your coding agent to group the cost by line.

If you're a non-technical founder, the question for your developer is "what does a resolved conversation cost?", not "how much did we spend this month?".

## Six cuts, line by line

### 1. Prompt order is money

The provider stores the beginning of the prompt and charges less to reread it. At Anthropic, reading from cache costs 0.05× the input price, and writing costs 1.25×, valid for 5 minutes. But the cache only applies to an identical prefix, and it reads in this order: tools, system, messages. The rule fits in one line: **fixed parts on top, whatever changes below.**

This was my mistake. At Clivia, the context of each customer's procedure sat at the top of the system prompt. That block changes from one conversation to the next, so the prefix never repeated and the cache was lost on every call. The right side below is what I'd do today; in Clivia's code, the block stayed on top.

```
What I did                          What I'd do today
----------------------------        --------------------------------
1. procedure context                1. identity, tone and rules
2. identity, tone and rules         2. fixed tools and policies
3. current stage instructions       3. procedure context
                                    4. current stage instructions

the prefix never repeats            the fixed top becomes cache
```

Manus calls the cache hit rate *"the single most important metric for a production-stage AI agent"*. And six things bring that rate down without anyone noticing:

- **A timestamp at the top:** "today is Oct 16, 2:02 pm" at the start of the prompt turns each call into a new prefix.
- **Tools out of order:** the list changes order between calls and the prefix no longer matches.
- **JSON without a stable order:** the same data with its keys in another order is different text.
- **Switching models:** the cache is per model. Switch mid-conversation and you start from zero.
- **A prefix that's too short:** below 512 tokens, on Anthropic's 5.x models, there's no cache.
- **A slow conversation:** the patient replies after 10 minutes and the 5-minute cache has expired. A 1-hour option exists, but writing costs 2×.

To test yours, log `cache_read_input_tokens` per call. If it stays near zero, one of these six is happening.

### 2. The supervisor that reads everything twice

In the most common multi-agent design, the supervisor receives the message, picks a worker, the worker answers back, and the supervisor writes to the user. To write, it rereads the whole history. And the worker, in this pattern, also receives the history. That's three reads per turn, which is where the R$ 1.06 line comes from. LangChain measured this in a benchmark: *"The supervisor architecture consistently uses more tokens than swarm"*, because the sub-agents can't answer the user directly.

At Clivia I split the supervisor into two nodes. The entry node reads the history and only picks the route. The exit node writes the answer without the history, using just the patient's message and what the worker brought back. The scheduling worker sees only the last 2 messages. And no edge goes back, so the history comes in once per turn.

```
patient message
  |
ENTRY: reads the history and only picks the route
  |
  +-- scheduling worker (sees only 2 messages) --+
  +-- information worker ------------------------+
  |                                              |
  |                        EXIT: writes without the history
  |                                              |
  +-- direct answer -----------------------------+
                                                 |
                                     send, then stage evaluator
```

How much does that save? With the prompts measured in the code (453 tokens for routing, 272 for synthesis and 725 for the single supervisor), the formula gives 38% to 48%, depending on the size of the history. That's savings on the orchestrator's input, not on the whole bill, because the workers cost the same in both designs. The number approaches 50% as the history dominates, but never gets there. If someone says "it cuts 50%", ask which line. LangChain arrived at the same idea by taking the supervisor out of the answer path, with about a 50% performance gain in its benchmark.

This design has three limits:

- **The synthesis doesn't see the history.** If the patient was curt three messages ago, the answer may come out too cheerful. At Clivia, the per-stage instructions made up for part of that.
- **There are more calls.** The split went from 2 to 3 calls per turn. More calls, fewer tokens.
- **It needs control.** It only works if the framework lets you choose what goes into each node.

### 3. The cheapest call is the one that doesn't happen

Build every step you can in deterministic code. Bryan de Oliveira opened the day with the right question: swap "which LLM?" for "which decision, and which mechanism?". Exact rules go into code. In his invoice negotiation example, the code calculates the discount ceiling and the model only communicates it.

At Clivia, that became four things:

- **First contact by template:** the first message doesn't go through the LLM.
- **5 follow-ups by template:** a reminder is fixed text with variables.
- **A 7-second debounce:** the patient sends 4 chopped messages and the agent makes 1 call.
- **A stage evaluator that skips the LLM:** at stage 5 and from stage 1 to 2, the code decides.

List the 5 messages your agent sends most, and see how many could be templates.

### 4. The big model only where it thinks

Routing and classifying don't need the mid-size model. Haiku 5.5 costs 20× less per input token than Sonnet 5.5 (US$ 0.10 against US$ 2 per million, on October 12, 2026). Even so, compare cost per task rather than price per token: prices have fine print, and each model counts tokens its own way.

There's a whole literature of routers that pick a model per question. FrugalGPT (2023) and RouteLLM (2024) promised savings of up to 98% and 85%, with other models and other prices. In 2026, LLMRouterBench showed that several routers, commercial ones included, don't reliably beat a simple baseline.

The recommendation is more boring and cheaper: **one fixed model per graph node**, with routing on the small model and the worker and synthesis on the mid-size one. I didn't do that at Clivia, where LiteLLM only handled key failover. Today I'd do it per node.

### 5. Tools are tokens too

Every tool definition goes into the prompt on every call. Three techniques have public numbers from Anthropic: searching for tools on demand cut tokens by 85%, calling MCP through code execution took one flow from 150,000 to 2,000 tokens, and clearing old tool results cut 84%.

At Clivia, RAG brings only 3 chunks and there are at most 3 tool iterations per turn. And according to Anthropic itself, a multi-agent system spends about 15× the tokens of a chat. Multi-agent buys quality with tokens, so use it when the task pays for it.

### 6. What isn't real time pays half

Anthropic, OpenAI and Google have batch modes, and OpenAI and Google also have Flex: the same call, with a slower answer, at half the price. It's no use for a patient waiting on WhatsApp. It works for nightly evals, each patient's daily summary for the doctor, and classifying the week's leads.

## The same receipt, after the cuts

| Line | What cut it | Before | After |
|---|---|---|---|
| System prompt | cache and per-stage prompt | R$ 1.44 | R$ 0.06 |
| Conversation history | entry and exit orchestrators | R$ 1.06 | R$ 0.15 |
| Tool definitions | cache, and only the worker receives them | R$ 0.96 | R$ 0.03 |
| WhatsApp | the harness can't cut it | R$ 0.70 | R$ 0.70 |
| Model output | template on turn 1 and a small model | R$ 0.38 | R$ 0.33 |
| RAG chunks | only the worker reads them | R$ 0.08 | R$ 0.04 |
| **Total** | | **R$ 4.63** | **R$ 1.32** |

The model's share falls 84%, from R$ 3.93 to R$ 0.62. The math has one stated simplification: it ignores rewriting the cache at each stage change and expiry in slow conversations.

Now the biggest line is WhatsApp, which the harness can't cut. Since October 1, 2026, Meta charges for service messages in Brazil after the first 1,000 per month, per number, at R$ 0.035 each. With 10,000 conversations of 8 messages, that's R$ 2,765 a month (~US$ 553). That line has to go into your pricing.

If you're doing this on Monday, here's the order:

| When | What to do |
|---|---|
| **First** | measure the cost per resolved conversation |
| **In an hour** | prompt order for caching, an output token limit, templates where the answer is fixed |
| **In a day** | a small model on the router, batch for what isn't real time, slimmer tools and RAG |
| **In a week** | entry and exit orchestrators, per-stage prompts |

## The prompt follows the user's stage

Of everything that went right at Clivia, this is what I recommend most: trace your user's journey and build a state machine, so the prompt depends on where the user is. Almost every product has 4 or 5 stages, and your customer's stage probably already exists in your CRM.

Clivia had five. The prompt didn't carry the instructions for all of them: they came from a database table, indexed by stage and agent, and only the current stage's instruction went in, at the end of the prompt.

```
stage | agent     | stage instruction     | next
  1   | routing   | (template, no LLM)    |  2
  2   | routing   | qualify the complaint |  3
  3   | synthesis | present the doctor    |  4
  4   | synthesis | answer objections     |  5
  5   | scheduler | offer time slots      |  -
```

*The row contents are illustrative. The structure is real.*

The routing prompt went from 3,579 to 1,810 characters, 49% smaller. That measures prompt size, in a single case, not cost. The greeting also disappears once the patient has a history or a stage on record.

The transition rules are what make this design trustworthy:

- **From stage 1 to 2, the code decides:** it only advances with a name and a procedure saved.
- **From stage 2 on, an evaluator decides.** It runs after sending, reads up to 4 question-and-answer pairs and is conservative: when in doubt, it doesn't advance.
- **Stages never go backward**, and at stage 5 the evaluator doesn't even call the LLM.
- **The stage lives in the database**, not in the history. That's why it survives any context cut.

The same mechanism works as a guardrail. During qualification, the agent can be barred from discussing price; during scheduling, from discussing diagnoses. And it's worth drawing both of your agent's paths: the path of one message, which is the graph, and the path of one customer over several days, which is the stage machine.

## Why LangGraph, even with more lines

At Clivia I went through n8n, CrewAI and LangGraph. The CrewAI version was hierarchical: an LLM manager decided the path and passed everything to everyone. I couldn't really see what each agent received, I didn't control the path, and debugging was guesswork. In the LangGraph version, the flow is an explicit graph:

```python
workflow.add_edge(START, SUPERVISOR_ROUTING_NODE)
workflow.add_conditional_edges(SUPERVISOR_ROUTING_NODE, RouteSelector(), {
    SCHEDULER_NODE: SCHEDULER_NODE,
    INFORMATION_NODE: INFORMATION_NODE,
    FINALIZE_NODE: FINALIZE_NODE,
})
workflow.add_edge(SCHEDULER_NODE, SUPERVISOR_SYNTHESIS_NODE)
workflow.add_edge(INFORMATION_NODE, SUPERVISOR_SYNTHESIS_NODE)
workflow.add_edge(SUPERVISOR_SYNTHESIS_NODE, FINALIZE_NODE)
workflow.add_edge(FINALIZE_NODE, FASE_EVALUATOR_NODE)
workflow.add_edge(FASE_EVALUATOR_NODE, END)
```

Every edge is in the code, and none goes back. It took longer to build and it's more verbose, but that control paid off in money and sleep. In production, reliability and the ability to debug matter more than writing fewer lines.

Harrison Chase, who created LangChain, said the same thing plainly: *"Any framework that makes it harder to control exactly what is being passed to the LLM is just getting in your way."* When choosing, ask three questions. Can I see the prompt? Do I control the flow? Does my coding agent know this framework, given that it will write most of the code? If any answer is no, a plain Python loop will do.

## The context diet: when context goes wrong

Cost is only one of the symptoms. In the afternoon, I opened the hands-on part with what I called the context diet. Drew Breunig named four failures of long contexts, and LangChain organized the remedies into four verbs. The examples below come from the same fictional agent:

| Failure | What happens | Example |
|---|---|---|
| **Poisoning** | an error enters the context and becomes truth | it records the wrong insurance plan on turn 3 and repeats it to the end |
| **Distraction** | the model leans on the history instead of thinking | after 40 messages, it answers the old question |
| **Confusion** | irrelevant information pulls the answer off course | with 30 tools, it calls the lab test one for a scheduling question |
| **Clash** | parts of the context contradict each other | the prompt says a 30-minute visit and RAG brings the old 45-minute table |

| Verb | What it does | At Clivia |
|---|---|---|
| **Write** | keeps what must survive outside the window | the patient's stage lives in the database |
| **Select** | brings only what the task asks for | only the current stage's instruction, and RAG with 3 chunks |
| **Compress** | shrinks what's already past | the scheduling agent sees only 2 messages |
| **Isolate** | gives each part its own context | the synthesis writes without reading the history |

## The other harness: the workbench in an AI-native SDLC

Now the agent that writes your code. In the traditional SDLC, each stage has a human owner and waits for the previous one, and the bottleneck lives in writing. In an AI-native SDLC the stages don't disappear: they become versioned artifacts that feed the agents, humans decide and agents execute. I covered that shift in detail in [The bottleneck moved](/blog/the-bottleneck-moved-ai-native-sdlc/).

This isn't theory anymore. Mercado Libre told US regulators in a filing that *"human-written code has become the exception"*, Stripe reports 1,300 PRs a week written by agents, and QuintoAndar says 80% of its code is made with AI assistance, which means assistance, not authorship. And the harness changes results with the same model: LangChain went from 52.8% to 66.5% on Terminal Bench 2.0 by changing only that.

The question is no longer "can the agent write code?". It's how you set up its workbench. I prepared that in six layers:

| Layer | The idea | In practice |
|---|---|---|
| **1. Map** | AGENTS.md is a map, not a manual | commands, where things are and what's forbidden. A bloated file costs about 20% more with no gain in success (ETH Zurich). The test for each line: if I delete it, will the agent start making mistakes? |
| **2. Spec** | the size of the task | new features and sensitive rules need a spec; a bugfix with a test doesn't. If reviewing the spec takes longer than reviewing the code, it's too big |
| **3. Sensors** | instructions are advice, hooks are law | lint, tests and typecheck always run, without the agent deciding. If you can't verify it, don't ship it |
| **4. Permissions** | allow, ask, block | tests and reading are allowed; push and deploy ask; secrets and real data are blocked. People approve 93% of requests, so asking about everything turns into fatigue (Anthropic) |
| **5. Skills** | context on demand | the agent sees only the index, and the content comes in when the task calls for it |
| **6. Parallel** | clean context | one agent per worktree. A subagent reads 40 files and returns 10 lines. Parallelize only what you can review |

The order matters. Map, sensors and permissions come first because they protect you. Spec, skills and parallelism come later because they speed you up.

## Security in the pipeline

The guardrail starts before production: a rule becomes a step. The agent's PR goes through tests, through an eval with hard cases written by the people who serve customers, through human review, and only then to production. Every change to a prompt, model, tool or policy runs it all again, and every failure becomes a test case.

Three tools I showed in the browser fit along that path:

- **[Trivy](https://github.com/aquasecurity/trivy) in CI/CD:** catches CVEs in the pipeline.
- **[pip-audit](https://github.com/pypa/pip-audit) in a hook:** another dependency audit, after a commit or a PR, or as a CI step after the PR.
- **[deepteam](https://github.com/confident-ai/deepteam) on every model swap or medium-to-large prompt change:** red team tests on the agent itself. On a budget, every 15 days.

Your coding agent is a target too. Simon Willison named the lethal trifecta: reading outside content, seeing secrets, and being able to act externally. A public issue with a hidden instruction can ask the agent to read `.env` and paste it into a comment. Meta turned that into a rule, with at most two of the three in the same session. And the simplest defense is physical: credentials that never enter the sandbox can't leak.

In healthcare and finance, outside regulation becomes a step as well. Brazil's medical council resolution 2,454/2026, in force since August, treats AI as support and leaves responsibility with the doctor. Under Brazil's data protection law (LGPD), health data is sensitive and can't rely on legitimate interest as a legal basis.

## What I learned in the room

When I asked about subagents, I saw I needed to step back. On the spot, I pulled a slide from an older talk with the six best-known multi-agent architectures (single agent, network, supervisor, supervisor with tools, hierarchical and custom) and started from the basics.

That was a lesson for me about how to teach this. The harness is the tip of an agentic system, and it's hard to grasp without what comes before it: what a tool call is, what makes up a system prompt, what context is. Next time, I'll start there.

## An exercise to do at home

To close the context diet, I left a canvas, which you can [download as an A4 PDF, in Portuguese](/palestras/dieta-de-contexto-canvas-a4.pdf). It's one row per stage of your user's journey, filled in with your own agent. An example:

- **Stage:** qualification (example).
- **What goes in, and from where:** stage instruction, last 6 messages, accepted insurance plans.
- **Budget:** about 1,200 prompt tokens and 6 messages.
- **Never goes in:** medical records, ID numbers, other patients' conversations.
- **Guardrail:** no diagnoses; clinical questions go to a person.
- **Who decides:** advancing stages is a rule, tone is the LLM, a clinical case is a person.

If the "never goes in" column is empty, you haven't thought about privacy yet. If "who decides" is always the LLM, you haven't thought about guardrails yet.

Then run a premortem: it's December and your agent failed badly with a customer. Write down 3 likely causes and the guardrail that would have prevented each one.

## The other links I showed

- [Chrome DevTools MCP](https://developer.chrome.com/blog/chrome-devtools-mcp): gives the model access to the browser console, just like F12.
- [Context7](https://context7.com/): an MCP with up-to-date documentation.
- [superpowers](https://github.com/obra/superpowers): for lighter spec-driven development. To start a project from scratch, I recommended Spec Kit or GSD.
- [LiteLLM](https://www.litellm.ai/): model router and proxy.
- [Langfuse](https://langfuse.com/): observability and prompt versioning.

## Thanks

Thanks to Daniel Vasserman for organizing the day, to Bryan de Oliveira, who opened with the fundamentals of the product harness, to Jeniffer Pires, who brought CEIA's SDLC and multi-agent architecture, and to Heinz Felipe Rahmig. And to the startups, for the questions.

If your agent is in production and you still don't know what a resolved conversation costs, [talk to me on LinkedIn](https://www.linkedin.com/in/thiago-peraro/) or through the [contact page](/contact/).

## Sources

**The program**

- TI Inside, [*inovabra, AKCIT and CEIA/UFG launch an AI residency program*](https://tiinside.com.br/02/07/2026/inovabra-akcit-e-ceia-ufg-lancam-programa-de-residencia-de-ia-voltada-a-startups/) (in Portuguese), July 2, 2026.
- Startups.com.br, [*PRIA prepares startups*](https://startups.com.br/branded-content/pria-prepara-startups-para-desenvolver-negocios-mais-competitivos-com-ia/) (in Portuguese), 2026.
- CEIA, white paper *IA Generativa no Desenvolvimento de Software*.
- Bryan de Oliveira, *Harness Engineering: do modelo ao sistema*, PRIA Day 3, October 16, 2026.

**Cost**

- Anthropic, [pricing](https://www.anthropic.com/pricing), [prompt caching](https://docs.claude.com/en/docs/build-with-claude/prompt-caching) and [Message Batches](https://docs.claude.com/en/docs/build-with-claude/batch-processing), checked on October 12, 2026.
- OpenAI, [Batch](https://platform.openai.com/docs/guides/batch) and [Flex](https://platform.openai.com/docs/guides/flex-processing); Google, [Gemini Batch Mode](https://ai.google.dev/gemini-api/docs/batch-mode), checked on October 12, 2026.
- Manus, [*Context Engineering for AI Agents*](https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus), July 18, 2025.
- LangChain, [*Benchmarking Multi-Agent Architectures*](https://blog.langchain.com/benchmarking-multi-agent-architectures/), June 10, 2025.
- [OpenTelemetry GenAI conventions](https://opentelemetry.io/docs/specs/semconv/gen-ai/); [LangSmith threads](https://docs.smith.langchain.com/observability/how_to_guides/threads).
- [FrugalGPT](https://arxiv.org/abs/2305.05176), 2023; [RouteLLM](https://arxiv.org/abs/2406.18665), 2024; [LLMRouterBench](https://arxiv.org/abs/2601.07206), 2026.
- Anthropic, [*Introducing advanced tool use*](https://www.anthropic.com/engineering/advanced-tool-use), November 24, 2025; [*Code execution with MCP*](https://www.anthropic.com/engineering/code-execution-with-mcp), November 4, 2025; [*Managing context*](https://www.anthropic.com/news/context-management), September 29, 2025; [*How we built our multi-agent research system*](https://www.anthropic.com/engineering/multi-agent-research-system), June 13, 2025.
- Meta, [WhatsApp Business pricing](https://developers.facebook.com/docs/whatsapp/pricing), in force since October 1, 2026.

**Context**

- Drew Breunig, [*How Long Contexts Fail*](https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html), June 22, 2025.
- LangChain, [*Context Engineering for Agents*](https://blog.langchain.com/context-engineering-for-agents/), July 2, 2025.
- Gary Klein, [*Performing a Project Premortem*](https://hbr.org/2007/09/performing-a-project-premortem), Harvard Business Review, September 2007.

**Workbench and security**

- LangChain, *The Anatomy of an Agent Harness*, March 10, 2026, and *Improving Deep Agents with harness engineering*, February 17, 2026.
- Mercado Libre, Form 8-K, August 5, 2026; Bloomberg Línea, interview with QuintoAndar's CEO, June 18, 2026; Stripe Engineering, *Minions*, February 2026.
- ETH Zurich, [arXiv 2602.11988](https://arxiv.org/abs/2602.11988), 2026; OpenAI, *Harness engineering*, February 11, 2026; M. Hashimoto, *My AI Adoption Journey*, February 5, 2026.
- B. Böckeler, *Harness engineering for coding agent users*, martinfowler.com, April 2, 2026; GitHub, [*Spec Kit*](https://github.com/github/spec-kit), 2025.
- Anthropic, sandboxing in Claude Code, October 20, 2025, and auto mode, March 25, 2026.
- S. Willison, *The lethal trifecta for AI agents*, June 16, 2025; Meta, *Agents Rule of Two*, October 31, 2025.
- Harrison Chase, April 20, 2025; Anthropic, *Building effective agents*, December 19, 2024.
- Brazil's Federal Council of Medicine (CFM), Resolution 2,454/2026; LGPD, Law 13,709/2018, art. 11.
