---
title: 'I classified 3,000 emails for US$ 0.13 without letting the AI delete a single one'
slug: ai-email-triage-that-cannot-delete
translationKey: triagem-email-ia-sem-apagar
date: '2026-11-03'
excerpt: >-
  How I built the daily triage of a shared inbox: rules before the model,
  separate questions, a gold set labeled blind and a guard that stops the AI
  from deleting, archiving or sending anything.
featuredImage:
  url: /images/blog/triagem-email-sem-apagar.webp
  altText: >-
    Email messages pass through a guard and come out with colored labels; the
    trash can beside the guard is crossed out, and one message moves on with no
    label
  type: ImageBlock
  width: 1200
  height: 630
  styles:
    self:
      borderRadius: medium
isFeatured: false
seo:
  metaTitle: 'AI email triage that cannot delete anything | Thiago Peraro'
  metaDescription: >-
    How to classify an inbox with AI for cents and with no risk of losing mail:
    header rules, a decision model, a gold set labeled blind and a guard that
    only allows reading and labeling.
  socialImage: /images/blog/triagem-email-sem-apagar.png
  metaTags:
    - property: keywords
      content: >-
        AI email triage, email classification, Jev, decision model, gold set,
        precision and recall, agent security, zero data retention
  type: Seo
colors: bg-light-fg-dark
type: PostLayout
author: content/en/data/person1.json
---

The shared inbox at the company where I run technology had become a place where everything arrived and little got seen. It held about 3,650 messages: client documents, payment receipts, platform notifications, marketing. Somewhere in there were the few messages that needed a person. The request came up in a meeting in October: real business was getting lost in the noise.

This post covers how I solved it, including the numbers that didn't turn out well and the failure that went unseen for five days.

> **Short answer:** you can classify an entire inbox with AI for cents and with no risk of losing mail, as long as the model can only add labels. What worked here: header rules before the model, a decision model asked separate questions, thresholds measured on a gold set labeled blind, and a guard in code that refuses anything beyond reading and labeling. Classifying 3,384 messages cost US$ 0.13.

## The risk isn't a wrong label

A wrong label is an annoyance. An archived or deleted client email is a real problem. So the first decision wasn't which model to use, but what it **cannot** do.

There are three layers, and none of them depends on the prompt:

- **Add only.** The system puts one label on each message. It never removes a label, never archives and never touches "unread".
- **A guard on the way out.** Every call from the write credential goes through a guard. Reading, adding a triage label and creating a label pass. Trashing, deleting, archiving, sending and batch calls are refused on the spot, so the request never leaves the container.
- **A narrow permission.** The credential doesn't have the scope that permanent deletion requires. Even with a bug in the guard, that action doesn't exist for it.

Whatever the model isn't sure about stays where it was, with no label and no alert. Security notices, like login codes and password resets, also get no label and never reach the model.

## Rules first, then the model

A good part of the inbox can be sorted by reading the headers: who sent it, from which system, whether it has `List-Unsubscribe`. These rules are free and nothing leaves the machine. A payment receipt goes to its label, an e-signature to its own, and a payment dispute becomes an alert. Only what's left reaches the model.

