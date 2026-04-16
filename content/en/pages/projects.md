---
title: Projects - Thiago Peraro
slug: /projects
type: PageLayout
sections:
  - type: AnimatedHeroSection
    title: My Projects
    subtitle: Key projects in AI and entrepreneurship
    text: >
      Here are the main projects I've built and lead — from award-winning
      academic research to innovative startups. Each project reflects a
      commitment to applying technology to real-world problems.
    actions:
      - label: View GitHub
        altText: 'View GitHub profile'
        url: https://github.com/tperaro
        showIcon: true
        icon: github
        iconPosition: right
        style: primary
        elementId: ''
        type: Button
    media:
      url: /images/hero.svg
      altText: Projects by Thiago Peraro
      type: image
    backgroundAnimation: gradient
    typingEffect: true
    typingSpeed: 15
    preset: moderate
    elementId: projects-hero
    colors: bg-light-fg-dark

  - type: FeaturedItemsSection
    title:
      text: Main Projects
      color: text-dark
      styles:
        self:
          textAlign: center
      type: TitleBlock
    subtitle: Highest-impact initiatives
    items:
      - type: FeaturedItem
        title: Sobrevidas Project 🏆
        text: >
          **CNPq Fellow | 2024 – present | National Award SBCAS 2025**

          SUS-integrated chatbot for oral cancer screening using advanced NLP.
          As AI team lead, I coordinate a solution that helps save lives via
          early diagnosis. **Co-author of the paper awarded best in Brazil at
          SBCAS 2025** (tools category).
        actions:
          - label: Download paper
            altText: 'Download project paper'
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
          altText: Sobrevidas Project
          elementId: ''
      - type: FeaturedItem
        title: onboarding-AI — Count on Sheep
        text: >
          **Sole Tech Lead | Jan 2026 – present**

          Main FastAPI backend at Count on Sheep (US crypto tax consulting),
          built from scratch as the sole technical owner. Transcript
          extraction pipeline with **7 LangGraph agents** in 3 parallel phases
          (participants, crypto/DeFi/tax profile, DCA, logistics, pain
          points). **Real-time STT** via AWS Transcribe Streaming with
          session state machine, KWS sidecar for crypto terms, and LLM
          corrector. Email system with **140+ Jinja2 templates** routed by
          stage, software and customer type. Integrations with HubSpot,
          DocuSign, Stripe, Gmail and Google Workspace.
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
        title: Clivia — AI for Clinics (closed)
        text: >
          **Founder & CEO | Mar 2024 – Dec 2025**

          Multi-agent LLM platform for medical clinics — intelligent SDR via
          WhatsApp. Architected the entire stack: FastAPI, LangGraph Supervisor
          (StateGraph with RedisSaver checkpointer), self-hosted LiteLLM proxy
          with router and fallback, Langfuse for observability, **Docker Swarm
          with 40+ containers in production**. Migrated from CrewAI (v1) to
          LangGraph Supervisor (v2). Closed in Dec 2025.
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
          altText: Clivia Logo
          elementId: ''
      - type: FeaturedItem
        title: Koru Project — CEIA-UFG
        text: >
          **NLP Researcher | Dec 2024 – present**

          Multi-agent system (LangGraph) for assessing soft skills and
          leadership competencies, at CEIA-UFG/AKCIT. Responsible for the
          **koru-dashboard** (Streamlit + Plotly + TimescaleDB) with real-time
          observability and adversarial **Red Team testing with DeepTeam**
          (prompt injection and vulnerabilities). Distinct from Sobrevidas —
          here the research focuses on automated assessment of human
          competencies.
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
          altText: Koru Project
          elementId: ''
      - type: FeaturedItem
        title: GoiásPrev Systems
        text: >
          **Back-end Development | 2019–2022**

          Built and maintained mission-critical systems for the state pension
          agency using Java and Spring Boot. Supporting thousands of public
          servants with secure and efficient software.
        actions:
          - label: Details
            altText: 'View technical details'
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
          altText: GoiásPrev Logo
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
      text: Communities & Leadership
      color: text-dark
      styles:
        self:
          textAlign: center
      type: TitleBlock
    subtitle: Community building and networking
    items:
      - type: FeaturedItem
        title: Magnatas.hub
        text: >
          **Co-founder | 2023–present**

          Entrepreneurs community focused on networking and business growth.
          Events, workshops and connections in Goiânia's ecosystem.
        actions:
          - label: Skool
            altText: 'See on Skool'
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
          url: /images/MagnatasLogo.png
          altText: Magnatas.hub Logo
          elementId: ''
      - type: FeaturedItem
        title: Go.IAs
        text: >
          **Community Builder | 2023–present | 450+ members**

          AI-focused community with 450+ members, promoting events, networking
          and dissemination of university research. Regular speaker. Connecting
          professionals, researchers and enthusiasts in Goiânia.
        actions:
          - label: Join Community
            altText: 'Join the community'
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
          altText: Go.IAs Logo
          elementId: ''
      - type: FeaturedItem
        title: Talks & Events
        text: >
          **Speaker | 2024–present**

          Talks on AI, entrepreneurship and ethical technology. Sharing
          knowledge on building AI products and leading tech communities.
        actions:
          - label: Invitations
            altText: 'Speaking invitations'
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
          altText: Speaker
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
      text: Research & Development
      color: text-dark
      styles:
        self:
          textAlign: center
      type: TitleBlock
    subtitle: Research projects and technological innovation
    items:
      - type: FeaturedItem
        title: Natural Language Processing
        text: >
          Advanced research in medical NLP, building specialized language
          models for diagnosis and triage. Focus on conversational chatbots
          for health systems.
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
          Ongoing investigation of LLMs, fine-tuning and applications.
          Specialized agents and model integration in enterprise systems.
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
        title: Ethical & Responsible AI
        text: >
          Advocacy and research on ethical AI — responsibility, transparency
          and social impact across sectors.
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
        title: Intelligent Health Systems
        text: >
          AI solutions for the health sector, including automated triage,
          medical chatbots, and SUS-integrated decision support tools.
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
        title: Conversational Agents
        text: >
          Specialized agents for multiple domains — from medical care to
          sales automation and customer support.
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
        title: SUS Integration
        text: >
          R&D of AI solutions integrated with Brazil's public health system,
          with focus on scalability, security and social impact.
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
      text: Collaboration & Partnerships
      color: text-dark
      type: TitleBlock
    subtitle: Interested in collaborating on a project?
    text: >
      I'm open to collaborations in academic research, business projects or
      social impact initiatives. If you have an idea involving AI,
      entrepreneurship or tech communities, let's talk.
    actions:
      - label: Propose Collaboration
        altText: 'Propose a collaboration'
        url: /contact
        showIcon: true
        icon: mail
        iconPosition: right
        style: primary
        elementId: ''
        type: Button
      - label: LinkedIn
        altText: 'Connect on LinkedIn'
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
