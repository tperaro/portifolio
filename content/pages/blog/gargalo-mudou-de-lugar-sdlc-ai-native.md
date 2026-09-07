---
title: 'O gargalo mudou de lugar: o SDLC AI-native na prática'
slug: o-gargalo-mudou-de-lugar-sdlc-ai-native
translationKey: gargalo-sdlc-ai-native
date: '2026-08-28'
excerpt: >-
  Gerar código virou commodity e o ciclo de desenvolvimento não ficou só mais
  rápido: trocou de forma. O que muda em cada etapa do SDLC quando agentes
  executam, humanos decidem e metade do contexto vive no canal do time.
featuredImage:
  url: /images/blog/gargalo-mudou-de-lugar.webp
  altText: >-
    Dois dutos do ciclo de desenvolvimento: no SDLC tradicional o
    estrangulamento fica em escrever código; no SDLC AI-native ele se desloca
    para definir e revisar
  type: ImageBlock
  width: 1200
  height: 630
  styles:
    self:
      borderRadius: medium
isFeatured: false
seo:
  metaTitle: 'O gargalo mudou de lugar: o SDLC AI-native na prática | Thiago Peraro'
  metaDescription: >-
    Como o ciclo de desenvolvimento muda quando agentes executam e humanos
    decidem: spec, orquestração, verificação contínua, background agents no
    canal do time e como medir valor em vez de atividade.
  socialImage: /images/blog/gargalo-mudou-de-lugar.png
  metaTags:
    - property: keywords
      content: >-
        SDLC AI-native, background agents, spec-driven development, verificação
        contínua, continuous verify, agentes de IA, engenharia de contexto,
        observabilidade, QA com IA
  type: Seo
colors: bg-light-fg-dark
type: PostLayout
author: content/data/person1.json
---

Em 27 de agosto de 2026 eu fiz a parte final da live **go.IAs Talks — Desenvolvimento com IA: SDLC na prática**, com uma palestra de vinte minutos chamada "O gargalo mudou de lugar". Este post é a versão escrita e ampliada dela, com o que não coube no tempo, as fontes de cada número e as respostas que dei às perguntas da plateia.

> **Resposta direta:** escrever código deixou de ser a etapa mais cara do ciclo de desenvolvimento. O gargalo se deslocou para o que vem antes (definir a intenção e a especificação) e para o que vem depois (revisar, verificar e provar que funciona). Times que só aceleraram a digitação não ganharam nada; times que redesenharam o ciclo em volta dessa mudança ganharam bastante.

A frase que resume a palestra é curta: **gerar código virou commodity**. Hoje qualquer harness decente escreve o código. O que decide o resultado é ter a spec, o contexto e o critério de aceite prontos antes de o agente começar — e ter como verificar o que ele produziu depois.

## A mudança já saiu das startups e chegou nas big techs

Tecnologia nova costuma nascer nas empresas pequenas, e com esta não foi diferente. O que mudou é que ela já saiu das startups e chegou nas big techs, que normalmente são as últimas a adotar qualquer coisa. Quatro números que levei ao slide:

| Número | O que ele mede | Fonte |
|---|---|---|
| **1.300 PRs por semana** | pull requests escritos por agentes internos da Stripe, chamados *minions*, e entregues prontos para revisão humana | Stripe Engineering, *Minions*, partes 1 e 2, fev. 2026 |
| **1 em cada 9 PRs** | pull requests abertos diretamente por background agents na Uber | The Pragmatic Engineer, *How Uber uses AI for development*, mar. 2026 |
| **mais de 80%** | do código merged em produção na Anthropic atribuído ao Claude | Anthropic Institute, Favaro e Clark, mai. 2026 |
| **35%** | dos PRs internos da Cursor criados por agentes rodando em VMs na nuvem | Michael Truell, Cursor, *The third era*, fev. 2026 |

Cada um desses números mede uma coisa diferente e nenhum deles quer dizer "os agentes substituíram os engenheiros". O que eles dizem juntos é outra coisa: **o ser humano dessas empresas passa mais tempo revisando do que escrevendo.**

