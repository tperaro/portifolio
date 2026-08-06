import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const frontMatter = require('front-matter');
const rootDir = path.resolve(import.meta.dirname, '..');
const nextConfig = require(path.join(rootDir, 'next.config.js'));

function read(relativePath) {
    return fs.readFileSync(path.join(rootDir, relativePath), 'utf8');
}

function walkMarkdown(relativeDirectory) {
    const absoluteDirectory = path.join(rootDir, relativeDirectory);
    return fs.readdirSync(absoluteDirectory, { withFileTypes: true }).flatMap((entry) => {
        const child = path.join(relativeDirectory, entry.name);
        if (entry.isDirectory()) return walkMarkdown(child);
        return entry.name.endsWith('.md') ? [child] : [];
    });
}

function loadContent(relativeDirectory) {
    return walkMarkdown(relativeDirectory).map((relativePath) => {
        const parsed = frontMatter(read(relativePath));
        return {
            relativePath,
            relativeName: path.relative(relativeDirectory, relativePath),
            attributes: parsed.attributes,
            body: parsed.body
        };
    });
}

function publishedContent(relativeDirectory) {
    return loadContent(relativeDirectory).filter((entry) => !entry.attributes.isDraft);
}

function translationIdentity(entry) {
    return entry.attributes.translationKey || entry.relativeName;
}

