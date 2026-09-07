---
title: Cursor
subtitle: O editor que colocou a IA no centro da edição de código — e virou o padrão de fato para programar com assistência.
slug: /guias/cursor
date: '2026-08-18'
updatedDate: '2026-08-18'
excerpt: >-
  O que o Cursor faz que uma extensão de IDE não faz, como o Composer muda a
  unidade de trabalho, como funciona o consumo por créditos e em que situações
  ele não é a escolha certa.
kind: tool
topics:
  - coding
level: beginner
order: 30
readingTime: 10
pricing: freemium
vendor: Anysphere
officialUrl: 'https://cursor.com'
icon: caret
accentColor: '#6E56CF'
tldr:
  what: >-
    Um editor de código — fork do VS Code — em que a IA não é um plugin, e sim
    parte da forma de editar arquivos, navegar e refatorar.
  when: >-
    Quando você quer manter a mão no volante: editar, ver o diff na hora, ajustar
    e seguir, com o menor atrito possível entre pensar e aplicar.
  whenNot: >-
    Quando a sua equipe é presa a uma IDE específica, quando o código não pode
    sair da rede interna, ou quando você precisa de automação sem ninguém olhando.
verdict: >-
  Escolha o Cursor quando o valor está em editar rápido com feedback imediato —
  e não em despachar uma tarefa e voltar depois.
prerequisites:
  - Familiaridade com VS Code (atalhos e extensões são os mesmos)
  - Um projeto local aberto
related:
  - claude-code
  - codex
  - context-rot
faq:
  - question: Cursor é só um VS Code com ChatGPT dentro?
    answer: >-
      Não. Ele é um fork do VS Code, então a base é a mesma, mas as partes que
      importam foram reescritas: indexação do projeto, aplicação de edições em
      vários arquivos, o modelo de autocomplete próprio e o agente Composer.
      Extensões e atalhos do VS Code continuam funcionando.
  - question: Quanto custa o Cursor?
    answer: >-
      Existe um plano gratuito e uma escada de planos pagos, do individual ao
      corporativo, com preços que a Anysphere ajustou várias vezes. O ponto mais
      importante não é o valor mensal e sim o modelo: desde 2025 o consumo é por
      créditos, e modelos mais caros queimam créditos várias vezes mais rápido.
  - question: Dá para usar o Cursor sem mandar código para fora?
    answer: >-
      Existe um modo de privacidade que evita retenção do código, e planos
      corporativos com garantias contratuais. Mas o processamento continua
      acontecendo em servidores de terceiros. Se a sua política proíbe isso, a
      resposta é não.
  - question: Cursor ou Claude Code?
    answer: >-
      Cursor é um editor, Claude Code é um agente de terminal. Cursor ganha em
      edição interativa com feedback imediato; Claude Code ganha em mudanças
      amplas e em entender um repositório desconhecido. Muita gente usa os dois.
  - question: O Composer substitui o autocomplete?
    answer: >-
      Não, eles resolvem coisas diferentes. O autocomplete atua na linha que você
      está digitando; o Composer atua em um conjunto de arquivos a partir de uma
      instrução. O bom uso é alternar entre os dois conforme o tamanho da mudança.
seo:
  metaTitle: 'Cursor: o que é, quando usar e quando não usar | Guia'
  metaDescription: >-
    Guia prático do Cursor: como o editor difere de uma extensão de IDE, o que o
    Composer muda no fluxo de trabalho, como funcionam os créditos e quando ele
    não é a ferramenta certa.
  metaTags:
    - property: keywords
      content: 'Cursor, editor com IA, Composer, VS Code com IA, programação com IA, Anysphere'
      type: MetaTag
  type: Seo
type: GuideLayout
author: content/data/person1.json
---

O Cursor resolveu um problema que parecia detalhe e não era: onde a IA mora dentro do editor.

Quando a IA é uma extensão, ela vive numa barra lateral. Você conversa em um lugar, copia, cola em outro, resolve o conflito à mão. Cada passo desses é pequeno, e é justamente por isso que ninguém percebe o quanto custam somados.

O Cursor é um fork do VS Code em que essa fronteira não existe. A IA vê o projeto indexado, propõe edições diretamente nos arquivos e mostra tudo como diff, para você aceitar ou rejeitar. A diferença não é de capacidade do modelo — é de atrito.

## O que muda na prática

Três mecanismos fazem quase todo o trabalho. Vale entender cada um porque eles servem a tamanhos de mudança diferentes.

<Flow title="Os três modos de edição" direction="row" items="Autocomplete :: prevê a próxima edição, não só a próxima palavra — inclusive em outro ponto do arquivo | Edição inline :: você seleciona um trecho, descreve a mudança, recebe um diff no lugar | Composer :: um agente que edita vários arquivos a partir de uma instrução" caption="A escolha certa depende do tamanho da mudança: linha, bloco ou conjunto de arquivos." />

