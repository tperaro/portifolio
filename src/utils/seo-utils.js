export function seoGenerateMetaTags(page, site, siteUrl) {
    let pageMetaTags = {};

    if (site.defaultMetaTags?.length) {
        site.defaultMetaTags.forEach((metaTag) => {
            pageMetaTags[metaTag.property] = metaTag.content;
        });
    }

    const seoTitle = seoGenerateTitle(page, site);
    const metaDescription = seoGenerateMetaDescription(page, site);
    const ogImage = seoGenerateOgImage(page, site, siteUrl);

    pageMetaTags = {
        ...pageMetaTags,
        ...(seoTitle && { 'og:title': seoTitle }),
        ...(metaDescription && { 'og:description': metaDescription }),
        'og:type': ['PostLayout', 'GuideLayout'].includes(page.__metadata?.modelName) ? 'article' : 'website',
        ...(ogImage && { 'og:image': ogImage }),
        'twitter:card': ogImage ? 'summary_large_image' : 'summary',
        ...(seoTitle && { 'twitter:title': seoTitle }),
        ...(metaDescription && { 'twitter:description': metaDescription }),
        ...(ogImage && { 'twitter:image': ogImage })
    };

    if (page.seo?.metaTags?.length) {
        page.seo?.metaTags.forEach((metaTag) => {
            pageMetaTags[metaTag.property] = metaTag.content;
        });
    }

    let metaTags = [];
    Object.keys(pageMetaTags).forEach((key) => {
        if (pageMetaTags[key] !== null) {
            metaTags.push({
                property: key,
                content: pageMetaTags[key],
                format: key.startsWith('og') ? 'property' : 'name'
            });
        }
    });

    return metaTags;
}

export function seoGenerateTitle(page, site) {
    let title = page.seo?.metaTitle ? page.seo?.metaTitle : page.title;
    const normalizedTitle = title?.toLocaleLowerCase();
    const normalizedSuffix = site.titleSuffix?.trim().toLocaleLowerCase();
    if (site.titleSuffix && page.seo?.addTitleSuffix !== false && !normalizedTitle?.includes(normalizedSuffix)) {
        title = `${title} - ${site.titleSuffix}`;
    }
    return title;
}

export function seoGenerateMetaDescription(page, site) {
    let metaDescription = null;
    // Blog posts and guides use the excerpt as the default meta description
    if (['PostLayout', 'GuideLayout'].includes(page.__metadata.modelName)) {
        metaDescription = page.excerpt;
    }
    // page metaDescription field overrides all others
    if (page.seo?.metaDescription) {
        metaDescription = page.seo?.metaDescription;
    }
    return metaDescription;
}

export function seoGenerateOgImage(page, site, siteUrl) {
    let ogImage = null;
    // Use the sites default og:image field
    if (site.defaultSocialImage) {
        ogImage = site.defaultSocialImage;
    }
    // Blog posts and guides use the featuredImage as the default og:image
    if (['PostLayout', 'GuideLayout'].includes(page.__metadata.modelName)) {
        if (page.featuredImage?.url) {
            ogImage = page.featuredImage.url;
        }
    }
    // page socialImage field overrides all others
    if (page.seo?.socialImage) {
        ogImage = page.seo?.socialImage;
    }

    if (ogImage) {
        if (/^https?:\/\//i.test(ogImage)) {
            return ogImage;
        }
        const domainUrl = normalizeSiteUrl(siteUrl || site.env?.URL);
        if (domainUrl) {
            return `${domainUrl}${ogImage.startsWith('/') ? ogImage : `/${ogImage}`}`;
        } else {
            return ogImage;
        }
    }
    return null;
}

export function normalizeSiteUrl(value) {
    if (!value) return null;
    try {
        const parsed = new URL(value);
        return `${parsed.protocol}//${parsed.host}`;
    } catch {
        return null;
    }
}

export function buildLocaleUrl(siteUrl, locale, urlPath = '/') {
    const origin = normalizeSiteUrl(siteUrl);
    if (!origin) return null;

    const normalizedPath = `/${String(urlPath || '/')}`.replace(/\/{2,}/g, '/').replace(/\/$/, '') || '/';
    const localizedPath = locale === 'pt'
        ? `/pt${normalizedPath === '/' ? '' : normalizedPath}`
        : normalizedPath;
    return `${origin}${localizedPath === '/' ? '/' : `${localizedPath}/`}`;
}

// Rótulos legíveis para o schema.org; as chaves internas ('coding') não dizem
// nada para um buscador nem para um modelo lendo a página.
const TOPIC_NAMES = {
    coding: { pt: 'Codificação assistida por IA', en: 'AI-assisted coding' },
    multiagent: { pt: 'Sistemas multiagentes', en: 'Multi-agent systems' },
    nlp: { pt: 'Processamento de linguagem natural', en: 'Natural language processing' },
    rag: { pt: 'Retrieval-augmented generation', en: 'Retrieval-augmented generation' },
    context: { pt: 'Engenharia de contexto', en: 'Context engineering' },
    ops: { pt: 'Operação de software', en: 'Software operations' }
};

