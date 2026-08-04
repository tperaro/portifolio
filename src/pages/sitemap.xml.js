import { buildLocaleUrl, normalizeSiteUrl } from '../utils/seo-utils';

const INDEXABLE_MODELS = new Set(['PageLayout', 'PostFeedLayout', 'PostLayout']);

function requestOrigin(context) {
    const forwardedProto = context.req.headers['x-forwarded-proto'];
    const protocol = Array.isArray(forwardedProto)
        ? forwardedProto[0]
        : forwardedProto?.split(',')[0] || 'https';
    const host = context.req.headers['x-forwarded-host'] || context.req.headers.host;
    return normalizeSiteUrl(
        process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || (host ? `${protocol}://${host}` : null)
    );
}

function relativeContentPath(page) {
    return page.__metadata.id.replace(/^content\/(?:en\/)?pages\//, '');
}

function publishedPages(locale, loadContent) {
    const seen = new Set();
    return loadContent({ locale }).pages.filter((page) => {
        const urlPath = page.__metadata.urlPath;
        if (page.isDraft || !urlPath || !INDEXABLE_MODELS.has(page.__metadata.modelName) || seen.has(urlPath)) {
            return false;
        }
        seen.add(urlPath);
        return true;
    });
}

function escapeXml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

export function buildSitemap(siteUrl, loadContent) {
    const pagesByLocale = {
        en: publishedPages('en', loadContent),
        pt: publishedPages('pt', loadContent)
    };
    const byId = new Map();
    Object.entries(pagesByLocale).forEach(([locale, pages]) => {
        pages.forEach((page) => byId.set(`${locale}:${relativeContentPath(page)}`, page));
    });

    const entries = Object.entries(pagesByLocale).flatMap(([locale, pages]) =>
        pages.map((page) => {
            const url = buildLocaleUrl(siteUrl, locale, page.__metadata.urlPath);
            const otherLocale = locale === 'en' ? 'pt' : 'en';
            const alternatePage = byId.get(`${otherLocale}:${relativeContentPath(page)}`);
            const alternateUrl = alternatePage
                ? buildLocaleUrl(siteUrl, otherLocale, alternatePage.__metadata.urlPath)
                : null;
            const englishUrl = locale === 'en' ? url : alternateUrl;
            const alternates = [
                `<xhtml:link rel="alternate" hreflang="${locale === 'pt' ? 'pt-BR' : 'en'}" href="${escapeXml(url)}"/>`,
                alternateUrl
                    ? `<xhtml:link rel="alternate" hreflang="${otherLocale === 'pt' ? 'pt-BR' : 'en'}" href="${escapeXml(alternateUrl)}"/>`
                    : '',
                englishUrl
                    ? `<xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(englishUrl)}"/>`
                    : ''
            ].filter(Boolean).join('');
            const lastModified = page.date ? `<lastmod>${escapeXml(page.date)}</lastmod>` : '';
            return `<url><loc>${escapeXml(url)}</loc>${alternates}${lastModified}</url>`;
        })
    );

    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries.join('')}</urlset>`;
}

export async function getServerSideProps(context) {
    const { allContent } = await import('../utils/local-content');
    const siteUrl = requestOrigin(context);
    context.res.setHeader('Content-Type', 'application/xml; charset=utf-8');
    context.res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400');
    context.res.write(buildSitemap(siteUrl, allContent));
    context.res.end();
    return { props: {} };
}

export default function Sitemap() {
    return null;
}
