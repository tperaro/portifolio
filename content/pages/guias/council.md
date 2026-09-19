---
title: Council de modelos
subtitle: Como pedir uma segunda (e uma terceira) opinião a outras IAs antes de uma decisão de risco.
slug: /guias/council-de-modelos
date: '2026-09-19'
updatedDate: '2026-09-19'
excerpt: >-
  Um council manda o plano de um modelo para outros modelos tentarem derrubá-lo
  antes de você agir. Este guia junta o que a pesquisa mostrou, os formatos que
  já existem, como montar um com três ou quatro modelos e os prompts prontos
  para copiar.
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
    Um processo em que modelos de outros fornecedores recebem o plano ou o
    diagnóstico de um agente e tentam achar o que está errado antes de ele
    agir.
  when: >-
    Em decisões difíceis de desfazer, em diagnósticos que dependem de uma
    premissa não verificada e quando duas abordagens parecem igualmente boas.
  whenNot: >-
    Em tarefa mecânica, em pergunta que o próprio código responde e em revisão
    de diff linha a linha, que tem ferramenta própria.
verdict: >-
  O valor de um council está na discordância: poucos modelos, de origens
  diferentes, sem saber quem escreveu o quê, e com as divergências resolvidas
  por evidência, não por voto.
prerequisites:
  - Usar pelo menos um agente de código no dia a dia (Claude Code, Codex ou similar)
  - Ter acesso a um segundo modelo de outro fornecedor, por CLI ou API
related:
  - claude-code
  - codex
  - skills
  - context-rot
faq:
  - question: Quantos modelos um council precisa ter?
    answer: >-
      Dois a quatro. O maior salto de qualidade acontece quando você sai de um
      modelo para dois modelos diferentes. Depois disso o ganho cai rápido,
      porque modelos parecidos erram nos mesmos lugares.
  - question: Posso usar várias instâncias do mesmo modelo?
    answer: >-
      Pode, mas rende pouco. Instâncias do mesmo modelo compartilham os mesmos
      pontos cegos. O que mais melhora o resultado é misturar fornecedores e
      arquiteturas diferentes.
  - question: Vale a pena fazer os modelos debaterem em várias rodadas?
    answer: >-
      Em geral uma rodada, no máximo duas. Em debates longos os modelos tendem a
      concordar com a maioria e às vezes trocam uma resposta certa por uma
      errada. Registre a posição inicial de cada um antes de mostrar a dos
      outros.
  - question: O council substitui a revisão humana?
    answer: >-
      Não. Ele aumenta a chance de um erro aparecer antes de você decidir. A
      decisão e a verificação da evidência continuam sendo suas.
  - question: Posso mandar qualquer contexto para o council?
    answer: >-
      Não. O briefing sai da sua máquina e vai para outro fornecedor. Tire
      segredos, tokens e dados de clientes antes de enviar, sempre.
seo:
  metaTitle: 'Council de modelos: segunda opinião entre IAs, com prompts | Guia'
  metaDescription: >-
    Como montar um council de modelos de IA: o que a pesquisa diz sobre debate
    e diversidade, os formatos que existem, um fluxo para três ou quatro
    modelos e prompts prontos para copiar.
  metaTags:
    - property: keywords
      content: 'council de modelos, LLM council, segunda opinião IA, multi-agent debate, LLM as a judge, Claude Code, Codex, prompts de revisão'
      type: MetaTag
  type: Seo
type: GuideLayout
author: content/data/person1.json
---

Todo modelo erra com convicção de vez em quando. O problema não é o erro em si, é ele chegar em produção com a mesma segurança de uma resposta certa. No meu dia a dia, toda decisão arriscada passa antes por um "conselho": o plano que o Claude montou vai para o Codex, que tem a única função de tentar derrubá-lo. Várias vezes isso mudou a decisão final.

Este guia junta o que aprendi fazendo isso com o que a pesquisa e as ferramentas mais conhecidas mostram, para quem quer montar um council com três ou quatro modelos.

> **Resposta direta:** um council é mandar o plano de um modelo para outros modelos, de fornecedores diferentes, tentarem achar o que está errado antes de você agir. Funciona melhor com dois a quatro modelos diferentes, uma rodada de crítica (duas no máximo), respostas anônimas e alguém que resolve as discordâncias olhando a evidência, não contando votos.

