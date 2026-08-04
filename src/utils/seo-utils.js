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
        'og:type': page.__metadata?.modelName === 'PostLayout' ? 'article' : 'website',
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
    // Blog posts use the exceprt as the default meta description
    if (page.__metadata.modelName === 'PostLayout') {
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
    // Blog posts use the featuredImage as the default og:image
    if (page.__metadata.modelName === 'PostLayout') {
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

export function seoGenerateStructuredData({ page, site, locale, canonicalUrl, socialImage }) {
    const language = locale === 'pt' ? 'pt-BR' : 'en';
    const common = {
        '@context': 'https://schema.org',
        inLanguage: language,
        ...(canonicalUrl && { url: canonicalUrl })
    };

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
