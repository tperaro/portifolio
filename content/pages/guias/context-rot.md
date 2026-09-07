---
title: Context rot
subtitle: Por que encher a janela de contexto piora a resposta — e o que fazer a respeito.
slug: /guias/context-rot
date: '2026-08-18'
updatedDate: '2026-08-18'
excerpt: >-
  Context rot é a degradação da qualidade de um modelo conforme o contexto
  cresce. Este guia explica por que acontece, o que a pesquisa mostrou, como
  reconhecer o sintoma e as cinco técnicas que resolvem na prática.
kind: concept
topics:
  - context
  - nlp
  - rag
level: intermediate
order: 50
readingTime: 12
pricing: na
vendor: null
icon: decay
accentColor: '#B4441F'
tldr:
  what: >-
    A queda mensurável de qualidade de um LLM conforme o número de tokens de
    entrada cresce — mesmo em tarefas simples e mesmo dentro da janela anunciada.
  when: >-
    Use o conceito sempre que for decidir quanto contexto injetar: em RAG, em
    agentes de longa duração e em qualquer prompt que cresce com o tempo.
  whenNot: >-
    Não é desculpa para não dar contexto. Contexto insuficiente erra mais rápido
    e mais feio que contexto grande.
verdict: >-
  Janela de contexto é capacidade de armazenamento, não promessa de atenção —
  trate cada token como custo de qualidade, não só de fatura.
prerequisites:
  - Noção do que é janela de contexto e token
related:
  - rag-vs-rag-empresarial
  - claude-code
  - skills
faq:
  - question: O que é context rot em uma frase?
    answer: >-
      É a degradação da qualidade da resposta de um LLM conforme o contexto de
      entrada cresce, mesmo quando o conteúdo relevante continua presente e
      mesmo dentro do limite anunciado da janela.
  - question: Se o modelo tem 1 milhão de tokens de janela, por que não usar tudo?
    answer: >-
      Porque a janela é o limite físico, não a região onde o desempenho se
      mantém. Nos testes com modelos de janela muito grande, um efeito claro
      costuma aparecer bem antes do limite, na faixa das centenas de milhares de
      tokens. Caber não é o mesmo que funcionar bem.
  - question: O benchmark needle in a haystack não provou que long context está resolvido?
    answer: >-
      Não. O NIAH mede recuperação quase literal de uma frase inserida em um
      texto longo, que é a tarefa mais fácil possível nesse formato. Tarefas
      reais exigem síntese, desambiguação e ignorar distratores — e é aí que a
      queda aparece.
  - question: Aumentar o contexto sempre piora?
    answer: >-
      Não. Contexto relevante melhora. O que piora é contexto irrelevante,
      duplicado, contraditório ou desorganizado. O objetivo não é minimizar
      tokens e sim maximizar a densidade de relevância.
  - question: Como sei que estou sofrendo de context rot?
    answer: >-
      Os sintomas típicos são: o modelo ignora uma instrução que estava no
      começo, mistura duas fontes parecidas, responde com uma versão antiga de
      um documento que aparece duas vezes, ou fica pior justamente depois que
      você adicionou mais material de apoio.
seo:
  metaTitle: 'Context rot: o que é, por que acontece e como evitar | Guia'
  metaDescription: >-
    Guia sobre context rot: a degradação de qualidade dos LLMs conforme o
    contexto cresce, o que a pesquisa da Chroma mostrou e cinco técnicas
    práticas para manter a densidade de relevância alta.
  metaTags:
    - property: keywords
      content: 'context rot, janela de contexto, long context, context engineering, needle in a haystack, RAG, LLM'
      type: MetaTag
  type: Seo
type: GuideLayout
author: content/data/person1.json
---

Existe uma intuição confortável sobre modelos de linguagem que quase todo mundo carrega no começo: se o modelo aceita um milhão de tokens, então enfiar mais material lá dentro só pode ajudar. Na pior das hipóteses, ele ignora o que não interessa.

