import React from 'react';
import Head from 'next/head';
import { allContent } from '../utils/local-content';
import { getComponent } from '../components/components-registry';
import { resolveStaticProps } from '../utils/static-props-resolvers';
import { resolveStaticPaths } from '../utils/static-paths-resolvers';
import {
    buildLocaleUrl,
    normalizeSiteUrl,
    seoGenerateMetaDescription,
    seoGenerateMetaTags,
    seoGenerateOgImage,
    seoGenerateStructuredData,
    seoGenerateTitle
} from '../utils/seo-utils';

function Page(props) {
    const { page, site, locale = 'en', siteUrl } = props;
    const { modelName } = page.__metadata;
    if (!modelName) {
        throw new Error(`page has no type, page '${props.path}'`);
    }
    const PageLayout = getComponent(modelName);
    if (!PageLayout) {
        throw new Error(`no page layout matching the page model: ${modelName}`);
    }
    const title = seoGenerateTitle(page, site);
    const metaTags = seoGenerateMetaTags(page, site, siteUrl);
    const metaDescription = seoGenerateMetaDescription(page, site);
    const canonicalUrl = buildLocaleUrl(siteUrl, locale, page.__metadata.urlPath);
    const alternateUrl = page.__metadata.alternatePath
        ? buildLocaleUrl(siteUrl, page.__metadata.alternateLocale, page.__metadata.alternatePath)
        : null;
    const englishUrl = locale === 'en' ? canonicalUrl : alternateUrl;
    const socialImage = seoGenerateOgImage(page, site, siteUrl);
    const structuredData = seoGenerateStructuredData({ page, site, locale, canonicalUrl, socialImage });
    return (
        <>
            <Head>
                <title>{title}</title>
                {metaDescription && <meta name="description" content={metaDescription} />}
                {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
                {canonicalUrl && <link rel="alternate" hrefLang={locale === 'pt' ? 'pt-BR' : 'en'} href={canonicalUrl} />}
                {alternateUrl && (
                    <link
                        rel="alternate"
                        hrefLang={page.__metadata.alternateLocale === 'pt' ? 'pt-BR' : 'en'}
                        href={alternateUrl}
                    />
                )}
                {englishUrl && <link rel="alternate" hrefLang="x-default" href={englishUrl} />}
                {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
                <meta property="og:locale" content={locale === 'pt' ? 'pt_BR' : 'en_US'} />
                {alternateUrl && <meta property="og:locale:alternate" content={locale === 'pt' ? 'en_US' : 'pt_BR'} />}
                {metaTags.map((metaTag) => {
                    if (metaTag.format === 'property') {
                        // OpenGraph meta tags (og:*) should be have the format <meta property="og:…" content="…">
                        return <meta key={metaTag.property} property={metaTag.property} content={metaTag.content} />;
                    }
                    return <meta key={metaTag.property} name={metaTag.property} content={metaTag.content} />;
                })}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                {site.favicon && <link rel="icon" href={site.favicon} />}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
                />
            </Head>
            <PageLayout page={page} site={site} />
        </>
    );
}

export function getStaticPaths({ locales }) {
    const allPaths = [];
    (locales || ['en', 'pt']).forEach((locale) => {
        const data = allContent({ locale });
        const paths = resolveStaticPaths(data);
        paths.forEach((p) => {
            const clean = (p || '/').replace(/\/$/, '');
            const slug = clean === '' || clean === '/' ? [] : clean.replace(/^\//, '').split('/');
            allPaths.push({ params: { slug }, locale });
        });
    });
    return { paths: allPaths, fallback: false };
}

export async function getStaticProps({ params, locale }) {
    const data = allContent({ locale });
    const urlPath = '/' + (params.slug || []).join('/');
    const resolvedProps = await resolveStaticProps(urlPath, data);
    const alternateLocale = locale === 'pt' ? 'en' : 'pt';
    const alternateData = allContent({ locale: alternateLocale });
    const currentContentId = resolvedProps.page.__metadata.id;
    const relativeContentPath = currentContentId.replace(/^content\/(?:en\/)?pages\//, '');
    const alternateContentId = alternateLocale === 'pt'
        ? `content/pages/${relativeContentPath}`
        : `content/en/pages/${relativeContentPath}`;
    const alternatePage = alternateData.pages.find(
        (candidate) => candidate.__metadata.id === alternateContentId && !candidate.isDraft
    );
    const siteUrl = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL || process.env.URL);

    return {
        props: {
            ...resolvedProps,
            locale,
            siteUrl,
            page: {
                ...resolvedProps.page,
                __metadata: {
                    ...resolvedProps.page.__metadata,
                    alternateLocale,
                    alternatePath: alternatePage?.__metadata.urlPath ?? null
                }
            }
        }
    };
}

export default Page;
