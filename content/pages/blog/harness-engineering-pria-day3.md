---
title: 'A nota fiscal de uma conversa: harness engineering para startups de IA'
slug: a-nota-fiscal-de-uma-conversa-harness-engineering
translationKey: pria-day3-harness-engineering
date: '2026-11-03'
excerpt: >-
  O que levei a 30 startups de IA no PRIA, dentro do hub de inovação do
  Bradesco: quanto custa cada conversa de um agente, onde cortar, a máquina de
  estados que monta o prompt e os erros que cometi na Clivia.
featuredImage:
  url: /images/blog/nota-fiscal-conversa.webp
  altText: >-
    Nota fiscal de uma conversa de agente de IA: o total riscado de R$ 4,63 dá
    lugar a R$ 1,32 depois de arrumar o harness
  type: ImageBlock
  width: 1200
  height: 630
  styles:
    self:
      borderRadius: medium
isFeatured: false
seo:
  metaTitle: 'A nota fiscal de uma conversa: harness engineering | Thiago Peraro'
  metaDescription: >-
    Quanto custa cada conversa de um agente de IA e onde cortar: cache de prompt,
    orquestrador de entrada e saída, máquina de estados, código determinístico,
    LangGraph em produção, bancada de desenvolvimento e segurança no CI/CD.
  socialImage: /images/blog/nota-fiscal-conversa.png
  metaTags:
    - property: keywords
      content: >-
        harness engineering, agentes de IA, custo de LLM, prompt caching, context
        engineering, LangGraph, máquina de estados, multiagente, SDLC AI-native,
        segurança em CI/CD, PRIA, inovabra
  type: Seo
colors: bg-light-fg-dark
type: PostLayout
author: content/data/person1.json
---

Que espaço incrível para palestrar: 30 startups de IA dentro do hub de inovação do Bradesco.

No dia 16 de outubro de 2026 eu voei de Goiânia a São Paulo para ser mentor delas no inovabra habitat, o hub do segundo maior banco privado do Brasil. O encontro faz parte do PRIA, o Programa de Residência em IA do inovabra, realizado com dois centros de pesquisa da Universidade Federal de Goiás, o CEIA e o AKCIT, e com a participação de Google e NVIDIA. São seis imersões presenciais, e o dia inteiro desta, a terceira, foi sobre harness engineering.

![Mentores e participantes do PRIA Day 3 de mãos para cima em frente ao telão, no inovabra habitat](/images/blog/pria-day3-turma.webp)

Este post é a versão escrita do que levei para a sala, com o que não coube no tempo e a fonte de cada número.

> **Resposta direta:** harness é tudo o que você constrói ao redor do modelo para a IA funcionar no negócio. Num agente de conversa, a maior parte da conta vem da entrada, porque cada chamada relê prompt, ferramentas e histórico. Por isso os maiores cortes vêm da ordem do prompt, de quantas vezes o histórico é lido e do que sai do modelo e vai para código determinístico. Num exemplo que montei, isso leva uma conversa de agendamento por WhatsApp de R$ 4,63 para R$ 1,32.

## Existem dois harnesses

A LangChain resumiu o termo numa frase: *"If you're not the model, you're the harness."* O modelo sozinho não resolve. O que faz a IA funcionar é o que fica em volta dele: as ferramentas que ele acessa, o conhecimento que ele tem, o contexto que entra em cada chamada e o que ele pode fazer sem pedir permissão.

A primeira coisa que levei foi a diferença entre dois harnesses que costumam aparecer misturados:

| | Harness da bancada | Harness do produto |
|---|---|---|
| **O que é** | o agente que escreve o seu código, num SDLC AI-native | o agente que atende o seu cliente |
| **Do que é feito** | mapa, spec, sensores, permissões, skills e paralelismo | prompt, ferramentas, contexto e custo por conversa |
| **O que ele decide** | a velocidade do seu time | a sua margem |

Se você é o único dev da startup, os dois são você. Por isso vale escrever as regras em arquivo, e não deixar na cabeça.