Não é o que acontece. A partir de certo ponto, adicionar contexto **piora** a resposta — inclusive contexto que você considera útil. O nome que pegou para esse fenômeno é *context rot*.

> **Resposta direta:** context rot é a queda mensurável da qualidade de um LLM conforme o número de tokens de entrada cresce, mesmo em tarefas simples e mesmo com a informação relevante presente. A janela de contexto define o que cabe, não a região em que o desempenho se mantém.

## O que a pesquisa mostrou

O termo surgiu numa discussão pública em meados de 2025 e ganhou corpo com um relatório da Chroma Research, publicado em julho daquele ano, que testou 18 modelos de ponta em tarefas derivadas do clássico *needle in a haystack*.

O resultado incômodo: o desempenho cai conforme a entrada cresce, mesmo em tarefas triviais. A queda não é linear nem uniforme entre modelos — mas está presente em todos. Em modelos com janela de um milhão de tokens, um efeito claramente observável costuma aparecer bem antes do limite, na faixa das centenas de milhares.

<BarChart title="Formato típico da curva" axisLabel="Acerto em uma tarefa fixa conforme o contexto cresce" unit="%" max="100" items="8 mil tokens :: 95 | 32 mil tokens :: 90 | 128 mil tokens :: 78 | 400 mil tokens :: 62 | 900 mil tokens :: 48" caption="Números ilustrativos do formato da curva relatada na literatura, não medição de um modelo específico. O valor de cada modelo varia; o formato se repete." />

### Por que o benchmark clássico enganou tanta gente

O *needle in a haystack* insere uma frase específica em um texto longo e pergunta por ela. Os modelos vão bem nisso — daí a impressão generalizada de que contexto longo estava resolvido.

O problema é que essa tarefa mede uma capacidade estreita: recuperação quase literal. A pesquisa mostrou que basta afastar a tarefa dessa condição ideal para a queda aparecer.

<Compare title="Por que o NIAH superestima a capacidade real" columns="No benchmark | No seu sistema" highlight="1" criteriaLabel="Fator" rows="Semelhança pergunta-resposta :: Alta, quase literal :: Baixa, a pergunta usa outras palavras | Distratores :: Nenhum ou poucos :: Vários trechos parecidos e plausíveis | Estrutura do material :: Texto coeso :: Fragmentos de fontes diferentes, colados | Número de fatos necessários :: Um :: Vários, que precisam ser combinados | Contradições :: Nenhuma :: Versões antigas e novas do mesmo documento" />

Os quatro fatores que a pesquisa isolou aparecem juntos no mundo real. Quanto **menos** a pergunta se parece literalmente com a resposta, mais forte a degradação com o aumento do contexto. Distratores plausíveis pioram. Material desestruturado piora.

## Como isso se manifesta no dia a dia

Context rot raramente aparece como uma falha óbvia. Ele aparece como qualidade que escorre.

<Flow direction="column" title="A progressão que quase todo projeto vive" items="Funciona muito bem :: prompt enxuto, poucos documentos, respostas certeiras | Adicionamos mais fontes :: a cobertura melhora, a precisão começa a oscilar | Aumentamos o top-k do retrieval :: para não perder nada, trazemos mais trechos | A qualidade cai :: e a suspeita recai sobre o modelo | Trocamos de modelo :: e o problema continua, porque nunca foi o modelo" />

Os sintomas mais reconhecíveis:

- o modelo ignora uma instrução que estava no início do prompt;
- ele responde com base em uma versão desatualizada de um documento que aparece duas vezes na entrada;
- ele mistura dois casos parecidos, atribuindo detalhe de um ao outro;
- a resposta piorou logo depois que você adicionou mais material de apoio.

O último é o mais diagnóstico. Se adicionar informação piorou o resultado, o problema não é falta de informação.

<Callout type="warn" title="O reflexo errado">
Diante de uma resposta ruim, o instinto é dar mais contexto. Em um sistema já saturado, isso acelera a queda. O movimento certo é o oposto: cortar até achar o mínimo que responde bem, e só então crescer com critério.
</Callout>