For the rest I used [Jev](https://developers.cloudflare.com/ai/models/typesafe/jev/), from TypeSafe AI. It's a decision model: it doesn't write text. You send the content and a list of questions, and it returns probabilities. It costs US$ 0.042 per million input tokens, output is free, and the median here was 417 ms. The client I wrote refuses to send a message if the route doesn't guarantee zero data retention.

Three decisions came before the first line of code:

1. **One question per fact.** Jev answers each question independently and doesn't explain its answer, so packing several criteria into one question hides what it's measuring. There are three: is this bulk mail or a scam, what does the sender want, and who are they to us. Code turns the answers into a label.
2. **Uncertainty goes to a person, not to a bigger model.** My plan had an LLM as a fallback for doubtful cases. A [public benchmark](https://github.com/SENZO-NCEKANA/jev-triage-benchmark) tested exactly that, and every threshold made things worse: the best one lost 0.7 accuracy points while costing 3.4 times more. I cut the fallback.
3. **A pinned version.** New versions of the model ship often, and a threshold calibrated on one doesn't carry over to the next. I pinned `jev-1.14.0`.

## The gold set came before the model

I set aside 214 real messages, covering every sender domain. Claude labeled all of them without seeing a single Jev answer, and I reviewed the alerts and the doubtful cases. Then I ran Jev: 166 messages reached it, because rules settled the others, and that cost US$ 0.014.

| | Planned thresholds (0.70 / 0.45) | Chosen thresholds (0.88 / 0.60) |
|---|---|---|
| Wrong labels | 27 | 7 |
| Spam precision | 23.8% | 100% (4 of 4) |
| Alert precision | 76.0% | 83.3% |
| "Needs reply": precision and recall | 100% and 62.5% | 100% and 62.5% |

The threshold I had planned would have sent legitimate newsletters to spam: the spam question scored newsletters from 0.70 to 0.86 and real spam from 0.90 to 0.93. You can only see that with a gold set in hand.

Two warnings about that table. I chose the thresholds on the same set I measured them on, so the right column is optimistic. And this inbox has almost no human mail: 18 replies in 3,648 messages. "Needs reply" has only 8 examples, and the confidence interval on its recall runs from 31% to 86%. The label that matters most is the one with the least data.

## What the mistakes taught me

Of the 8 messages that needed a reply, the model missed 3, and each one taught me something:

- **A reply to a campaign** whose subject wasn't on my list, so the sender looked unknown. I replaced the list with a better rule: anyone replying with a quote of our own email is one of ours. That rule found every campaign reply in the inbox, and there's no list to maintain.
- **Someone asking to delete their account.** The model filed it as "other", because a request isn't a question. Now a request counts as a question.
- **A stray one-liner from an unknown sender**, with no context at all. That one is still hard.

Because the model's answers are saved, testing a new rule is free: it runs offline over the same answers. With the new rules, "needs reply" went from 5 to 7 of 8, with one false alarm. Across the whole inbox, one client's documents left spam once a clear client intent could beat the bulk score.

## In production

Every morning the system reads what arrived after the last cursor, applies labels and posts a Slack report with only what needs a person. An item leaves the report on its own when someone answers the thread.

The whole inbox went through the model only once: 3,384 messages for US$ 0.13. Of those, 3,114 got a label with no alerts, so nobody got pinged about old mail, and 270 stayed as they were.

If the gateway goes down or credits run out, the run reports it, exits with an error and doesn't move the cursor. The next day it retries the same window.

## The failure that lasted five days

The error showed up where I wasn't looking. From October 24 to 28, Slack refused the post every day. The labels kept working, but the failure notice went to the same channel and was refused too. For five days nothing arrived, and nothing said that nothing had arrived.

No data was lost, because a report that fails is kept and goes out with the next one. But the lesson stuck: **a failure notice can't depend on the channel it's watching.**

## If you want to copy this

1. Define first what the agent cannot do, and enforce it in code and in the credential, not in the prompt.
2. Settle by rule everything a rule can settle. It's free and nothing leaves your machine.
3. Build the gold set before you see the model's answers.
4. Save the model's answers. Re-scoring a new rule then costs nothing.
5. State the sample size next to the number. "100% precision" on 8 examples isn't the same as on 800.

If you're letting agents touch your company's real data and want to talk about these limits, [reach out on LinkedIn](https://www.linkedin.com/in/thiago-peraro/) or through the [contact page](/contact/).

## Sources

- Cloudflare, [`typesafe/jev` model card](https://developers.cloudflare.com/ai/models/typesafe/jev/): price and interface.
- Senzo Ncekana, [jev-triage-benchmark](https://github.com/SENZO-NCEKANA/jev-triage-benchmark): the LLM cascade test.
- Simon Willison, [*Jev introduces a new shape of LLM*](https://simonwillison.net/2026/Sep/21/jev/), Sep 2026.
- Sebastian Raschka, [*Language Models for Text Classification: From Bag-of-Words to Jev*](https://magazine.sebastianraschka.com/p/classifier-history-and-jev).
- The gold-set, cost and production numbers are my own measurements, October 2026.
