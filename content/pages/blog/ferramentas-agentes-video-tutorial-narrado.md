---
title: 'Vídeo-tutorial narrado sem gravar a tela'
slug: video-tutorial-narrado-sem-gravar-a-tela
translationKey: agent-tools-narrated-tour
date: '2026-09-19'
excerpt: >-
  A skill que ensinei ao meu agente para gerar vídeos-tutorial de qualquer
  sistema web: screenshots com destaque, narração por voz local e ffmpeg. Sem
  gravar a tela, sem pagar por voz e sem refazer tudo quando uma frase muda.
featuredImage:
  url: /images/blog/video-tutorial-narrado.webp
  altText: >-
    Sequência de screenshots de um sistema web, cada uma com uma área em
    destaque, ligadas a trechos de narração e montadas num único vídeo
  type: ImageBlock
  width: 1200
  height: 630
  styles:
    self:
      borderRadius: medium
isFeatured: false
seo:
  metaTitle: 'Vídeo-tutorial narrado sem gravar a tela | Thiago Peraro'
  metaDescription: >-
    Como gerar vídeos-tutorial narrados de um sistema web com um agente de IA:
    screenshots com destaque via Playwright, narração com TTS local (Kokoro ou
    piper) e montagem com ffmpeg, tudo offline e sem custo por minuto.
  socialImage: /images/blog/video-tutorial-narrado.png
  metaTags:
    - property: keywords
      content: >-
        vídeo tutorial, product tour, Playwright, TTS local, Kokoro, piper,
        ffmpeg, Claude Code, skills, agentes de IA, onboarding
  type: Seo
colors: bg-light-fg-dark
type: PostLayout
author: content/data/person1.json
---

Este é o primeiro post de uma série sobre as ferramentas que eu criei para os meus agentes de IA. Cada uma resolve um problema pequeno e concreto que aparecia toda semana no meu trabalho. A primeira é a que mais chama atenção quando eu mostro: um vídeo-tutorial narrado de um sistema web, gerado inteiro pelo agente, sem ninguém gravar a tela.

> **Resposta direta:** o vídeo não é uma gravação de tela. É uma sequência de screenshots do sistema real, uma para cada trecho de narração, com a área explicada em destaque. Cada imagem fica na tela exatamente o tempo do seu áudio, então a narração nunca sai de sincronia. Captura com Playwright, voz com TTS local e montagem com ffmpeg: roda offline, sem custo por minuto, e mudar uma frase refaz só um trecho.

## De onde veio a ideia

Vi uns vídeos-tutorial muito bem acabados de uma plataforma de indicação e pedi a explicação de como tinham sido feitos. A resposta me surpreendeu: não havia gravação de tela nenhuma. Eram screenshots do sistema de verdade, uma por frase, com um destaque na parte que estava sendo explicada, montadas programaticamente com a narração.

Pedi para o meu agente aprender a técnica e transformar numa skill reutilizável do Claude Code. No processo, troquei a parte que custava dinheiro (a voz) por modelos que rodam na minha máquina, e deixei a montagem à prova das falhas que apareceram nos primeiros testes. Em menos de uma hora eu tinha um vídeo de teste de 38 segundos e, no mesmo dia, um teaser de 30 segundos da plataforma interna que estamos construindo na empresa.

## Por que não gravar a tela

Quem já gravou um tutorial sabe onde dói:

- **A narração sai de sincronia.** Você fala mais devagar num trecho, o mouse chega antes da frase, e o vídeo inteiro precisa ser regravado.
- **O destaque fica borrado.** Zoom e setas animadas em cima de gravação comprimida perdem nitidez justamente no ponto que você quer mostrar.
- **Qualquer mudança refaz tudo.** Mudou um botão de lugar ou uma palavra no roteiro, e lá se vai a tarde.

Com uma screenshot por trecho, esses três problemas somem. A imagem é estática e nítida, o destaque é desenhado em cima dela antes da captura, e a duração vem do próprio áudio: se a frase tem 6,2 segundos, a imagem fica 6,2 segundos na tela, mais uma pequena pausa para o corte não comer a última sílaba.

## Como funciona

O pipeline tem quatro etapas, e só a primeira é trabalho humano:

| Etapa | O que acontece | Ferramenta |
|---|---|---|
| **Roteiro** | um arquivo markdown com um trecho por seção da tela | editor de texto (ou o próprio agente) |
| **Captura** | abre cada página, rola até o elemento, escurece o resto e desenha uma borda em volta dele, tira a screenshot em 1920×1080 | Playwright com Chromium headless |
| **Narração** | transforma o texto de cada trecho em um MP3 | Kokoro na GPU, ou piper na CPU |
| **Montagem** | junta cada imagem com o seu áudio e concatena tudo num MP4 pronto para a web | ffmpeg |

