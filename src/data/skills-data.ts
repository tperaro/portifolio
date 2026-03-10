// src/data/skills-data.ts

export type SkillLevel = 'advanced' | 'proficient' | 'familiar';
export type CareerType = 'education' | 'work';

export interface CareerEntry {
  year: number;
  role: string;
  company: string;
  type: CareerType;
  note: string;
}

export interface Category {
  id: string;
  label: string;
  color: string;
}

export interface AcademicRef {
  course: string;
  grade: number;
  year: number;
}

export interface Skill {
  id: string;
  name: string;
  cat: string;
  level: SkillLevel;
  start: number;
  end: number | null;
  desc: string;
  context: string;
  projects: string[];
  academic?: AcademicRef;
}

export interface Achievement {
  year: number;
  icon: string;
  label: string;
  desc: string;
  labelEn?: string;
  descEn?: string;
}

export const CAREER: CareerEntry[] = [
  { year: 2019, role: 'CS Student', company: 'UFG', type: 'education',
    note: 'Started Computer Science degree; algorithms, data structures, software engineering foundations.' },
  { year: 2020, role: 'CS Student', company: 'UFG', type: 'education',
    note: 'Deepening academic foundations. Personal projects and exploration.' },
  { year: 2021, role: 'CS Student', company: 'UFG', type: 'education',
    note: 'English proficiency certification (EF SET). Growing interest in back-end development.' },
  { year: 2022, role: 'Back-end Intern → Dev', company: 'GoiasPrev / Minsait', type: 'work',
    note: 'Joined as Java intern at GoiasPrev (state pension fund, 120k users). Promoted to full-time in Oct 2022.' },
  { year: 2023, role: 'Back-end Dev + Researcher', company: 'GoiasPrev + EMBRAPII/CEIA', type: 'work',
    note: 'Continued Java dev at GoiasPrev. Joined EMBRAPII Capacitacao 4.0; led 7-person team on EdTech product. Started community building (Magnatas.hub).' },
  { year: 2024, role: 'AI Engineer + Founder', company: 'Clivia + CEIA + GoiasPrev', type: 'work',
    note: 'Founded Clivia (AI for medical clinics). Joined CEIA as NLP Researcher (Bolsista CNPq). Brief Java contract.' },
  { year: 2025, role: 'AI Engineer', company: 'CEIA + Clivia + Count on Sheep', type: 'work',
    note: 'NLP research at CEIA. Clivia wound down Dec 2025. Started at Count on Sheep. Best paper at SBCAS 2025.' },
  { year: 2026, role: 'Tech Lead', company: 'Count on Sheep + CEIA', type: 'work',
    note: 'Responsible for all technology at Count on Sheep (US crypto tax firm). NLP research continues at CEIA.' },
];

export const CATEGORIES: Category[] = [
  { id: 'java',         label: 'Java / Back-end',  color: '#475569' },
  { id: 'python',       label: 'Python / APIs',     color: '#4338ca' },
  { id: 'ai',           label: 'AI / LLM',          color: '#7c3aed' },
  { id: 'frontend',     label: 'Frontend',          color: '#0284c7' },
  { id: 'devops',       label: 'DevOps / Infra',    color: '#059669' },
  { id: 'integrations', label: 'Integrações',       color: '#d97706' },
];

