/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    env: {
        stackbitPreview: process.env.STACKBIT_PREVIEW
    },
    trailingSlash: true,
    reactStrictMode: true,
    experimental: {
        useTypeScriptCli: false
    },
    // sitemap.xml resolves content at request time via local-content's globSync,
    // which reads content/ from disk. Without this the serverless bundle ships
    // without those files and the sitemap renders empty.
    outputFileTracingIncludes: {
        '/sitemap.xml': ['./content/**/*', './sources/**/*']
    },
    i18n: {
        locales: ['en', 'pt'],
        defaultLocale: 'en',
        localeDetection: false
    },
    allowedDevOrigins: [
        '192.168.1.84'
    ],
    devIndicators: false
};

module.exports = nextConfig;
