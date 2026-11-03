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
      url: /images/builders.webp
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
          url: /images/sobrevidas.webp
          altText: Sobrevidas Project
          elementId: ''
      - type: FeaturedItem
        title: onboarding-AI — Count on Sheep
        text: >
          **Sole Tech Lead | Jan 2026 – present**

          Main FastAPI backend at Count on Sheep (US crypto tax consulting),
          built from scratch and deployed to production as the sole technical
          owner. I created an **AI agent that coordinates the end-to-end
          onboarding workflow**. The solution combines an extraction pipeline
          with **7 LangGraph agents** across 3 parallel phases with **real-time
          STT** via AWS Transcribe Streaming, a
          session state machine, a KWS sidecar for crypto terms, and an LLM
          corrector, plus integrations with CRM (Pipedrive), DocuSign, Stripe,
          Gmail and Google Workspace.
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
          altText: Enterprise AI onboarding architecture
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
          url: /images/koru.webp
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
          url: /images/goiasprev.webp
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
      text: Count on Sheep in 2026
      color: text-dark
      styles:
        self:
          textAlign: center
      type: TitleBlock
    subtitle: Technology, growth and product at Count on Sheep
    items:
      - type: FeaturedItem
        title: AI-visibility radar
        text: >
          **Count on Sheep | Aug–Sep 2026**

          I built a weekly AI-visibility radar: it measures whether ChatGPT,
          Gemini, AI Overview, Perplexity and Copilot cite Count on Sheep
          and benchmarks it against competitors. Sources are DataForSEO's AI Optimization
          API (brand mentions in LLM answers, share of voice against
          competitors, AI search volume), Google Search Console, Bing
          Webmaster (AI Performance) and AI-crawler logs on Vercel. Every
          week a branded PDF lands in the marketing Slack channel on its
          own, with a prioritized action queue that only names a cause when
          there is evidence. Daily Google rank tracking (share of voice,
          cannibalization, content gaps) for countonsheep.com and
          coselite.com completes the picture.
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
          **Count on Sheep | Jul–Sep 2026**

          I co-built Shepherd, the platform that replaces the operation's
          ~1,000-tab spreadsheet (sales, delivery, billing and capacity):
          Next.js 16, Drizzle, Neon and Clerk on Vercel. I own data and
          integrations — ETL from the spreadsheet and CRM, the Slack bot,
          no-show detection via Google Meet and Stripe payments — plus the
          staging environment.
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
          **Count on Sheep | Mar–Sep 2026**

          I created Count on Sheep's Process Hub: the company's second
          brain, with ~378 documents and 31 architecture decisions, operated
          through my own Claude Code and Codex skills, with nightly LLM
          memory consolidation in read-only mode. It's the practice behind
          the "Second Brain + AI OS" talk.
        actions:
          - label: Read the post
            altText: 'Read the post on the Process Hub'
            url: /blog/aios-enterprise-second-brain
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
        title: Attribution and first-party analytics
        text: >
          **Count on Sheep | May–Sep 2026**

          I built end-to-end marketing attribution: from the first click's
          UTM to the call booked on Cal.com, through n8n, the CRM and
          Postgres, with a ranking of pages by booked calls to decide where
          to invest in link building. I also built the sites' first-party
          analytics (Supabase, FingerprintJS and web-vitals), consent-aware
          (LGPD/GDPR) with a dedicated GTM container per brand. In the COS
          Data Hub it shows live active visitors, sessions and unique
          visitors, booked calls, UTM acquisition, device and browser, pages
          per session and session duration, top sections viewed, navigation
          clicks, a click heatmap and Web Vitals (p75), plus visits coming
          from AI, paid search and ambassadors.
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
          **Count on Sheep | Jul–Sep 2026**

          I built the COS Data Hub, a multi-brand dashboard
          (countonsheep.com and coselite.com) that reconciles GA4, BigQuery,
          Vercel Analytics, first-party analytics and Search Console page by
          page — the "three truths" — alerting when sources diverge by more
          than 15%, with an AI-visibility tab. Design rule: a metric that
          wasn't collected never shows up as zero. Stack: React 19 +
          TypeScript + TanStack Query + Recharts, data from onboarding-AI
          (FastAPI) and Supabase.
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
        title: Automatic review of SEO pages
        text: >
          **Count on Sheep | Sep 2026**

          The website receives changes made by other people's AI agents. I
          built an automatic review that protects the most important SEO
          pages: on every pull request it renders those pages before and
          after the change (build + Playwright) and flags what changed in the
          HTML, schema, call-to-action buttons and visuals. Decisions follow
          fixed rules, with no LLM, so the same change always gets the same
          result.
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
        title: Shared inbox triage with AI
        text: >
          **Count on Sheep | Oct 2026**

          The company's shared inbox mixed client documents,
          payment receipts, marketing and the few messages that
          really needed a reply. I built a daily classifier: free
          header rules first, then Jev, a decision model, asked
          three separate questions with zero data retention
          enforced in code. Each message gets one Gmail label, and
          a daily Slack report lists only what needs a person. It
          can't lose mail: a guard refuses any request that isn't
          reading or adding a label, so deleting, archiving and
          sending never leave the container, and whatever the
          model isn't sure about stays untouched. I set the
          thresholds on 214 real messages labeled blind, and
          classifying the whole inbox, about 3,400 messages, cost
          US$ 0.13.
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
          **Count on Sheep | Apr–Sep 2026**

          I migrated the COS Elite website from HubSpot to Next.js 16 +
          Sanity on Vercel, with its own analytics and SEO/GEO, cutting
          about US$1k per month in tooling.
        actions:
          - label: COS Elite
            altText: 'See the COS Elite website'
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
        title: Client portal
        text: >
          **Count on Sheep | Mar–Sep 2026**

          I built and maintain the client onboarding portal
          (onramp.countonsheep.com, React 19): each client follows their own
          steps through a unique link, no login required, with animated
          tutorials for each crypto-tax software. Hosted on Vercel, with
          Sentry and a mobile version.
        actions:
          - label: See the portal
            altText: 'See the client onboarding portal'
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
        title: Referral program
        text: >
          **Count on Sheep | Jun–Aug 2026**

          I built the company's referral and ambassador program end to end:
          unique codes, cookie-based tracking, automatic deal creation in
          the CRM via Cal.com and n8n, a payout webhook and an admin panel,
          with security hardening.
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
          **Community Builder | 2023–present | 500+ members**

          AI-focused community with 500+ members, promoting events, networking
          and dissemination of university research. Regular speaker. Connecting
          professionals, researchers and enthusiasts in Goiânia.
        actions:
          - label: Join Community
            altText: 'Join the community'
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
          altText: Go.IAs Logo
          elementId: ''
      - type: FeaturedItem
        title: AI Brasil & Talks 🏆
        text: >
          **Speaker | 2024–present**

          Talks on AI, entrepreneurship and ethical technology. Sharing
          knowledge on building AI products and leading tech communities. In
          2026 I spoke on **Second Brain + AI OS** at **AI Brasil** (CEIA Open
          Day / Go.IAs Experience) and was named the **1st AI Brasil Hero**.
        actions:
          - label: See the talk
            altText: 'See the talks and award page'
            url: /palestras
            showIcon: true
            icon: arrowRight
            iconPosition: right
            style: primary
            elementId: ''
            type: Link
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
          url: /palestras/palco-aibrasil.webp
          altText: Thiago Peraro speaking at AI Brasil
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
        title: Fine-tuning classifiers to assess competencies
        text: >
          **Koru Project, CEIA-UFG | Aug 2026**

          I trained and evaluated transformer classifiers on my
          own GPU, one model for each of 11 competencies, scoring
          open answers on the six Bloom levels. BERTimbau reached
          88.7% exact accuracy per skill and 96.5% within one
          level; BloomBERT (DistilBERT) reached 85.8% and 95.9%.
          The honest finding is that classical models did better
          on the same data, with Extra Trees at 91.6%. This was
          research on a synthetic dataset built by the team, not a
          production model.
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

  - type: FeaturedItemsSection
    title:
      text: Tools and side projects
      color: text-dark
      styles:
        self:
          textAlign: center
      type: TitleBlock
    subtitle: Automation for AI agents and a personal data project
    items:
      - type: FeaturedItem
        title: Tools I built for agents
        text: >
          **Tools for AI agents | 2026**

          My own skills and tools for Claude Code and Codex: auto-generated
          narrated video tutorials (Playwright + offline TTS + ffmpeg); a
          bridge that lets Playwright reuse a Firefox login by
          re-implementing Chrome's cookie encryption; audio explanations
          with offline TTS; offline voice dictation (Parakeet on ONNX);
          Slack Lists automation; hooks that run local CI before a PR is
          opened; and a rubric-scored research loop that writes specs on
          its own.
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
          **Personal project | 2026**

          A personal project that compares cash fares against the cost in
          miles: circuit-breaker scrapers for the main miles marketplaces,
          real fare lookup with Playwright, scheduled jobs and encrypted API
          keys. FastAPI + async SQLAlchemy + React.
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
seo:
  metaTitle: AI and Technology Projects | Thiago Peraro
  metaDescription: >-
    Projects led by Thiago Peraro across artificial intelligence, healthcare,
    education, public platforms and digital transformation.
  type: Seo
---
