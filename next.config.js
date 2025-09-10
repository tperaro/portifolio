/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    env: {
        stackbitPreview: process.env.STACKBIT_PREVIEW
    },
    trailingSlash: true,
    reactStrictMode: true,
    i18n: {
        locales: ['pt', 'en'],
        defaultLocale: 'pt',
        localeDetection: true
    },
    allowedDevOrigins: [
        '192.168.1.84'
    ]
};

module.exports = nextConfig;