Vale explicar o termo que aparece em três das quatro linhas. **Background agent** é o agente que não espera o seu prompt: ele é acionado por um gatilho. O servidor passou de 80% de uso, um alerta disparou, alguém marcou um bot numa thread — e o agente já começa a trabalhar com um prompt montado a partir daquele evento. Ainda não entrou no hype, e eu aposto que é a próxima evolução dos agentes codificadores.

Aliás, o detalhe das VMs no caso da Cursor não é acidental: rodar o agente numa máquina virtual isolada evita que ele encoste em coisas essenciais da máquina do programador. Autonomia sem isolamento é como dar acesso de produção para um estagiário no primeiro dia.

## O desenho que a gente aprendeu

O SDLC tradicional — *Software Development Life Cycle*, o ciclo de vida do software, da ideia à manutenção — é um fluxo linear baseado em handoffs:

```
Plan → Design → Build → Test → Deploy → Maintain
```

Três características definem esse desenho:

- **Cada etapa tem um dono humano** e um custo medido em horas de gente.
- **É sequencial**: a próxima caixa espera a anterior terminar.
- **O gargalo mora em escrever.** Todo o resto do time é dimensionado em volta disso.

Esse último ponto é o que ninguém percebe até parar para olhar. A razão histórica de um *product manager* para cerca de oito desenvolvedores não veio de teoria de gestão: veio do fato de que escrever código era caro e lento, então era racional ter muita gente escrevendo e pouca gente definindo.

Nas conversas que tenho tido com pessoas de startups lá fora, essa razão virou **um PM para um ou dois devs**. É dado de campo, não é pesquisa publicada — mas é coerente com tudo o mais. Se a execução ficou barata, o valor migra para quem define o que executar.

## O desenho AI-native: as etapas não somem, elas viram artefatos

O desenho AI-native ainda está em evolução e muda praticamente todos os dias. Mas há um núcleo que já é quase consenso entre quem aplica: **humanos definem e decidem, agentes executam em paralelo.**

As etapas não desaparecem. Elas deixam de ser fases sequenciais com dono humano e viram **artefatos versionados** que alimentam agentes e fecham um loop.

### 1. Intenção e planejamento

Entender o que se quer do software ou da nova feature. Continua sendo trabalho humano, e continua sendo a parte que mais se erra.

### 2. Experimentação

Ficou barato demais para pular. Você pede ao harness um experimento com hipótese e ele te devolve um ou dois protótipos prontos. Antes de discutir spec com produto ou com o C-level, você já tem algo para apontar.

### 3. Spec e design

**É aqui que se gasta mais tempo hoje, e é assim que tem que ser.** A proporção que tenho visto e praticado é de mais ou menos **40 minutos de spec para 5 a 10 minutos de execução e verificação** — algo perto de 70% do tempo na especificação.

Isso soa contraintuitivo até você entender o motivo: os modelos atuais seguem bem uma spec que um humano validou. O ganho não está em digitar rápido, está em ter escrito com precisão o comportamento desejado.

E há uma linha que não se cruza: **a validação da spec nunca vai para o modelo.** Ele pode escrever a spec, sugerir, criticar, encontrar buraco. Quem assina é gente.