O destaque é simples de propósito: quatro retângulos escuros em volta do elemento e uma borda brilhante em cima, tudo injetado na página só durante a captura e removido logo depois. Nada de edição de vídeo.

## O roteiro é a única coisa que você escreve

Cada trecho é uma seção do markdown. O título diz qual é o trecho, em que página ele acontece e qual elemento deve ficar em destaque; o corpo é o que a voz vai falar:

```markdown
## 02 | /dashboard | [data-testid="stats"]
No topo ficam as suas indicações: quantas pessoas você indicou, quantas viraram clientes e quanto você já ganhou.
```

Um hífen no lugar do seletor mostra a página inteira, sem destaque. O agente consegue escrever a primeira versão do roteiro sozinho, lendo o DOM do sistema para achar os seletores; o meu trabalho é revisar o texto.

A regra que mais melhora o resultado é **escrever para o ouvido, não para o olho**:

- uma ou duas frases por trecho: o que aquela parte faz e por que importa;
- frases curtas, sem símbolos, com números por extenso;
- nada de "clique aqui e depois ali": a imagem já mostra onde é.

Como referência, um tour de usuário final fica com 12 a 15 trechos (uns 2 minutos); um tour completo de administração, com 30 a 40 (uns 5 minutos).

## Narração local, sem pagar por voz

A parte mais cara desse tipo de vídeo costuma ser a voz. Eu uso duas opções que rodam na minha máquina:

| Motor | Qualidade | Quando usar |
|---|---|---|
| **Kokoro** | natural, a melhor das duas | quando tem GPU; roda num container e tem vozes em inglês e em português do Brasil |
| **piper** | mais robótica | quando não tem GPU nem Docker; zero configuração |

Os dois geram um MP3 por trecho. Se eu edito uma frase, apago só os arquivos daquele trecho e rodo de novo: todos os outros são reaproveitados. O idioma segue o público do vídeo, não o meu: os tours de administração da empresa, por exemplo, saem em inglês.

## Os detalhes que custaram um ciclo de depuração cada

Estes ficaram registrados na própria skill, para o agente não tropeçar neles de novo:

- **Duração explícita em vez de "pare quando o áudio acabar".** A opção do ffmpeg que deveria cortar o vídeo no fim do áudio trava para sempre quando a imagem está em loop. A skill calcula a duração de cada trecho e passa o valor exato.
- **O ffmpeg lê a entrada padrão sem pedir.** Dentro de um loop que lê a lista de trechos, ele consome as linhas seguintes e o loop para no primeiro trecho. Precisa desligar a leitura da entrada padrão.
- **Caminhos absolutos na concatenação.** A lista de arquivos é resolvida a partir da pasta da própria lista, não da pasta onde você rodou o comando.
- **Cada trecho é gravado de forma atômica.** Se a montagem for interrompida, rodar de novo continua de onde parou, sem arquivo pela metade.
- **Sistemas com login.** Um modo especial abre o navegador visível, espera você fazer login uma vez e salva a sessão para as capturas seguintes. Esse arquivo de sessão nunca sai da pasta de trabalho.

A compressão também foi escolhida para esse caso: como cada trecho é uma imagem parada, o encoder é configurado para conteúdo estático, e o vídeo final fica pequeno e começa a tocar no navegador antes de terminar de baixar.

## Como eu uso no dia a dia

O pedido para o agente é uma frase: "faz um tour narrado de dois minutos da tela de indicações". A partir daí ele sobe o sistema com dados de demonstração (tela vazia rende um tutorial inútil), escreve o roteiro, captura, narra, monta e confere o próprio resultado: a duração do vídeo tem que bater com a soma dos áudios, e ele extrai um quadro no meio para ver se o destaque caiu no lugar certo.

O que eu faço é revisar o roteiro e assistir. Quando algo muda no sistema, refazer o vídeo custa minutos, não uma tarde.

## Conclusão

A lição que fica vale para outras ferramentas também: muita coisa que parece exigir um software caro é, no fundo, uma composição de peças abertas. Aqui foram um navegador automatizado, um modelo de voz local e o ffmpeg, organizados como uma skill que o agente sabe usar.

No próximo post da série, falo das ferramentas de voz: como o agente me explica coisas em áudio quando estou longe da tela e como eu dito para ele, as duas offline.

Se você quer tutoriais em vídeo para o seu sistema, ou quer montar skills como esta para o seu time, [fale comigo no LinkedIn](https://www.linkedin.com/in/thiago-peraro/) ou pela [página de contato](/pt/contact/).
