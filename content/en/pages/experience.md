---
title: Professional Experience - Thiago Peraro
slug: /experience
type: PageLayout
sections:
  - type: AnimatedHeroSection
    title: Professional Experience
    subtitle: A path across research, development and entrepreneurship
    text: >
      My career combines solid back-end development, cutting-edge academic
      research, and entrepreneurial leadership — from mission-critical systems
      for public agencies to award-winning AI solutions.
    actions:
      - label: Download Full CV
        altText: Download full resume
        url: /cv/thiago-peraro-cv.pdf
        showIcon: true
        icon: arrowDown
        iconPosition: right
        style: primary
        elementId: ''
        type: Button
    media:
      url: /images/palestrante.webp
      altText: Professional Experience
      type: image
    backgroundAnimation: gradient
    typingEffect: true
    typingSpeed: 15
    preset: moderate
    elementId: experience-hero
    colors: bg-light-fg-dark

  - type: FeaturedItemsSection
    title:
      text: Current Roles
      color: text-dark
      type: TitleBlock
    subtitle: Positions and responsibilities
    items:
      - type: FeaturedItem
        title: Sole Tech Lead — Count on Sheep
        text: >
          **Count on Sheep (USA) | Jan 2026 – present**

          • Sole technical owner of the company (US crypto tax consulting)

          • Built the `onboarding-AI` agent from scratch and deployed it to
          production; it coordinates onboarding end to end through an
          extraction pipeline with **7 LangGraph agents** across 3 parallel
          phases

          • Real-time STT (AWS Transcribe Streaming + KWS sidecar + LLM
          corrector); integrations with Pipedrive, Cal.com, DocuSign,
          Stripe, Slack and Gmail

          • Together with the CEO, we tripled organic visits and grew
          AI-answer impressions 5x on the Count on Sheep website in 3
          months (Google Search Console)

          • I moved Count on Sheep off HubSpot before the shutdown
          deadline: website rebuilt on Astro and Next.js on Vercel,
          scheduling on Cal.com, CRM migrated to Pipedrive, and a
          multi-agent audit to make sure nothing was left behind

          • I built a weekly AI-visibility radar: it measures whether
          ChatGPT, Gemini, AI Overview, Perplexity and Copilot cite Count
          on Sheep, benchmarks against competitors, and delivers a PDF
          report to marketing's Slack channel

          • Technical SEO, GEO and performance: consolidated sitemaps with
          104 URLs Google couldn't reach made crawlable, hreflang set up
          for international markets, removed redirect chains, 52 orphan
          pages reconnected and 96 URLs migrated with zero downtime;
          llms.txt and JSON-LD (Organization, FAQPage, Person) for AI
          citation; the COS Elite blog's CLS dropped from 0.17 to 0.004 and
          location-page images became 12x lighter

          • I built end-to-end marketing attribution: from the first
          click's UTM to the call booked on Cal.com, through n8n, the CRM
          and Postgres, with a ranking of pages by booked calls to decide
          where to invest in link building

          • I co-built Shepherd, the platform that replaces the
          operation's ~1,000-tab spreadsheet (sales, delivery, billing and
          capacity): Next.js 16, Drizzle, Neon and Clerk on Vercel; I own
          data and integrations — ETL from the spreadsheet and CRM, the
          Slack bot, no-show detection via Google Meet and Stripe payments
          — plus the staging environment

          • I brought DevSecOps to every company repository: CVE scanning
          that blocks CI, secret detection in pre-commit, and 27 Supabase
          advisor warnings resolved in a single migration

          • onboarding-AI evolution: continuous STT evaluation by WER (word
          error rate) with errors classified by type, Sentry observability
          (tracing, profiling and job monitoring), serverless staging on
          Vercel Functions (Python), a Chrome extension that captures
          Google Meet audio, and automatic sales-call intake into the CRM
          via n8n
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: left
            padding: [pt-6, pb-6, pl-4, pr-4]
        image:
          type: ImageBlock
          url: /images/onboarding-ai.svg
          altText: Enterprise AI onboarding architecture
          elementId: ''
      - type: FeaturedItem
        title: CNPq Fellow — Sobrevidas Project
        text: >
          **CNPq | 2024 – 2026**

          • NLP researcher — CNPq fellow

          • Led the AI team at the Sobrevidas Project (oral cancer / SUS)

          • Co-author of the paper **awarded best in Brazil at SBCAS 2025**
          (tools category)

          • Focus on public health and epidemiological
          surveillance

          • An MCP server in Go that gives Claude Code read-only access to
          the infrastructure's error logs, querying them in LogQL, Grafana
          Loki's query language

          • Migrated patient monitoring from n8n to 10 LangGraph
          StateGraphs, with a RabbitMQ queue and retries (reminders,
          message routing and WhatsApp scheduling)
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: left
            padding: [pt-6, pb-6, pl-4, pr-4]
        image:
          type: ImageBlock
          url: /images/sobrevidas.webp
          altText: Sobrevidas Project
          elementId: ''
      - type: FeaturedItem
        title: Community Builder
        text: >
          **Go.IAs & Magnatas.hub | 2023 – present**

          • Community builder at Go.IAs (**500+ members**) — events,
          networking and dissemination of university research

          • Co-founder and leader of Magnatas.hub (~80–90 entrepreneurs)

          • Regular speaker at AI and entrepreneurship events

          • Mentoring and local ecosystem development
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: left
            padding: [pt-6, pb-6, pl-4, pr-4]
        image:
          type: ImageBlock
          url: /images/builders.webp
          altText: Community Builder
          elementId: ''
    actions: []
    elementId: ''
    variant: three-col-grid
    colors: bg-neutral-fg-dark
    styles:
      self:
        padding: [pt-8, pb-16, pl-4, pr-4]
        justifyContent: center

  - type: FeaturedItemsSection
    title:
      text: Career Timeline
      color: text-dark
      type: TitleBlock
    subtitle: Highlights across the years
    items:
      - type: FeaturedItem
        title: Oct 2026 | Mentor and Speaker (PRIA)
        text: >
          **inovabra/Bradesco, AKCIT and CEIA-UFG — São Paulo**

          Mentor and speaker at PRIA, inovabra's AI Residency Program, on the
          harness engineering day: I worked with 30 AI startups on the dev
          workbench in an AI-native SDLC, the cost of each agent conversation
          and security in CI/CD.
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: left
            padding: [pt-4, pb-4, pl-4, pr-4]
      - type: FeaturedItem
        title: Jan 2026 – present | Sole Tech Lead
        text: >
          **Count on Sheep — US Crypto Tax Consulting**

          Sole person responsible for the entire technology stack. Built
          `onboarding-AI` (FastAPI) from scratch and deployed it to production:
          an AI agent that coordinates onboarding end to end. The solution
          combines an extraction pipeline with **7 LangGraph agents** across 3
          parallel phases, real-time STT with AWS Transcribe Streaming, and
          integrations with Pipedrive, DocuSign, Stripe and Gmail.
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: left
            padding: [pt-4, pb-4, pl-4, pr-4]
      - type: FeaturedItem
        title: 2024 – 2026 | CNPq Fellow (Sobrevidas Project)
        text: >
          **CNPq — Sobrevidas Project (SUS)**

          CNPq fellow and lead of the AI team at the Sobrevidas Project — a
          SUS-integrated chatbot for oral cancer screening. Co-author of the
          paper **awarded best in Brazil at SBCAS 2025** (tools category).
          Focus on public health and NLP for
          epidemiological surveillance.
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: left
            padding: [pt-4, pb-4, pl-4, pr-4]
      - type: FeaturedItem
        title: Mar 2024 – Dec 2025 | Founder & CEO · Clivia (closed)
        text: >
          **Clivia — AI for Medical Clinics**

          Founded and operated Clivia, a multi-agent LLM platform for medical
          clinics (intelligent SDR via WhatsApp). Architected the full stack —
          FastAPI, LangGraph Supervisor (migrated from CrewAI), self-hosted
          LiteLLM proxy, Redis checkpointer, Docker Swarm with **40+
          containers in production**. Closed in Dec 2025.
      - type: FeaturedItem
        title: Oct 2023 – Oct 2024 | Researcher
        text: >
          **EMBRAPII — Brazilian Agency for Industrial Research and Innovation**

          Multidisciplinary project in AI, Software Engineering and Entrepreneurship.
          Led a team of 7 building the EdTech "Minha Aula de Excelência". Applied
          Lean, Stage-Gate, Sprints, ISO 12207 and SWEBOK. Recognized for leadership
          and performance among 60 program fellows.
      - type: FeaturedItem
        title: Jan–Aug 2024 / Jan–Feb 2025 | Back-end Developer
        text: >
          **Totem TI — outsourced at GoiásPrev**

          Back-end development for GoiásPrev (state pension agency). Java, Spring,
          JSP, JasperReports. Requirements engineering, microservices architecture
          and ISO 12207 / SWEBOK compliance.
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: left
            padding: [pt-4, pb-4, pl-4, pr-4]
      - type: FeaturedItem
        title: 2023 – present | Community Leader
        text: >
          **Go.IAs & Magnatas.hub**

          Co-founded Magnatas.hub and build the Go.IAs community with events,
          workshops and networking in AI and entrepreneurship in Goiânia.
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: left
            padding: [pt-4, pb-4, pl-4, pr-4]
      - type: FeaturedItem
        title: Jan 2022 – Aug 2024 | Back-end Developer
        text: >
          **GoiásPrev / Minsait — State Government**

          Intern promoted to full-time developer. Back-end for critical pension
          systems serving thousands of public servants. Java 8/11, Spring Boot,
          JSP, iReport, JDBC. High availability and security in government systems.
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: left
            padding: [pt-4, pb-4, pl-4, pr-4]
      - type: FeaturedItem
        title: 2019 – present | Academic Training
        text: >
          **Federal University of Goiás**

          B.Sc. in Computer Science with a back-end focus. Research and
          extension projects; strong foundations in algorithms, data structures
          and software engineering.
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: left
            padding: [pt-4, pb-4, pl-4, pr-4]
      - type: FeaturedItem
        title: 2024 – present | Ongoing Research
        text: >
          **Artificial Intelligence and LLMs**

          Continuous investigation of language models and real applications —
          multi-agent systems (LangGraph), MCP (Model Context Protocol, custom
          client and FastMCP server), LLMOps (LiteLLM, OpenLit, Langfuse) and
          Red Team (DeepTeam, Deepeval). Ethics and social impact focus.
        actions: []
        elementId: ''
        styles:
          self:
            textAlign: left
            padding: [pt-4, pb-4, pl-4, pr-4]
    actions: []
    elementId: ''
    variant: timeline
    colors: bg-light-fg-dark
    styles:
      self:
        padding: [pt-0, pb-16, pl-4, pr-4]
        justifyContent: center

  - type: GenericSection
    title:
      text: Technical Skills
      color: text-dark
      type: TitleBlock
    subtitle: Tech stack and specialized skills
    text: >
      **Back-end Development:**

      • **Java & Spring Boot** — 4+ years; Flyway (60+ migrations), RabbitMQ
      (Spring AMQP), Spring Security OAuth2 (Keycloak RS256/JWKs)

      • **Python** — FastAPI, Pydantic v2, asyncio, Flask

      • **RESTful APIs and microservices** — design and implementation of
      scalable services

      • **Databases** — PostgreSQL, Supabase, pgvector, MySQL, Redis


      **AI and Multi-agent Systems:**

      • **LangGraph** — Supervisor, StateGraph, RedisSaver and
      AsyncPostgresSaver checkpointers

      • **MCP (Model Context Protocol)** — custom client and FastMCP server
      implemented from scratch

      • **CrewAI, LangChain (LCEL), Agno** — agent orchestration

      • **RAG / GraphRAG** — pgvector, FAISS, Supabase vector store, adaptive
      chunking with n-gram overlap

      • **Custom Text2SQL / GenBI** using LangChain `create_sql_agent`


      **LLMOps, Observability and Guardrails:**

      • **LiteLLM** — self-hosted proxy with router and fallback

      • **Langfuse** — distributed tracing with CallbackHandler +
      llm-as-a-judge Evaluator

      • **OpenLit, Helicone** — cost/latency/tokens

      • **DeepTeam** — adversarial Red Team (prompt injection)

      • **Deepeval** — guardrails for toxicity, bias and hate speech

      • **PydanticAI** — structured validation of agent outputs

      • **OpenTelemetry, Prometheus, Loki, Grafana**


      **Real-time STT:**

      • **AWS Transcribe Streaming** — WebSocket with session state machine
      (idle/connecting/streaming/reconnecting), KWS sidecar, 4-hour limit

      • **Deepgram Nova-3** — STT via WebSocket streaming

      • **OpenAI Whisper** — offline transcription

      • **LLM corrector** — real-time correction of technical terms


      **Infrastructure and DevOps:**

      • **Docker Swarm** — 40+ containers orchestrated in production (Clivia)

      • **GitOps CI/CD** — GitHub Actions → Docker Hub → Portainer webhook

      • **Ollama** — local inference with multiple instances


      **Leadership & Management:**

      • **Technical leadership** — sole tech owner at Count on Sheep; CEO of
      Clivia for ~21 months

      • **Community Building** — Go.IAs (500+ members), Magnatas.hub (~80–90)

      • **Public Speaking** — regular speaker at AI and entrepreneurship events
    actions:
      - label: View Projects
        altText: View portfolio
        url: /projects
        showIcon: true
        icon: arrowRight
        iconPosition: right
        style: primary
        elementId: ''
        type: Link
    media:
      url: /images/thiago-peraro-magnatas.webp
      altText: Technical skills
      elementId: ''
      type: ImageBlock
    elementId: ''
    colors: bg-neutral-fg-dark
    styles:
      self:
        alignItems: center
        flexDirection: row-reverse
        padding: [pt-16, pb-16, pl-4, pr-4]
        justifyContent: center

  - type: GenericSection
    title:
      text: Awards & Recognition
      color: text-dark
      type: TitleBlock
    subtitle: Main professional awards and recognitions
    text: >
      **🌟 1st AI Brasil Hero (2026)**

      Recognized as the **1st AI Brasil Hero** at AI Brasil / CEIA Open Day,
      after speaking on Second Brain + AI OS, hyper-productivity and agentic
      coding. Award presented by Juliano Kimura.


      **🏆 SBCAS 2025 — Best Paper (Brazil)**

      Sobrevidas paper recognized as best in the Brazilian Symposium on Applied
      Computing in Health 2025 (tools category).


      **🎓 CNPq Fellow**

      Selected by the National Council for Scientific and Technological
      Development for research in applied AI for health (Sobrevidas Project).


      **🎖️ EMBRAPII — Standout Leader**

      Recognized as a standout leader among 60 fellows of the EMBRAPII program,
      mentored by 8 PhD advisors across AI, Software Engineering and
      Entrepreneurship.


      **🚀 AI Startup Founder**

      Founded and operated Clivia (Mar 2024 – Dec 2025), a multi-agent
      healthtech platform — end-to-end architecture on Docker Swarm with 40+
      containers in production.


      **👥 Community Leader**

      Co-founder of Magnatas.hub and leader at Go.IAs (**500+ members**),
      contributing to the innovation ecosystem in Goiânia.


      **🎤 Recognized Speaker**

      Mentor and speaker at **PRIA** (inovabra/Bradesco, São Paulo, 2026),
      speaker at **AI Brasil 2026** (CEIA Open Day / Go.IAs Experience) and a
      frequent speaker on ethical AI, hyper-productivity and innovative product
      development.
    actions:
      - label: See talks
        altText: See the talks and award page
        url: /palestras
        showIcon: true
        icon: arrowRight
        iconPosition: right
        style: primary
        elementId: ''
        type: Link
      - label: Invite to Speak
        altText: Speaking invitations
        url: /contact
        showIcon: true
        icon: mail
        iconPosition: right
        style: primary
        elementId: ''
        type: Button
      - label: LinkedIn
        altText: Connect on LinkedIn
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
        padding: [pt-16, pb-16, pl-4, pr-4]
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
  metaTitle: Professional Experience | Thiago Peraro
  metaDescription: >-
    Thiago Peraro's experience in technology leadership, digital platforms,
    artificial intelligence and products for public and private organizations.
  type: Seo
---
