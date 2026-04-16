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
      url: /images/hero.svg
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
          url: /images/sobrevidas.png
          altText: Projeto Sobrevidas
          elementId: ''
      - type: FeaturedItem
        title: onboarding-AI — Count on Sheep
        text: >
          **Responsável Técnico | jan 2026 – presente**

          API FastAPI principal da Count on Sheep (consultoria americana de
          cripto taxes), construída do zero como único responsável técnico.
          Pipeline de extração de transcrições com **7 agentes LangGraph** em
          3 fases paralelas (participantes, perfil cripto/DeFi/tax, DCA,
          logística, pain points). **STT em tempo real** via AWS Transcribe
          Streaming com state machine de sessão, KWS sidecar para termos cripto
          e LLM corrector. Sistema de email com **140+ templates Jinja2** e
          roteamento inteligente por estágio, software e tipo de cliente.
          Integrações HubSpot, DocuSign, Stripe, Gmail e Google Workspace.
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
          url: /images/abstract-feature1.svg
          altText: onboarding-AI Count on Sheep
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
          url: /images/koru.png
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
          url: /images/goiasprev.jpg
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
          **Community Builder | 2023–presente | 450+ membros**

          Líder de comunidade focada em inteligência artificial, promovendo
          eventos, networking e disseminação de pesquisa universitária.
          Palestrante regular. Conectamos profissionais, pesquisadores e
          entusiastas da área em Goiânia.
        actions:
          - label: Join Community
            altText: 'Participar da comunidade'
            url: '#'
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
        title: Palestras e Eventos
        text: >
          **Speaker | 2024-presente**
          
          Palestras sobre IA, empreendedorismo e uso ético da tecnologia em 
          diversos eventos. Compartilho conhecimentos sobre desenvolvimento 
          de produtos de IA e liderança em comunidades tech.
        actions:
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
          url: /images/palestrante.png
          altText: Palestrante
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
---
