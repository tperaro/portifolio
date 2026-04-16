---
title: Sobre Mim - Thiago Peraro
slug: /about
type: PageLayout
sections:
  - type: AnimatedHeroSection
    title: Sobre Mim
    subtitle: Responsável de tecnologia, pesquisador de IA e empreendedor
    text: >
      Sou Thiago Peraro, pesquisador de IA e responsável técnico com foco em
      processamento de linguagem natural e sistemas multi-agente. Minha
      trajetória combina experiência sólida em back-end (4+ anos em Java/Spring),
      pesquisa acadêmica e liderança técnica de produto.


      Graduando em Ciência da Computação pela UFG (2019–presente, ~83%
      concluído). Atualmente sou responsável por toda a tecnologia na Count on
      Sheep (consultoria americana de cripto taxes), pesquisador NLP no
      CEIA-UFG no projeto Koru e bolsista CNPq no projeto Sobrevidas. Fundei e
      operei a Clivia (mar 2024 – dez 2025). Estou aberto a novas
      oportunidades em AI Engineering.
    actions:
      - label: LinkedIn
        altText: Conectar no LinkedIn
        url: 'https://www.linkedin.com/in/thiago-peraro/'
        showIcon: true
        icon: linkedin
        iconPosition: right
        style: primary
        elementId: ''
        type: Button
      - label: Baixar CV
        altText: Baixar currículo
        url: /cv/thiago-peraro-cv.pdf
        showIcon: true
        icon: arrowDown
        iconPosition: right
        style: secondary
        elementId: ''
        type: Link
    media:
      url: /images/Thiago_Peraro-Magnatas.jpeg
      altText: Thiago Peraro
      type: image
    backgroundAnimation: gradient
    typingEffect: true
    typingSpeed: 15
    preset: moderate
    elementId: about-hero
    colors: bg-light-fg-dark
  - type: FeaturedItemsSection
    title:
      text: Principais Conquistas
      color: text-dark
      styles:
        self:
          textAlign: center
      type: TitleBlock
    subtitle: Marcos importantes da minha carreira
    items:
      - type: FeaturedItem
        title: Projeto Sobrevidas - Prêmio Nacional
        text: >
          Lidero a equipe de IA do projeto Sobrevidas no CEIA-UFG, desenvolvendo
          um chatbot  integrado ao SUS para rastreamento de câncer de boca.
          Nossa solução recebeu o  prêmio de melhor artigo do Brasil no SBCAS
          2025, reconhecendo o impacto social  da pesquisa aplicada.
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: center
            padding:
              - pt-6
              - pb-6
              - pl-4
              - pr-4
        image:
          type: ImageBlock
          url: /images/sobrevidas.png
          altText: Projeto Sobrevidas
          elementId: ''
      - type: FeaturedItem
        title: Clivia — Empresa Própria (mar 2024 – dez 2025)
        text: >
          Fundei e operei a Clivia, plataforma multi-agente LLM para clínicas
          médicas (SDR inteligente via WhatsApp). Arquitetei toda a stack de
          zero — FastAPI, LangGraph Supervisor, LiteLLM, Redis checkpointer,
          Docker Swarm com 40+ containers. **Encerrada em dez/2025** ao
          iniciar a jornada na Count on Sheep.
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: center
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
        title: Liderança em Comunidades
        text: >
          Co-fundei a comunidade Magnatas.hub em 2023 e atuo como community
          builder na Go.IAs,  promovendo networking e eventos em inteligência
          artificial. Através dessas iniciativas,  conectamos profissionais e
          fomentamos o ecossistema de inovação em Goiânia.
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: center
            padding:
              - pt-6
              - pb-6
              - pl-4
              - pr-4
        image:
          type: ImageBlock
          url: /images/abstract-feature3.svg
          altText: Liderança em Comunidades
          elementId: ''
    actions: []
    elementId: ''
    variant: three-col-grid
    colors: bg-neutral-fg-dark
    styles:
      self:
        padding:
          - pt-16
          - pb-16
          - pl-4
          - pr-4
        justifyContent: center
  - type: GenericSection
    title:
      text: Experiência Técnica
      color: text-dark
      type: TitleBlock
    subtitle: Stack tecnológico e áreas de especialização
    text: |
      **Desenvolvimento Back-end:**
      • Java e Spring Boot — 4+ anos; Flyway (60+ migrations), RabbitMQ,
        Spring Security OAuth2 (GoiásPrev + Count on Sheep)
      • Python — FastAPI, Pydantic v2, asyncio
      • SQL — PostgreSQL, Supabase, pgvector
      • APIs RESTful, arquitetura de microsserviços, Linux

      **Inteligência Artificial e LLMOps:**
      • Sistemas multi-agente — LangGraph (Supervisor, StateGraph, RedisSaver
        & AsyncPostgresSaver checkpointers), CrewAI, LangChain (LCEL)
      • MCP (Model Context Protocol) — cliente customizado e servidor
        FastMCP implementados do zero
      • RAG / GraphRAG — pgvector, FAISS, Supabase vector store
      • LLMOps — LiteLLM (proxy self-hosted com router e fallback), OpenLit,
        Helicone, Langfuse (tracing + llm-as-a-judge Evaluator)
      • Red Team e Guardrails — DeepTeam (prompt injection, adversarial),
        Deepeval (toxicidade, preconceito, hate speech)
      • STT em tempo real — AWS Transcribe Streaming (WebSocket state
        machine, KWS sidecar), Deepgram Nova-3, OpenAI Whisper
      • Text2SQL / GenBI customizado, Ollama local

      **Infraestrutura e DevOps:**
      • Docker Swarm — 40+ containers em produção (Clivia)
      • CI/CD — GitHub Actions → Docker Hub → Portainer redeploy
      • Observabilidade — Langfuse, LangSmith, Prometheus, Grafana, Loki

      **Empreendedorismo e Liderança:**
      • Fundação, operação e encerramento de startup LLM (Clivia)
      • Community building — Go.IAs (450+ membros) e Magnatas.hub
      • Palestras regulares sobre IA e empreendedorismo
    actions:
      - label: Ver Projetos
        altText: Ver meus projetos
        url: /projects
        showIcon: true
        icon: arrowRight
        iconPosition: right
        style: primary
        elementId: ''
        type: Link
    media:
      url: /images/hero3.svg
      altText: Experiência técnica
      elementId: ''
      type: ImageBlock
    elementId: ''
    colors: bg-light-fg-dark
    styles:
      self:
        alignItems: center
        flexDirection: row-reverse
        padding:
          - pt-16
          - pb-16
          - pl-4
          - pr-4
        justifyContent: center
  - type: GenericSection
    title:
      text: Formação e Pesquisa
      color: text-dark
      type: TitleBlock
    subtitle: Trajetória acadêmica e científica
    text: |
      **Formação Acadêmica:**
      • **Bacharelado em Ciência da Computação** — UFG (2019–presente, ~83%
        concluído)
      • Participação ativa em iniciativas de pesquisa e extensão

      **Pesquisa Atual (dois projetos distintos):**
      • **Projeto Sobrevidas — Bolsista CNPq (2024–presente)**
        — NLP aplicado à saúde; chatbot para rastreamento de câncer de boca
        integrado ao SUS. Projeto premiado no SBCAS 2025.
      • **Projeto Koru — Pesquisador NLP no CEIA-UFG/AKCIT
        (dez 2024–presente)**
        — sistema multi-agente com LangGraph para avaliação de soft skills
        e competências de liderança. Desenvolvo o koru-dashboard
        (Streamlit + Plotly + TimescaleDB) e conduzo testes de Red Team
        adversarial com DeepTeam.

      **Publicações e Reconhecimentos:**
      • 🏆 Artigo **premiado como melhor do Brasil no SBCAS 2025** (categoria
        ferramentas) — projeto Sobrevidas
      • Líder destaque entre 60 bolsistas do programa EMBRAPII,
        acompanhado por 8 mentores doutores
      • Palestras regulares sobre IA e empreendedorismo
    actions:
      - label: Ver Experiência
        altText: Ver experiência detalhada
        url: /experience
        showIcon: true
        icon: arrowRight
        iconPosition: right
        style: primary
        elementId: ''
        type: Link
    elementId: ''
    colors: bg-neutral-fg-dark
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
  - type: GenericSection
    title:
      text: Filosofia e Visão
      color: text-dark
      type: TitleBlock
    subtitle: Como vejo o futuro da tecnologia
    text: >
      Acredito profundamente no poder transformador da inteligência artificial
      quando aplicada  de forma ética e responsável. Meu trabalho sempre busca o
      equilíbrio entre inovação  tecnológica e impacto social positivo.


      No projeto Sobrevidas, por exemplo, desenvolvemos uma solução que pode
      salvar vidas através do diagnóstico precoce de câncer de boca. Na Clivia
      (mar 2024 – dez 2025), construí ferramentas que humanizaram o atendimento
      médico através de sistemas multi-agente, aplicando pesquisa em produto
      real em escala de produção.


      Como líder de comunidades, promovo o networking e a colaboração entre
      profissionais,  acreditando que a inovação surge da troca de conhecimentos
      e experiências. Defendo  sempre o uso ético da IA e a importância de
      desenvolvermos tecnologias que beneficiem  toda a sociedade.
    actions:
      - label: Contato para Palestras
        altText: Entre em contato para palestras
        url: /contact
        showIcon: true
        icon: mail
        iconPosition: right
        style: primary
        elementId: ''
        type: Button
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
  - type: GenericSection
    title:
      text: Evolução Técnica Detalhada
      color: text-dark
      type: TitleBlock
    subtitle: Timeline interativa de skills por ano e categoria
    text: >
      Explore minha trajetória técnica de forma interativa — veja quais skills
      adquiri em cada ano, os projetos associados e o contexto profissional de cada tecnologia.
    actions:
      - label: Explorar Skills
        altText: Ver timeline de habilidades técnicas
        url: /skills
        showIcon: true
        icon: arrowRight
        iconPosition: right
        style: primary
        elementId: ''
        type: Button
    elementId: skills-cta
    colors: bg-neutral-fg-dark
    styles:
      self:
        alignItems: center
        flexDirection: col
        padding:
          - pt-12
          - pb-12
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
---
