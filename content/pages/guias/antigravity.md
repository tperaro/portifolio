---
title: Antigravity
subtitle: A aposta do Google em uma IDE onde você gerencia agentes em vez de escrever código.
slug: /guias/antigravity
date: '2026-08-18'
updatedDate: '2026-08-18'
excerpt: >-
  O que é o Google Antigravity, o que significa uma IDE agent-first na prática,
  por que o navegador embutido muda a verificação do trabalho e por que ainda é
  uma ferramenta para quem aceita instabilidade.
kind: tool
topics:
  - coding
  - multiagent
level: intermediate
order: 40
readingTime: 10
pricing: freemium
vendor: Google
officialUrl: 'https://antigravity.google'
icon: liftoff
accentColor: '#1A73E8'
tldr:
  what: >-
    Uma IDE agent-first do Google, construída sobre o Gemini, em que a tela
    principal é um gerenciador de agentes trabalhando em paralelo — não um
    arquivo aberto.
  when: >-
    Quando você quer prototipar rápido delegando tarefas paralelas e quer que o
    próprio agente verifique o resultado no navegador antes de te entregar.
  whenNot: >-
    Quando o trabalho é de produção com risco real, quando o orçamento precisa
    ser previsível, ou quando a equipe não tolera mudanças de produto frequentes.
verdict: >-
  Escolha o Antigravity para explorar o limite do desenvolvimento agêntico com
  Gemini — não para sustentar um sistema em produção que precisa de previsibilidade.
prerequisites:
  - Conta Google
  - Disposição para trabalhar com um produto em evolução rápida
  - Um projeto onde erro do agente não vira incidente
related:
  - cursor
  - claude-code
  - context-rot
faq:
  - question: O que significa uma IDE agent-first?
    answer: >-
      Significa que a superfície principal não é o editor de texto, e sim um
      painel onde você acompanha agentes executando tarefas. Editar arquivo à mão
      continua possível, mas deixa de ser o gesto central do trabalho.
  - question: O Antigravity é gratuito?
    answer: >-
      Há um nível gratuito com cota medida, e limites maiores nas assinaturas do
      Google AI. O Google mudou preços e cotas várias vezes desde o lançamento, e
      reclamações sobre créditos acabando sem aviso foram comuns no início de
      2026. Verifique a cota atual antes de planejar em cima dela.
  - question: Ele é melhor que o Cursor?
    answer: >-
      Para trabalho de produção, a avaliação da comunidade continua favorecendo
      o Cursor pela previsibilidade. O Antigravity ganha em prototipação rápida e
      em verificação automática pelo navegador embutido.
  - question: O que o navegador embutido faz de diferente?
    answer: >-
      Ele permite que o agente abra a aplicação, navegue, preencha formulários e
      confira o resultado — em vez de apenas afirmar que o código está correto.
      A verificação deixa de ser só o teste unitário e passa a incluir o fluxo real.
  - question: Vale migrar meu time inteiro para o Antigravity?
    answer: >-
      Hoje, não. O caminho de menor risco é manter a IDE principal do time e usar
      o Antigravity como ambiente paralelo para experimentos e protótipos.
seo:
  metaTitle: 'Google Antigravity: o que é, quando usar e quando não usar | Guia'
  metaDescription: >-
    Guia prático do Google Antigravity, a IDE agent-first construída sobre o
    Gemini: gerenciador de agentes, verificação por navegador embutido, custos e
    quando não usar.
  metaTags:
    - property: keywords
      content: 'Google Antigravity, IDE agêntica, Gemini, agentes de codificação, Agent Manager, desenvolvimento com IA'
      type: MetaTag
  type: Seo
type: GuideLayout
author: content/data/person1.json
---

Quase todas as ferramentas de IA para programação partiram do editor e foram adicionando agentes por cima. O Antigravity, anunciado pelo Google em novembro de 2025 junto com o Gemini 3, tentou o caminho inverso: partir do agente e manter o editor como superfície secundária.

É uma aposta conceitual antes de ser um produto. A tese é que, se os agentes ficarem bons o suficiente, a tela em que você passa o dia não deveria ser um arquivo aberto — deveria ser um painel de trabalho em andamento.

## O que é uma IDE agent-first

Tecnicamente, o Antigravity é mais um fork do VS Code. O que muda é qual tela fica na frente.

<Flow title="A inversão de superfície" direction="row" items="IDE tradicional :: o arquivo é o centro; o agente é um painel lateral | Antigravity :: o gerenciador de agentes é o centro; o arquivo é uma aba" caption="A mesma capacidade em ordem invertida muda o gesto padrão do dia." />

