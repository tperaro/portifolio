---
title: Experiência Profissional - Thiago Peraro
slug: /experience
type: PageLayout
sections:
  - type: AnimatedHeroSection
    title: Experiência Profissional
    subtitle: Trajetória em pesquisa, desenvolvimento e empreendedorismo
    text: >
      Minha carreira combina experiência sólida em desenvolvimento back-end, 
      pesquisa acadêmica de ponta e liderança empreendedora. Desde sistemas 
      críticos para órgãos públicos até soluções inovadoras de IA premiadas 
      nacionalmente.
    actions:
      - label: Baixar CV Completo
        altText: 'Baixar currículo completo'
        url: /cv/thiago-peraro-cv.pdf
        showIcon: true
        icon: arrowDown
        iconPosition: right
        style: primary
        elementId: ''
        type: Button
    media:
      url: /images/palestrante.webp
      altText: Experiência Profissional
      type: image
    backgroundAnimation: gradient
    typingEffect: true
    typingSpeed: 15
    preset: moderate
    elementId: experience-hero
    colors: bg-light-fg-dark

  - type: FeaturedItemsSection
    title:
      text: Experiência Atual
      color: text-dark
      styles:
        self:
          textAlign: center
      type: TitleBlock
    subtitle: Posições e responsabilidades atuais
    items:
      - type: FeaturedItem
        title: Responsável de Tecnologia — Count on Sheep
        text: >
          **Count on Sheep (EUA) | jan 2026 – presente**

          • Único responsável técnico da empresa (consultoria de cripto taxes)

          • Criei do zero e levei a produção o agente de IA `onboarding-AI`,
          que coordena o onboarding de ponta a ponta com um pipeline de
          extração com **7 agentes LangGraph** em 3 fases paralelas

          • STT em tempo real (AWS Transcribe Streaming + KWS sidecar + LLM
          corrector); integrações com Pipedrive, Cal.com, DocuSign, Stripe,
          Slack e Gmail

          • Junto com o CEO, triplicamos as visitas orgânicas e
          quintuplicamos as impressões em respostas de IA do site da Count
          on Sheep em 3 meses (Google Search Console)

          • Tirei a Count on Sheep do HubSpot antes do desligamento: site
          reconstruído em Astro e Next.js na Vercel, agendamento no Cal.com,
          CRM migrado para o Pipedrive e uma auditoria multiagente para não
          sobrar nenhum resíduo

          • Criei um radar semanal de visibilidade em IA: mede se ChatGPT,
          Gemini, AI Overview, Perplexity e Copilot citam a Count on Sheep,
          compara com os concorrentes e entrega um relatório em PDF no Slack
          do marketing

          • SEO técnico, GEO e performance: sitemaps consolidados com 104
          URLs antes inacessíveis ao Google, hreflang, fim das cadeias de
          redirecionamento, 52 páginas órfãs religadas e 96 URLs migradas
          sem sair do ar; llms.txt e JSON-LD (Organization, FAQPage, Person)
          para citação por IA; CLS do blog da COS Elite caiu de 0,17 para
          0,004 e as imagens das páginas de localização ficaram 12x mais
          leves

          • Montei a atribuição ponta a ponta do marketing: do UTM do
          primeiro clique até a reunião agendada no Cal.com, passando por
          n8n, CRM e Postgres, com um ranking de páginas por reunião
          agendada para decidir onde investir em link building

          • Co-construí o Shepherd, a plataforma que substitui a planilha
          de ~1.000 abas da operação (vendas, entrega, faturamento e
          capacidade): Next.js 16, Drizzle, Neon e Clerk na Vercel; fiquei
          com dados e integrações — ETL da planilha e do CRM, bot do Slack,
          detecção de no-show pelo Google Meet e pagamentos no Stripe — e
          com o ambiente de staging

          • Levei DevSecOps para todos os repositórios da empresa: scanner
          de CVE bloqueando o CI, detecção de segredos no pre-commit e 27
          alertas do Supabase resolvidos numa migração só

          • Evolução do onboarding-AI: avaliação contínua do STT por WER
          (taxa de erro de palavras) com erros classificados por tipo,
          observabilidade com Sentry (tracing, profiling e monitor dos
          jobs), staging serverless em Vercel Functions (Python), extensão
          do Chrome que captura o áudio do Google Meet e intake automático
          da call de vendas para o CRM via n8n
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
          url: /images/onboarding-ai.svg
          altText: Arquitetura de onboarding empresarial com IA
          elementId: ''
      - type: FeaturedItem
        title: Pesquisador NLP — CEIA-UFG (Projeto Koru)
        text: >
          **CEIA-UFG & AKCIT | dez 2024 – presente**

          • Pesquisador NLP no Projeto Koru — sistema multi-agente para
          avaliação de soft skills e competências de liderança

          • Arquitetura com LangGraph (Supervisor, StateGraph)

          • Responsável pelo koru-dashboard (Streamlit + Plotly + TimescaleDB)

          • Testes de Red Team adversarial com DeepTeam (prompt injection)

          • Cuida da infraestrutura dos serviços do time

          • Segundo provedor de LLM (Cerebras) com circuit breaker e rotação
          de chaves

          • Custo e latência por sessão, reconciliados com a fatura real

          • Benchmark que embasou a escolha da arquitetura multiagente com
          LLM em vez de classificadores BERT

          • Deploy com checagem prévia, backup e rollback; Keycloak com PKCE
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
        title: Bolsista CNPq — Projeto Sobrevidas
        text: >
          **CNPq | 2024 – presente**

          • Pesquisador de NLP — Bolsista CNPq

          • Líder da equipe de IA do Projeto Sobrevidas (câncer de boca / SUS)

          • Co-autor do artigo **premiado como melhor do Brasil no SBCAS 2025**
          (categoria ferramentas)

          • Projeto distinto do Koru — foco em saúde pública e vigilância epidemiológica

          • Servidor MCP em Go que dá ao Claude Code acesso somente leitura
          aos logs de erro da infraestrutura, com consultas em LogQL, a
          linguagem de consulta do Grafana Loki

          • Migrei o monitoramento de pacientes de n8n para 10 StateGraphs
          em LangGraph, com fila RabbitMQ e retentativa (lembretes,
          roteamento de mensagens e agendamento via WhatsApp)
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
          url: /images/sobrevidas.webp
          altText: Projeto Sobrevidas
          elementId: ''
      - type: FeaturedItem
        title: Community Builder
        text: >
          **Go.IAs & Magnatas.hub | 2023 – presente**

          • Community builder na Go.IAs (**500+ membros**) — eventos,
          networking e disseminação de pesquisa universitária em IA

          • Co-fundador e líder do Magnatas.hub (~80–90 empreendedores)

          • Palestrante regular em eventos sobre IA e empreendedorismo

          • Mentoria e desenvolvimento do ecossistema local
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
          url: /images/builders.webp
          altText: Community Builder
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
      text: Trajetória Profissional
      color: text-dark
      styles:
        self:
          textAlign: center
      type: TitleBlock
    subtitle: Principais posições e conquistas ao longo da carreira
    items:
      - type: FeaturedItem
        title: out 2026 | Mentor e Palestrante (PRIA)
        text: >
          **inovabra/Bradesco, AKCIT e CEIA-UFG — São Paulo**

          Mentor e palestrante no PRIA, o Programa de Residência em IA do
          inovabra, no dia de harness engineering: trabalhei com 30 startups de
          IA a bancada de desenvolvimento num SDLC AI-native, o custo de cada
          conversa do agente e a segurança em CI/CD.
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
        title: jan 2026 – presente | Responsável de Tecnologia
        text: >
          **Count on Sheep — Consultoria de Cripto Taxes (EUA)**

          Único responsável por toda a tecnologia da empresa. Criei do zero e
          levei ao deploy em produção o `onboarding-AI` (FastAPI), um agente de
          IA que coordena o onboarding de ponta a ponta. A solução combina um
          pipeline de extração com **7 agentes LangGraph** em 3 fases paralelas,
          STT em tempo real com AWS Transcribe Streaming e integrações com
          Pipedrive, DocuSign, Stripe e Gmail.
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
        title: dez 2024 – presente | Pesquisador NLP (CEIA)
        text: >
          **CEIA-UFG & AKCIT — Projeto Koru**

          Pesquisador NLP no Projeto Koru, sistema multi-agente (LangGraph)
          para avaliação de soft skills e competências de liderança. Responsável
          pelo koru-dashboard (Streamlit + Plotly + TimescaleDB) e pelos testes
          de Red Team adversarial com DeepTeam. Iniciou como NLP Junior,
          evoluiu para NLP Researcher.
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
        title: 2024 – presente | Bolsista CNPq (Projeto Sobrevidas)
        text: >
          **CNPq — Projeto Sobrevidas (SUS)**

          Bolsista CNPq e líder da equipe de IA do Projeto Sobrevidas,
          chatbot integrado ao SUS para rastreamento de câncer de boca.
          Co-autor do artigo **premiado como melhor do Brasil no SBCAS 2025**
          (categoria ferramentas). Projeto distinto do Koru — foco em saúde
          pública e NLP aplicado à vigilância epidemiológica.
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
        title: mar 2024 – dez 2025 | Founder & CEO · Clivia (encerrada)
        text: >
          **Clivia — IA para Clínicas Médicas**

          Fundei e operei a Clivia, plataforma multi-agente LLM para clínicas
          médicas (SDR inteligente via WhatsApp). Arquitetei toda a stack de
          zero — FastAPI, LangGraph Supervisor (migração de CrewAI), LiteLLM
          proxy self-hosted, Redis checkpointer, Docker Swarm com **40+
          containers em produção**. Encerrada em dez/2025.
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
        title: 2023 - presente | Community Leader
        text: >
          **Go.IAs & Magnatas.hub**

          Co-fundei a comunidade Magnatas.hub e atuo como community builder 
          na Go.IAs. Promovo eventos, workshops e networking no ecossistema 
          de IA e empreendedorismo em Goiânia. Palestrante regular em eventos 
          sobre tecnologia e inovação.
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
        title: out 2023 – out 2024 | Pesquisador
        text: >
          **EMBRAPII — Empresa Brasileira de Pesquisa e Inovação Industrial**

          Projeto multidisciplinar em IA, Engenharia de Software e Empreendedorismo.
          Liderei equipe de 7 pessoas no desenvolvimento da EdTech "Minha Aula de
          Excelência". Metodologias: Lean, Stage-Gate, Sprints, ISO 12207 e SWEBOK.
          Reconhecido por performance e liderança entre 60 bolsistas do programa.
      - type: FeaturedItem
        title: jan–ago 2024 / jan–fev 2025 | Desenvolvedor Back-end
        text: >
          **Totem TI — terceirizado no GoiásPrev**

          Prestação de serviços de back-end para o GoiásPrev (órgão de previdência
          estadual). Java, Spring, JSP, JasperReports. Levantamento de requisitos,
          arquitetura de microsserviços e conformidade com ISO 12207 e SWEBOK.
      - type: FeaturedItem
        title: jan 2022 – ago 2024 | Desenvolvedor Back-end
        text: >
          **GoiásPrev / Minsait - Governo do Estado de Goiás**

          Estagiário promovido a efetivo. Desenvolvedor back-end em sistemas
          críticos de previdência para servidores públicos. Java 8/11, Spring Boot,
          JSP, iReport, JDBC. Alta disponibilidade e segurança em sistemas governamentais.
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
        title: 2019 - presente | Formação Acadêmica
        text: >
          **Universidade Federal de Goiás**

          Bacharelado em Ciência da Computação com especialização em 
          desenvolvimento back-end. Participação ativa em projetos de pesquisa 
          e extensão. Desenvolvimento de base sólida em algoritmos, estruturas 
          de dados e engenharia de software.
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
        title: 2024 – presente | Pesquisa Contínua
        text: >
          **Inteligência Artificial e LLMs**

          Investigação contínua em modelos de linguagem e suas aplicações
          práticas — sistemas multi-agente (LangGraph), MCP (Model Context
          Protocol, cliente e servidor FastMCP), LLMOps (LiteLLM, OpenLit,
          Langfuse) e Red Team (DeepTeam, Deepeval). Foco em aplicações éticas
          e de impacto social.
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
    variant: timeline
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
      text: Competências Técnicas
      color: text-dark
      type: TitleBlock
    subtitle: Stack tecnológico e habilidades especializadas
    text: >
      **Desenvolvimento Back-end:**

      • **Java & Spring Boot** — 4+ anos; Flyway (60+ migrations), RabbitMQ
      (Spring AMQP), Spring Security OAuth2 (Keycloak RS256/JWKs)

      • **Python** — FastAPI, Pydantic v2, asyncio, Flask

      • **APIs RESTful e microsserviços** — design e implementação de serviços
      escaláveis

      • **Bancos de dados** — PostgreSQL, Supabase, pgvector, MySQL, Redis


      **Inteligência Artificial e Sistemas Multi-agente:**

      • **LangGraph** — Supervisor, StateGraph, RedisSaver e
      AsyncPostgresSaver checkpointers

      • **MCP (Model Context Protocol)** — cliente customizado e servidor
      FastMCP implementados do zero

      • **CrewAI, LangChain (LCEL), Agno** — orquestração de agentes

      • **RAG / GraphRAG** — pgvector, FAISS, Supabase vector store, chunking
      adaptativo com n-gram overlap

      • **Text2SQL / GenBI** customizado com LangChain `create_sql_agent`


      **LLMOps, Observabilidade e Guardrails:**

      • **LiteLLM** — proxy self-hosted com router e fallback entre modelos

      • **Langfuse** — tracing distribuído com CallbackHandler + llm-as-a-judge
      Evaluator

      • **OpenLit, Helicone** — custo/latência/tokens

      • **DeepTeam** — Red Team adversarial (prompt injection)

      • **Deepeval** — guardrails de toxicidade, preconceito e hate speech

      • **PydanticAI** — validação estruturada de respostas

      • **OpenTelemetry, Prometheus, Loki, Grafana**


      **STT em Tempo Real:**

      • **AWS Transcribe Streaming** — WebSocket com state machine de sessão
      (idle/connecting/streaming/reconnecting), KWS sidecar, limite de 4h

      • **Deepgram Nova-3** — STT via WebSocket streaming

      • **OpenAI Whisper** — transcrição offline

      • **LLM corrector** — correção em tempo real de termos técnicos


      **Infraestrutura e DevOps:**

      • **Docker Swarm** — 40+ containers orquestrados em produção (Clivia)

      • **CI/CD GitOps** — GitHub Actions → Docker Hub → Portainer webhook

      • **Ollama** — inferência local com múltiplas instâncias


      **Liderança e Gestão:**

      • **Liderança técnica** — responsável único pela tecnologia da Count on
      Sheep; CEO da Clivia durante ~21 meses

      • **Community Building** — Go.IAs (500+ membros), Magnatas.hub (~80–90)

      • **Public Speaking** — palestrante regular em eventos de IA e
      empreendedorismo
    actions:
      - label: Ver Projetos
        altText: 'Ver portfolio de projetos'
        url: /projects
        showIcon: true
        icon: arrowRight
        iconPosition: right
        style: primary
        elementId: ''
        type: Link
    media:
      url: /images/thiago-peraro-magnatas.webp
      altText: Competências técnicas
      elementId: ''
      type: ImageBlock
    elementId: ''
    colors: bg-neutral-fg-dark
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
      text: Reconhecimentos e Conquistas
      color: text-dark
      type: TitleBlock
    subtitle: Principais prêmios e reconhecimentos profissionais
    text: >
      **🌟 1º AI Brasil Hero (2026)**

      Reconhecido como **1º AI Brasil Hero** no AI Brasil / CEIA Open Day, após
      palestrar sobre Second Brain + AI OS, hiperprodutividade e agentic coding.
      Prêmio entregue por Juliano Kimura.


      **🏆 SBCAS 2025 — Melhor Artigo do Brasil**

      Artigo sobre o projeto Sobrevidas reconhecido como melhor do país no
      Simpósio Brasileiro de Computação Aplicada à Saúde 2025 (categoria
      ferramentas).


      **🎓 Bolsista CNPq**

      Selecionado como bolsista do Conselho Nacional de Desenvolvimento
      Científico e Tecnológico para pesquisa em IA aplicada à saúde (projeto
      Sobrevidas).


      **🎖️ EMBRAPII — Líder destaque**

      Reconhecido como líder destaque entre 60 bolsistas do programa EMBRAPII,
      acompanhado por 8 mentores doutores em IA, Engenharia de Software e
      Empreendedorismo.


      **🚀 Fundador de Startup de IA**

      Fundei e operei a Clivia (mar 2024 – dez 2025), plataforma multi-agente
      para healthtech — arquitetura end-to-end em Docker Swarm com 40+
      containers em produção.


      **👥 Líder de Comunidades**

      Co-fundação do Magnatas.hub e liderança na Go.IAs (**500+ membros**),
      contribuindo para o desenvolvimento do ecossistema de inovação em
      Goiânia.


      **🎤 Speaker Reconhecido**

      Mentor e palestrante no **PRIA** (inovabra/Bradesco, São Paulo, 2026),
      palestrante no **AI Brasil 2026** (CEIA Open Day / Go.IAs Experience) e
      regular em eventos de tecnologia, compartilhando conhecimento sobre IA
      ética, hiperprodutividade e desenvolvimento de produtos inovadores.
    actions:
      - label: Ver palestras
        altText: 'Ver a página de palestras e o prêmio'
        url: /palestras
        showIcon: true
        icon: arrowRight
        iconPosition: right
        style: primary
        elementId: ''
        type: Link
      - label: Convite para Palestras
        altText: 'Convite para palestras'
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
  metaTitle: Experiência Profissional | Thiago Peraro
  metaDescription: >-
    Experiência de Thiago Peraro em liderança técnica, plataformas digitais,
    inteligência artificial e produtos usados por organizações públicas e privadas.
  type: Seo
---
