import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const rootDir = path.resolve(import.meta.dirname, '..');
const nextConfig = require(path.join(rootDir, 'next.config.js'));

function read(relativePath) {
    return fs.readFileSync(path.join(rootDir, relativePath), 'utf8');
}

test('Next.js uses English as the default locale', () => {
    assert.equal(nextConfig.i18n.defaultLocale, 'en');
    assert.deepEqual(nextConfig.i18n.locales, ['en', 'pt']);
});

test('runtime locale fallbacks point to English', () => {
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
    assert.match(languageSwitcher, /const blogPath = nextLocale === 'en' \? '\/blog' : '\/pt\/blog';/);
    assert.match(languageSwitcher, /isActive\('en'\).*changeLocale\('en'\)[\s\S]*isActive\('pt'\).*changeLocale\('pt'\)/);
});

test('English content includes all public routes promoted by the site', () => {
    const expectedEnglishPages = [
        'content/en/pages/careers.md',
        'content/en/pages/pricing.md',
        'content/en/pages/blog/case-study-1.md',
        'content/en/pages/blog/case-study-2.md',
        'content/en/pages/blog/case-study-3.md',
        'content/en/pages/blog/five-tips-for-starting-a-startup.md',
        'content/en/pages/blog/how-to-write-a-blog-post-that-will-get-you-more-traffic.md',
        'content/en/pages/blog/surround-yourself-with-right-people.md',
        'content/en/pages/blog/top-twenty-ways-to-save-time.md',
        'content/en/pages/blog/track-the-right-metrics-for-your-business.md',
        'content/en/pages/blog/what-is-a-design-system.md'
    ];

    expectedEnglishPages.forEach((relativePath) => {
        assert.equal(fs.existsSync(path.join(rootDir, relativePath)), true, `${relativePath} should exist`);
    });
});

test('English portfolio content avoids demo copy and hides placeholder blog posts', () => {
    const blogIndex = read('content/en/pages/blog/index.md');
    const careersPage = read('content/en/pages/careers.md');
    const pricingPage = read('content/en/pages/pricing.md');
    const placeholderPosts = [
        'content/en/pages/blog/case-study-1.md',
        'content/en/pages/blog/case-study-2.md',
        'content/en/pages/blog/case-study-3.md',
        'content/en/pages/blog/five-tips-for-starting-a-startup.md',
        'content/en/pages/blog/how-to-write-a-blog-post-that-will-get-you-more-traffic.md',
        'content/en/pages/blog/top-twenty-ways-to-save-time.md',
        'content/en/pages/blog/track-the-right-metrics-for-your-business.md'
    ];

    assert.match(blogIndex, /subtitle: Selected writing on AI, software engineering and entrepreneurship/);
    assert.doesNotMatch(blogIndex, /Demo site|This is the subtitle/);

    assert.match(careersPage, /title: Open to International Opportunities/);
    assert.doesNotMatch(careersPage, /Section subtitle|Subtitle goes here|Demo site|Lorem Ipsum/i);

    assert.match(pricingPage, /title: Collaboration Options/);
    assert.doesNotMatch(pricingPage, /Demo site|This is the subtitle for the pricing section|Feature one|Try for free|Contact us/);

    placeholderPosts.forEach((relativePath) => {
        assert.match(read(relativePath), /isDraft: true/, `${relativePath} should be hidden from the public English blog`);
    });
});
