---
title: Claude Code
subtitle: O agente de codificação da Anthropic que mora no terminal e trabalha dentro do seu repositório.
slug: /guias/claude-code
date: '2026-08-18'
updatedDate: '2026-08-18'
excerpt: >-
  O que é o Claude Code, como ele difere de um autocomplete de IDE, quando ele
  compensa, quando atrapalha e como montar um fluxo de trabalho que não vira
  bagunça no seu repositório.
kind: tool
topics:
  - coding
  - multiagent
level: beginner
order: 10
readingTime: 11
pricing: freemium
vendor: Anthropic
officialUrl: 'https://claude.com/product/claude-code'
icon: terminal
accentColor: '#C15F3C'
tldr:
  what: >-
    Um agente de codificação que roda no terminal, lê e edita os arquivos do seu
    projeto, executa comandos e commita — em vez de só sugerir a próxima linha.
  when: >-
    Quando a tarefa envolve vários arquivos, exige entender o repositório inteiro
    ou é repetitiva o bastante para você conseguir descrevê-la em uma frase.
  whenNot: >-
    Quando você não sabe explicar o resultado esperado, quando o código é crítico
    e ninguém vai revisar, ou quando a mudança cabe em duas linhas que você
    digitaria mais rápido.
verdict: >-
  Escolha o Claude Code em vez de um assistente dentro da IDE quando o gargalo é
  entender e mudar o sistema inteiro — e não escrever a próxima linha.
prerequisites:
  - Git instalado e o projeto versionado
  - Node.js 18+ no ambiente
  - Uma assinatura Claude ou uma chave de API
related:
  - codex
  - cursor
  - skills
faq:
  - question: Claude Code substitui a IDE?
    answer: >-
      Não. Ele substitui uma parte do trabalho de digitação e navegação, não o
      editor. O padrão mais comum é deixar a IDE aberta para ler diffs e depurar,
      e usar o Claude Code no terminal ao lado para executar a mudança.
  - question: Claude Code é grátis?
    answer: >-
      Não. Ele está incluído nas assinaturas do Claude (Pro, Max, Team e
      Enterprise) e também pode ser usado por API, cobrado por token. Existe um
      nível de uso generoso nos planos pagos, mas não há um tier gratuito
      permanente.
  - question: Qual a diferença entre Claude Code e Cursor?
    answer: >-
      Cursor é um editor: a IA está integrada à interface de edição de arquivos.
      Claude Code é um agente de terminal: ele opera o repositório com as mesmas
      ferramentas que você usaria (ls, grep, git, testes). Muita gente usa os
      dois — Cursor para editar, Claude Code para tarefas amplas.
  - question: Ele pode apagar meu código?
    answer: >-
      Ele pode editar e remover arquivos, sim. Por isso as duas regras não
      negociáveis são: trabalhe sempre em um repositório versionado, e nunca em
      um branch que você não possa descartar. Além disso, o modo de permissões
      pede confirmação antes de comandos destrutivos.
  - question: Dá para usar Claude Code em um monorepo grande?
    answer: >-
      Dá, e é justamente onde ele rende mais — mas exige disciplina de contexto.
      Aponte o trabalho para um subdiretório, descreva o que é relevante em um
      CLAUDE.md e evite pedir tarefas que atravessem dez pacotes de uma vez.
seo:
  metaTitle: 'Claude Code: o que é, quando usar e quando não usar | Guia'
  metaDescription: >-
    Guia prático do Claude Code, o agente de codificação da Anthropic no
    terminal: como funciona, o fluxo de trabalho que dá certo, quando ele
    compensa e quando ele atrapalha.
  metaTags:
    - property: keywords
      content: 'Claude Code, agente de codificação, Anthropic, CLI de IA, programação com IA, CLAUDE.md, subagentes'
      type: MetaTag
  type: Seo
type: GuideLayout
author: content/data/person1.json
---

Durante uns três anos, "IA para programar" significou basicamente uma coisa: um autocomplete mais esperto. Você digitava, uma sugestão cinza aparecia, você apertava Tab. Útil, mas limitado a um problema pequeno — a linha seguinte.

O Claude Code parte de outra premissa. Em vez de sugerir texto dentro do editor, ele opera o seu repositório com as mesmas ferramentas que você usaria: lista arquivos, faz grep, lê o que precisa, edita, roda os testes, lê o erro, corrige, commita. É a diferença entre um estagiário que dita código por cima do seu ombro e um que senta na máquina.

