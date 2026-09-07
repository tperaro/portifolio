---
title: Codex
subtitle: O agente de codificação da OpenAI, que aparece no terminal, na IDE, na nuvem e dentro dos seus pull requests.
slug: /guias/codex
date: '2026-08-18'
updatedDate: '2026-08-18'
excerpt: >-
  O que é o Codex da OpenAI, por que ele existe em quatro superfícies
  diferentes, quando delegar uma tarefa para a nuvem vale a pena e quando isso
  só produz um PR que ninguém quer revisar.
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
    Um agente de codificação da OpenAI que roda a mesma tarefa em quatro lugares:
    terminal, extensão de IDE, sandbox na nuvem e revisão automática de pull
    requests.
  when: >-
    Quando você quer despachar tarefas bem delimitadas e ir fazer outra coisa —
    especialmente várias em paralelo — ou quando quer uma primeira revisão
    automática em todo PR.
  whenNot: >-
    Quando a tarefa precisa de idas e vindas com você a cada passo, ou quando
    ninguém da equipe tem tempo de revisar o que voltar da nuvem.
verdict: >-
  Escolha o Codex quando o seu gargalo é fila de tarefas pequenas e revisão de
  PR — não quando o gargalo é entender um sistema junto com alguém.
prerequisites:
  - Conta ChatGPT (Plus, Pro, Business ou Enterprise) ou chave de API
  - Repositório no GitHub, para as tarefas em nuvem e a revisão de PR
related:
  - claude-code
  - cursor
  - context-rot
faq:
  - question: Codex e ChatGPT são a mesma coisa?
    answer: >-
      Não. ChatGPT é a interface de conversa. Codex é o produto de engenharia de
      software: um agente que executa tarefas em um ambiente com o seu código,
      roda comandos e abre pull requests. A assinatura é compartilhada, o
      produto não.
  - question: Preciso pagar para usar o Codex?
    answer: >-
      O Codex CLI é software livre, mas os modelos por trás dele são cobrados.
      Ele está incluso nos planos pagos do ChatGPT com uma cota compartilhada
      entre web, CLI, IDE e celular, e também pode ser usado por API. Desde abril
      de 2026 a cobrança é por créditos consumidos em tokens, não por mensagem.
  - question: Qual a diferença entre Codex e Claude Code?
    answer: >-
      A diferença prática é a superfície. Claude Code é essencialmente um agente
      de terminal, e brilha em trabalho interativo e amplo dentro do repositório.
      Codex se espalha por terminal, IDE, nuvem e PRs, e brilha em despachar
      tarefas assíncronas e revisar código automaticamente.
  - question: O Codex pode abrir pull requests sozinho?
    answer: >-
      Pode. Nas tarefas em nuvem ele trabalha em um sandbox isolado e devolve o
      resultado como um PR. Isso é ótimo para tarefas mecânicas e péssimo para
      mudanças de design, porque o custo de revisar um PR ruim é maior que o de
      escrevê-lo.
  - question: Ele funciona em repositório privado?
    answer: >-
      Sim, com a integração autorizada no GitHub. Vale a conversa com segurança
      antes: o código sai da sua infraestrutura para rodar no sandbox da OpenAI.
seo:
  metaTitle: 'Codex (OpenAI): o que é, quando usar e quando não usar | Guia'
  metaDescription: >-
    Guia prático do Codex da OpenAI: as quatro superfícies do agente, o fluxo de
    tarefas assíncronas, revisão automática de PR, custos e quando ele não é a
    ferramenta certa.
  metaTags:
    - property: keywords
      content: 'Codex, OpenAI, agente de codificação, Codex CLI, revisão de pull request com IA, programação com IA'
      type: MetaTag
  type: Seo
type: GuideLayout
author: content/data/person1.json
---

O nome Codex já significou três coisas diferentes na OpenAI. Primeiro foi o modelo que alimentava o GitHub Copilot em 2021. Depois virou um modelo descontinuado. Desde 2025, é um produto de engenharia de software: um agente que executa tarefas de programação de ponta a ponta.

A diferença em relação a um assistente de chat é a mesma que separa dar instruções de delegar trabalho. Você não pede código; você descreve uma tarefa, e ela volta pronta — às vezes como um diff no seu terminal, às vezes como um pull request aberto enquanto você estava em outra reunião.

## As quatro superfícies

Essa é a característica que define o Codex e a fonte de quase toda a confusão sobre ele. É o mesmo agente, disponível em quatro lugares, com modos de trabalho bem diferentes.

<Flow title="Onde o Codex aparece" direction="row" items="CLI :: no seu terminal, interativo, com seu ambiente local | IDE :: extensão que traz o agente para dentro do editor | Nuvem :: sandbox isolado que roda a tarefa sem você | Revisão de PR :: comenta automaticamente cada pull request" caption="A mesma tarefa muda de natureza conforme a superfície: local é conversa, nuvem é delegação." />

A pergunta que resolve qual usar não é técnica, é sobre atenção: **você vai acompanhar essa tarefa ou não?**

Se vai acompanhar, use CLI ou IDE — você corrige o rumo cedo e economiza tempo. Se não vai, use a nuvem — e aceite que vai gastar tempo revisando depois.

## Quando delegar para a nuvem vale a pena