## Quando convocar

O council custa tempo e tokens, então ele não é para tudo. Eu convoco quando pelo menos uma destas condições aparece:

- **A ação é difícil de desfazer:** migração de banco, exclusão de dados, mudança de configuração em produção.
- **O diagnóstico depende de uma premissa que eu não verifiquei.** O agente disse "isso parece X", mas ninguém provou que é X.
- **Duas abordagens parecem igualmente boas** e eu estou prestes a escolher uma sem um critério claro.
- **Eu percebo que estou reconhecendo um padrão em vez de provar.**

Fora disso, o council atrapalha. Tarefa mecânica não precisa de conselho, pergunta que o código responde se resolve lendo o código, e revisão de diff linha a linha tem ferramentas próprias.

<Decision question="A decisão é difícil de desfazer ou se apoia em algo que você não verificou?" yesLabel="Sim" noLabel="Não" yes="Convoque o council :: Um erro aqui custa mais do que alguns minutos de revisão por outros modelos." no="Siga sozinho :: O custo do council não se paga em decisões pequenas e reversíveis." />

## O que a pesquisa diz

Nos últimos três anos saiu bastante coisa sobre modelos debatendo e julgando uns aos outros. Os achados que mudam a forma de montar um council são estes.

### Diversidade vale mais que quantidade

No ReConcile (ACL 2024), modelos **diferentes** discutindo em mesa-redonda superaram tanto um modelo sozinho quanto várias cópias do mesmo modelo debatendo. No trabalho "Replacing Judges with Juries" (2024), um painel de modelos menores de famílias diferentes julgou melhor que um único modelo grande, com menos viés e custando cerca de sete vezes menos. Um estudo de 2026 sobre escala de agentes foi mais longe: dois agentes diversos empataram ou superaram dezesseis agentes iguais.

### Mais juízes não quer dizer mais votos

Um estudo de 2026 com um painel de nove modelos de ponta mostrou que o painel entregava, na prática, a informação de uns dois votos independentes. Os modelos erravam nos mesmos itens, e a precisão do grupo ficou de 8 a 22 pontos percentuais abaixo do que juízes realmente independentes dariam. Nenhum método de agregação resolveu isso.

<BarChart title="Nove juízes, dois votos" axisLabel="Votos independentes que o painel entrega" max="10" items="No papel :: 9 | Na prática :: 2 :: erros correlacionados" caption="Kohli, 2026, com nove modelos de ponta em tarefas de inferência. Adicionar modelos parecidos rende pouco; o que rende é variar a origem." />

### Debate longo pode piorar o resultado

Em "Talk Isn't Always Cheap" (2025), a precisão caiu ao longo das rodadas de debate: modelos trocavam uma resposta certa por uma errada para concordar com os colegas, mesmo quando os modelos mais capazes eram maioria. Por isso eu faço uma rodada de crítica, no máximo duas, e registro a posição inicial de cada modelo antes de mostrar a dos outros.

### Quem escreveu não deve ser o único a julgar

Modelos reconhecem e preferem o próprio texto, mesmo quando pessoas avaliam os dois textos como equivalentes (Panickssery e colegas, NeurIPS 2024). O modelo que montou o plano nunca deve ser o único a aprová-lo.

### Anonimize antes da revisão cruzada

Quando um modelo sabe que está lendo a resposta de outro, ele tende a concordar sem critério (e, com menos frequência, a defender a própria resposta por teimosia). Remover a identidade das respostas elimina esse viés sem custo de desempenho ("When Identity Skews Debate", 2025). O llm-council do Andrej Karpathy faz exatamente isso: na etapa de revisão, cada modelo avalia as respostas dos outros sem saber de quem são.

### Autocrítica sem sinal externo rende pouco

Pedir para o mesmo modelo revisar o próprio raciocínio, sem nada de fora, não melhora e às vezes piora o resultado (Huang e colegas, ICLR 2024). O ganho aparece quando entra um sinal externo: um teste que falha, um comando executado, um log, ou outro modelo.

