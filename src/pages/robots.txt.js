import { normalizeSiteUrl } from '../utils/seo-utils';

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

export async function getServerSideProps(context) {
    const siteUrl = requestOrigin(context);
    const body = [
        'User-agent: *',
        'Allow: /',
        'Disallow: /api/',
        siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml` : null,
        ''
    ].filter((line) => line !== null).join('\n');

    context.res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    context.res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400');
    context.res.write(body);
    context.res.end();
    return { props: {} };
}

export default function Robots() {
    return null;
}