O autocomplete do Cursor é o recurso que mais converte gente cética. Ele não completa apenas o que você está digitando: ele percebe o padrão da edição em andamento e sugere o próximo lugar a mudar. Se você renomeou um campo na linha 12, ele oferece a mesma renomeação na 47.

### Composer: quando a unidade de trabalho deixa de ser o arquivo

O Composer é o modo agente. Você descreve o objetivo, ele localiza os arquivos relevantes, aplica as mudanças e mostra o conjunto para revisão. As versões recentes ampliaram bastante o alcance — refatorações que antes exigiam três ou quatro rodadas encadeadas passaram a caber em uma.

<Callout type="tip" title="O hábito que mais melhora o resultado">
Antes de pedir uma mudança grande, abra os arquivos que você sabe que importam. O contexto do que está aberto pesa. Um Composer bem alimentado erra menos do que um Composer que precisa adivinhar onde a verdade está.
</Callout>

## Créditos: o que realmente pesa na conta

Desde 2025 o consumo é medido por créditos, e não por número de pedidos. A consequência é direta: **a escolha do modelo importa mais que a quantidade de perguntas.** Um modelo de topo pode queimar créditos em ritmo várias vezes maior que um modelo intermediário para o mesmo trabalho.

<DoDont title="Como não torrar créditos sem perceber" doLabel="Faça" dontLabel="Evite" do="Use o modelo mais barato para tarefas mecânicas e reserve o caro para o problema difícil | Feche abas irrelevantes antes de uma tarefa grande — contexto aberto é contexto cobrado | Divida refatorações grandes em etapas revisáveis | Acompanhe o consumo na primeira semana até calibrar o hábito" dont="Deixar o modelo mais caro fixo como padrão para tudo | Pedir refatoração do projeto inteiro em uma instrução | Manter conversas enormes vivas por horas | Repetir o mesmo pedido com pequenas variações em vez de corrigir o pedido" />

## Onde o Cursor não é a resposta

Três situações em que ele não é a ferramenta certa, e é melhor saber antes:

**Política de dados restritiva.** Se o código não pode sair da rede interna, nem o modo de privacidade resolve — o processamento continua acontecendo fora.

**Trabalho assíncrono.** O Cursor é feito para você estar ali. Para despachar uma tarefa e voltar depois, um agente de nuvem como o [Codex](/guias/codex) se encaixa melhor.

**Padronização de IDE.** Em ambientes onde a IDE é imposta por regulação ou pelo ferramental interno, migrar o editor inteiro é uma decisão de time, não de pessoa.

## Cursor, Claude Code e Codex lado a lado

<Compare title="A mesma tarefa em três ferramentas" columns="Cursor | Claude Code | Codex" highlight="0" criteriaLabel="Critério" rows="Formato :: Editor completo :: Agente de terminal :: Agente em quatro superfícies | Melhor unidade de trabalho :: Bloco ou conjunto de arquivos :: Tarefa com critério de pronto :: Tarefa despachada e revisada depois | Presença exigida :: Alta, é interativo :: Média, você orienta e revisa :: Baixa nas tarefas em nuvem | Curva de adoção :: Muito baixa, é VS Code :: Baixa, se você vive no terminal :: Baixa | Onde decepciona :: Automação sem supervisão :: Edição miúda e interativa :: Equipes sem capacidade de revisão" />

## O fluxo que funciona

<Flow direction="column" title="Um ciclo saudável no Cursor" items="Abra os arquivos que importam :: contexto explícito rende mais que contexto adivinhado | Escolha o modo pelo tamanho da mudança :: linha, bloco ou conjunto | Descreva a mudança, não o código :: o que precisa ficar verdadeiro no final | Leia o diff antes de aceitar :: aceitar tudo em bloco é como fazer merge sem ler | Rode os testes :: a IDE mostra o que mudou, não se continua funcionando" />

<Decision question="Você acompanha o código enquanto ele é escrito?" yesLabel="Sim, quase sempre" noLabel="Não, prefiro delegar" yes="Cursor é provavelmente a sua ferramenta principal :: O ganho vem do ciclo curto entre pedir, ver o diff e ajustar." no="Um agente assíncrono se encaixa melhor :: Codex na nuvem ou Claude Code em tarefas longas devolvem mais do que um editor interativo." />

O resumo é simples: **o Cursor não te faz escrever código mais rápido; ele encurta a distância entre decidir e aplicar.** Para quem passa o dia editando código que conhece, essa é a maior parte do ganho disponível.
