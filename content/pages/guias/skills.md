---
title: Agent Skills
subtitle: Pastas com instruções que transformam um agente genérico em especialista — sem inchar o contexto.
slug: /guias/skills
date: '2026-08-18'
updatedDate: '2026-08-18'
excerpt: >-
  O que é uma Agent Skill, como o SKILL.md funciona, por que a divulgação
  progressiva resolve o problema de contexto, e quando uma skill é a escolha
  errada em relação a prompt, subagente ou MCP.
kind: technique
topics:
  - multiagent
  - context
  - coding
level: intermediate
order: 60
readingTime: 11
pricing: free
vendor: Padrão aberto
officialUrl: 'https://agentskills.io'
icon: layers
accentColor: '#0F7B6C'
tldr:
  what: >-
    Uma pasta com um arquivo SKILL.md que ensina a um agente como executar uma
    tarefa específica — carregada só quando a tarefa aparece.
  when: >-
    Quando existe um procedimento real e repetível, com regras próprias, que você
    hoje explica à mão toda vez que precisa dele.
  whenNot: >-
    Quando a instrução cabe em duas frases, quando o conhecimento muda todo dia,
    ou quando o que você precisa é acesso a um sistema — isso é MCP, não skill.
verdict: >-
  Escreva uma skill quando você já se pegou explicando o mesmo procedimento pela
  terceira vez — antes disso, um prompt resolve.
prerequisites:
  - Um agente compatível com o padrão Agent Skills
  - Um procedimento que você já executa hoje de forma manual
related:
  - context-rot
  - claude-code
  - rag-vs-rag-empresarial
faq:
  - question: O que é uma Agent Skill?
    answer: >-
      É uma pasta contendo um arquivo SKILL.md com metadados (nome e descrição,
      no mínimo) e instruções que ensinam a um agente como executar uma tarefa
      específica. A pasta pode incluir scripts, modelos de documento e arquivos
      de referência.
  - question: Skills são só da Anthropic?
    answer: >-
      Não. A Anthropic publicou o formato como padrão aberto em dezembro de 2025
      e ele foi adotado por outros ecossistemas — Codex CLI, Gemini CLI, GitHub
      Copilot, Cursor e VS Code, entre dezenas de produtos compatíveis.
  - question: Qual a diferença entre skill e prompt de sistema?
    answer: >-
      O prompt de sistema está sempre carregado e ocupa contexto o tempo todo. A
      skill fica adormecida: o agente enxerga apenas nome e descrição, e só lê o
      conteúdo completo quando a tarefa corresponde. Isso permite ter uma
      biblioteca grande sem pagar por ela em todo pedido.
  - question: Qual a diferença entre skill e MCP?
    answer: >-
      Skill é conhecimento — como fazer algo. MCP é acesso — a capacidade de
      falar com um sistema externo. Um agente que precisa ler o CRM precisa de
      MCP. Um agente que precisa saber como a sua empresa qualifica um lead
      precisa de skill. Muitas vezes precisa dos dois.
  - question: Quantas skills é demais?
    answer: >-
      O limite prático não é o número, é a clareza das descrições. Se duas skills
      têm descrições parecidas, o agente escolhe errado. O sinal de excesso é
      ativação errada, não a contagem da pasta.
seo:
  metaTitle: 'Agent Skills: o que é, quando usar e quando não usar | Guia'
  metaDescription: >-
    Guia prático de Agent Skills: como funciona o SKILL.md, a divulgação
    progressiva em três estágios, como escrever a descrição que faz a skill
    ativar na hora certa e quando prompt, subagente ou MCP são melhores.
  metaTags:
    - property: keywords
      content: 'Agent Skills, SKILL.md, divulgação progressiva, Anthropic, agentes de IA, MCP, Claude Code'
      type: MetaTag
  type: Seo
type: GuideLayout
author: content/data/person1.json
---

Todo mundo que usa um agente por algumas semanas passa pelo mesmo desconforto: você explica o mesmo procedimento de novo. Como a empresa formata um relatório de incidente. Quais campos são obrigatórios num contrato. Qual a convenção de commits do time. Você explica, o agente executa bem, a sessão acaba, e na semana seguinte você explica tudo outra vez.

A saída óbvia é colocar essas instruções no prompt de sistema. Funciona — até você ter trinta procedimentos. Aí todo pedido, inclusive "que horas são", carrega trinta procedimentos irrelevantes e você paga o preço disso em qualidade, por causa do [context rot](/guias/context-rot).

Agent Skills resolvem exatamente esse dilema.

> **Resposta direta:** uma Agent Skill é uma pasta com um arquivo `SKILL.md` que ensina a um agente como executar uma tarefa específica. O agente enxerga apenas o nome e a descrição de cada skill; o conteúdo completo só entra no contexto quando a tarefa corresponde à descrição.

## Divulgação progressiva: o mecanismo central

O conceito que faz tudo funcionar tem nome: *progressive disclosure*, divulgação progressiva. O agente carrega o conhecimento em três estágios, e cada estágio custa mais que o anterior.

<Flow direction="column" title="Os três estágios de carregamento" items="Descoberta :: ao iniciar, o agente lê só nome e descrição de cada skill. Custo: algumas dezenas de tokens por skill. | Ativação :: quando a tarefa corresponde a uma descrição, ele lê o SKILL.md inteiro. Custo: centenas ou milhares de tokens, uma vez. | Execução :: ele segue as instruções e, se precisar, abre arquivos de referência ou roda scripts da pasta. Custo: só o que foi aberto." />

