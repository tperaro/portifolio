import { Model } from '@stackbit/types';

export const GuideLayout: Model = {
    type: 'page',
    name: 'GuideLayout',
    label: 'Guia',
    labelField: 'title',
    filePath: 'content/pages/guias/{slug}.md',
    fieldGroups: [
        { name: 'tldr', label: 'TL;DR', icon: 'bolt' },
        { name: 'meta', label: 'Ficha técnica', icon: 'gear' },
        { name: 'faq', label: 'FAQ', icon: 'question' },
        { name: 'settings', label: 'Settings', icon: 'gear' },
        { name: 'seo', label: 'SEO', icon: 'page' }
    ],
    fields: [
        {
            type: 'string',
            name: 'title',
            label: 'Título',
            required: true,
            default: 'Nome da ferramenta',
            hidden: false,
            localized: false
        },
        {
            type: 'string',
            name: 'subtitle',
            label: 'Subtítulo',
            required: false,
            hidden: false,
            localized: false
        },
        {
            type: 'date',
            name: 'date',
            label: 'Publicado em',
            required: true,
            hidden: false,
            localized: false
        },
        {
            type: 'date',
            name: 'updatedDate',
            label: 'Atualizado em',
            description: 'Ferramentas de IA mudam rápido. Esta data aparece no card e no schema.org.',
            required: false,
            hidden: false,
            localized: false
        },
        {
            type: 'reference',
            name: 'author',
            label: 'Autor',
            required: false,
            hidden: false,
            localized: false,
            models: ['Person']
        },
        {
            type: 'string',
            name: 'excerpt',
            label: 'Resumo',
            required: false,
            hidden: false,
            localized: false
        },
        {
            type: 'enum',
            name: 'kind',
            label: 'Tipo',
            required: false,
            default: 'tool',
            hidden: false,
            localized: false,
            options: [
                { label: 'Ferramenta', value: 'tool' },
                { label: 'Técnica', value: 'technique' },
                { label: 'Conceito', value: 'concept' }
            ],
            group: 'meta'
        },
        {
            type: 'list',
            name: 'topics',
            label: 'Tópicos',
            required: false,
            hidden: false,
            localized: false,
            items: {
                type: 'enum',
                options: [
                    { label: 'Codificação', value: 'coding' },
                    { label: 'Multiagentes', value: 'multiagent' },
                    { label: 'NLP', value: 'nlp' },
                    { label: 'RAG', value: 'rag' },
                    { label: 'Contexto', value: 'context' },
                    { label: 'Operação', value: 'ops' }
                ]
            },
            group: 'meta'
        },
        {
            type: 'enum',
            name: 'level',
            label: 'Nível',
            required: false,
            default: 'beginner',
            hidden: false,
            localized: false,
            options: [
                { label: 'Iniciante', value: 'beginner' },
                { label: 'Intermediário', value: 'intermediate' },
                { label: 'Avançado', value: 'advanced' }
            ],
            group: 'meta'
        },
        {
            type: 'number',
            name: 'order',
            label: 'Ordem no catálogo',
            description: 'Menor aparece primeiro. Sem valor, o guia entra pela data de atualização.',
            required: false,
            hidden: false,
            localized: false,
            subtype: 'int',
            group: 'meta'
        },
        {
            type: 'number',
            name: 'readingTime',
            label: 'Tempo de leitura (min)',
            required: false,
            hidden: false,
            localized: false,
            subtype: 'int',
            group: 'meta'
        },
        {
            type: 'enum',
            name: 'pricing',
            label: 'Preço',
            required: false,
            hidden: false,
            localized: false,
            options: [
                { label: 'Grátis', value: 'free' },
                { label: 'Freemium', value: 'freemium' },
                { label: 'Pago', value: 'paid' },
                { label: 'Open source', value: 'oss' },
                { label: 'Não se aplica', value: 'na' }
            ],
            group: 'meta'
        },
        {
            type: 'string',
            name: 'vendor',
            label: 'Fabricante',
            required: false,
            hidden: false,
            localized: false,
            group: 'meta'
        },
        {
            type: 'string',
            name: 'officialUrl',
            label: 'Site oficial',
            required: false,
            hidden: false,
            localized: false,
            group: 'meta'
        },
        {
            type: 'string',
            name: 'icon',
            label: 'Chave do ícone',
            description: 'Identificador do monograma desenhado no código (ex.: claude-code, cursor, rag).',
            required: false,
            hidden: false,
            localized: false,
            group: 'meta'
        },
        {
            type: 'image',
            name: 'iconUrl',
            label: 'Logo oficial (opcional)',
            description: 'Se preenchido, substitui o monograma pelo arquivo enviado.',
            required: false,
            hidden: false,
            localized: false,
            group: 'meta'
        },
        {
            type: 'string',
            name: 'accentColor',
            label: 'Cor de destaque',
            description: 'Hex usado no ícone e nos diagramas do guia.',
            required: false,
            hidden: false,
            localized: false,
            group: 'meta'
        },
        {
            type: 'object',
            name: 'tldr',
            label: 'TL;DR',
            required: false,
            hidden: false,
            localized: false,
            group: 'tldr',
            fields: [
                { type: 'string', name: 'what', label: 'O que é' },
                { type: 'string', name: 'when', label: 'Quando usar' },
                { type: 'string', name: 'whenNot', label: 'Quando não usar' }
            ]
        },
        {
            type: 'string',
            name: 'verdict',
            label: 'Veredito de uma linha',
            required: false,
            hidden: false,
            localized: false,
            group: 'tldr'
        },
        {
            type: 'list',
            name: 'prerequisites',
            label: 'Pré-requisitos',
            required: false,
            hidden: false,
            localized: false,
            items: { type: 'string' },
            group: 'meta'
        },
        {
            type: 'list',
            name: 'related',
            label: 'Guias relacionados',
            description: 'Slugs de outros guias, sem barra. Ex.: cursor',
            required: false,
            hidden: false,
            localized: false,
            items: { type: 'string' },
            group: 'meta'
        },
        {
            type: 'list',
            name: 'faq',
            label: 'Perguntas frequentes',
            required: false,
            hidden: false,
            localized: false,
            group: 'faq',
            items: {
                type: 'object',
                fields: [
                    { type: 'string', name: 'question', label: 'Pergunta' },
                    { type: 'text', name: 'answer', label: 'Resposta' }
                ]
            }
        },
        {
            type: 'model',
            name: 'featuredImage',
            label: 'Imagem de capa',
            required: false,
            hidden: false,
            localized: false,
            models: ['ImageBlock']
        },
        {
            type: 'slug',
            name: 'slug',
            label: 'Slug',
            required: true,
            hidden: false,
            localized: false,
            group: 'settings'
        },
        {
            type: 'boolean',
            name: 'isDraft',
            label: 'Rascunho',
            required: false,
            default: false,
            hidden: false,
            localized: false,
            group: 'settings'
        },
        {
            type: 'model',
            name: 'seo',
            label: 'SEO',
            required: false,
            hidden: false,
            localized: false,
            models: ['Seo'],
            group: 'seo'
        }
    ]
};