### "Procure as premissas falsas" sai pela culatra

Um trabalho de 2026 mostrou que instruir um modelo a checar premissas faz ele contestar tanto as falsas quanto as corretas: 57% de contestações indevidas. A solução é marcar no briefing o que já foi verificado e o que não foi, e deixar claro que "o plano está certo" é uma resposta válida.

<Callout type="note" title="Evidência nova">
Os trabalhos de 2023 e 2024 citados aqui são bem estabelecidos. Os de 2025 e 2026 são recentes e ainda têm poucas replicações; eles apontam na mesma direção, mas trate os números como indicação, não como lei.
</Callout>

## Os formatos que já existem

Não é preciso inventar o formato do zero. Os três mais usados hoje:

<Compare title="Três formatos de council" columns="Um crítico externo | Posições forçadas | Revisão anônima e presidente" highlight="2" criteriaLabel="Critério" rows="Como funciona :: um modelo de outro fornecedor recebe o plano e tenta derrubá-lo :: cada modelo defende uma posição fixa, a favor, contra ou neutra :: cada modelo responde sozinho, depois avalia as respostas anônimas dos outros, e um presidente sintetiza | Exemplo :: minha skill council, com o Codex CLI :: ferramenta consensus do PAL MCP :: llm-council do Karpathy | Modelos :: 2 :: 2 a 4 :: 3 a 5 | Melhor para :: o dia a dia, com custo baixo :: forçar o contraditório numa proposta :: decisões grandes, com mais tempo | Cuidado :: um único ponto de vista externo :: a síntese fica com um modelo só :: três etapas custam mais tempo e dinheiro" />

Existe ainda a fusão de respostas, como o Model Fusion, um experimento público do OpenRouter: vários modelos respondem ao mesmo prompt, uma etapa de análise compara as saídas e um modelo juiz junta o melhor de cada uma numa resposta final.

## Como montar um council de três ou quatro modelos

Se você já usa um agente principal e tem acesso a mais dois modelos de outros fornecedores, este é o fluxo que eu recomendo:

<Flow direction="column" title="Um council em nove passos" items="Congele o plano num briefing :: escrito antes de ouvir qualquer crítico, para não ancorar nas respostas | Limpe o briefing :: sem segredos, tokens ou dados de clientes, porque ele sai da sua máquina | Mande em paralelo, em modo somente leitura :: o mesmo briefing e o mesmo formato de resposta para cada crítico | Tempo esgotado conta como abstenção :: crítico que não respondeu não aprovou nada | Registre a posição inicial de cada um :: antes de qualquer crítico ver o parecer do outro | Sintetize pelas discordâncias :: concordância ganha uma linha, divergência é o que interessa | Risco alto de qualquer crítico trava a decisão :: é veto, não maioria | Desempate pela evidência :: abra o arquivo, rode o teste, leia o log, em vez de contar votos | Anote o resultado :: o que mudou por causa do council e o que ficou, com o motivo" />

Três escolhas práticas fazem diferença:

- **Mesmo prompt para todos, por padrão.** Com o mesmo pedido e o mesmo formato de saída, os pareceres ficam comparáveis linha a linha. Papéis diferentes para cada modelo (segurança, custo, pre-mortem) valem como segunda camada, em planos grandes.
- **Rótulos neutros.** Quando os pareceres voltam, chame-os de Revisor A, B e C. Isso vale para o modelo que sintetiza e para você: "foi o modelo X que disse" puxa a decisão para a marca, não para o argumento.
- **Segunda rodada só se houver discordância real.** Mande para cada crítico o parecer anônimo dos outros e pergunte se ele mantém a posição. Quem mudar precisa dizer qual argumento o convenceu.

Com CLIs de agentes de código, o fan-out é simples. O Codex, por exemplo, roda em modo somente leitura recebendo o briefing pela entrada padrão:

```bash
codex exec --skip-git-repo-check -s read-only -C meu-projeto - < briefing.md
```

Outras CLIs, como a do Gemini, também aceitam o prompt pela entrada padrão em modo não interativo. Prefira sandbox e nunca use o modo que aprova tudo automaticamente.

## Anatomia do briefing

