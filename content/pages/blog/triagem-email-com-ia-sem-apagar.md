---
title: 'Classifiquei 3 mil e-mails por US$ 0,13, sem deixar a IA apagar nenhum'
slug: triagem-de-email-com-ia-sem-poder-apagar
translationKey: triagem-email-ia-sem-apagar
date: '2026-11-03'
excerpt: >-
  Como montei a triagem diária de uma caixa de e-mail compartilhada: regras
  antes do modelo, perguntas separadas, gabarito às cegas e uma trava que impede
  a IA de apagar, arquivar ou enviar qualquer coisa.
featuredImage:
  url: /images/blog/triagem-email-sem-apagar.webp
  altText: >-
    Mensagens de e-mail passam por uma trava e saem com etiquetas coloridas; a
    lixeira ao lado da trava está riscada, e uma mensagem segue sem etiqueta
  type: ImageBlock
  width: 1200
  height: 630
  styles:
    self:
      borderRadius: medium
isFeatured: false
seo:
  metaTitle: 'Triagem de e-mail com IA que não pode apagar nada | Thiago Peraro'
  metaDescription: >-
    Como classificar uma caixa de e-mail com IA por centavos e sem risco de
    perder mensagem: regras de cabeçalho, modelo de decisão, gabarito às cegas e
    uma trava que só deixa ler e etiquetar.
  socialImage: /images/blog/triagem-email-sem-apagar.png
  metaTags:
    - property: keywords
      content: >-
        triagem de e-mail com IA, classificação de e-mail, Jev, modelo de
        decisão, gabarito, precisão e recall, segurança de agentes, retenção
        zero de dados
  type: Seo
colors: bg-light-fg-dark
type: PostLayout
author: content/data/person1.json
---

A caixa de e-mail compartilhada da empresa onde cuido da tecnologia tinha virado um lugar onde tudo chegava e pouca coisa era vista. Eram cerca de 3.650 mensagens: documentos de clientes, recibos de pagamento, notificações de plataforma, marketing. No meio disso, as poucas mensagens que precisavam de alguém. O pedido veio numa reunião em outubro: o que é negócio estava se perdendo no ruído.

Neste post eu conto como resolvi, incluindo os números que não ficaram bons e a falha que passou cinco dias sem ninguém ver.

> **Resposta direta:** dá para classificar uma caixa de e-mail inteira com IA gastando centavos e sem risco de perder mensagem, desde que o modelo só possa adicionar etiquetas. O que funcionou aqui: regras de cabeçalho antes do modelo, um modelo de decisão com perguntas separadas, limiares medidos num gabarito às cegas e uma trava no código que recusa qualquer ação além de ler e etiquetar. Classificar 3.384 mensagens custou US$ 0,13.

## O risco não é errar a etiqueta

Etiqueta errada é um incômodo. E-mail de cliente arquivado ou apagado é um problema de verdade. Por isso a primeira decisão não foi qual modelo usar, e sim o que ele **não pode** fazer.

São três camadas, e nenhuma delas depende do prompt:

- **Só adiciona.** O sistema coloca uma etiqueta por mensagem. Nunca remove etiqueta, nunca arquiva, nunca mexe em "não lida".
- **Uma trava na saída.** Toda chamada da credencial de escrita passa por um guard. Ler, adicionar uma etiqueta da triagem e criar uma etiqueta passam. Mover para a lixeira, apagar, arquivar, enviar e chamadas em lote são recusados ali mesmo, e o pedido nem sai do contêiner.
- **Permissão curta.** A credencial não tem o escopo que a exclusão permanente exige. Mesmo com um bug na trava, essa ação não existe para ela.

O que o modelo não tem certeza fica onde estava, sem etiqueta e sem alerta. Avisos de segurança, como códigos de login e redefinição de senha, também não recebem etiqueta e não vão para o modelo.

## Primeiro as regras, depois o modelo

Boa parte da caixa se resolve lendo o cabeçalho: quem mandou, de qual sistema, se tem `List-Unsubscribe`. Essas regras são de graça e nada sai da máquina. Recibo de pagamento vai para a etiqueta dele, assinatura eletrônica para a dela, e uma disputa de pagamento vira alerta. Só o que sobra chega ao modelo.

