export type GuideLocale = 'pt' | 'en';

type Dict = Record<string, { pt: string; en: string }>;

export const kindLabels: Dict = {
    tool: { pt: 'Ferramenta', en: 'Tool' },
    technique: { pt: 'Técnica', en: 'Technique' },
    concept: { pt: 'Conceito', en: 'Concept' }
};

export const topicLabels: Dict = {
    coding: { pt: 'Codificação', en: 'Coding' },
    multiagent: { pt: 'Multiagentes', en: 'Multi-agent' },
    nlp: { pt: 'NLP', en: 'NLP' },
    rag: { pt: 'RAG', en: 'RAG' },
    context: { pt: 'Contexto', en: 'Context' },
    ops: { pt: 'Operação', en: 'Operations' }
};

export const levelLabels: Dict = {
    beginner: { pt: 'Iniciante', en: 'Beginner' },
    intermediate: { pt: 'Intermediário', en: 'Intermediate' },
    advanced: { pt: 'Avançado', en: 'Advanced' }
};

export const pricingLabels: Dict = {
    free: { pt: 'Grátis', en: 'Free' },
    freemium: { pt: 'Freemium', en: 'Freemium' },
    paid: { pt: 'Pago', en: 'Paid' },
    oss: { pt: 'Open source', en: 'Open source' },
    na: { pt: '—', en: '—' }
};

export const ui = {
    what: { pt: 'É', en: 'IS' },
    when: { pt: 'Use quando', en: 'Use when' },
    whenNot: { pt: 'Evite quando', en: 'Avoid when' },
    search: { pt: 'Buscar por nome, tópico ou problema', en: 'Search by name, topic or problem' },
    all: { pt: 'Tudo', en: 'All' },
    entries: { pt: 'verbetes', en: 'entries' },
    entry: { pt: 'verbete', en: 'entry' },
    noResults: {
        pt: 'Nenhum verbete com esses filtros. Limpe os filtros para ver o catálogo inteiro.',
        en: 'No entries match these filters. Clear them to see the whole catalog.'
    },
    clear: { pt: 'Limpar filtros', en: 'Clear filters' },
    readGuide: { pt: 'Ler o guia', en: 'Read the guide' },
    updated: { pt: 'Atualizado', en: 'Updated' },
    reading: { pt: 'min de leitura', en: 'min read' },
    level: { pt: 'Nível', en: 'Level' },
    price: { pt: 'Preço', en: 'Price' },
    vendor: { pt: 'Fabricante', en: 'Maker' },
    verdict: { pt: 'Veredito', en: 'Verdict' },
    prerequisites: { pt: 'Pré-requisitos', en: 'Prerequisites' },
    faq: { pt: 'Perguntas frequentes', en: 'Frequently asked questions' },
    related: { pt: 'Guias relacionados', en: 'Related guides' },
    contents: { pt: 'Neste guia', en: 'In this guide' },
    official: { pt: 'Site oficial', en: 'Official site' },
    backToHub: { pt: 'Todos os guias', en: 'All guides' },
    hubName: { pt: 'Guias', en: 'Guides' },
    home: { pt: 'Início', en: 'Home' },
    filterKind: { pt: 'Tipo', en: 'Type' },
    filterTopic: { pt: 'Tópico', en: 'Topic' }
};

export function t(entry: { pt: string; en: string }, locale: string | undefined) {
    return locale === 'pt' ? entry.pt : entry.en;
}

export function labelFor(dict: Dict, key: string | undefined, locale: string | undefined) {
    if (!key) return null;
    const entry = dict[key];
    return entry ? t(entry, locale) : key;
}