O briefing é o que decide a qualidade da crítica. Um bom briefing tem uma ou duas páginas e responde, nesta ordem:

1. **A decisão em jogo:** o que vai acontecer se ninguém discordar.
2. **O plano atual, com a confiança honesta.** "Confiança média" convida à crítica; "tenho certeza" convida a concordar.
3. **As premissas, cada uma marcada:** VERIFICADA, com a evidência (arquivo, teste, documento), ou NÃO VERIFICADA.
4. **As restrições reais:** prazo, orçamento, o que não pode mudar.
5. **O que já foi descartado e por quê,** para o crítico não repropor.
6. **O critério de sucesso:** como saber que deu certo.
7. **O que está fora de discussão,** para a crítica não se espalhar.

Nunca entram: segredos, tokens, dados de clientes e qualquer indicação de qual modelo escreveu o plano.

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

## Prompts prontos para copiar

Os prompts estão em inglês, que é como eu mando para os modelos. Os três primeiros entram em todo council; os outros são lentes que você escolhe conforme o risco.

### A base: sempre

**Preâmbulo do crítico.** Vai no topo do briefing e define o papel.

```text
You are an adversarial reviewer on a council of AI models. Another AI produced
the plan below and will act on it unless you find real flaws. Find what is
WRONG: hidden assumptions, missed edge cases, simpler alternatives, factual
errors, risks. Do not rubber-stamp. If you cannot find a real flaw after
genuine effort, say so explicitly.
```

**Formato de resposta.** O mesmo para todos os críticos, para a síntese conseguir comparar.

```text
Answer only in this format:
VERDICT: AGREE / AGREE-WITH-CONCERNS / DISAGREE
TOP RISKS: max 3, each a concrete failure scenario, not a generic worry
WHAT I'D DO INSTEAD: only if materially different
CONFIDENCE: low / medium / high
WHAT WOULD CHANGE MY MIND: the one piece of evidence that would flip my verdict
```

**Contra a bajulação e contra o defeito inventado.** Explica o porquê, que funciona melhor que só proibir.

```text
Do not soften your critique to be agreeable, and do not invent a flaw to look
thorough. Being right matters more to me than being polite or looking useful.
"This plan is fine" is a valid and complete answer.
```

### As lentes: escolha uma ou duas

**Pre-mortem.** Para quando o plano parece sólido demais. A técnica é do psicólogo Gary Klein: imaginar que já deu errado destrava críticas que "o que pode dar errado?" não destrava.

```text
It is three months from now. This plan was executed and it failed badly.
Write the post-mortem: what broke, in what order, and which early warning
sign we ignored.
```

**Advogado do diabo.** Para quando os críticos concordam fácil demais.

```text
You must argue AGAINST this plan, even if parts of it seem reasonable. The
burden of proof is on the plan, not on you. List every argument a smart,
well-informed opponent would make.
```

**Steelman da alternativa descartada.** Para quando uma opção foi rejeitada rápido demais.

```text
Take the rejected alternative: [X]. Argue for it in its strongest form, as if
you believed it was the better choice. Use the best evidence available, not a
weakened version.
```

**Checagem de premissas.** Usa as marcações do briefing.

```text
For each assumption marked UNVERIFIED, say what evidence would confirm or
refute it, and whether it is safe to proceed without that evidence. Do not
contest assumptions marked VERIFIED unless you have a concrete counterexample.
```

**Segurança.** Quando o plano toca dados, acessos ou exposição externa.

```text
Review this plan only for security: new attack surface, handling of
credentials and data, permission scope creep, and what a user with normal
access could now do that they could not before.
```

**Raio de impacto e reversibilidade.** Para qualquer ação difícil de desfazer.

```text
Rate this action's blast radius (how much it affects) and its reversibility
(how easy it is to undo) separately. A wide blast radius combined with an
irreversible action must be flagged even if the plan is otherwise correct.
```

**Simplicidade.** Complementa as outras: ataca a complexidade, não a correção.

```text
Ignore whether the plan is correct. Is there a simpler plan that meets the same
success criteria with fewer moving parts? If yes, describe it in three
sentences. If not, explain why the complexity is necessary.
```

### A síntese