O efeito prático é que uma biblioteca de cinquenta skills custa quase nada quando nenhuma é usada. Você deixa de escolher entre "o agente sabe muita coisa" e "o contexto está limpo".

<BarChart title="Por que a divulgação progressiva importa" axisLabel="Tokens de contexto ocupados com 50 procedimentos disponíveis" unit=" mil" max="60" items="Tudo no prompt de sistema :: 55 :: carregado em todo pedido, mesmo os irrelevantes | Skills, nenhuma ativada :: 3 :: só os nomes e descrições | Skills, uma ativada :: 5 :: descrições mais o conteúdo da skill usada" caption="Ordem de grandeza ilustrativa. O que importa é a relação, não o valor absoluto." />

## A anatomia de um SKILL.md

O formato é deliberadamente simples: um arquivo Markdown com um cabeçalho de metadados. O mínimo obrigatório é nome e descrição.

<Terminal title="Estrutura de uma skill" lines="minha-skill/ | minha-skill/SKILL.md | minha-skill/referencia/modelo-relatorio.md | minha-skill/scripts/gerar.py" caption="Só o SKILL.md é obrigatório. Os arquivos ao lado são carregados sob demanda." />

O corpo do arquivo é instrução em português claro: quando usar, o passo a passo, o que verificar antes de dizer que terminou. Não é código, é procedimento escrito para ser lido por alguém competente que nunca fez essa tarefa aqui.

### A descrição é a parte mais importante

Esta é a lição que custa caro aprender. O conteúdo da skill define a **qualidade** da execução; a descrição define **se ela vai ser executada**.

Uma descrição vaga significa que a skill nunca ativa, ou ativa na hora errada. E uma skill que não ativa é o mesmo que uma skill que não existe.

<DoDont title="Escrevendo a descrição" doLabel="Descrições que ativam" dontLabel="Descrições que falham" do="Use quando o usuário pedir um relatório de incidente, post-mortem ou RCA | Use ao criar ou revisar um contrato de prestação de serviço | Use para qualificar um lead novo antes de passar para vendas | Cite os termos que a pessoa realmente digita, incluindo sinônimos e gírias do time" dont="Ajuda com documentos | Melhores práticas da empresa | Ferramentas úteis para o time | Descrições que descrevem a skill em vez de descrever o gatilho" />

A regra prática: escreva a descrição pensando na frase que a pessoa vai digitar, não no nome que você deu ao processo internamente.

## Skill, prompt, subagente ou MCP?

Quatro mecanismos que se confundem porque todos "ensinam algo ao agente". Eles resolvem problemas diferentes.

<Compare title="Qual mecanismo para qual problema" columns="O que é | Use quando" highlight="1" criteriaLabel="Mecanismo" rows="Prompt :: Instrução na hora :: A instrução é pontual e cabe em duas frases | Skill :: Procedimento reutilizável carregado sob demanda :: Existe um jeito certo de fazer, repetível, com regras próprias | Subagente :: Sessão paralela com contexto isolado :: A subtarefa exige ler muito para concluir pouco | MCP :: Conexão com um sistema externo :: O agente precisa ler ou escrever em uma ferramenta de verdade" />

A confusão mais comum é entre skill e MCP, e a distinção é limpa: **skill é saber, MCP é poder.** Um agente com MCP do CRM consegue consultar o CRM; ele continua sem saber como a sua empresa decide se um lead está qualificado. Esse conhecimento é skill.

<Decision question="O que falta ao agente é conhecimento ou acesso?" yesLabel="Conhecimento" noLabel="Acesso" yes="Escreva uma skill :: O procedimento existe na cabeça de alguém e precisa virar arquivo." no="Conecte um MCP :: Nenhuma instrução resolve a falta de permissão para ler o sistema." />

## Como escrever a primeira

O melhor candidato não é o processo mais importante da empresa. É o que você mais explicou nas últimas duas semanas.

<Flow direction="column" title="Da explicação repetida à skill" items="Escolha o procedimento que você mais repete :: se você explicou três vezes, ele merece existir como arquivo | Escreva como você explicaria para alguém competente e novo :: sem jargão interno não explicado, sem etapas subentendidas | Inclua o critério de pronto :: o que precisa estar verdadeiro para a tarefa estar concluída | Escreva a descrição por último :: agora você sabe exatamente qual gatilho descrever | Teste pedindo com as palavras de outra pessoa :: se não ativar, o problema é a descrição, não o conteúdo" />

<Callout type="tip" title="O teste que revela se a skill presta">
Peça a alguém do time que descreva a tarefa com as próprias palavras e veja se a skill ativa. Se ativar apenas quando você usa os seus termos, a descrição está escrita para você — e não para quem vai usar.
</Callout>

## Onde skills não ajudam

**Conhecimento que muda todo dia.** Skill é arquivo versionado; se o conteúdo muda diariamente, ele vai estar desatualizado quando for lido. Esse caso é [RAG](/guias/rag-vs-rag-empresarial), com a fonte viva.

**Instruções curtas.** Se cabe em duas frases, um prompt resolve. Skill tem custo de manutenção, e custo de manutenção só se paga com reuso.

**Substituir julgamento.** Uma skill descreve como executar bem um procedimento que já existe. Ela não decide se o procedimento faz sentido — isso continua sendo trabalho de gente.

O resumo: **skills convertem conhecimento tácito em ativo reutilizável, sem cobrar contexto por isso.** É a diferença entre uma empresa em que o procedimento certo mora na memória de três pessoas e uma em que ele mora em um arquivo que todo agente sabe encontrar.