Isso muda a unidade de trabalho. Você para de pedir "escreva essa função" e passa a pedir "essa API retorna 500 quando o campo de data vem vazio; encontre a causa e corrija com um teste de regressão".

## O que é o Claude Code, na prática

É um programa de linha de comando. Você instala, entra na pasta do projeto, digita `claude` e descreve o que quer em português. A partir daí ele trabalha em um laço: lê o contexto necessário, propõe ou executa uma ação, observa o resultado e decide o próximo passo — até terminar ou até você interromper.

<Terminal title="Instalação e primeiro uso" lines="npm install -g @anthropic-ai/claude-code | cd meu-projeto | claude" caption="Ele usa o diretório atual como raiz de trabalho — por isso o cd importa." />

O laço é o ponto central. Um autocomplete devolve texto e acaba; um agente devolve texto, olha o que aconteceu e continua.

<Flow title="O laço do agente" items="Você descreve o objetivo :: em linguagem natural, com o critério de pronto | Ele levanta contexto :: lê arquivos, faz busca, entende as convenções do repo | Ele age :: edita arquivos, roda comandos, executa testes | Ele observa :: lê a saída, o erro, o diff | Ele decide :: corrige e repete, ou entrega e explica" caption="Cada volta do laço custa tokens e tempo. Objetivos vagos fazem o laço girar sem convergir." />

## Quando o Claude Code compensa

O critério não é o tamanho da tarefa, é a **razão entre entender e digitar**. Se a maior parte do esforço é descobrir onde mexer, ele ganha. Se a maior parte é digitar algo que você já tem pronto na cabeça, você ganha.

<DoDont title="Onde ele rende e onde ele atrapalha" doLabel="Rende muito" dontLabel="Atrapalha" do="Mudanças que atravessam muitos arquivos, como renomear um conceito no domínio inteiro | Trabalho de arqueologia: entender um módulo que ninguém toca há dois anos | Bugs com reprodução clara — ele roda o teste, vê falhar, corrige, vê passar | Migrações mecânicas e repetitivas, como trocar uma biblioteca de datas | Escrever a primeira bateria de testes de um módulo sem cobertura" dont="Mudanças de duas linhas que você digitaria em quinze segundos | Decisões de arquitetura ainda não tomadas — ele vai escolher uma por você | Código sem rede de proteção: sem testes, sem revisão, sem versionamento | Tarefas cujo resultado correto você mesmo não sabe descrever" />

Um detalhe que quase ninguém menciona no começo: o momento em que o Claude Code é mais valioso não é quando você sabe exatamente o que fazer. É quando você sabe **o que precisa ficar verdadeiro no final** — "o endpoint responde 400 com mensagem clara quando a data é inválida" — e não sabe onde mexer.

## O fluxo que funciona

Depois de algumas centenas de horas com ferramentas desse tipo, o padrão que dá certo é sempre o mesmo, e ele tem pouco a ver com o prompt.

<Flow direction="column" title="Ciclo de uma tarefa" items="Branch novo :: nunca trabalhe na main. É a sua única garantia de desfazer tudo. | Descreva o critério de pronto :: o que precisa passar, não o que precisa ser digitado | Peça o plano antes da edição :: revisar um plano de dez linhas é mais barato que revisar um diff de trezentas | Deixe ele executar :: interrompa se o caminho estiver errado, não se o estilo estiver diferente do seu | Revise o diff como se fosse de outra pessoa :: porque é | Rode os testes você mesmo :: a confirmação vale mais que o relatório" />

O passo que mais economiza tempo é o terceiro. Um plano errado custa uma frase para corrigir; um diff errado custa uma leitura inteira.

### O arquivo CLAUDE.md

Um projeto tem convenções que não estão escritas em lugar nenhum: onde ficam os testes, qual gerenciador de pacotes é o oficial, qual pasta é legado e não deve ser tocada, qual comando roda o lint. Sem isso, o agente descobre por tentativa — e às vezes descobre errado.

O `CLAUDE.md` na raiz do repositório é onde esse conhecimento fica. Ele é lido automaticamente no começo de cada sessão.

<Callout type="tip" title="O que colocar no CLAUDE.md">
Comandos que você roda o tempo todo (testes, lint, build), a convenção de commits, as pastas que ninguém deve tocar e as decisões arquiteturais que já foram discutidas. O que **não** colocar: descrição da estrutura de pastas, que o agente lê sozinho em segundos, e que envelhece a cada refatoração.
</Callout>