**Presidente do council.** Recebe os pareceres com rótulos neutros.

```text
You will receive independent reviews of the same plan, labeled Reviewer A, B
and C. Summarize: (1) where they all agree, one line each; (2) where they
DISAGREE, quoting each side; (3) which disagreement, if any, changes what
should be done; (4) one recommended next action and the evidence to check
before taking it.
```

**Revisão cruzada anônima.** Para a segunda rodada, quando há discordância real.

```text
Below are reviews of the same plan labeled Response A, B and C, in random
order. Evaluate them only on correctness and reasoning, ignoring length and
tone. Do not try to guess which model wrote each one. Then say whether you
keep your original verdict, and if you change it, which specific argument
changed your mind.
```

## O que não fazer

<DoDont title="Hábitos que decidem se o council ajuda ou atrapalha" doLabel="Faça" dontLabel="Evite" do="Misturar modelos de fornecedores diferentes | Mandar o mesmo briefing e o mesmo formato para todos | Marcar cada premissa como verificada ou não | Deixar claro que concordar é uma resposta válida | Registrar a posição inicial antes da segunda rodada | Desempatar abrindo o arquivo, o teste ou o log | Anotar o que mudou por causa do council" dont="Pedir uma revisão geral, sem uma decisão concreta | Colar o repositório inteiro no briefing | Revelar qual modelo escreveu o plano | Manter sempre a mesma ordem das respostas na revisão cruzada | Deixar o modelo autor ser o único juiz | Decidir por maioria quando um crítico aponta risco alto | Convocar o council para tarefa pequena e reversível" />

A frase que resume tudo: **um council que sempre concorda é gasto de tokens.** O produto dele é a discordância bem fundamentada, e o seu trabalho é verificá-la antes de decidir.

## Fontes

- Chen e colegas, *ReConcile: Round-Table Conference Improves Reasoning via Consensus among Diverse LLMs*, ACL 2024. [arXiv 2309.13007](https://arxiv.org/abs/2309.13007)
- Verga e colegas, *Replacing Judges with Juries: Evaluating LLM Generations with a Panel of Diverse Models*, 2024. [arXiv 2404.18796](https://arxiv.org/abs/2404.18796)
- Yang e colegas, *Understanding Agent Scaling in LLM-Based Multi-Agent Systems via Diversity*, 2026. [arXiv 2602.03794](https://arxiv.org/abs/2602.03794)
- Kohli, *Nine Judges, Two Effective Votes: Correlated Errors Undermine LLM Evaluation Panels*, 2026. [arXiv 2605.29800](https://arxiv.org/abs/2605.29800)
- Wynn, Satija e Hadfield, *Talk Isn't Always Cheap: Understanding Failure Modes in Multi-Agent Debate*, 2025. [arXiv 2509.05396](https://arxiv.org/abs/2509.05396)
- Panickssery, Bowman e Feng, *LLM Evaluators Recognize and Favor Their Own Generations*, NeurIPS 2024. [arXiv 2404.13076](https://arxiv.org/abs/2404.13076)
- Choi, Zhu e Li, *When Identity Skews Debate: Anonymization for Bias-Reduced Multi-Agent Reasoning*, 2025. [arXiv 2510.07517](https://arxiv.org/abs/2510.07517)
- Huang e colegas, *Large Language Models Cannot Self-Correct Reasoning Yet*, ICLR 2024. [arXiv 2310.01798](https://arxiv.org/abs/2310.01798)
- *Two Axes of LLM Abstention: Answer Correctness and Question Answerability*, 2026. [arXiv 2607.08456](https://arxiv.org/abs/2607.08456)
- Du e colegas, *Improving Factuality and Reasoning in Language Models through Multiagent Debate*, 2023. [arXiv 2305.14325](https://arxiv.org/abs/2305.14325)
- Andrej Karpathy, [llm-council](https://github.com/karpathy/llm-council).
- PAL MCP, [ferramenta consensus](https://github.com/BeehiveInnovations/pal-mcp-server/blob/main/docs/tools/consensus.md).
- OpenRouter, [Model Fusion](https://openrouter.ai/fusion).
- Gary Klein, [The pre-mortem method](https://www.gary-klein.com/premortem).