export const ACHIEVEMENTS: Achievement[] = [
  { year: 2022, icon: '🎓', label: 'Primeiro emprego', desc: 'Promovido de estagiário a dev full-time na Minsait. Back-end Java no sistema de previdência GoiasPrev (120k usuários).',
    labelEn: 'First professional role', descEn: 'Promoted from intern to full-time developer at Minsait. Java back-end for GoiasPrev pension system (120k users).' },
  { year: 2023, icon: '🏅', label: 'Líder destaque EMBRAPII', desc: 'Liderou time de 7 pessoas no Capacitação 4.0. Reconhecido entre os melhores de 60 fellows. 960h de certificação.',
    labelEn: 'EMBRAPII top leader', descEn: 'Led 7-person EdTech team in Capacitação 4.0. Recognized as standout leader among 60 fellows. 960h certification.' },
  { year: 2024, icon: '🚀', label: 'Fundação da Clivia', desc: 'Fundou startup de IA para clínicas médicas: AI SDR com LangGraph, WhatsApp API, Python/FastAPI.',
    labelEn: 'Clivia founded', descEn: 'Founded AI startup for medical clinics: AI SDR with LangGraph, WhatsApp API, Python/FastAPI.' },
  { year: 2024, icon: '🔬', label: 'Pesquisador CNPq', desc: 'Ingressou no CEIA-UFG como pesquisador NLP com bolsa CNPq. Projeto Sobrevidas (triagem de câncer bucal para o SUS).',
    labelEn: 'CNPq researcher', descEn: 'Joined CEIA-UFG as NLP Researcher with CNPq scholarship. Project Sobrevidas (oral cancer screening chatbot for SUS).' },
  { year: 2024, icon: '🏆', label: '6º lugar nacional CGE-GO', desc: 'Competição nacional CGE-GO, top 6 entre centenas. 1º prêmio era R$1,5M.',
    labelEn: '6th place nationally', descEn: 'CGE-GO national competition, top 6 out of hundreds. 1st prize was R$1.5M.' },
  { year: 2025, icon: '📄', label: 'Melhor artigo — SBCAS 2025', desc: 'Artigo Sobrevidas premiado como melhor do simpósio nacional de computação em saúde do Brasil.',
    labelEn: 'Best paper — SBCAS 2025', descEn: 'Sobrevidas article awarded best paper at Brazil\'s national health computing symposium.' },
  { year: 2025, icon: '🎤', label: 'Palestrante Campus Party', desc: 'Keynote na CPGoiás5 como "Founder CLIVIA & CEIA Researcher".',
    labelEn: 'Campus Party speaker', descEn: 'Keynote speaker at CPGoiás5 as "Founder CLIVIA & CEIA Researcher".' },
  { year: 2025, icon: '🎓', label: 'Startup School — 6º lugar', desc: 'Competiu com 54 startups no LINK (maior escola de negócios do Brasil). Terminou em 6º — top 11%.',
    labelEn: 'Startup School — 6th place', descEn: 'Competed with 54 startups at LINK (Brazil\'s biggest business school). Finished 6th — top 11%.' },
  { year: 2026, icon: '⚡', label: 'Tech Lead internacional', desc: 'Único responsável de tecnologia na Count on Sheep (EUA). Construiu toda a stack do zero.',
    labelEn: 'Tech Lead @ Count on Sheep', descEn: 'Sole tech lead at US crypto tax consulting firm. Built entire tech stack from scratch.' },
];