### Subagentes: quando dividir vale a pena

O Claude Code consegue delegar partes do trabalho para sessões paralelas, cada uma com a própria janela de contexto. Isso serve para dois problemas diferentes.

<OrgChart rootLabel="Sessão principal" root="Você e o objetivo :: mantém o plano e junta os resultados" nodes="Explorador :: varre o repo, localiza os pontos de mudança | Executor :: aplica a mudança em um módulo isolado | Revisor :: lê o diff com olhar adversarial" caption="Cada subagente tem contexto próprio: o que ele leu não polui a sessão principal." />

O ganho real não é velocidade — é **higiene de contexto**. Uma busca que precisa abrir quarenta arquivos para encontrar três relevantes despeja trinta e sete arquivos irrelevantes na conversa. Delegando, só as três conclusões voltam. Esse é exatamente o problema que o [context rot](/guias/context-rot) descreve.

Delegue quando a subtarefa é independente e produz uma conclusão curta. Não delegue quando as partes precisam conversar entre si o tempo todo — a coordenação custa mais do que a paralelização economiza.

## Onde as pessoas se machucam

**Tratar o agente como oráculo.** Ele afirma com a mesma confiança quando acertou e quando chutou. A revisão do diff não é opcional; é a etapa em que você continua sendo o engenheiro.

**Sessões eternas.** Conversas muito longas degradam: o modelo passa a misturar decisões antigas com o objetivo atual. Terminou a tarefa, comece uma sessão nova. É de graça e melhora a qualidade.

**Pedir tudo de uma vez.** "Refatore o backend inteiro" produz um diff que ninguém revisa e, por isso, ninguém confia. Três tarefas de uma hora rendem mais que uma de três horas.

**Esquecer o custo.** Cada volta do laço lê e escreve tokens. Um objetivo vago não erra apenas o resultado — ele gira o laço várias vezes antes de errar.

## Como ele se compara

<Compare title="Claude Code, Codex e Cursor no dia a dia" columns="Claude Code | Codex | Cursor" highlight="0" criteriaLabel="Critério" rows="Onde vive :: Terminal, dentro do repo :: Terminal, IDE, nuvem e PRs :: Editor (fork do VS Code) :: | Unidade de trabalho :: Tarefa com critério de pronto :: Tarefa, e revisão automática de PR :: Arquivo aberto e seleção :: | Melhor em :: Mudanças amplas e arqueologia de código :: Delegar tarefas assíncronas e revisar PRs :: Edição interativa com feedback imediato :: | Curva inicial :: Baixa, se você já vive no terminal :: Baixa :: Muito baixa, é um editor :: | Modelo mental :: Um colega que opera o repo :: Uma fila de tarefas com um agente :: Um par ao seu lado editando :: " />

Não é uma disputa em que só um sobrevive. O arranjo mais comum entre quem usa isso a sério é editor para leitura e ajuste fino, agente de terminal para a mudança em si.

## Um exemplo completo

Situação real e chata: um endpoint devolve 500 quando o cliente manda uma data em formato inesperado, e ninguém sabe onde a validação deveria estar.

O pedido ruim é "conserte o bug da data". Ele não diz como saber que acabou.

O pedido bom descreve o estado final:

<Callout type="answer" title="Como pedir">
"O endpoint POST /reservas devolve 500 quando `checkin` vem como `31/12/2026` em vez de ISO. Quero que devolva 400 com uma mensagem que diga qual campo está errado e qual formato é esperado. Encontre onde a validação deveria acontecer, siga o padrão que já existe nos outros endpoints, e adicione um teste de regressão."
</Callout>

A diferença é que agora existe um critério verificável. O agente pode rodar o teste e saber se terminou — e você também.

## Vale a pena para você?

<Decision question="Seu trabalho envolve mudar código que você não escreveu?" yesLabel="Sim" noLabel="Não" yes="Claude Code compensa rápido :: O ganho vem de navegação e compreensão, que é justamente o caro nesse cenário." no="Comece por um assistente de IDE :: Se você escreve código novo em um projeto que domina, o autocomplete de IDE cobre a maior parte do ganho com menos setup." />

E a regra que resume tudo: **agente em repositório sem versionamento é uma aposta, não uma ferramenta.** Com git e testes, o pior caso é `git checkout .`. Sem eles, o pior caso é uma sexta-feira ruim.
