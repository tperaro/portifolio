---
title: Projetos - Thiago Peraro
slug: /projects
type: PageLayout
sections:
  - type: AnimatedHeroSection
    title: Meus Projetos
    subtitle: Principais projetos em IA e empreendedorismo
    text: >
      Aqui você pode conferir os principais projetos que desenvolvi e lidero, 
      desde pesquisas acadêmicas premiadas até startups inovadoras. Cada projeto 
      representa meu compromisso em aplicar tecnologia para resolver problemas reais.
    actions:
      - label: Ver GitHub
        altText: 'Ver perfil no GitHub'
        url: https://github.com/tperaro
        showIcon: true
        icon: github
        iconPosition: right
        style: primary
        elementId: ''
        type: Button
    media:
      url: /images/builders.webp
      altText: Projetos de Thiago Peraro
      type: image
    backgroundAnimation: gradient
    typingEffect: true
    typingSpeed: 15
    preset: moderate
    elementId: projects-hero
    colors: bg-light-fg-dark

  - type: FeaturedItemsSection
    title:
      text: Projetos Principais
      color: text-dark
      styles:
        self:
          textAlign: center
      type: TitleBlock
    subtitle: Iniciativas de maior impacto e reconhecimento
    items:
      - type: FeaturedItem
        title: Projeto Sobrevidas 🏆
        text: >
          **Bolsista CNPq | 2024 – presente | Prêmio Nacional SBCAS 2025**

          Chatbot integrado ao SUS para rastreamento de câncer de boca,
          desenvolvido com técnicas avançadas de NLP. Como líder da equipe de
          IA, coordeno o desenvolvimento de uma solução que pode salvar vidas
          através do diagnóstico precoce. **Co-autor do artigo premiado como
          melhor do Brasil no SBCAS 2025** (categoria ferramentas).
        actions:
          - label: Baixar artigo
            altText: 'Baixar artigo sobre o projeto'
            url: /35620-1093-28716-1-10-20250608-2.pdf
            showIcon: true
            icon: arrowRight
            iconPosition: right
            style: primary
            elementId: ''
            type: Link
        elementId: ''
        styles:
          self:
            textAlign: left
            padding:
              - pt-6
              - pb-6
              - pl-4
              - pr-4
        image:
          type: ImageBlock
          url: /images/sobrevidas.webp
          altText: Projeto Sobrevidas
          elementId: ''
      - type: FeaturedItem
        title: onboarding-AI — Count on Sheep
        text: >
          **Responsável Técnico | jan 2026 – presente**

          API FastAPI principal da Count on Sheep (consultoria americana de
          cripto taxes), construída do zero e levada ao deploy em produção como
          único responsável técnico. Criei um **agente de IA que coordena o
          onboarding de ponta a ponta**. A solução combina um pipeline de
          extração com **7 agentes LangGraph** em 3 fases paralelas com **STT em
          tempo real** via AWS Transcribe
          Streaming, state machine de sessão, KWS sidecar para termos cripto e
          LLM corrector, além de integrações com CRM (Pipedrive), DocuSign,
          Stripe, Gmail e Google Workspace.
        actions:
          - label: Count on Sheep
            altText: 'Count on Sheep'
            url: https://countonsheep.com
            showIcon: true
            icon: arrowRight
            iconPosition: right
            style: primary
            elementId: ''
            type: Link
        elementId: ''
        styles:
          self:
            textAlign: left
            padding:
              - pt-6
              - pb-6
              - pl-4
              - pr-4
        image:
          type: ImageBlock
          url: /images/onboarding-ai.svg
          altText: Arquitetura de onboarding empresarial com IA
          elementId: ''
      - type: FeaturedItem
        title: Clivia — IA para Clínicas (encerrada)
        text: >
          **Fundador & CEO | mar 2024 – dez 2025**

          Plataforma multi-agente LLM para clínicas médicas — SDR inteligente
          via WhatsApp. Arquitetei toda a stack: FastAPI, LangGraph Supervisor
          (StateGraph com RedisSaver checkpointer), LiteLLM proxy self-hosted
          com router e fallback, Langfuse para observabilidade, **Docker
          Swarm com 40+ containers em produção**. Migrou de CrewAI (v1) para
          LangGraph Supervisor (v2). Encerrada em dez/2025.
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: left
            padding:
              - pt-6
              - pb-6
              - pl-4
              - pr-4
        image:
          type: ImageBlock
          url: /images/LogoClivia.png
          altText: Logo da Clivia
          elementId: ''
      - type: FeaturedItem
        title: Projeto Koru — CEIA-UFG
        text: >
          **Pesquisador NLP | dez 2024 – presente**

          Sistema multi-agente (LangGraph) para avaliação de soft skills e
          competências de liderança, no CEIA-UFG/AKCIT. Responsável pelo
          **koru-dashboard** (Streamlit + Plotly + TimescaleDB) com
          observabilidade em tempo real e pelos testes de **Red Team
          adversarial com DeepTeam** (prompt injection e vulnerabilidades).
          Projeto distinto do Sobrevidas — aqui a pesquisa é em avaliação
          automatizada de competências humanas.
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: left
            padding:
              - pt-6
              - pb-6
              - pl-4
              - pr-4
        image:
          type: ImageBlock
          url: /images/koru.webp
          altText: Projeto Koru
          elementId: ''
      - type: FeaturedItem
        title: Sistemas GoiásPrev
        text: >
          **Desenvolvimento Back-end | 2019-2022**
          
          Durante três anos, desenvolvi e mantive sistemas críticos para o órgão 
          de previdência do Estado de Goiás, utilizando Java e Spring Boot. 
          Responsável por soluções que impactam milhares de servidores públicos, 
          garantindo segurança e eficiência nos processos previdenciários.
        actions:
          - label: Ver Detalhes
            altText: 'Ver detalhes técnicos'
            url: '/experience'
            showIcon: true
            icon: arrowRight
            iconPosition: right
            style: secondary
            elementId: ''
            type: Link
        elementId: ''
        styles:
          self:
            textAlign: left
            padding:
              - pt-6
              - pb-6
              - pl-4
              - pr-4
        image:
          type: ImageBlock
          url: /images/goiasprev.webp
          altText: Logo GoiásPrev
          elementId: ''
    actions: []
    elementId: ''
    variant: three-col-grid
    colors: bg-neutral-fg-dark
    styles:
      self:
        padding:
          - pt-8
          - pb-16
          - pl-4
          - pr-4
        justifyContent: center

  - type: FeaturedItemsSection
    title:
      text: Count on Sheep em 2026
      color: text-dark
      styles:
        self:
          textAlign: center
      type: TitleBlock
    subtitle: Tecnologia, growth e produto na Count on Sheep
    items:
      - type: FeaturedItem
        title: Radar de visibilidade em IA
        text: >
          **Count on Sheep | ago–set 2026**

          Criei um radar semanal de visibilidade em IA: ele mede se ChatGPT,
          Gemini, AI Overview, Perplexity e Copilot citam a Count on Sheep e
          compara com os concorrentes. As fontes são a API de AI Optimization da DataForSEO
          (menções da marca em respostas de LLM, share of voice contra
          concorrentes e volume de busca em IA), o Google Search Console, o
          Bing Webmaster (AI Performance) e os logs de crawlers de IA na
          Vercel. Toda semana, um PDF com a identidade visual da empresa
          chega sozinho no canal de marketing do Slack, com uma fila de
          ações priorizadas que só aponta causa quando há evidência. Completa
          o quadro o rank tracking diário no Google (share of voice,
          canibalização e lacunas de conteúdo) para countonsheep.com e
          coselite.com.
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: left
            padding:
              - pt-4
              - pb-4
              - pl-4
              - pr-4
      - type: FeaturedItem
        title: Shepherd
        text: >
          **Count on Sheep | jul–set 2026**

          Co-construí o Shepherd, a plataforma que substitui a planilha de
          ~1.000 abas da operação (vendas, entrega, faturamento e
          capacidade): Next.js 16, Drizzle, Neon e Clerk na Vercel. Fiquei
          com dados e integrações — ETL da planilha e do CRM, bot do Slack,
          detecção de no-show pelo Google Meet e pagamentos no Stripe — e com
          o ambiente de staging.
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: left
            padding:
              - pt-4
              - pb-4
              - pl-4
              - pr-4
      - type: FeaturedItem
        title: Process Hub
        text: >
          **Count on Sheep | mar–set 2026**

          Criei o Process Hub da Count on Sheep: o segundo cérebro da
          empresa, com ~378 documentos e 31 decisões de arquitetura, operado
          por skills próprias do Claude Code e do Codex, com consolidação
          noturna de memória por LLM em modo somente leitura. É a prática
          por trás da palestra "Second Brain + AI OS".
        actions:
          - label: Ler o post
            altText: 'Ler o post sobre o Process Hub'
            url: /blog/aios-segundo-cerebro-empresarial
            showIcon: true
            icon: arrowRight
            iconPosition: right
            style: primary
            elementId: ''
            type: Link
        elementId: ''
        styles:
          self:
            textAlign: left
            padding:
              - pt-4
              - pb-4
              - pl-4
              - pr-4
      - type: FeaturedItem
        title: Atribuição e analytics first-party
        text: >
          **Count on Sheep | mai–set 2026**

          Montei a atribuição ponta a ponta do marketing: do UTM do primeiro
          clique até a reunião agendada no Cal.com, passando por n8n, CRM e
          Postgres, com um ranking de páginas por reunião agendada para
          decidir onde investir em link building. Construí também o
          analytics first-party dos sites (Supabase, FingerprintJS e
          web-vitals), respeitando o consentimento LGPD/GDPR e com um
          container GTM dedicado para cada marca. No COS Data Hub ele mostra
          visitantes ativos ao vivo, sessões e visitantes únicos, reuniões
          agendadas, aquisição por UTM, dispositivo e navegador, páginas por
          sessão e duração das sessões, seções mais vistas, cliques de
          navegação, heatmap de cliques e Web Vitals (p75), além das visitas
          vindas de IA, busca paga e embaixadores.
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: left
            padding:
              - pt-4
              - pb-4
              - pl-4
              - pr-4
      - type: FeaturedItem
        title: COS Data Hub
        text: >
          **Count on Sheep | jul–set 2026**

          Criei o COS Data Hub, painel multi-marca (countonsheep.com e
          coselite.com) que reconcilia, página a página, GA4, BigQuery,
          Vercel Analytics, o analytics próprio e o Search Console — as
          "três verdades" — com alerta quando as fontes divergem mais de 15%
          e uma aba de visibilidade em IA. Regra de design: métrica que não
          foi coletada nunca aparece como zero. Stack: React 19 + TypeScript
          + TanStack Query + Recharts, dados do onboarding-AI (FastAPI) e
          Supabase.
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: left
            padding:
              - pt-4
              - pb-4
              - pl-4
              - pr-4
      - type: FeaturedItem
        title: Revisão automática das páginas de SEO
        text: >
          **Count on Sheep | set 2026**

          O site recebe mudanças feitas por agentes de IA de outras pessoas.
          Criei uma revisão automática que protege as páginas mais
          importantes para SEO: a cada pull request, ela renderiza essas
          páginas antes e depois da mudança (build + Playwright) e aponta o
          que mudou no HTML, no schema, nos botões de ação e no visual. A
          decisão é por regras fixas, sem LLM, então o resultado é sempre o
          mesmo para a mesma mudança.
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: left
            padding:
              - pt-4
              - pb-4
              - pl-4
              - pr-4
      - type: FeaturedItem
        title: Triagem da caixa compartilhada com IA
        text: >
          **Count on Sheep | out 2026**

          A caixa compartilhada da empresa misturava documentos de
          clientes, recibos de pagamento, marketing e as poucas
          mensagens que realmente pediam resposta. Construí um
          classificador diário: primeiro regras de cabeçalho, de
          graça, depois o Jev, um modelo de decisão, com três
          perguntas separadas e retenção zero de dados garantida
          no código. Cada mensagem recebe uma etiqueta no Gmail, e
          um relatório diário no Slack lista só o que precisa de
          uma pessoa. Ele não tem como perder e-mail: uma trava
          recusa qualquer pedido que não seja ler ou adicionar
          etiqueta, então apagar, arquivar e enviar nunca saem do
          contêiner, e o que o modelo não tem certeza fica
          intocado. Ajustei os limiares em 214 mensagens reais
          rotuladas às cegas, e classificar a caixa inteira, cerca
          de 3.400 mensagens, custou US$ 0,13.
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: left
            padding:
              - pt-4
              - pb-4
              - pl-4
              - pr-4
      - type: FeaturedItem
        title: COS Elite
        text: >
          **Count on Sheep | abr–set 2026**

          Migrei o site da COS Elite do HubSpot para Next.js 16 + Sanity na
          Vercel, com analytics e SEO/GEO próprios e cerca de US$ 1 mil por
          mês a menos em ferramentas.
        actions:
          - label: COS Elite
            altText: 'Ver o site da COS Elite'
            url: https://coselite.com
            showIcon: true
            icon: arrowRight
            iconPosition: right
            style: primary
            elementId: ''
            type: Link
        elementId: ''
        styles:
          self:
            textAlign: left
            padding:
              - pt-4
              - pb-4
              - pl-4
              - pr-4
      - type: FeaturedItem
        title: Portal do cliente
        text: >
          **Count on Sheep | mar–set 2026**

          Construí e mantenho o portal de onboarding dos clientes
          (onramp.countonsheep.com, React 19): cada cliente acompanha as
          próprias etapas por um link único, sem precisar de login, e
          encontra tutoriais animados de como usar cada software de imposto
          cripto. Hospedado na Vercel, com Sentry e versão mobile.
        actions:
          - label: Ver o portal
            altText: 'Ver o portal de onboarding de clientes'
            url: https://onramp.countonsheep.com
            showIcon: true
            icon: arrowRight
            iconPosition: right
            style: secondary
            elementId: ''
            type: Link
        elementId: ''
        styles:
          self:
            textAlign: left
            padding:
              - pt-4
              - pb-4
              - pl-4
              - pr-4
      - type: FeaturedItem
        title: Programa de indicação
        text: >
          **Count on Sheep | jun–ago 2026**

          Construí o programa de indicação e embaixadores da empresa de
          ponta a ponta: código único, rastreio por cookie, criação
          automática do negócio no CRM via Cal.com e n8n, webhook de
          pagamento e painel de administração, com hardening de segurança.
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: left
            padding:
              - pt-4
              - pb-4
              - pl-4
              - pr-4
    actions: []
    elementId: ''
    variant: three-col-grid
    colors: bg-light-fg-dark
    styles:
      self:
        padding:
          - pt-0
          - pb-16
          - pl-4
          - pr-4
        justifyContent: center

  - type: FeaturedItemsSection
    title:
      text: Comunidades e Liderança
      color: text-dark
      styles:
        self:
          textAlign: center
      type: TitleBlock
    subtitle: Iniciativas de community building e networking
    items:
      - type: FeaturedItem
        title: Magnatas.hub
        text: >
          **Co-fundador | 2023-presente**
          
          Comunidade de empreendedores focada em networking e desenvolvimento 
          de negócios inovadores. Promovemos eventos, workshops e conexões 
          entre profissionais do ecossistema empreendedor de Goiânia.
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: left
            padding:
              - pt-4
              - pb-4
              - pl-4
              - pr-4
        image:
          type: ImageBlock
          url: /images/MagnatasLogo.png
          altText: Logo Magnatas.hub
          elementId: ''
      - type: FeaturedItem
        title: Go.IAs
        text: >
          **Community Builder | 2023–presente | 500+ membros**

          Líder de comunidade focada em inteligência artificial, promovendo
          eventos, networking e disseminação de pesquisa universitária.
          Palestrante regular. Conectamos profissionais, pesquisadores e
          entusiastas da área em Goiânia.
        actions:
          - label: Join Community
            altText: 'Participar da comunidade'
            url: https://comunidade-goias.com.br/
            showIcon: true
            icon: arrowRight
            iconPosition: right
            style: secondary
            elementId: ''
            type: Link
        elementId: ''
        styles:
          self:
            textAlign: left
            padding:
              - pt-4
              - pb-4
              - pl-4
              - pr-4
        image:
          type: ImageBlock
          url: /images/logo-Goias.png
          altText: Logo Go.IAs
          elementId: ''
      - type: FeaturedItem
        title: AI Brasil & Palestras 🏆
        text: >
          **Speaker | 2024-presente**

          Palestras sobre IA, empreendedorismo e uso ético da tecnologia em
          diversos eventos. Compartilho conhecimentos sobre desenvolvimento
          de produtos de IA e liderança em comunidades tech. Em 2026 palestrei
          **Second Brain + AI OS** no **AI Brasil** (CEIA Open Day / Go.IAs
          Experience) e fui reconhecido como **1º AI Brasil Hero**.
        actions:
          - label: Ver palestra
            altText: 'Ver a página de palestras e o prêmio'
            url: /palestras
            showIcon: true
            icon: arrowRight
            iconPosition: right
            style: primary
            elementId: ''
            type: Link
          - label: Convites
            altText: 'Convites para palestras'
            url: '/contact'
            showIcon: true
            icon: mail
            iconPosition: right
            style: secondary
            elementId: ''
            type: Link
        elementId: ''
        styles:
          self:
            textAlign: left
            padding:
              - pt-4
              - pb-4
              - pl-4
              - pr-4
        image:
          type: ImageBlock
          url: /palestras/palco-aibrasil.webp
          altText: Thiago Peraro palestrando no AI Brasil
          elementId: ''
    actions: []
    elementId: ''
    variant: three-col-grid
    colors: bg-light-fg-dark
    styles:
      self:
        padding:
          - pt-0
          - pb-16
          - pl-4
          - pr-4
        justifyContent: center

  - type: FeaturedItemsSection
    title:
      text: Pesquisa e Desenvolvimento
      color: text-dark
      styles:
        self:
          textAlign: center
      type: TitleBlock
    subtitle: Projetos de pesquisa e inovação tecnológica
    items:
      - type: FeaturedItem
        title: Fine-tuning de classificadores para avaliar competências
        text: >
          **Projeto Koru, CEIA-UFG | ago 2026**

          Treinei e avaliei classificadores transformer na minha
          própria GPU, um modelo para cada uma de 11 competências,
          pontuando respostas abertas nos seis níveis de Bloom. O
          BERTimbau chegou a 88,7% de acerto exato por skill e
          96,5% com tolerância de um nível; o BloomBERT
          (DistilBERT), a 85,8% e 95,9%. O achado honesto é que
          modelos clássicos foram melhores nos mesmos dados, com o
          Extra Trees em 91,6%. Foi pesquisa, sobre um dataset
          sintético construído pelo time, não um modelo em
          produção.
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: left
            padding:
              - pt-4
              - pb-4
              - pl-4
              - pr-4
      - type: FeaturedItem
        title: Processamento de Linguagem Natural
        text: >
          Pesquisa avançada em NLP aplicado à área médica, desenvolvendo modelos 
          de linguagem especializados para diagnóstico e triagem automatizada. 
          Foco em chatbots conversacionais para sistemas de saúde.
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: left
            padding:
              - pt-4
              - pb-4
              - pl-4
              - pr-4
      - type: FeaturedItem
        title: Large Language Models
        text: >
          Investigação contínua em LLMs, fine-tuning e aplicações práticas. 
          Desenvolvimento de agentes conversacionais especializados e 
          integração de modelos de linguagem em sistemas empresariais.
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: left
            padding:
              - pt-4
              - pb-4
              - pl-4
              - pr-4
      - type: FeaturedItem
        title: IA Ética e Responsável
        text: >
          Advocacy e pesquisa sobre o uso ético da inteligência artificial, 
          promovendo discussões sobre responsabilidade, transparência e 
          impacto social da tecnologia em diferentes setores.
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: left
            padding:
              - pt-4
              - pb-4
              - pl-4
              - pr-4
      - type: FeaturedItem
        title: Sistemas de Saúde Inteligentes
        text: >
          Desenvolvimento de soluções de IA para o setor de saúde, incluindo 
          sistemas de triagem automatizada, chatbots médicos e ferramentas 
          de apoio ao diagnóstico integradas ao SUS.
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: left
            padding:
              - pt-4
              - pb-4
              - pl-4
              - pr-4
      - type: FeaturedItem
        title: Agentes Conversacionais
        text: >
          Especialização em desenvolvimento de chatbots e agentes de IA 
          para diferentes domínios, desde atendimento médico até automação 
          de vendas e suporte ao cliente.
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: left
            padding:
              - pt-4
              - pb-4
              - pl-4
              - pr-4
      - type: FeaturedItem
        title: Integração SUS
        text: >
          Pesquisa e desenvolvimento de soluções de IA integradas ao Sistema 
          Único de Saúde, focando em escalabilidade, segurança e impacto 
          social positivo para o sistema público de saúde brasileiro.
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: left
            padding:
              - pt-4
              - pb-4
              - pl-4
              - pr-4
    actions: []
    elementId: ''
    variant: three-col-grid
    colors: bg-neutral-fg-dark
    styles:
      self:
        padding:
          - pt-0
          - pb-16
          - pl-4
          - pr-4
        justifyContent: center

  - type: FeaturedItemsSection
    title:
      text: Ferramentas e projetos pessoais
      color: text-dark
      styles:
        self:
          textAlign: center
      type: TitleBlock
    subtitle: Automação para agentes de IA e um projeto pessoal de dados
    items:
      - type: FeaturedItem
        title: Ferramentas que criei para agentes
        text: >
          **Ferramentas para agentes de IA | 2026**

          Skills e ferramentas próprias para o Claude Code e o Codex:
          vídeos-tutorial narrados gerados sozinhos (Playwright + TTS
          offline + ffmpeg); uma ponte que deixa o Playwright usar o login
          do Firefox recriando a criptografia de cookies do Chrome;
          explicações em áudio com TTS offline; ditado por voz offline
          (Parakeet em ONNX); automação de Slack Lists; hooks que rodam o
          CI local antes de abrir PR; e um loop de pesquisa com rubrica que
          escreve especificações sozinho.
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: left
            padding:
              - pt-4
              - pb-4
              - pl-4
              - pr-4
      - type: FeaturedItem
        title: flight-miles
        text: >
          **Projeto pessoal | 2026**

          Projeto pessoal que compara o preço em dinheiro com o custo em
          milhas: scrapers com circuit breaker para os principais
          marketplaces de milhas, busca de tarifas reais com Playwright,
          jobs agendados e chaves de API criptografadas. FastAPI +
          SQLAlchemy async + React.
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: left
            padding:
              - pt-4
              - pb-4
              - pl-4
              - pr-4
    actions: []
    elementId: ''
    variant: three-col-grid
    colors: bg-light-fg-dark
    styles:
      self:
        padding:
          - pt-0
          - pb-16
          - pl-4
          - pr-4
        justifyContent: center

  - type: GenericSection
    title:
      text: Colaborações e Parcerias
      color: text-dark
      type: TitleBlock
    subtitle: Interessado em colaborar ou desenvolver um projeto?
    text: >
      Estou sempre aberto a novas colaborações, seja em pesquisa acadêmica, 
      projetos empresariais ou iniciativas de impacto social. Se você tem uma 
      ideia interessante envolvendo IA, empreendedorismo ou comunidades tech, 
      vamos conversar!
    actions:
      - label: Propor Colaboração
        altText: 'Propor colaboração'
        url: /contact
        showIcon: true
        icon: mail
        iconPosition: right
        style: primary
        elementId: ''
        type: Button
      - label: LinkedIn
        altText: 'Conectar no LinkedIn'
        url: https://www.linkedin.com/in/thiago-peraro/
        showIcon: true
        icon: linkedin
        iconPosition: right
        style: secondary
        elementId: ''
        type: Link
    elementId: ''
    colors: bg-light-fg-dark
    styles:
      self:
        alignItems: center
        flexDirection: col
        padding:
          - pt-16
          - pb-16
          - pl-4
          - pr-4
        justifyContent: center
        textAlign: center
      title:
        textAlign: center
      subtitle:
        textAlign: center
      text:
        textAlign: center
      actions:
        justifyContent: center
seo:
  metaTitle: Projetos de IA e Tecnologia | Thiago Peraro
  metaDescription: >-
    Projetos liderados por Thiago Peraro em inteligência artificial, saúde,
    educação, plataformas públicas e transformação digital.
  type: Seo
---
