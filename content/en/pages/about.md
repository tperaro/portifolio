---
title: About Me - Thiago Peraro
slug: /about
type: PageLayout
sections:
  - type: AnimatedHeroSection
    title: About Me
    subtitle: Tech lead, AI researcher and entrepreneur
    text: >
      I'm Thiago Peraro, an AI researcher and tech lead focused on natural
      language processing and multi-agent systems. My journey blends 4+ years
      of back-end development (Java/Spring), applied academic research, and
      product-level technical leadership.


      Computer Science undergrad at UFG (2019–present, ~83% complete).
      Currently sole tech lead at Count on Sheep (US crypto tax consulting),
      NLP researcher at CEIA-UFG on the Koru project, and CNPq fellow on the
      Sobrevidas project. Founded and operated Clivia (Mar 2024 – Dec 2025).
      Open to new opportunities in AI Engineering.
    actions:
      - label: LinkedIn
        altText: Connect on LinkedIn
        url: 'https://www.linkedin.com/in/thiago-peraro/'
        showIcon: true
        icon: linkedin
        iconPosition: right
        style: primary
        elementId: ''
        type: Button
      - label: Download CV
        altText: Download resume
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
      text: Key Achievements
      color: text-dark
    
      type: TitleBlock
    subtitle: Important milestones in my career
    items:
      - type: FeaturedItem
        title: Sobrevidas Project — National Award
        text: >
          I lead the AI team of Sobrevidas at CEIA-UFG, building a SUS-integrated
          chatbot for oral cancer screening. Our work received the best paper
          award in Brazil at SBCAS 2025, recognizing the project’s social impact.
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
          altText: Sobrevidas Project
          elementId: ''
      - type: FeaturedItem
        title: Clivia — Own Startup (Mar 2024 – Dec 2025)
        text: >
          Founded and operated Clivia, a multi-agent LLM platform for medical
          clinics (intelligent SDR via WhatsApp). Architected the full stack
          from scratch — FastAPI, LangGraph Supervisor, LiteLLM, Redis
          checkpointer, Docker Swarm with 40+ containers. **Closed in Dec
          2025** when joining Count on Sheep.
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
          altText: Clivia Logo
          elementId: ''
      - type: FeaturedItem
        title: Community Leadership
        text: >
          I co-founded Magnatas.hub in 2023 and act as a community builder at
          Go.IAs, promoting events and networking in AI. These initiatives help
          connect professionals and foster an innovation ecosystem in Goiânia.
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
          altText: Community Leadership
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
      text: Technical Experience
      color: text-dark
      type: TitleBlock
    subtitle: Tech stack and areas of expertise
    text: |
      **Back-end Development:**
      • Java & Spring Boot — 4+ years; Flyway (60+ migrations), RabbitMQ,
        Spring Security OAuth2 (GoiásPrev + Count on Sheep)
      • Python — FastAPI, Pydantic v2, asyncio
      • SQL — PostgreSQL, Supabase, pgvector
      • RESTful APIs, microservices architecture, Linux

      **AI and LLMOps:**
      • Multi-agent systems — LangGraph (Supervisor, StateGraph, RedisSaver
        and AsyncPostgresSaver checkpointers), CrewAI, LangChain (LCEL)
      • MCP (Model Context Protocol) — custom client and FastMCP server
        implemented from scratch
      • RAG / GraphRAG — pgvector, FAISS, Supabase vector store
      • LLMOps — LiteLLM (self-hosted proxy with router and fallback),
        OpenLit, Helicone, Langfuse (tracing + llm-as-a-judge Evaluator)
      • Red Team and Guardrails — DeepTeam (prompt injection, adversarial),
        Deepeval (toxicity, bias, hate speech)
      • Real-time STT — AWS Transcribe Streaming (WebSocket state machine,
        KWS sidecar), Deepgram Nova-3, OpenAI Whisper
      • Custom Text2SQL / GenBI, local Ollama

      **Infrastructure and DevOps:**
      • Docker Swarm — 40+ containers in production (Clivia)
      • CI/CD — GitHub Actions → Docker Hub → Portainer redeploy
      • Observability — Langfuse, LangSmith, Prometheus, Grafana, Loki

      **Entrepreneurship & Leadership:**
      • Founded, operated, and closed an LLM startup (Clivia)
      • Community building — Go.IAs (450+ members) and Magnatas.hub
      • Regular speaker on AI and entrepreneurship
    actions:
      - label: View Projects
        altText: See my projects
        url: /projects
        showIcon: true
        icon: arrowRight
        iconPosition: right
        style: primary
        elementId: ''
        type: Link
    media:
      url: /images/hero3.svg
      altText: Technical experience
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
      text: Philosophy & Vision
    
      color: text-dark
      type: TitleBlock
    subtitle: How I see the future of technology
    text: >
      I believe in AI’s transformative power when applied ethically and
      responsibly. My work always seeks balance between technological
      innovation and positive social impact.


      In Sobrevidas, for example, we built a solution that can save lives by
      enabling early diagnosis of oral cancer. At Clivia (Mar 2024 – Dec 2025),
      I built production-grade multi-agent tools that humanized medical care
      through technology.


      As a community leader, I promote networking and collaboration, believing
      innovation emerges from knowledge exchange and shared experiences. I
      advocate for ethical AI and building technology that benefits society.
    actions:
      - label: Speaking Requests
        altText: Contact for talks
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
      text: Detailed Technical Evolution
      color: text-dark
      type: TitleBlock
    subtitle: Interactive skills timeline by year and category
    text: >
      Explore my technical journey interactively — see which skills I acquired
      each year, the associated projects, and the professional context behind
      each technology.
    actions:
      - label: Explore Skills
        altText: View technical skills timeline
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
---