A maior parte deste post é sobre o segundo, que foi onde eu mais errei. O primeiro volta mais para o fim, junto com o SDLC e a segurança.

## Eu já estive onde essas startups estão

Em 2024 eu fundei a Clivia, um agente de IA no WhatsApp para clínicas. Conhecimento em IA envelhece em três meses, e mesmo assim os erros que cometi lá atrás continuam sendo novidade para quase todo mundo da área. Foi de lá que veio a maior parte do que ensinei.

Dois avisos antes dos números. Os da Clivia são de um caso só: medi o tamanho dos prompts no código, mas não medi tokens antes e depois, então o que tenho é estimativa e fórmula. Já a nota fiscal abaixo vem de um agente fictício de agendamento que montei para o dia, com as premissas abertas. É um modelo, não uma medição, e o que importa nela é a proporção entre as linhas.

## A nota fiscal de uma conversa

Na tabela de preços, a saída custa cinco vezes a entrada: o Sonnet 5.5 cobra US$ 2 por milhão de tokens de entrada e US$ 10 por milhão de saída. Por isso todo mundo tenta encurtar a resposta. Só que, num agente de vários turnos, cada chamada relê o prompt, as ferramentas e o histórico inteiro. No meu exemplo, 90% do custo de uma conversa de 20 turnos é entrada, e a Manus relata uma razão de 100 para 1 entre entrada e saída nos agentes dela.

Vista como nota fiscal, com um supervisor que lê tudo duas vezes e 60 chamadas ao modelo, essa conversa fica assim:

| Linha | Por que custa | Valor |
|---|---|---|
| Prompt de sistema | relido nas 60 chamadas | R$ 1,44 |
| Histórico da conversa | relido 3 vezes por turno | R$ 1,06 |
| Definições de ferramentas | vão junto em toda chamada | R$ 0,96 |
| WhatsApp | 20 mensagens de serviço | R$ 0,70 |
| Saída do modelo | custa 5× por token | R$ 0,38 |
| Trechos de RAG | 6 turnos de dúvida | R$ 0,08 |
| **Total** | | **R$ 4,63** |

*Premissas: Sonnet 5.5, prompt de sistema de 2.400 tokens, ferramentas de 1.600, mais 180 tokens de histórico por turno, câmbio de referência de R$ 5,00/US$ e preços de 12/10/2026. Valores arredondados.*

A saída, que é a linha cara na tabela de preços, é uma das menores da nota.

Antes de cortar qualquer coisa, meça. A métrica que importa é o **custo por conversa resolvida**: tudo o que o agente gastou, dividido pelas conversas que terminaram no resultado que você queria. Há duas pegadinhas. A convenção do OpenTelemetry para GenAI registra tokens, mas não tem atributo de custo. E o LangSmith só soma por conversa se você mandar o `thread_id`. Para um time de um ou dois devs, o atalho é exportar os traces e pedir ao seu agente de código que agrupe o custo por linha.

Se você é founder e não programa, a pergunta para o seu dev é "quanto custa uma conversa resolvida?", e não "quanto gastamos no mês?".

## Seis cortes, linha a linha

### 1. A ordem do prompt é dinheiro

O provedor guarda o começo do prompt e cobra a releitura com desconto. Na Anthropic, ler do cache custa 0,05× o preço de entrada, e escrever custa 1,25×, com validade de 5 minutos. Só que o cache vale apenas para o prefixo idêntico, e ele enxerga nesta ordem: ferramentas, sistema, mensagens. A regra cabe numa linha: **o fixo em cima, o que muda embaixo.**

Este foi o meu erro. Na Clivia, o contexto do procedimento de cada cliente ficava no topo do prompt de sistema. Esse bloco muda de conversa para conversa, então o prefixo nunca se repetia e o cache se perdia em toda chamada. O lado direito abaixo é o que eu faria hoje; no código da Clivia, o bloco ficou no topo.