function headingCount(body) {
    return (body.match(/^## /gm) || []).length;
}

function wordCount(body) {
    return body.split(/\s+/).filter(Boolean).length;
}

test('Next.js uses English as the default locale', () => {
    assert.equal(nextConfig.i18n.defaultLocale, 'en');
    assert.deepEqual(nextConfig.i18n.locales, ['en', 'pt']);
});

test('runtime locale fallbacks and exact alternate routes are configured', () => {
    const translationHook = read('src/i18n/useTranslation.ts');
    const contentLoader = read('src/utils/local-content.ts');
    const indexer = read('src/utils/indexer/index.js');
    const pageLoader = read('src/pages/[[...slug]].js');
    const languageSwitcher = read('src/components/LanguageSwitcher.tsx');

    assert.match(translationHook, /const locale = \(rawLocale as Locale\) \|\| 'en';/);
    assert.match(translationHook, /translations\[locale\] \?\? translations\.en/);
    assert.match(contentLoader, /const normalizedLocale = locale \?\? 'en';/);
    assert.match(contentLoader, /const isPt = normalizedLocale === 'pt';/);
    assert.match(indexer, /const data = allContent\(\{ locale: 'en' \}\);/);
    assert.match(pageLoader, /locales \|\| \['en', 'pt'\]/);
    assert.match(pageLoader, /alternatePath: alternatePage\?\.__metadata\.urlPath \?\? null/);
    assert.match(languageSwitcher, /const targetPath = alternatePath \|\| '\/';/);
    assert.match(languageSwitcher, /aria-pressed=\{locale === 'en'\}/);
    assert.match(languageSwitcher, /aria-pressed=\{locale === 'pt'\}/);
});

test('every published Portuguese route has an English counterpart and vice versa', () => {
    const portuguese = publishedContent('content/pages');
    const english = publishedContent('content/en/pages');
    const portugueseKeys = portuguese.map(translationIdentity).sort();
    const englishKeys = english.map(translationIdentity).sort();

    assert.deepEqual(portugueseKeys, englishKeys);
    assert.equal(portugueseKeys.length, 15, 'expected eight portfolio pages and seven real articles per locale');
});

test('paired pages retain the same information architecture in both languages', () => {
    const portuguese = new Map(publishedContent('content/pages').map((entry) => [translationIdentity(entry), entry]));
    const english = new Map(publishedContent('content/en/pages').map((entry) => [translationIdentity(entry), entry]));

    portuguese.forEach((ptEntry, key) => {
        const enEntry = english.get(key);
        assert.ok(enEntry, `missing English pair for ${ptEntry.relativePath}`);

        if (ptEntry.attributes.type === 'PostLayout') {
            assert.equal(headingCount(ptEntry.body), headingCount(enEntry.body), `${key} should retain its section structure`);
            const wordRatio = wordCount(enEntry.body) / wordCount(ptEntry.body);
            assert.ok(wordRatio >= 0.75 && wordRatio <= 1.25, `${key} translation length ratio is ${wordRatio.toFixed(2)}`);
            return;
        }

        const ptSections = ptEntry.attributes.sections || ptEntry.attributes.topSections || [];
        const enSections = enEntry.attributes.sections || enEntry.attributes.topSections || [];
        assert.deepEqual(ptSections.map((section) => section.type), enSections.map((section) => section.type), `${key} section types differ`);
        assert.deepEqual(ptSections.map((section) => section.items?.length ?? null), enSections.map((section) => section.items?.length ?? null), `${key} item counts differ`);
    });
});

test('only substantive portfolio content is public', () => {
    const published = [...publishedContent('content/pages'), ...publishedContent('content/en/pages')];
    const forbiddenDemoCopy = /Lorem Ipsum|Demo site|This is the subtitle|Contact Form will be implemented|Formulário de Contato.*Em breve/is;

    published.forEach((entry) => {
        const source = read(entry.relativePath);
        assert.doesNotMatch(source, forbiddenDemoCopy, `${entry.relativePath} contains public demo copy`);
        assert.ok(entry.attributes.seo?.metaTitle, `${entry.relativePath} is missing an SEO title`);
        assert.ok(entry.attributes.seo?.metaDescription, `${entry.relativePath} is missing an SEO description`);
    });

    const archived = loadContent('content/pages').filter((entry) => entry.attributes.isDraft);
    assert.ok(archived.length >= 20, 'template posts and duplicate page backups should remain unpublished');
});

test('all local images referenced by published content exist', () => {
    const published = [...publishedContent('content/pages'), ...publishedContent('content/en/pages')];
    const assetPattern = /(?:url: |socialImage: |\]\()(\/[^\s)]+\.(?:svg|png|jpe?g|webp|mp4))/g;

    published.forEach((entry) => {
        const source = read(entry.relativePath);
        for (const match of source.matchAll(assetPattern)) {
            assert.ok(fs.existsSync(path.join(rootDir, 'public', match[1])), `${entry.relativePath} references missing ${match[1]}`);
        }
    });
});

test('SEO discovery and social metadata are rendered by the application', () => {
    const page = read('src/pages/[[...slug]].js');
    const seoUtils = read('src/utils/seo-utils.js');
    const sitemap = read('src/pages/sitemap.xml.js');
    const robots = read('src/pages/robots.txt.js');
    const robotDemo = read('src/pages/robot-demo.tsx');

    assert.match(page, /rel="canonical"/);
    assert.match(page, /hrefLang="x-default"/);
    assert.match(page, /application\/ld\+json/);
    assert.match(seoUtils, /'twitter:card'/);
    assert.match(seoUtils, /'@type': 'BlogPosting'/);
    assert.match(sitemap, /application\/xml/);
    assert.match(sitemap, /xhtml:link/);
    assert.match(robots, /Sitemap:/);
    assert.match(robotDemo, /noindex,nofollow/);
});

test('the critical mobile path avoids global smooth-scrolling and render-blocking fonts', () => {
    const app = read('src/pages/_app.js');
    const css = read('src/css/main.css');

    assert.doesNotMatch(app, /Lenis|gsap/);
    assert.doesNotMatch(css, /fonts\.googleapis\.com/);
});

test('the scrubbed hero runs only where a device can afford it', () => {
    const scrollHero = read('src/components/sections/ScrollHeroSection/index.tsx');

    // Desktop keeps the scroll-scrubbed video.
    assert.match(scrollHero, /ScrollTrigger/);
    assert.match(scrollHero, /scrub:/);
    assert.match(scrollHero, /<video/);

    // Mobile, coarse pointers and reduced-motion fall back to the static poster:
    // the GSAP timeline must bail out before touching the video.
    assert.match(scrollHero, /\(max-width: 767px\), \(hover: none\) and \(pointer: coarse\), \(prefers-reduced-motion: reduce\)/);
    assert.match(scrollHero, /if \(mode !== 'desktop'\) return;/);

    // The poster still carries the LCP hints and the mobile-safe viewport height.
    assert.match(scrollHero, /fetchPriority="high"/);
    assert.match(scrollHero, /min-h-\[calc\(100svh-5rem\)\]/);
});