Para o resto usei o [Jev](https://developers.cloudflare.com/ai/models/typesafe/jev/), da TypeSafe AI. Ele é um modelo de decisão: não escreve texto. Você manda o conteúdo e uma lista de perguntas, e ele devolve probabilidades. Custa US$ 0,042 por milhão de tokens de entrada, a saída é grátis, e a mediana aqui ficou em 417 ms. O cliente que escrevi se recusa a enviar a mensagem se a rota não garantir retenção zero de dados.

Três decisões vieram antes da primeira linha de código:

1. **Uma pergunta por fato.** O Jev responde cada pergunta de forma independente e não explica a resposta, então juntar critérios numa pergunta só esconde o que ele está medindo. São três: é envio em massa ou golpe, o que o remetente quer, e quem ele é para nós. Quem transforma as respostas em uma etiqueta é o código.
2. **Incerteza vai para uma pessoa, não para um modelo maior.** Meu plano tinha um LLM de reserva para os casos duvidosos. Um [benchmark público](https://github.com/SENZO-NCEKANA/jev-triage-benchmark) testou exatamente isso, e todos os limiares pioraram o resultado: o melhor perdeu 0,7 ponto de acurácia custando 3,4 vezes mais. Cortei a reserva.
3. **Versão travada.** Sai versão nova do modelo com frequência, e limiar calibrado em uma não vale para a outra. Fixei a `jev-1.14.0`.

## O gabarito veio antes do modelo

Separei 214 mensagens reais, cobrindo todos os domínios de remetente. O Claude rotulou todas sem ver nenhuma resposta do Jev, e eu revisei os alertas e os casos duvidosos. Depois rodei o Jev: 166 mensagens chegaram até ele, porque as outras se resolveram por regra, e isso custou US$ 0,014.

| | Limiares do plano (0,70 / 0,45) | Limiares escolhidos (0,88 / 0,60) |
|---|---|---|
| Etiquetas erradas | 27 | 7 |
| Precisão de spam | 23,8% | 100% (4 de 4) |
| Precisão dos alertas | 76,0% | 83,3% |
| "Precisa de resposta": precisão e recall | 100% e 62,5% | 100% e 62,5% |

O limiar que eu tinha planejado teria mandado newsletter legítima para o spam: a pergunta de spam dava de 0,70 a 0,86 para newsletter e de 0,90 a 0,93 para spam de verdade. Só dava para ver isso com o gabarito na mão.

Dois avisos sobre essa tabela. Escolhi os limiares no mesmo conjunto em que medi, então a coluna da direita é otimista. E quase não há e-mail humano nessa caixa: 18 respostas em 3.648 mensagens. "Precisa de resposta" tem só 8 exemplos, e o intervalo de confiança do recall vai de 31% a 86%. A etiqueta que mais importa é justamente a que tem menos dados.

## O que os erros ensinaram

Das 8 mensagens que precisavam de resposta, o modelo perdeu 3, e cada uma ensinou uma coisa:

- **Uma resposta a uma campanha** cujo assunto não estava na minha lista, então o remetente parecia desconhecido. Troquei a lista por uma regra melhor: quem responde citando um e-mail nosso é dos nossos. Essa regra achou todas as respostas de campanha da caixa e não tem lista para manter.
- **Alguém pedindo para apagar a própria conta.** O modelo classificou como "outro", porque um pedido não é uma pergunta. Hoje, pedido conta como pergunta.
- **Uma linha solta de um remetente desconhecido**, sem contexto nenhum. Essa continua difícil.

Como as respostas do modelo ficam salvas, testar uma regra nova é de graça: roda offline sobre as mesmas respostas. Com as regras novas, "precisa de resposta" foi de 5 para 7 de 8, com um alarme falso. Na caixa inteira, os documentos de um cliente saíram do spam quando fiz uma intenção clara de cliente ganhar da nota de envio em massa.

## Em produção

Todo dia de manhã o sistema lê o que chegou depois do último cursor, etiqueta e posta no Slack um relatório só com o que precisa de uma pessoa. Um item sai do relatório sozinho quando alguém responde à conversa.

A caixa inteira passou pelo modelo uma vez só: 3.384 mensagens por US$ 0,13. Dessas, 3.114 receberam etiqueta, sem nenhum alerta, para ninguém ser acordado por e-mail velho, e 270 ficaram como estavam.

Se o gateway cair ou o crédito acabar, a execução avisa, sai com erro e não move o cursor. No dia seguinte tenta a mesma janela de novo.

## A falha que passou cinco dias

O erro apareceu onde eu não estava olhando. Entre 24 e 28 de outubro, o Slack recusou o post todos os dias. As etiquetas continuaram funcionando, mas o aviso de falha ia para o mesmo canal e também foi recusado. Durante cinco dias, nada chegou e nada avisou que não tinha chegado.

Nada se perdeu, porque relatório que falha fica guardado para sair junto com o próximo. Mas a lição ficou: **o aviso de falha não pode depender do canal que ele vigia.**

## Se você for copiar

1. Defina primeiro o que o agente não pode fazer, e garanta isso no código e na credencial, não no prompt.
2. Resolva por regra tudo o que a regra resolve. É de graça e nada sai da sua máquina.
3. Monte o gabarito antes de ver a resposta do modelo.
4. Salve as respostas do modelo. Reavaliar uma regra nova passa a não custar nada.
5. Diga o tamanho da amostra junto com o número. "100% de precisão" em 8 exemplos não é a mesma coisa que em 800.

Se você está colocando agentes para mexer em dados reais da sua empresa e quer trocar ideia sobre esses limites, [fale comigo no LinkedIn](https://www.linkedin.com/in/thiago-peraro/) ou pela [página de contato](/pt/contact/).

## Fontes

- Cloudflare, [model card do `typesafe/jev`](https://developers.cloudflare.com/ai/models/typesafe/jev/): preço e interface.
- Senzo Ncekana, [jev-triage-benchmark](https://github.com/SENZO-NCEKANA/jev-triage-benchmark): o teste de cascata com LLM.
- Simon Willison, [*Jev introduces a new shape of LLM*](https://simonwillison.net/2026/Sep/21/jev/), set. 2026.
- Sebastian Raschka, [*Language Models for Text Classification: From Bag-of-Words to Jev*](https://magazine.sebastianraschka.com/p/classifier-history-and-jev).
- Os números de gabarito, custo e produção são medições minhas, em outubro de 2026.