```
O que eu fiz                        O que eu faria hoje
----------------------------        --------------------------------
1. contexto do procedimento         1. identidade, tom e regras
2. identidade, tom e regras         2. ferramentas e políticas fixas
3. instruções da fase atual         3. contexto do procedimento
                                    4. instruções da fase atual

o prefixo nunca se repete           o topo fixo vira cache
```

A Manus chama a taxa de acerto do cache de *"the single most important metric for a production-stage AI agent"*. E o que mais derruba essa taxa sem ninguém ver são seis coisas:

- **Timestamp no topo:** "hoje é 16/10, 14:02" no começo do prompt transforma cada chamada num prefixo novo.
- **Ferramentas fora de ordem:** a lista muda de ordem entre chamadas e o prefixo não bate.
- **JSON sem ordem estável:** o mesmo dado, com as chaves em outra ordem, é outro texto.
- **Troca de modelo:** o cache é por modelo. Trocou no meio da conversa, começa do zero.
- **Prefixo curto demais:** abaixo de 512 tokens, nos modelos 5.x da Anthropic, não há cache.
- **Conversa lenta:** o paciente responde depois de 10 minutos e o cache de 5 minutos já expirou. Existe validade de 1 hora, mas a escrita custa 2×.

Para testar o seu, logue `cache_read_input_tokens` por chamada. Se ficar perto de zero, um desses seis está acontecendo.

### 2. O supervisor que lê tudo duas vezes

No desenho mais comum de multiagente, o supervisor recebe a mensagem, escolhe um worker, o worker responde para ele e ele escreve para o usuário. Para escrever, ele relê o histórico inteiro. E o worker, nesse padrão, também recebe o histórico. São três leituras por turno, e é daí que vem a linha de R$ 1,06 da nota. A LangChain mediu isso num benchmark: *"The supervisor architecture consistently uses more tokens than swarm"*, porque os sub-agentes não podem responder direto ao usuário.

Na Clivia eu separei o supervisor em dois nós. O de entrada lê o histórico e só escolhe a rota. O de saída escreve a resposta sem o histórico, só com a mensagem do paciente e o que o worker trouxe. O worker de agenda vê apenas as 2 últimas mensagens. E nenhuma aresta volta, então o histórico entra uma vez por turno.

```
mensagem do paciente
  |
ENTRADA: lê o histórico e só escolhe a rota
  |
  +-- worker de agenda (vê só 2 mensagens) --+
  +-- worker de informações -----------------+
  |                                          |
  |                    SAÍDA: escreve sem o histórico
  |                                          |
  +-- resposta direta -----------------------+
                                             |
                                 envio, depois avaliador de fase
```

Quanto isso economiza? Com os prompts medidos no código (453 tokens na rota, 272 na síntese e 725 no supervisor único), a fórmula dá de 38% a 48%, conforme o tamanho do histórico. É economia na entrada do orquestrador, não na conta inteira, porque os workers custam igual nos dois desenhos. O número tende a 50% quando o histórico domina, mas nunca chega. Se alguém disser "corta 50%", pergunte de qual linha. A LangChain chegou na mesma ideia ao tirar o supervisor do caminho da resposta, com cerca de 50% de ganho de desempenho no benchmark dela.

Esse desenho tem três limites:

- **A síntese não vê o histórico.** Se o paciente foi ríspido três mensagens atrás, a resposta pode sair alegre demais. Na Clivia, as instruções por fase compensaram parte disso.
- **São mais chamadas.** A divisão foi de 2 para 3 chamadas por turno. Mais chamadas, menos tokens.
- **Precisa de controle.** Só funciona se o framework deixa você escolher o que entra em cada nó.

### 3. A chamada mais barata é a que não acontece

Construa em código determinístico cada passo que puder. O Bryan de Oliveira abriu o dia com a pergunta certa: troque "qual LLM?" por "qual decisão e qual mecanismo?". Regra exata vai para o código. No exemplo dele, de negociação de fatura, o teto de desconto é calculado pelo código, e o modelo só comunica.