function topicName(topic, locale) {
    const entry = TOPIC_NAMES[topic];
    if (!entry) return topic;
    return locale === 'pt' ? entry.pt : entry.en;
}

function breadcrumbList({ siteUrl, locale, hubUrlPath, hubName, homeName, page, canonicalUrl }) {
    const items = [
        { name: homeName, url: buildLocaleUrl(siteUrl, locale, '/') },
        { name: hubName, url: buildLocaleUrl(siteUrl, locale, hubUrlPath) },
        { name: page.title, url: canonicalUrl }
    ].filter((item) => item.url);

    if (items.length === 0) {
        return null;
    }

    return {
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url
        }))
    };
}

export function seoGenerateStructuredData({ page, site, locale, canonicalUrl, socialImage, siteUrl }) {
    const language = locale === 'pt' ? 'pt-BR' : 'en';
    const isPt = locale === 'pt';
    const common = {
        '@context': 'https://schema.org',
        inLanguage: language,
        ...(canonicalUrl && { url: canonicalUrl })
    };

    if (page.__metadata?.modelName === 'GuideHubLayout') {
        const guides = page.guides ?? [];
        return [
            {
                ...common,
                '@type': 'CollectionPage',
                name: seoGenerateTitle(page, site),
                description: seoGenerateMetaDescription(page, site),
                mainEntity: {
                    '@type': 'ItemList',
                    numberOfItems: guides.length,
                    itemListElement: guides.map((guide, index) => ({
                        '@type': 'ListItem',
                        position: index + 1,
                        name: guide.title,
                        description: guide.tldr?.what || guide.subtitle || undefined,
                        url: buildLocaleUrl(siteUrl, locale, guide.urlPath)
                    }))
                }
            }
        ];
    }

    if (page.__metadata?.modelName === 'GuideLayout') {
        const nodes = [
            {
                ...common,
                '@type': 'TechArticle',
                headline: page.title,
                description: seoGenerateMetaDescription(page, site),
                datePublished: page.date,
                ...(page.updatedDate && { dateModified: page.updatedDate }),
                ...(socialImage && { image: socialImage }),
                ...(page.level && {
                    proficiencyLevel: page.level === 'beginner' ? 'Beginner' : page.level === 'advanced' ? 'Expert' : 'Intermediate'
                }),
                ...(page.prerequisites?.length && { dependencies: page.prerequisites.join(', ') }),
                author: {
                    '@type': 'Person',
                    name: page.author?.name || 'Thiago Peraro',
                    url: 'https://www.linkedin.com/in/thiago-peraro/'
                },
                ...(canonicalUrl && { mainEntityOfPage: canonicalUrl }),
                ...(page.topics?.length && {
                    about: page.topics.map((topic) => ({ '@type': 'Thing', name: topicName(topic, locale) }))
                })
            },
            breadcrumbList({
                siteUrl,
                locale,
                hubUrlPath: page.hubUrlPath || (isPt ? '/guias' : '/guides'),
                hubName: isPt ? 'Guias' : 'Guides',
                homeName: isPt ? 'Início' : 'Home',
                page,
                canonicalUrl
            })
        ].filter(Boolean);

        if (page.faq?.length) {
            nodes.push({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                inLanguage: language,
                mainEntity: page.faq.map((item) => ({
                    '@type': 'Question',
                    name: item.question,
                    acceptedAnswer: { '@type': 'Answer', text: item.answer }
                }))
            });
        }

        return nodes;
    }

    if (page.__metadata?.modelName === 'PostLayout') {
        return {
            ...common,
            '@type': 'BlogPosting',
            headline: page.title,
            description: seoGenerateMetaDescription(page, site),
            datePublished: page.date,
            ...(socialImage && { image: socialImage }),
            author: {
                '@type': 'Person',
                name: page.author?.name || 'Thiago Peraro',
                url: 'https://www.linkedin.com/in/thiago-peraro/'
            },
            ...(canonicalUrl && { mainEntityOfPage: canonicalUrl })
        };
    }

    if (page.slug === '/') {
        return {
            ...common,
            '@type': 'Person',
            name: 'Thiago Peraro',
            jobTitle: locale === 'pt' ? 'Responsável de Tecnologia e Pesquisador de IA' : 'Tech Lead and AI Researcher',
            image: socialImage,
            sameAs: [
                'https://github.com/tperaro',
                'https://www.linkedin.com/in/thiago-peraro/'
            ],
            knowsAbout: ['Artificial Intelligence', 'Natural Language Processing', 'Multi-agent systems', 'Backend engineering']
        };
    }

    return {
        ...common,
        '@type': 'WebPage',
        name: seoGenerateTitle(page, site),
        description: seoGenerateMetaDescription(page, site)
    };
}