## As cinco técnicas que resolvem

A engenharia de contexto contra context rot é sempre a mesma ideia com nomes diferentes: **aumentar a densidade de relevância**, ou seja, a proporção do contexto que realmente serve para a pergunta.

### 1. Recuperar melhor em vez de recuperar mais

Aumentar o top-k é a solução que parece resolver e cobra depois. Vinte trechos com cinco relevantes rendem menos que cinco trechos relevantes. Reordenação por relevância — o *reranking* — costuma render mais que qualquer aumento de quantidade.

### 2. Comprimir antes de injetar

Documento inteiro raramente é a unidade certa. Resumir cada fonte antes de colocá-la no prompt troca mil tokens de texto bruto por cem tokens de conteúdo útil.

### 3. Isolar contexto em subagentes

Quando uma subtarefa exige ler muito material para produzir uma conclusão curta, delegue. O subagente lê os quarenta arquivos; só a conclusão volta para a conversa principal. É a técnica que faz [subagentes em ferramentas de codificação](/guias/claude-code) valerem a pena, e o ganho é de higiene, não de velocidade.

<OrgChart rootLabel="Contexto principal" root="Mantém só o essencial :: objetivo, decisões e conclusões" nodes="Leitor de docs :: lê 40 páginas, devolve 5 linhas | Explorador de código :: varre o repo, devolve 3 caminhos | Analista de dados :: processa a tabela, devolve o número" caption="O material bruto morre no subagente. Só a conclusão sobe." />

### 4. Carregar sob demanda

Em vez de colocar todo o conhecimento no prompt desde o início, coloque só o índice — e deixe o modelo pedir o detalhe quando precisar. É exatamente o princípio de divulgação progressiva que sustenta as [Agent Skills](/guias/skills).

### 5. Reiniciar em vez de esticar

Conversa longa acumula decisões revogadas, caminhos abandonados e material que já não vale. Terminar a tarefa e começar uma sessão nova é a técnica mais barata da lista, e a mais ignorada.

<DoDont title="Resumo operacional" doLabel="Faça" dontLabel="Evite" do="Medir qualidade com contexto pequeno antes de crescer | Reordenar por relevância antes de aumentar quantidade | Resumir fontes longas antes de injetar | Delegar leitura pesada a subagentes | Encerrar a sessão quando a tarefa acaba" dont="Aumentar o top-k para não perder nada | Colar documentos inteiros porque cabem | Manter versões antiga e nova do mesmo documento na entrada | Confiar que o modelo ignora o irrelevante | Culpar o modelo antes de auditar o contexto" />

## Como medir no seu caso

Não dá para gerenciar o que não se mede, e a medida aqui é simples de montar.

<Flow direction="column" title="Um teste que cabe em uma tarde" items="Monte 30 perguntas com resposta conhecida :: do seu domínio real, não sintéticas | Rode com contexto mínimo :: só o trecho que responde. Esse é o seu teto. | Rode com o contexto atual de produção :: a diferença para o teto é o seu prejuízo | Rode com o dobro de contexto :: se piorar, você achou o ponto de virada | Corte até voltar ao teto :: e mantenha essa configuração como padrão" />

O número que importa dessa medição é a distância entre o teto e a produção. Se ela for grande, o ganho disponível está em engenharia de contexto — e não em trocar de modelo.

<Decision question="Adicionar contexto novo melhorou o resultado da última vez?" yesLabel="Melhorou" noLabel="Piorou ou ficou igual" yes="Você ainda está na região saudável :: Continue crescendo, mas meça a cada passo. O ponto de virada existe e chega sem avisar." no="Você já passou do ponto :: Pare de adicionar. Corte, reordene e resuma — é onde está todo o ganho disponível agora." />

A frase que vale guardar: **a janela de contexto é um limite de armazenamento, não uma promessa de atenção.** Cada token que você adiciona compete com todos os outros pela atenção do modelo. Contexto é orçamento, e orçamento se administra.