Tarefa em nuvem é sedutora: você escreve uma frase e vai almoçar. O problema é que o custo não desaparece, ele muda de lugar. Sai da escrita e entra na revisão.

<DoDont title="O que despachar e o que segurar" doLabel="Despache" dontLabel="Segure perto" do="Atualizar dependências e corrigir o que quebrar | Aplicar o mesmo ajuste em vinte arquivos parecidos | Escrever testes para um módulo já estável | Corrigir avisos de lint e tipagem acumulados | Traduzir strings ou gerar documentação a partir do código" dont="Decidir como uma nova feature vai ser modelada | Mexer em autenticação, cobrança ou qualquer coisa com impacto de segurança | Qualquer coisa que dependa de contexto que só está na cabeça de alguém | Tarefas cujo teste você não confia" />

<Callout type="warn" title="A conta que quase ninguém faz">
Um PR de trezentas linhas gerado em cinco minutos custa quarenta minutos de revisão honesta. Se a equipe não tem esses quarenta minutos, o PR vai ser aprovado no olho — e aí a ferramenta deixou de acelerar e passou a esconder problema.
</Callout>

## A revisão automática de PR

Essa é, na minha experiência, a parte mais subestimada do produto — e a que tem melhor relação entre valor e risco.

O agente lê o diff de cada pull request e comenta o que parece errado. Ele não aprova nem bloqueia; ele levanta a mão. É um primeiro par de olhos que nunca está cansado nem com pressa de sair para o almoço.

<Flow direction="column" title="Onde a revisão automática entra" items="PR aberto :: por uma pessoa ou pelo próprio agente | Codex lê o diff :: com o contexto dos arquivos tocados | Comentários publicados :: o óbvio e o mecânico saem da frente | Pessoa revisa :: sobra energia para o que exige julgamento" />

O ganho não é achar bugs profundos — é limpar o ruído antes da revisão humana. Nulos não tratados, casos de borda esquecidos, um `if` invertido, uma variável que ficou para trás. São exatamente os comentários que consomem a paciência de quem revisa e nunca são o motivo pelo qual a pessoa foi contratada.

## O modelo de custo mudou

Até abril de 2026, a cobrança era por mensagem. Desde então, é por créditos consumidos em tokens de entrada e saída. Isso tem uma consequência prática direta.

<BarChart title="O que consome créditos numa tarefa" axisLabel="Peso relativo do consumo em uma tarefa típica de nuvem" unit="%" max="100" items="Ler o repositório :: 45 :: geralmente o maior item, e o mais fácil de reduzir | Raciocínio do agente :: 30 | Escrever o código :: 15 | Rodar testes e reler saída :: 10" caption="Números ilustrativos da proporção típica, não medição de um repositório específico." />

A leitura de contexto costuma pesar mais que a escrita. Quem apontou a tarefa para um subdiretório específico gasta menos que quem soltou o agente na raiz de um monorepo — e, de quebra, recebe um resultado melhor, porque menos contexto irrelevante significa menos [context rot](/guias/context-rot).

## Codex ou Claude Code?

Essa é a comparação mais pedida, e a resposta honesta é que elas resolvem problemas com formatos diferentes.

<Compare title="Onde cada um se encaixa melhor" columns="Codex | Claude Code" highlight="0" criteriaLabel="Critério" rows="Modo dominante :: Delegação assíncrona :: Trabalho interativo | Superfícies :: CLI, IDE, nuvem e PRs :: Terminal, como base do fluxo | Ponto mais forte :: Fila de tarefas paralelas e revisão de PR :: Mudanças amplas e arqueologia de código | Ponto mais fraco :: Revisão vira gargalo se ninguém revisa :: Exige você presente para render | Melhor para :: Equipe com backlog de manutenção :: Pessoa mexendo em sistema que não conhece" />

Na prática, muita equipe usa os dois sem conflito: o agente interativo para a mudança difícil do dia, e a nuvem para a fila de manutenção que ninguém quer pegar.

## Como começar sem se machucar

<Terminal title="Primeiros comandos" lines="npm install -g @openai/codex | cd meu-projeto | codex" caption="O CLI é software livre; o consumo dos modelos é o que entra na sua cota." />

A primeira tarefa não deve ser importante. Escolha algo que você saberia revisar em dois minutos — corrigir avisos de lint, escrever testes para uma função pura, atualizar uma dependência menor. O objetivo é calibrar a sua confiança, não entregar valor.

Depois, ative a revisão de PR antes de ativar as tarefas em nuvem. É a ordem que gera menos atrito: a revisão automática só adiciona comentários, enquanto as tarefas em nuvem adicionam código que alguém precisa auditar.

<Decision question="A sua equipe consegue revisar mais PRs por semana do que revisa hoje?" yesLabel="Sim" noLabel="Não" yes="Tarefas em nuvem vão render :: Você tem capacidade ociosa de revisão. Delegar a fila de manutenção converte essa capacidade em entrega." no="Comece só pela revisão automática :: Ela devolve tempo de revisão em vez de consumir. Tarefas em nuvem antes disso só aumentam a fila." />

A regra que resume o Codex: **ele transforma tempo de escrita em tempo de revisão.** Isso é um ótimo negócio se você tem quem revise, e um péssimo negócio se não tem.
