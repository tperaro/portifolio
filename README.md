# Thiago Peraro — Portfolio

Bilingual personal portfolio and technical blog for Thiago Peraro. The site is built with Next.js, React, Tailwind CSS, and Git-backed Markdown/JSON content.

## What is included

- English as the default locale and a complete Portuguese version under `/pt/`
- exact language alternates through `translationKey`
- portfolio pages for projects, experience, skills, about, and contact
- bilingual technical articles with author, date, social image, and structured data
- canonical URLs, `hreflang`, Open Graph, Twitter Cards, JSON-LD, sitemap, and robots endpoints
- responsive, accessible layouts with optimized local images
- local content search powered by the generated content index

## Requirements

- Node.js 22 or a compatible active LTS release
- npm

## Local development

```bash
npm install
cp .env-example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

```dotenv
NEXT_PUBLIC_SITE_URL=https://thiago-peraro.netlify.app
NEXT_PUBLIC_ALGOLIA_APP_ID=
NEXT_PUBLIC_ALGOLIA_INDEX_NAME=
NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY=
```

`NEXT_PUBLIC_SITE_URL` must match the production origin. It is used to generate canonical URLs, social images, `hreflang`, the sitemap, and robots metadata.

Algolia variables are optional. Without them, the site uses its local generated search index.

## Quality checks

```bash
npm test
npm run typecheck
npm run build
git diff --check
```

The test suite verifies locale parity, exact translated routes, public-content quality, local image references, and the critical SEO/performance configuration.

To inspect the production build locally:

```bash
NEXT_PUBLIC_SITE_URL=http://127.0.0.1:3000 npm run build
npm start
```

## Content structure

```text
content/
├── data/                 # Portuguese/global navigation, people, and site data
├── en/
│   ├── data/             # English site data
│   └── pages/            # English pages and posts
└── pages/                # Portuguese pages and posts
    └── blog/
```

Published counterparts must use the same `translationKey`. Different localized slugs are supported and the language switcher resolves the exact alternate route.

### Adding a bilingual article

Create the same Markdown filename in `content/pages/blog/` and `content/en/pages/blog/`. Give both files the same `translationKey`, localized `title`, `slug`, `excerpt`, image alt text, and SEO metadata.

Use a representative local image with explicit dimensions:

```yaml
featuredImage:
  url: /images/blog/example.webp
  altText: Descriptive alternative text
  type: ImageBlock
  width: 1200
  height: 630
```

Run all quality checks before publishing.

## Deployment

`netlify.toml` builds with `npm run build` and publishes the Next.js output from `.next`. Configure `NEXT_PUBLIC_SITE_URL` in the production environment before deployment.

## Main paths

- `src/components/` — React components and layouts
- `src/pages/` — Next.js routes and discovery endpoints
- `src/utils/` — content, routing, search, and SEO helpers
- `src/css/main.css` — global Tailwind component styles
- `public/` — static media
- `tests/` — content, locale, SEO, and performance guardrails

## Contact

- [LinkedIn](https://www.linkedin.com/in/thiago-peraro/)
- [GitHub](https://github.com/tperaro)
- [thiago-peraro.netlify.app](https://thiago-peraro.netlify.app/)