Frameworks de *spec-driven development* como o [GitHub Spec Kit](https://github.com/github/spec-kit) existem exatamente para tornar a spec o artefato central — a intenção vira a fonte da verdade, e é dela que saem o código, os testes e o critério de revisão.

### 4. Build e orquestração

Para cada task você pode ter um workflow diferente, e inclusive **modelos diferentes**. Não existe mais "o modelo da empresa": existe o modelo certo para aquela task.

No Claude Code, por exemplo, dá para usar um modo de esforço maior e mandar o agente **montar e ordenar um workflow de 40 ou 50 agentes** para executar a mesma spec. Eles próprios identificam o que dá para paralelizar e o que precisa ser sequencial. Isso acelera muito.

### 5. Verificação contínua

Observabilidade não é nova. O que é novo é **trazê-la para dentro do SDLC** em vez de tratá-la como coisa de produção.

Na prática isso quer dizer três coisas:

- **Testes e evals fazem parte da spec.** Não são um item de backlog para depois.
- **O agente guarda evidência.** Screenshots, logs e traces viram artefato da task, não output efêmero de terminal.
- **Revisão adversarial.** Um agente contesta o plano ou a execução de outro. Você pode montar um conselho entre Claude, Gemini e Codex justamente porque cada modelo foi treinado sobre um corpus diferente e chega com uma visão de mundo diferente. Isso melhora tanto a spec quanto a execução.

### 6. Deploy e gates

O deploy continua tradicional. O que mudou é que a esteira ganhou agentes olhando coisas específicas: lint, estrutura de código, aderência à arquitetura.

Um item que virou obrigatório no meu dia a dia: **checagem de vulnerabilidade em dependências dentro do CI/CD.** Uso o [Trivy](https://github.com/aquasecurity/trivy), que é open source. Ele monta o **SBOM** (*Software Bill of Materials*, o catálogo de todas as dependências do seu código) e cruza com falhas reportadas.

Isso importa mais agora do que importava dois anos atrás. Com o advento dos agentes, quem faz red team passou a atacar muito a cadeia de dependências — o npm sofreu ataques sérios recentemente. E o raciocínio é desconfortável: **se muitas vezes a gente já não revisa o código gerado, quem dirá revisar as bibliotecas que esse código puxou.** Todo PR meu roda essa verificação, e uma vulnerabilidade grave, média ou baixa bloqueia o merge antes de chegar em mim.

### 7. Manter e aprender

A parte de "aprender" é a genuinamente nova. Ela monitora **drift**: o quanto o comportamento do software se afastou do comportamento especificado.

O exemplo caseiro é conhecido de todo mundo. Você entrega uma feature na terça. Na quinta alguém *vibe-codou* algo por cima e derrubou o seu comportamento sem perceber. Ninguém abriu bug porque ninguém notou.

O que a gente faz é deixar agentes verificando e rodando os testes periodicamente. Quando um teste quebra, eles notificam no canal do Slack ou do Discord — onde o time já está.

## Parte 2: metade do que o agente precisa nunca foi escrita

Aqui a palestra vira. Tudo acima assume que o contexto está no repositório. Só que **metade do que o agente precisa nunca foi escrita em lugar nenhum.** Ela mora na cabeça de quem decide: design, QA, dados, produto.

E essa gente não está no terminal onde você codifica. **Está no Slack.**

### Do terminal para o canal

Na Stripe, os *minions* não são acionados pelo harness. Eles vivem no Slack. Alguém marca o bot numa thread e nasce um pull request.

> "Uma execução típica de minion começa numa mensagem do Slack e termina num pull request que passa no CI e está pronto para revisão humana, sem nenhuma interação no meio."
>
> — Alistair Gray, engenheiro do time de produtividade da Stripe, no post em que a empresa apresentou os minions, fev. 2026.

Eu conversei com o Alistair sobre isso numa conferência de background agents. E o motivo pelo qual isso funciona é o que interessa: **o agente sabe tudo que foi conversado naquele canal.** Os requisitos discutidos na thread, as decisões da call (eles transcrevem as calls). Quando o engenheiro vai atacar o problema, o agente já chega com contexto. Montar a spec fica muito mais fácil, e se for um fix ele vai direto, sem spec, porque já tem tudo que precisa.

A mecânica no dia a dia é simples: cada menção vira o equivalente a uma sessão de Claude Code ou Codex, e o agente responde em sub-mensagens da thread, como subtópicos de um post do Reddit. A sessão deixou de ser sua e virou **memória compartilhada do canal**. Engenharia, produto, design e QA passam a operar sobre a mesma memória operacional.

Isso vale principalmente se você já construiu um **segundo cérebro** da empresa — o mapeamento dos processos e das decisões. É o tema sobre o qual eu falei no CEIA Open Day e escrevi [neste post sobre AIOS e segundo cérebro empresarial](/pt/blog/aios-segundo-cerebro-empresarial/). Um agente que conhece o dia a dia e o histórico de decisões da organização se comporta de forma completamente diferente de um que só leu o repositório.

### Do canal para o responsável

Essa é a parte que mais me interessa, e é o segundo deslocamento de gargalo da palestra.

Quando o agente está no canal, ele ganha uma capacidade que não tinha no terminal: **mencionar o dono da decisão em vez de adivinhar.** Precisa de uma decisão de design? Ele marca quem é de design. Precisa de um dado? Marca quem tem o dado.

Compare com o fluxo antigo. O agente não sabia decidir algo, então informava o dev no Claude Code; o dev abria o Slack; perguntava; esperava; voltava ao terminal; retomava a sessão. Agora a pergunta vai direto para quem tem poder de decidir, e a resposta cai no mesmo fluxo da implementação. **O gargalo de comunicação entre engenharia e o resto do time é cortado no meio.**

O efeito colateral é que os squads ficam mais unidos, não mais fragmentados. Todo mundo opera sobre a mesma sequência, cada um colocando a sua especialidade — e a cola que liga isso é o agente.

Uma ressalva honesta: hoje isso é um comportamento que você pede na configuração do agente, não algo que ele faça proativamente por conta própria. Nenhum fornecedor entrega um agente que sai marcando gente sozinho.

### Background agents não são hype, são infraestrutura

Dois sinais de que essa não é uma moda passageira.

O primeiro: as pessoas que puxam as decisões técnicas das startups mais avançadas já estão fazendo isso.

O segundo é mais concreto. A conferência de background agents onde eu conheci o pessoal da Stripe foi organizada pela **Ona** (a antiga Gitpod), que provê exatamente a infraestrutura de sandboxes na nuvem para agentes rodarem por horas sem depender da máquina de ninguém. Em 11 de junho de 2026 a [OpenAI anunciou a aquisição da Ona](https://openai.com/index/openai-to-acquire-ona/) para expandir o Codex com ambientes persistentes.

Quando a empresa que faz o harness compra a empresa que faz a infraestrutura para o agente rodar sozinho, o roadmap deixa de ser especulação.

### Como medir sem se enganar

Uma coisa que precisa ser dita junto com tudo isso: **nem sempre código é valor.**

Se você mede produtividade por esforço, contagem de PRs ou linhas de código, os agentes vão fazer esses números subirem lindamente. E você vai se enganar. Atividade cresce fácil quando a execução fica barata.

A Uber abandonou métricas de esforço por causa disso:

> "Se você não consegue traçar uma linha direta até quantas features úteis está entregando aos usuários, essa troca fica mais difícil de justificar."
>
> — Andrew Macdonald, COO da Uber, à Fortune, mai. 2026.

**PR mede atividade. Feature mede valor.** Se você não consegue ligar o seu output ao que chegou no usuário, fica difícil justificar o seu valor dentro da empresa — e mais difícil ainda justificar o custo dos agentes.

## Parte 3: Continuous Verify, do erro em runtime ao teste de regressão

Para a parte prática eu poderia ter aprofundado em qualquer etapa do ciclo. Escolhi **verificação contínua** porque é a menos praticada hoje, seja por falta de conhecimento, seja por falta de estrutura nas empresas.

### QA não sumiu; a capacidade dele foi aumentada

O QA sempre monitorou qualidade de código e produziu testes, no TDD e em qualquer outro modelo de SDLC. O que os modelos mais recentes trouxeram é que agora **o agente também tem o contexto da empresa, o histórico do Git e acesso às ferramentas de observabilidade via MCP** — e por isso consegue alertar e sugerir correções em tempo real.

Muitas empresas ainda esperam o usuário ou o QA reportarem um bug. As equipes mais avançadas fazem o contrário: criam personas, colocam um agente simulando o uso dessas personas contra o código em produção, e quando bate um warning ou erro dentro dos containers, **o próprio erro aciona o background agent**.

Esse agente primeiro interpreta: às vezes o erro é proposital (usar exceção como alerta não é boa prática, mas acontece). Quando não é, ele dispara em paralelo o agente que tem o contexto da base de código, das reuniões feitas sobre aquele código e das ferramentas de observabilidade. Com esse contexto, ele consegue **se fazer perguntas para validar hipóteses** sobre a causa.

E o erro corrigido vira contexto para a próxima vez. Cada correção validada ensina o sistema — tanto a não repetir o defeito quanto a não repetir a busca inútil que não levou a lugar nenhum.

### O ponto em que o humano entra

O agente correlaciona sinais, encontra a causa provável, transforma a hipótese em teste e propõe a correção. **O humano entra pela primeira vez depois da proposição.**

Ele chega e diz: "verifiquei X, Y e Z; não é X, Y e Z, pode ser essas outras duas coisas". Você entra nessa hora, e não na hora de ficar lendo log cru e observabilidade bruta.

E isso acompanha o build, o teste e a manutenção — não só produção. Se você está rodando uma API localmente e ela alerta um erro porque o próprio agente errou a aplicação ou o teste, ele verifica e ajusta antes de chegar no deploy.

### O ciclo, em seis passos

```
ação do QA
  → alerta compartilhado no canal (com link e contexto)
    → Loki / LogQL via MCP → hipótese
      → teste RED (reproduz o bug)
        → fix
          → GREEN + evidências
```

Vale ser preciso aqui, porque é fácil confundir: **RED e GREEN não são dois testes, são dois estados do mesmo teste.** Você escreve um teste que reproduz o bug e ele falha — esse é o RED, e ele prova que o defeito é real e que o teste realmente o captura. Aplica o fix e o mesmo teste passa — esse é o GREEN, e é ele que prova que a correção funciona. O teste então fica no repositório como teste de regressão, para que ninguém quebre de novo aquilo que acabou de ser consertado. A evidência do ciclo é o par: a saída vermelha antes do fix e a verde depois.

### Como isso aparece em dois projetos reais

**Sobrevidas** (o [chatbot de rastreio de câncer bucal que colocamos no SUS](/pt/blog/projeto-sobrevidas-ia-sus/)): logs e notificações do backend centralizados no Loki. A query language permite filtrar exatamente o evento que explica o comportamento, e uma ferramenta MCP dá ao agente acesso controlado a essa observabilidade — para ele **buscar evidência em vez de adivinhar**.

**Count on Sheep** (onde atuo como AI Architect): alertas em tempo real saem do container direto para o canal compartilhado. O bot que faz isso não tem IA nenhuma, é um encaminhamento simples. A inteligência está no protocolo: o QA humano, ao reportar, escreve *"eu estava fazendo tal ação em tal parte do software e deu tal erro"* e **cola a mensagem de alerta correspondente** no relatório.

Esse pedaço é subestimado. Ação do QA + sinal do runtime, juntos, no mesmo documento, é um contexto muito mais rico do que qualquer um dos dois sozinho. E como o agente tem acesso ao canal, muitas vezes ele consulta as mensagens sem eu pedir, só por serem relevantes para o bug em questão.

### O exemplo do 429 no checkout

O cenário que levei ao hands-on: um checkout de pagamento devolvendo **HTTP 429**, o código que uma API usa quando acha que você está batendo demais nela.

O QA executa o fluxo, vê o 429 na tela e reporta a ação. No mesmo instante o canal recebe o alerta com o link do screenshot. O agente consulta o Loki:

```logql
{service="checkout"} | json | status=429
```

E o histórico entrega a causa:

```
attempt=1 delay_ms=1000
attempt=2 delay_ms=1000
attempt=3 delay_ms=1000
```

Três tentativas com um segundo fixo entre elas. Nem o QA nem o dev sabiam disso ao abrir o report — o log sabia.

A hipótese vira teste RED:

```python
def test_retry_usa_backoff_exponencial():
    delays = capturar_delays(lambda: checkout(retry=True))
    # RED: hoje devolve [1000, 1000, 1000]
    assert delays == [1000, 2000, 4000]
```

O fix é backoff exponencial com chave de idempotência, para não duplicar transação. O GREEN prova:

```
RED   → 1s · 1s · 1s
GREEN → 1s · 2s · 4s · uma transação · erro visível ao usuário
```

E o *evidence bundle* fica anexado à correção: `red.txt`, `diff.patch`, `green.txt`, `screenshot.png`, `trace.zip`, `logs.jsonl`.

O ganho não é o agente ter consertado o bug. **O ganho é a revisão humana ter ficado trivial**: quem revisa vê a hipótese, o teste que falhava, o diff e a prova de que agora passa.

## As perguntas da plateia

Essas quatro perguntas vieram do chat da live e valem tanto quanto a palestra.

### Que ferramentas colocar na esteira de CI/CD quando o código é gerado por IA?

O GitHub tem bot de revisão de PR se você assina. Mas a que eu mais recomendo é o **Trivy**: open source, monta o SBOM e cruza com CVEs publicadas nas suas dependências. Além disso, o tradicional continua valendo — bot verificando aderência arquitetural, teste de carga e os demais testes antes de produção. Tudo isso entra na esteira.

### Se o erro vira contexto, isso não estoura a janela de contexto e piora o agente?

Excelente pergunta, e a resposta é que **a esteira inteira não roda no mesmo contexto**. Cada task é delegada a agentes diferentes. Uma task de spec não olha erros de produção — você não escreve spec de feature nova para consertar um erro de prod, você vai lá e conserta. O contexto de observabilidade simplesmente não entra ali.

Saber **quando colocar cada contexto** é parte central do trabalho num SDLC AI-native. Na prática, isso vira atalho configurado no harness: um `/debug-prod` que injeta exatamente aquele contexto quando você precisa dele.

Além disso existem duas estratégias de divisão, e elas resolvem problemas diferentes:

- **Subagents**: o contexto principal fica com um modelo maior, que vai criando agentes filhos conforme precisa. Cada filho pega um pedaço, raciocina e devolve só o resultado para cima. É hierárquico, e o contexto fica **diluído** — o pai vai descartando e comprimindo à medida que avança.
- **Agent teams**: os agentes conversam entre si, sem hierarquia vertical, compartilhando contexto lateralmente.

Regra prática: para dividir trabalho e economizar contexto, subagents. Para um debug muito específico ou para olhar o mesmo problema por vários ângulos, um time — a qualidade da resposta melhora justamente porque o contexto de cada um não fica entupido.

### Você usa algum gerenciador de contexto?

Contexto foi a palavra mais repetida das duas palestras da noite, então a pergunta era inevitável.

O primeiro nível é o markdown mestre — `AGENTS.md`, ou `CLAUDE.md` no Claude Code. Ele é carregado em toda query, como um complemento ao system prompt do harness. **Nele eu não coloco o contexto: coloco as instruções de onde buscar cada contexto.** Precisa das decisões da reunião de ontem? Olha no segundo cérebro, que é uma pasta separada com os contextos organizados. Precisa de dado externo? Usa tal MCP. Precisa construir algo específico? Usa tal skill.

O segundo nível é a memória de longo prazo, e aí eu uso **busca híbrida**: busca exata (o modelo é ótimo em grep, procurando termos literais) combinada com busca semântica sobre uma base vetorial. Histórico de conversas dos últimos 30 dias fica indexado semanticamente, para ser encontrado por significado; processos estruturados da empresa são encontrados por palavra exata. O agente mistura os dois.

E uma disciplina que importa mais do que parece: **manter o contexto enxuto e atualizado**. Guardar tudo parece seguro, mas na hora de recuperar você traz lixo junto, e lixo recuperado é pior do que contexto ausente.

### Eu já tenho Slack e Datadog com alertas da operação. Como aproveito background agents?

Você já está a um passo. Entre o container e o Slack existe um ponto onde você pode **colocar um trigger que chama o seu agente** — rodando numa VPS ou na sua própria máquina. No mesmo momento em que o alerta vai para o canal, o agente é acionado e faz aquela análise de debug.

Depois disso, duas coisas ampliam bastante o ganho:

1. **Conectar o MCP do Slack ao harness**, para o agente consultar as mensagens do time, não só os alertas de erro.
2. **Guardar os aprendizados.** Cada erro que você corrigiu e validou como humano gera uma estratégia. Acumule essas estratégias numa base e ofereça essa base como ferramenta para o agente.

O resultado é que o dev para de receber alerta cru e passa a receber alerta contextualizado, já com a prévia da solução.

## Três coisas para levar na segunda-feira

1. **Escreva a spec antes e valide você mesmo.** Se hoje você gasta 5 minutos especificando e 40 corrigindo, inverta a proporção e meça a diferença.
2. **Leve o agente para onde o time está.** Um agente no canal alcança o contexto que o repositório não tem e pergunta para quem sabe responder.
3. **Feche o loop com evidência.** Alerta compartilhado, hipótese consultando observabilidade, teste RED antes do fix, GREEN com prova anexada. É o que transforma revisão humana em algo rápido em vez de algo caro.

E troque a métrica: pare de contar PRs, comece a contar features que chegaram no usuário.

## Conclusão

O ciclo de desenvolvimento não ficou apenas mais rápido. Ele trocou de forma. As etapas continuam existindo, mas deixaram de ser fases sequenciais com dono humano e viraram artefatos versionados que alimentam agentes e realimentam o próprio ciclo.

Quem só acelerou a digitação ganhou pouco. Quem redesenhou o ciclo — spec como fonte da verdade, execução paralela e barata, verificação contínua com evidência, e o agente dentro do canal onde as decisões acontecem — mudou o formato da própria operação.

Eu fechei a palestra com a frase que continua sendo o melhor resumo que eu tenho:

> **Seu agente é tão bom quanto o contexto que ele alcança, e tão certeiro quanto as pessoas que ele consegue perguntar.**

Se a sua empresa está tentando sair de pilotos isolados e desenhar um ciclo de desenvolvimento AI-native de verdade, [fale comigo no LinkedIn](https://www.linkedin.com/in/thiago-peraro/) ou pela [página de contato](/pt/contact/).

## Fontes usadas na palestra

- Stripe Engineering, [*Minions: one-shot, end-to-end coding agents*](https://stripe.dev), partes 1 e 2, fev. 2026.
- How I AI (Lenny's), Steve Kaliski, Stripe, mar. 2026; Background Agents Summit, mai. 2026.
- The Pragmatic Engineer, *How Uber uses AI for development*, mar. 2026.
- Fortune, *Uber e o valor entregue por features*, mai. 2026.
- Anthropic Institute, *When AI builds itself*, Favaro e Clark, mai. 2026; *Introducing Claude Tag*, jun. 2026.
- Cursor, [*The third era*](https://cursor.com/blog/third-era), Michael Truell, fev. 2026.
- GitHub, [*Spec Kit*](https://github.com/github/spec-kit), set. 2025.
- OpenAI, [*OpenAI to acquire Ona*](https://openai.com/index/openai-to-acquire-ona/), jun. 2026.
- [Grafana Loki e LogQL](https://grafana.com/docs/loki/latest/query/); Grafana Alerting.
- [Trivy](https://github.com/aquasecurity/trivy), Aqua Security.
- [Playwright Trace Viewer](https://playwright.dev/docs/trace-viewer) e screenshots.
- [OpenTelemetry](https://opentelemetry.io/): logs, métricas e traces.