Na prática você abre o Agent Manager, descreve algumas tarefas, e acompanha vários agentes trabalhando em paralelo — cada um com seu plano, seus arquivos e seu progresso visível. Editar código à mão continua disponível, mas deixa de ser o movimento natural.

<OrgChart rootLabel="Agent Manager" root="Você distribui o trabalho :: acompanha planos, aprova e integra" nodes="Agente de feature :: implementa, escreve testes | Agente de correção :: reproduz o bug, corrige | Agente de verificação :: abre o navegador, testa o fluxo" caption="Vários agentes em paralelo, cada um com seu próprio plano e progresso visível." />

## O navegador embutido é o detalhe que importa

De todas as diferenças, esta é a que muda mais o resultado.

A maioria dos agentes de codificação verifica o trabalho rodando testes. Isso comprova que o código faz o que o teste diz — e nada além. O Antigravity embute um Chrome controlado pelo agente: ele abre a aplicação, clica, preenche formulários, olha a tela e confere se o fluxo funciona de ponta a ponta.

<Flow direction="column" title="Verificação com navegador no laço" items="Agente implementa :: a mudança pedida | Agente sobe a aplicação :: no ambiente local | Agente navega :: abre a tela, preenche o formulário, envia | Agente compara :: o que aconteceu contra o que deveria acontecer | Agente corrige ou entrega :: com evidência visual, não com uma afirmação" />

Para trabalho de front-end, isso é uma diferença qualitativa. Um agente que só lê código afirma que o botão funciona; um agente que abriu a página sabe se ele funciona.

<Callout type="tip" title="Onde isso rende mais">
Ajustes de interface, fluxos com formulário e correções de comportamento visual. São exatamente os casos em que o teste automatizado costuma não existir e a verificação humana é lenta e chata.
</Callout>

## Onde ele ainda machuca

Seria desonesto apresentar o Antigravity sem falar do que a comunidade reclamou ao longo de 2026.

**Cota e créditos imprevisíveis.** O modelo de cobrança mudou várias vezes, os limites gratuitos foram reduzidos e o consumo é mais difícil de estimar do que em concorrentes com plano mensal simples. Rodar quatro ou cinco agentes em paralelo consome cota muito mais rápido do que a intuição sugere.

**Produto em movimento.** Em maio de 2026 a plataforma se dividiu em várias superfícies — IDE, aplicativo de desktop, CLI e SDK. Para quem experimenta, é sinal de investimento; para quem depende, é retrabalho.

**Autonomia sem freio suficiente.** Agentes paralelos produzem mudanças em paralelo. Sem revisão disciplinada, o resultado é um diff grande que ninguém entende inteiro — o mesmo risco de qualquer ferramenta agêntica, amplificado pela paralelização.

<DoDont title="Como usar sem se arrepender" doLabel="Faça" dontLabel="Evite" do="Use em protótipos e projetos paralelos, onde erro não vira incidente | Aproveite o navegador embutido em trabalho de interface | Limite o número de agentes paralelos até entender o consumo | Revise cada agente separadamente, não o resultado agregado" dont="Colocar como IDE oficial de um time em produção | Rodar muitos agentes em um repositório crítico | Contar com a cota gratuita para um cronograma | Aceitar o resultado só porque o agente disse que verificou" />

## Como ele se compara

<Compare title="Antigravity, Cursor e Claude Code" columns="Antigravity | Cursor | Claude Code" highlight="0" criteriaLabel="Critério" rows="Tela principal :: Gerenciador de agentes :: Editor de código :: Terminal | Modelo por trás :: Gemini :: Vários, à escolha :: Claude | Verificação :: Navegador embutido, além de testes :: Testes e sua leitura :: Testes e comandos | Previsibilidade de custo :: Baixa, cota mudou várias vezes :: Média, créditos :: Alta, plano mensal ou API | Maturidade :: Preview em evolução :: Estável :: Estável | Melhor uso :: Protótipo rápido e front-end :: Edição interativa diária :: Mudança ampla em repositório" />

## Vale a pena para você?

<Decision question="Um erro de agente no seu projeto pode virar incidente em produção?" yesLabel="Pode" noLabel="Não pode" yes="Mantenha o Antigravity fora do caminho crítico :: Use como laboratório paralelo. Para produção, prefira ferramentas com custo e comportamento previsíveis." no="Vale experimentar agora :: É onde a ideia de gerenciar agentes em vez de escrever código está mais desenvolvida, e o navegador embutido é uma vantagem real." />

O Antigravity é a melhor janela disponível para ver como o trabalho de programação pode ficar quando delegar for o gesto padrão. Isso é valioso — e é diferente de ser a ferramenta certa para o seu sistema em produção hoje.