export const SKILLS: Skill[] = [
  /* Java / Back-end */
  { id: 'java', name: 'Java 17', cat: 'java', level: 'advanced', start: 2022, end: 2025,
    desc: 'Primary language for enterprise back-end. Java 8 (legacy), 11 (modernization), 17 (Spring Boot 3).',
    context: 'Powered GoiasPrev\'s pension fund backend serving 120k state employees — led the Java 8→17 migration and handled peak-load salary processing with zero critical incidents over 3 years.',
    projects: ['GoiasPrev / Minsait', 'Totem TI', 'sobrevidas-backend'] },
  { id: 'spring-boot', name: 'Spring Boot', cat: 'java', level: 'advanced', start: 2022, end: 2025,
    desc: 'Spring Boot 3 (web, security, data JPA, validation, AOP, mail, AMQP). Production systems serving 120k+ users.',
    context: 'Core framework for GoiasPrev\'s pension APIs (120k users) and the Sobrevidas oral cancer screening platform for Brazil\'s SUS public health system.',
    projects: ['GoiasPrev', 'sobrevidas-backend'] },
  { id: 'spring-security', name: 'Spring Security + OAuth2', cat: 'java', level: 'proficient', start: 2024, end: 2025,
    desc: 'OAuth2 Resource Server, JWT validation with Keycloak (RS256/JWKs), RBAC.',
    context: 'Secured Sobrevidas\'s clinical platform with Keycloak-backed JWT validation for fine-grained role-based access (doctors, nurses, admins).',
    projects: ['sobrevidas-backend'] },
  { id: 'keycloak', name: 'Keycloak', cat: 'java', level: 'proficient', start: 2024, end: 2025,
    desc: 'Identity and access management: OAuth2/OIDC provider, PKCE flow, RBAC. Integrated with Spring Boot, FastAPI and Streamlit.',
    context: 'Implemented centralized SSO across Count on Sheep\'s internal stack and the Sobrevidas clinical platform.',
    projects: ['sobrevidas-backend', 'CEIA infrastructure'] },
  { id: 'postgresql-java', name: 'PostgreSQL / JPA', cat: 'java', level: 'advanced', start: 2022, end: 2025,
    desc: 'JPA/Hibernate ORM, Spring Data, raw JDBC for legacy. Complex queries and performance tuning.',
    context: 'Managed complex schemas for GoiasPrev pension calculations and Sobrevidas clinical records.',
    academic: { course: 'Database Systems', grade: 8.7, year: 2022 },
    projects: ['GoiasPrev', 'sobrevidas-backend'] },
  { id: 'rabbitmq', name: 'RabbitMQ', cat: 'java', level: 'proficient', start: 2024, end: 2025,
    desc: 'Asynchronous messaging via Spring AMQP between microservices.',
    context: 'Decoupled clinical notifications from synchronous API calls in Sobrevidas — improved response times and added retry logic.',
    projects: ['sobrevidas-backend'] },
  /* Python / APIs */
  { id: 'python', name: 'Python', cat: 'python', level: 'advanced', start: 2024, end: null,
    desc: 'Main language for AI, ML, NLP, APIs, and automation. Advanced patterns: async, type hints, dataclasses.',
    context: 'Primary language across Clivia, CEIA, and Count on Sheep. Delivered a production-ready AI agent POC at Count on Sheep in under 2 weeks.',
    projects: ['Clivia', 'CEIA', 'agnofirst', 'Count on Sheep'] },
  { id: 'fastapi', name: 'FastAPI', cat: 'python', level: 'advanced', start: 2024, end: null,
    desc: 'Async REST APIs with Pydantic v2, lifespan management, dependency injection, WebSocket streaming.',
    context: 'Backed Clivia\'s AI SDR, Count on Sheep\'s onboarding backend, and CEIA\'s Koru chatbot. Async SSE enabled sub-second LLM response delivery.',
    projects: ['Clivia', 'onboarding-AI', 'assessment-api', 'CEIA'] },
  { id: 'flask', name: 'Flask', cat: 'python', level: 'proficient', start: 2026, end: null,
    desc: 'Full-stack Flask with app factory pattern, blueprints, Jinja2, Flask-WTF, Flask-Limiter, gunicorn.',
    context: 'Built Count on Sheep\'s human-confirmation portal — replaced manual spreadsheet onboarding, cutting ops workload by several hours per new client.',
    projects: ['human-confirmation (Count on Sheep)'] },
  { id: 'pydantic', name: 'Pydantic v2', cat: 'python', level: 'advanced', start: 2024, end: null,
    desc: 'Data validation, schema enforcement for LLM structured outputs, API models.',
    context: 'Enforced structured LLM output validation across all AI pipelines — improved reliability from ~80% to near-100%.',
    projects: ['Clivia', 'assessment-api', 'Count on Sheep'] },
  { id: 'sqlalchemy', name: 'SQLAlchemy async + Alembic', cat: 'python', level: 'proficient', start: 2025, end: null,
    desc: 'Async ORM with asyncpg, Alembic migrations for Python services.',
    context: 'Designed Count on Sheep\'s async database layer for tax document processing pipeline without race conditions.',
    projects: ['Count on Sheep'] },
  { id: 'redis', name: 'Redis (async)', cat: 'python', level: 'proficient', start: 2025, end: null,
    desc: 'Cache, debounce patterns, pipeline operations via redis.asyncio.',
    context: 'Implemented debounce and caching in Count on Sheep\'s STT pipeline — reduced redundant LLM calls during live consultations.',
    projects: ['Count on Sheep'] },
  /* AI / LLM */
  { id: 'langgraph', name: 'LangGraph', cat: 'ai', level: 'advanced', start: 2024, end: null,
    desc: 'Multi-agent orchestration with StateGraph, Supervisor pattern, checkpointers (RedisSaver, AsyncPostgresSaver).',
    context: 'Architected Count on Sheep\'s 7-agent STT pipeline and Clivia\'s AI SDR — reducing manual outreach work by ~80%.',
    projects: ['Clivia', 'Count on Sheep (7-agent STT)', 'CEIA Koru'] },
  { id: 'crewai', name: 'CrewAI', cat: 'ai', level: 'proficient', start: 2024, end: 2025,
    desc: 'Multi-agent system design and orchestration; evaluated and prototyped during the AI tooling exploration phase.',
    context: 'Evaluated CrewAI as a multi-agent framework during initial AI tooling research — informed the decision to adopt LangGraph as the primary orchestration layer for production workloads.',
    projects: ['CEIA research'] },
  { id: 'rag', name: 'RAG / GraphRAG', cat: 'ai', level: 'advanced', start: 2025, end: null,
    desc: 'RAG pipelines: LightRAG, LanceDB, pgvector, FAISS, chunking, embeddings (OpenAI + local).',
    context: 'Reduced time-to-answer for complex tax document queries from hours of manual search to under 30 seconds.',
    projects: ['agnofirst', 'CEIA research', 'Count on Sheep'] },
  { id: 'llmops', name: 'LLMOps', cat: 'ai', level: 'advanced', start: 2025, end: null,
    desc: 'Full LLMOps stack: LiteLLM proxy, Langfuse tracing, LangSmith, Helicone, Prometheus metrics.',
    context: 'Data-driven insights led to 2 model swaps that reduced LLM costs by ~30% at Count on Sheep.',
    projects: ['Clivia', 'Count on Sheep', 'CEIA'] },
  { id: 'voice-stt', name: 'Voice / STT', cat: 'ai', level: 'proficient', start: 2025, end: null,
    desc: 'Real-time STT: Deepgram (Nova-3, WebSocket), AWS Transcribe Streaming, KWS sidecar, LLM corrector.',
    context: 'Built Count on Sheep\'s real-time STT pipeline for live client tax consultations — sub-500ms latency, AI meeting summaries became primary client deliverable.',
    projects: ['Count on Sheep STT pipeline'] },
  { id: 'mcp', name: 'MCP (Model Context Protocol)', cat: 'ai', level: 'proficient', start: 2026, end: null,
    desc: 'Custom MCP client (lazy server discovery, tool routing, stdio/SSE/streamable-http) and FastMCP server.',
    context: 'Built Count on Sheep\'s internal MCP client from scratch — letting AI agents safely access internal tools without exposing raw APIs.',
    projects: ['Count on Sheep'] },
  { id: 'ml-classic', name: 'ML / PyTorch / HuggingFace', cat: 'ai', level: 'familiar', start: 2023, end: null,
    desc: 'Classical ML with TensorFlow, PyTorch, scikit-learn; HuggingFace transformers for NLP.',
    context: 'Applied HuggingFace transformers for clinical text classification in CEIA\'s Sobrevidas — contributed to best paper at SBCAS 2025.',
    academic: { course: 'Artificial Intelligence', grade: 8.0, year: 2024 },
    projects: ['EMBRAPII', 'CEIA research'] },
  /* Frontend */
  { id: 'react', name: 'React 19 + TypeScript', cat: 'frontend', level: 'proficient', start: 2026, end: null,
    desc: 'React 19 SPA with TypeScript, Vite, shadcn/ui + Radix UI, TanStack Query v5, React Router v7.',
    context: 'Rebuilt Count on Sheep\'s internal dashboard from Streamlit to React 19 — improved load performance and enabled self-serve analytics.',
    projects: ['dashboard (COS)'] },
  { id: 'tailwind', name: 'Tailwind CSS', cat: 'frontend', level: 'proficient', start: 2026, end: null,
    desc: 'Utility-first CSS v3 and v4, design tokens, full custom component styling.',
    context: 'Used across Count on Sheep\'s portal and React dashboard — utility-first styling enabled a solo dev to ship production-quality UI consistently.',
    projects: ['human-confirmation', 'dashboard'] },
  { id: 'streamlit', name: 'Streamlit + Plotly', cat: 'frontend', level: 'proficient', start: 2025, end: null,
    desc: 'Internal admin dashboards with Plotly charts (bar, pie, scatter, time-series), TimescaleDB integration.',
    context: 'Built LLMOps dashboards used daily by Count on Sheep leadership — replaced weekly Excel reporting with real-time visibility.',
    projects: ['quick-front-end (COS)', 'CEIA koru-dashboard'] },
  { id: 'framer', name: 'Framer Motion', cat: 'frontend', level: 'familiar', start: 2026, end: null,
    desc: 'Complex animations: scroll-reveal, page transitions, 7-phase loading sequences.',
    context: 'Implemented a 7-phase animated loading sequence for Count on Sheep\'s dashboard — received direct positive feedback from CEO.',
    projects: ['dashboard (COS)'] },
  /* DevOps / Infra */
  { id: 'docker', name: 'Docker + Compose', cat: 'devops', level: 'advanced', start: 2024, end: null,
    desc: 'Multi-service Compose stacks, non-root containers, CI/CD with registry push, Docker Swarm.',
    context: 'Containerized all Count on Sheep services — reproducible environments eliminated environment-specific bugs and enabled one-command staging deployments.',
    projects: ['sobrevidas-backend', 'Count on Sheep', 'Clivia'] },
  { id: 'jenkins', name: 'Jenkins CI/CD', cat: 'devops', level: 'proficient', start: 2024, end: 2025,
    desc: 'Jenkinsfile pipelines with build, test, sonar, and Discord webhook notifications.',
    context: 'Built Sobrevidas\'s full CI pipeline — cut manual deploy errors to zero and gave the team instant quality gate feedback.',
    projects: ['sobrevidas-backend'] },
  { id: 'gitlab-ci', name: 'GitLab CI/CD', cat: 'devops', level: 'proficient', start: 2025, end: null,
    desc: 'Build → registry → SSH deploy pipeline. Portainer webhook GitOps.',
    context: 'Reduced Count on Sheep\'s deployment time from 20+ minutes of manual steps to under 3 minutes, triggered by git push.',
    projects: ['quick-front-end (COS)'] },
  { id: 'traefik', name: 'Traefik', cat: 'devops', level: 'proficient', start: 2026, end: null,
    desc: 'Reverse proxy with automatic TLS, routing rules, middleware configuration.',
    context: 'Eliminated manual SSL renewals and enabled clean subdomain routing for 8+ internal services on a single VPS.',
    projects: ['Count on Sheep infra'] },
  { id: 'prometheus', name: 'Prometheus + Grafana', cat: 'devops', level: 'proficient', start: 2024, end: null,
    desc: 'Metrics collection (Micrometer/Java, prometheus_fastapi_instrumentator/Python), Grafana dashboards, Loki.',
    context: 'Gave both Sobrevidas and Count on Sheep real-time API health visibility — replacing reactive incident response with proactive monitoring.',
    projects: ['sobrevidas-backend', 'Count on Sheep'] },
  { id: 'github-actions', name: 'GitHub Actions', cat: 'devops', level: 'proficient', start: 2025, end: null,
    desc: 'CI/CD workflows: Docker image build and push to Docker Hub.',
    context: 'Automated Docker image builds for Count on Sheep — eliminated human error in build and packaging.',
    projects: ['Count on Sheep'] },
  /* Integrations */
  { id: 'n8n', name: 'n8n', cat: 'integrations', level: 'advanced', start: 2025, end: null,
    desc: 'Workflow automation: REST API triggers, webhook orchestration, complex branching flows.',
    context: 'Automated Count on Sheep\'s full client onboarding workflow — reduced ops manual work by ~5h per new client.',
    projects: ['Count on Sheep', 'Peraro Assessoria clients'] },
  { id: 'hubspot', name: 'HubSpot API', cat: 'integrations', level: 'proficient', start: 2025, end: null,
    desc: 'CRM integration: contacts, deals, lifecycle stages, property updates.',
    context: 'Automated contact and deal creation on form submissions — gave sales team real-time pipeline visibility without manual entry.',
    projects: ['Count on Sheep'] },
  { id: 'docusign', name: 'DocuSign API', cat: 'integrations', level: 'proficient', start: 2026, end: null,
    desc: 'E-signature workflows: envelope orchestration, automated send, tracking, reminders.',
    context: 'Reduced contract signing cycle from 2–3 days of manual PDF chains to under 4 hours.',
    projects: ['Count on Sheep', 'human-confirmation'] },
  { id: 'google-apis', name: 'Google APIs', cat: 'integrations', level: 'proficient', start: 2025, end: null,
    desc: 'Gmail API (service account), Google Drive API (polling, download), Google Calendar, Google Meet artifacts.',
    context: 'Automatically linked recordings to Calendar events, enabling AI meeting summaries per client session without manual intervention.',
    projects: ['Count on Sheep'] },
  { id: 'whatsapp', name: 'WhatsApp Business API', cat: 'integrations', level: 'proficient', start: 2024, end: 2025,
    desc: 'Evolution API integration for AI-powered customer conversations at scale.',
    context: 'Powered Clivia\'s AI SDR — automated lead qualification and appointment booking for medical clinics via WhatsApp.',
    projects: ['Clivia'] },
];