Na Clivia, isso virou quatro coisas:

- **Primeiro contato por template:** a primeira mensagem não passa pelo LLM.
- **5 follow-ups por template:** lembrete é texto fixo com variáveis.
- **Debounce de 7 segundos:** o paciente manda 4 mensagens picadas e o agente faz 1 chamada.
- **Avaliador de fase que pula o LLM:** na fase 5 e na passagem da fase 1 para a 2, quem decide é o código.

Liste as 5 mensagens que o seu agente mais manda e veja quantas poderiam ser template.

### 4. Modelo grande só onde pensa

Rotear e classificar não exigem o modelo médio. O Haiku 5.5 custa 20× menos por token de entrada que o Sonnet 5.5 (US$ 0,10 contra US$ 2 por milhão, em 12/10/2026). Mesmo assim, compare custo por tarefa, não preço por token: o preço tem letras miúdas, e cada modelo conta tokens do seu jeito.

Existe uma literatura inteira de roteadores que escolhem o modelo por pergunta. O FrugalGPT (2023) e o RouteLLM (2024) prometiam economias de até 98% e 85%, com outros modelos e outros preços. Em 2026, o LLMRouterBench mostrou que vários roteadores, inclusive comerciais, não superam de forma confiável um baseline simples.

A recomendação é mais chata e mais barata: **um modelo fixo por nó do grafo**, com o roteamento no modelo pequeno e o worker e a síntese no médio. Na Clivia eu não fiz isso, porque o LiteLLM só fazia failover de chaves. Hoje eu faria por nó.

### 5. Ferramenta também é token

A definição de cada ferramenta vai no prompt em toda chamada. Três técnicas têm número público da Anthropic: buscar a ferramenta sob demanda cortou 85% dos tokens, chamar MCP por execução de código levou um fluxo de 150 mil para 2 mil tokens, e apagar resultados velhos de ferramenta cortou 84%.

Na Clivia, o RAG traz só 3 trechos e são no máximo 3 iterações de ferramenta por turno. E, segundo a própria Anthropic, um sistema multiagente gasta cerca de 15× os tokens de um chat. Multiagente compra qualidade com tokens, então use quando a tarefa paga.

### 6. O que não é tempo real paga metade

Anthropic, OpenAI e Google têm modo em lote, e OpenAI e Google também têm o Flex: a mesma chamada, com resposta mais lenta, por metade do preço. Não serve para o paciente esperando no WhatsApp. Serve para os evals da noite, o resumo do dia de cada paciente para o médico e a classificação dos leads da semana.

## A mesma nota, depois dos cortes

| Linha | O que cortou | Antes | Depois |
|---|---|---|---|
| Prompt de sistema | cache e prompt por fase | R$ 1,44 | R$ 0,06 |
| Histórico da conversa | orquestrador de entrada e saída | R$ 1,06 | R$ 0,15 |
| Definições de ferramentas | cache, e só o worker recebe | R$ 0,96 | R$ 0,03 |
| WhatsApp | o harness não corta | R$ 0,70 | R$ 0,70 |
| Saída do modelo | template no 1º turno e modelo pequeno | R$ 0,38 | R$ 0,33 |
| Trechos de RAG | só o worker lê | R$ 0,08 | R$ 0,04 |
| **Total** | | **R$ 4,63** | **R$ 1,32** |

A parte do modelo cai 84%, de R$ 3,93 para R$ 0,62. A conta tem uma simplificação assumida: ignora a regravação do cache a cada troca de fase e a expiração em conversa lenta.

Agora a maior linha é o WhatsApp, que o harness não corta. Desde 01/10/2026, a Meta cobra mensagem de serviço no Brasil depois das primeiras 1.000 por mês, por número, a R$ 0,035 cada. Com 10.000 conversas de 8 mensagens, são R$ 2.765 por mês. Essa linha precisa entrar no preço do seu plano.

Se for fazer isso na segunda-feira, esta é a ordem:

| Quando | O que fazer |
|---|---|
| **Antes de tudo** | medir o custo por conversa resolvida |
| **Numa hora** | ordem do prompt para o cache, limite de tokens de saída, template onde a resposta é fixa |
| **Num dia** | modelo pequeno no roteador, lote para o que não é tempo real, enxugar ferramentas e RAG |
| **Numa semana** | orquestrador de entrada e saída, prompt por fase |

## O prompt segue a fase do usuário

De todos os acertos da Clivia, este é o que eu mais recomendo: mapeie a jornada do usuário e faça uma máquina de estados, para que o prompt dependa de onde ele está. Quase todo produto tem 4 ou 5 fases, e a fase do cliente provavelmente já existe no seu CRM.

Na Clivia eram cinco. O prompt não carregava as instruções de todas: elas vinham de uma tabela no banco, indexada por fase e por agente, e só a instrução da fase atual entrava, no fim do prompt.

```
fase | agente    | instrução da fase   | próxima
  1  | routing   | (template, sem LLM) |   2
  2  | routing   | qualificar a queixa |   3
  3  | synthesis | apresentar o médico |   4
  4  | synthesis | responder objeções  |   5
  5  | scheduler | oferecer horários   |   -
```

*O conteúdo das linhas é ilustrativo. A estrutura é a real.*

O prompt de roteamento caiu de 3.579 para 1.810 caracteres, 49% menor. É medição de tamanho de prompt, num caso só, e não de custo. A saudação também some quando o paciente já tem histórico ou fase registrada no banco.

As regras de transição são o que dá confiança a esse desenho:

- **Da fase 1 para a 2 quem decide é o código:** só passa com nome e procedimento salvos.
- **Da 2 em diante decide um avaliador**, que roda depois do envio, lê até 4 pares de pergunta e resposta e é conservador: em dúvida, não avança.
- **Nunca se volta de fase**, e na fase 5 o avaliador nem chama o LLM.
- **A fase mora no banco**, não no histórico. Por isso ela sobrevive a qualquer corte de contexto.

O mesmo mecanismo serve de guardrail. Na qualificação, o agente pode ser proibido de falar de preço; no agendamento, de falar de diagnóstico. E vale desenhar os dois caminhos do seu agente: o de uma mensagem, que é o grafo, e o de um cliente ao longo dos dias, que é a máquina de fases.

## Por que LangGraph, mesmo com mais linhas

Na Clivia eu passei por n8n, CrewAI e LangGraph. A versão em CrewAI era hierárquica: um gerente LLM decidia o caminho e repassava tudo para todo mundo. Eu não via direito o que cada agente recebia, não controlava o caminho, e depurar era adivinhar. Na versão em LangGraph, o fluxo é um grafo explícito:

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

Cada aresta está no código, e nenhuma volta para trás. Demorou mais para construir e é mais verboso, mas esse controle virou dinheiro e noites dormidas. Em produção, confiabilidade e capacidade de depurar valem mais do que escrever menos linhas.

Harrison Chase, criador do LangChain, disse o mesmo com todas as letras: *"Any framework that makes it harder to control exactly what is being passed to the LLM is just getting in your way."* Na hora de escolher, faça três perguntas: eu vejo o prompt? Eu controlo o fluxo? O meu agente de código conhece esse framework, já que é ele quem vai escrever a maior parte? Se uma resposta for não, um loop em Python puro resolve.

## Dieta de contexto: quando o contexto dá errado

Custo é só um dos sintomas. À tarde, abri a parte prática com o que chamei de dieta de contexto. Drew Breunig deu nome a quatro falhas de contexto longo, e a LangChain organizou os remédios em quatro verbos. Os exemplos abaixo vêm do mesmo agente fictício:

| Falha | O que acontece | Exemplo |
|---|---|---|
| **Envenenamento** | um erro entra no contexto e vira verdade | anotou o convênio errado no turno 3 e repete até o fim |
| **Distração** | o modelo se apoia no histórico em vez de pensar | depois de 40 mensagens, responde à pergunta antiga |
| **Confusão** | informação irrelevante puxa a resposta | com 30 ferramentas, chama a de exames para uma dúvida de horário |
| **Conflito** | partes do contexto se contradizem | o prompt diz consulta de 30 min e o RAG traz a tabela antiga, de 45 |

| Verbo | O que faz | Na Clivia |
|---|---|---|
| **Escrever** | guarda fora da janela o que precisa sobreviver | a fase do paciente fica no banco |
| **Selecionar** | traz só o que a tarefa pede | só a instrução da fase atual e RAG com 3 trechos |
| **Comprimir** | encolhe o que já passou | o agente de agenda vê só 2 mensagens |
| **Isolar** | dá a cada parte o seu próprio contexto | a síntese escreve sem ler o histórico |

## O outro harness: a bancada no SDLC AI-native

Agora o agente que escreve o seu código. No SDLC tradicional, cada etapa tem um dono humano e espera a anterior, e o gargalo mora em escrever. No SDLC AI-native, as etapas não somem: viram artefatos versionados que alimentam os agentes, humanos decidem e agentes executam. Contei essa mudança em detalhe em [O gargalo mudou de lugar](/pt/blog/o-gargalo-mudou-de-lugar-sdlc-ai-native/).

Isso já não é teoria. O Mercado Livre escreveu num documento ao regulador americano que *"human-written code has become the exception"*, a Stripe relata 1.300 PRs por semana escritos por agentes, e o QuintoAndar diz que 80% do seu código é feito com auxílio de IA, o que é auxílio, não autoria. E o harness muda o resultado com o mesmo modelo: a LangChain foi de 52,8% para 66,5% no Terminal Bench 2.0 mexendo só nele.

A pergunta deixou de ser "o agente escreve código?". Agora é como você monta a bancada dele. Preparei isso em seis camadas:

| Camada | A ideia | Na prática |
|---|---|---|
| **1. Mapa** | AGENTS.md é mapa, não manual | comandos, onde fica cada coisa e o que é proibido. Arquivo inchado custa cerca de 20% a mais sem ganho de acerto (ETH Zurich). Teste de cada linha: se eu apagar, o agente passa a errar? |
| **2. Spec** | do tamanho da tarefa | feature nova e regra sensível pedem spec; bugfix com teste não pede. Se revisar a spec demora mais que revisar o código, ela está grande demais |
| **3. Sensores** | instrução é conselho, hook é lei | lint, testes e typecheck rodam sempre, sem o agente decidir. Se não verifica, não entrega |
| **4. Permissões** | liberar, perguntar, bloquear | teste e leitura liberados; push e deploy perguntam; segredo e dado real bloqueados. As pessoas aprovam 93% dos pedidos, então perguntar tudo vira fadiga (Anthropic) |
| **5. Skills** | contexto sob demanda | o agente vê só o índice, e o conteúdo entra quando a tarefa pede |
| **6. Paralelo** | contexto limpo | um agente por worktree. Um subagente lê 40 arquivos e devolve 10 linhas. Paralelize só o que você consegue revisar |

A ordem importa. Mapa, sensores e permissões vêm primeiro, porque protegem. Spec, skills e paralelo vêm depois, porque aceleram.

## Segurança no pipeline

O guardrail começa antes da produção: regra vira etapa. O PR do agente passa por testes, por um eval com casos difíceis escritos por quem atende, por revisão humana, e só então vai para produção. Cada mudança em prompt, modelo, ferramenta ou política roda tudo de novo, e cada falha vira um caso de teste.

Três ferramentas que mostrei no navegador cabem nesse caminho:

- **[Trivy](https://github.com/aquasecurity/trivy) no CI/CD:** pega CVEs no pipeline.
- **[pip-audit](https://github.com/pypa/pip-audit) em hook:** mais uma auditoria de dependências, depois do commit ou do PR, ou como etapa do CI depois do PR.
- **[deepteam](https://github.com/confident-ai/deepteam) a cada troca de modelo ou mudança média ou grande de prompt:** testes de red team no próprio agente. No modo econômico, a cada 15 dias.

O agente de código também é alvo. Simon Willison chamou de tríade letal a combinação de ler conteúdo de fora, enxergar segredo e conseguir agir fora: uma issue pública com instrução escondida pode pedir ao agente que leia o `.env` e cole num comentário. A Meta transformou isso em regra, com no máximo dois dos três na mesma sessão. E a defesa mais simples é física: credencial que nunca entra na sandbox não tem como vazar.

Em saúde e finanças, a regra externa também vira etapa. A resolução 2.454/2026 do CFM, em vigor desde agosto, trata IA como apoio e deixa a responsabilidade com o médico. Na LGPD, dado de saúde é sensível e não pode usar legítimo interesse como base.

## O que eu aprendi na sala

Quando perguntei sobre subagentes, vi que precisava dar um passo atrás. Puxei na hora um slide de uma palestra antiga, com as seis arquiteturas multiagente mais conhecidas (agente único, rede, supervisor, supervisor com ferramentas, hierárquica e customizada), e comecei pela base.

Foi um aprendizado meu sobre como ensinar isso. Harness é a ponta de um sistema agêntico, e fica difícil de entender sem o que vem antes: o que é uma tool call, o que compõe um system prompt, o que é contexto. Da próxima vez, começo por aí.

## Um exercício para fazer em casa

Para fechar a dieta de contexto, deixei um canvas, que você pode [baixar em A4](/palestras/dieta-de-contexto-canvas-a4.pdf). É uma linha por fase do seu usuário, preenchida com o seu agente. Um exemplo:

- **Fase:** qualificação (exemplo).
- **O que entra e de onde vem:** instrução da fase, últimas 6 mensagens, convênios aceitos.
- **Orçamento:** cerca de 1.200 tokens de prompt e 6 mensagens.
- **Nunca entra:** prontuário, CPF, conversa de outros pacientes.
- **Guardrail:** nada de diagnóstico; dúvida clínica vai para uma pessoa.
- **Quem decide:** avançar de fase é regra, o tom é do LLM, caso clínico é de uma pessoa.

Se a coluna "nunca entra" ficou vazia, você ainda não pensou em LGPD. Se "quem decide" é sempre o LLM, ainda não pensou em guardrail.

Depois, faça um premortem: é dezembro e o seu agente falhou feio com um cliente. Escreva 3 causas prováveis e o guardrail que teria evitado cada uma.

## Os outros links que mostrei

- [Chrome DevTools MCP](https://developer.chrome.com/blog/chrome-devtools-mcp): dá ao modelo acesso ao console do navegador, igual ao F12.
- [Context7](https://context7.com/): MCP com documentação atualizada.
- [superpowers](https://github.com/obra/superpowers): para um desenvolvimento guiado por spec mais breve. Para começar um projeto do zero, recomendei Spec Kit ou GSD.
- [LiteLLM](https://www.litellm.ai/): router e proxy de modelos.
- [Langfuse](https://langfuse.com/): observabilidade e versionamento de prompt.

## Obrigado

Obrigado ao Daniel Vasserman pela organização do dia, ao Bryan de Oliveira, que abriu com os fundamentos do harness do produto, à Jeniffer Pires, que trouxe o SDLC e a arquitetura multiagente do CEIA, e ao Heinz Felipe Rahmig. E às startups, pelas perguntas.

Se o seu agente está em produção e você ainda não sabe quanto custa uma conversa resolvida, [fale comigo no LinkedIn](https://www.linkedin.com/in/thiago-peraro/) ou pela [página de contato](/pt/contact/).

## Fontes

**O programa**

- TI Inside, [*inovabra, AKCIT e CEIA/UFG lançam programa de residência de IA*](https://tiinside.com.br/02/07/2026/inovabra-akcit-e-ceia-ufg-lancam-programa-de-residencia-de-ia-voltada-a-startups/), 02/07/2026.
- Startups.com.br, [*PRIA prepara startups*](https://startups.com.br/branded-content/pria-prepara-startups-para-desenvolver-negocios-mais-competitivos-com-ia/), 2026.
- Bryan de Oliveira, *Harness Engineering: do modelo ao sistema*, PRIA Day 3, 16/10/2026.

**Custo**

- Anthropic, [preços](https://www.anthropic.com/pricing), [prompt caching](https://docs.claude.com/en/docs/build-with-claude/prompt-caching) e [Message Batches](https://docs.claude.com/en/docs/build-with-claude/batch-processing), consultados em 12/10/2026.
- OpenAI, [Batch](https://platform.openai.com/docs/guides/batch) e [Flex](https://platform.openai.com/docs/guides/flex-processing); Google, [Gemini Batch Mode](https://ai.google.dev/gemini-api/docs/batch-mode), consultados em 12/10/2026.
- Manus, [*Context Engineering for AI Agents*](https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus), 18/07/2025.
- LangChain, [*Benchmarking Multi-Agent Architectures*](https://blog.langchain.com/benchmarking-multi-agent-architectures/), 10/06/2025.
- [OpenTelemetry, convenções para GenAI](https://opentelemetry.io/docs/specs/semconv/gen-ai/); [LangSmith, threads](https://docs.smith.langchain.com/observability/how_to_guides/threads).
- [FrugalGPT](https://arxiv.org/abs/2305.05176), 2023; [RouteLLM](https://arxiv.org/abs/2406.18665), 2024; [LLMRouterBench](https://arxiv.org/abs/2601.07206), 2026.
- Anthropic, [*Introducing advanced tool use*](https://www.anthropic.com/engineering/advanced-tool-use), 24/11/2025; [*Code execution with MCP*](https://www.anthropic.com/engineering/code-execution-with-mcp), 04/11/2025; [*Managing context*](https://www.anthropic.com/news/context-management), 29/09/2025; [*How we built our multi-agent research system*](https://www.anthropic.com/engineering/multi-agent-research-system), 13/06/2025.
- Meta, [preços do WhatsApp Business](https://developers.facebook.com/docs/whatsapp/pricing), vigentes desde 01/10/2026.

**Contexto**

- Drew Breunig, [*How Long Contexts Fail*](https://www.dbreunig.com/2025/06/22/how-contexts-fail-and-how-to-fix-them.html), 22/06/2025.
- LangChain, [*Context Engineering for Agents*](https://blog.langchain.com/context-engineering-for-agents/), 02/07/2025.
- Gary Klein, [*Performing a Project Premortem*](https://hbr.org/2007/09/performing-a-project-premortem), Harvard Business Review, 09/2007.

**Bancada e segurança**

- LangChain, *The Anatomy of an Agent Harness*, 10/03/2026, e *Improving Deep Agents with harness engineering*, 17/02/2026.
- Mercado Livre, Form 8-K, 05/08/2026; Bloomberg Línea, entrevista com o CEO do QuintoAndar, 18/06/2026; Stripe Engineering, *Minions*, fev. 2026.
- ETH Zurich, [arXiv 2602.11988](https://arxiv.org/abs/2602.11988), 2026; OpenAI, *Harness engineering*, 11/02/2026; M. Hashimoto, *My AI Adoption Journey*, 05/02/2026.
- B. Böckeler, *Harness engineering for coding agent users*, martinfowler.com, 02/04/2026; GitHub, [*Spec Kit*](https://github.com/github/spec-kit), 2025.
- Anthropic, sandboxing no Claude Code, 20/10/2025, e auto mode, 25/03/2026.
- S. Willison, *The lethal trifecta for AI agents*, 16/06/2025; Meta, *Agents Rule of Two*, 31/10/2025.
- Harrison Chase, 20/04/2025; Anthropic, *Building effective agents*, 19/12/2024.
- CFM, Resolução 2.454/2026; LGPD, Lei 13.709/2018, art. 11.
