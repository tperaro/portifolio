import * as React from 'react';
import { useRouter } from 'next/router';
import Markdown from 'markdown-to-jsx';

import { getBaseLayoutComponent } from '../../../utils/base-layout';
import Link from '../../atoms/Link';
import ToolIcon from '../../blocks/guides/ToolIcon';
import TldrBands from '../../blocks/guides/TldrBands';
import Toc from '../../blocks/guides/Toc';
import Faq from '../../blocks/guides/Faq';
import { GuideAccentContext } from '../../blocks/guides/accent';
import { guideOverrides } from '../../blocks/guides/markdown-overrides';
import { collectHeadings } from '../../blocks/guides/slugify';
import { kindLabels, labelFor, levelLabels, pricingLabels, t, topicLabels, ui } from '../../blocks/guides/labels';

function formatDate(value: string | undefined, locale: string | undefined) {
    if (!value) return null;
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return null;
    return new Intl.DateTimeFormat(locale === 'pt' ? 'pt-BR' : 'en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC'
    }).format(parsed);
}

function Spec({ label, value }: { label: string; value: React.ReactNode }) {
    if (!value) return null;
    return (
        <div>
            <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-dark/40">{label}</dt>
            <dd className="mt-1 text-sm font-medium">{value}</dd>
        </div>
    );
}

export default function GuideLayout(props) {
    const { page, site } = props;
    const router = useRouter();
    const locale = router?.locale;
    const BaseLayout = getBaseLayoutComponent(page.baseLayout, site.baseLayout);
    const { enableAnnotations = true } = site;
    const {
        title,
        subtitle,
        markdown_content,
        tldr,
        verdict,
        kind,
        topics = [],
        level,
        pricing,
        vendor,
        officialUrl,
        readingTime,
        date,
        updatedDate,
        icon,
        iconUrl,
        accentColor = '#4f5fd5',
        prerequisites = [],
        faq = [],
        relatedGuides = [],
        hubUrlPath = '/guias'
    } = page;

    const headings = React.useMemo(() => collectHeadings(markdown_content), [markdown_content]);
    const published = formatDate(date, locale);
    const updated = formatDate(updatedDate, locale);
    const eyebrow = [labelFor(kindLabels, kind, locale), ...topics.map((topic) => labelFor(topicLabels, topic, locale))]
        .filter(Boolean)
        .join(' · ');

    return (
        <BaseLayout page={page} site={site}>
            <GuideAccentContext.Provider value={accentColor}>
                <main id="main" className="sb-layout sb-guide-layout">
                    <article className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:pt-16">
                        <nav aria-label="Breadcrumb" className="font-mono text-[11px] uppercase tracking-[0.14em] text-dark/45">
                            <ol className="flex flex-wrap items-center gap-2">
                                <li>
                                    <Link href="/" className="hover:text-primary">
                                        {t(ui.home, locale)}
                                    </Link>
                                </li>
                                <li aria-hidden="true">/</li>
                                <li>
                                    <Link href={hubUrlPath} className="hover:text-primary">
                                        {t(ui.hubName, locale)}
                                    </Link>
                                </li>
                                <li aria-hidden="true">/</li>
                                <li aria-current="page" className="text-dark/70">
                                    {title}
                                </li>
                            </ol>
                        </nav>

                        <header className="mt-8 max-w-3xl">
                            <div className="flex items-start gap-4">
                                <ToolIcon name={title} icon={icon} iconUrl={iconUrl} accentColor={accentColor} size="lg" />
                                <div>
                                    <p className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: accentColor }}>
                                        {eyebrow}
                                    </p>
                                    <h1
                                        className="mt-2 text-[clamp(2.25rem,5.5vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.045em]"
                                        {...(enableAnnotations && { 'data-sb-field-path': 'title' })}
                                    >
                                        {title}
                                    </h1>
                                </div>
                            </div>
                            {subtitle && (
                                <p
                                    className="mt-6 max-w-2xl text-lg font-medium leading-snug text-dark/80 sm:text-xl"
                                    {...(enableAnnotations && { 'data-sb-field-path': 'subtitle' })}
                                >
                                    {subtitle}
                                </p>
                            )}
                        </header>

                        <dl className="mt-8 grid max-w-4xl grid-cols-2 gap-x-6 gap-y-5 border-y border-dark/10 py-5 sm:grid-cols-3 lg:grid-cols-5">
                            <Spec label={t(ui.vendor, locale)} value={vendor} />
                            <Spec
                                label={t(ui.price, locale)}
                                value={pricing && pricing !== 'na' ? labelFor(pricingLabels, pricing, locale) : null}
                            />
                            <Spec label={t(ui.level, locale)} value={labelFor(levelLabels, level, locale)} />
                            <Spec
                                label={t(ui.reading, locale)}
                                value={readingTime ? `${readingTime} min` : null}
                            />
                            <Spec label={t(ui.updated, locale)} value={updated || published} />
                        </dl>

                        <section className="mt-10 max-w-4xl" aria-label="TL;DR">
                            <TldrBands tldr={tldr} locale={locale} variant="page" />
                            {verdict && (
                                <p
                                    className="mt-6 border-l-[3px] py-1 pl-5 text-lg font-medium leading-relaxed"
                                    style={{ borderLeftColor: accentColor }}
                                >
                                    <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.16em] text-dark/45">
                                        {t(ui.verdict, locale)}
                                    </span>
                                    {verdict}
                                </p>
                            )}
                        </section>

                        <div className="mt-14 gap-12 lg:grid lg:grid-cols-[16rem_minmax(0,1fr)]">
                            <aside className="mb-10 space-y-6 lg:sticky lg:top-28 lg:mb-0 lg:self-start">
                                <Toc headings={headings} label={t(ui.contents, locale)} />
                                {prerequisites.length > 0 && (
                                    <div className="rounded-2xl border border-dark/12 p-5">
                                        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-dark/45">
                                            {t(ui.prerequisites, locale)}
                                        </p>
                                        <ul className="mt-3 space-y-2 text-sm leading-snug text-dark/70">
                                            {prerequisites.map((item) => (
                                                <li key={item} className="flex gap-2">
                                                    <span aria-hidden="true" style={{ color: accentColor }}>
                                                        ·
                                                    </span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {officialUrl && (
                                    <a
                                        href={officialUrl}
                                        rel="noopener noreferrer nofollow"
                                        target="_blank"
                                        className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-primary underline underline-offset-4 hover:no-underline"
                                    >
                                        {t(ui.official, locale)} ↗
                                    </a>
                                )}
                            </aside>

                            <div className="min-w-0">
                                {markdown_content && (
                                    <Markdown
                                        options={{ forceBlock: true, overrides: guideOverrides }}
                                        className="sb-markdown sb-guide-markdown max-w-3xl"
                                        {...(enableAnnotations && { 'data-sb-field-path': 'markdown_content' })}
                                    >
                                        {markdown_content}
                                    </Markdown>
                                )}

                            </div>
                        </div>
                    </article>

                    {/* Fecho em faixa de cor, no mesmo ritmo das seções das outras páginas. */}
                    <div className="bg-neutral">
                        <div className="mx-auto max-w-3xl px-4 pb-20 pt-4">
                                    <Faq items={faq} title={t(ui.faq, locale)} />

                                    {relatedGuides.length > 0 && (
                                        <section className="mt-16" aria-labelledby="guide-related">
                                            <h2 id="guide-related" className="text-2xl font-bold tracking-tight">
                                                {t(ui.related, locale)}
                                            </h2>
                                            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                                                {relatedGuides.map((related) => (
                                                    <li key={related.urlPath}>
                                                        <Link
                                                            href={related.urlPath}
                                                            className="flex items-center gap-3 rounded-xl border border-dark/12 p-4 transition hover:border-dark/30 hover:text-primary"
                                                        >
                                                            <ToolIcon
                                                                name={related.title}
                                                                icon={related.icon}
                                                                iconUrl={related.iconUrl}
                                                                accentColor={related.accentColor}
                                                                size="sm"
                                                            />
                                                            <span className="font-medium leading-snug">{related.title}</span>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                    )}

                                    <div className="mt-16 border-t border-dark/20 pt-6 font-mono text-[11px] uppercase tracking-[0.14em] text-dark/45">
                                        {published && <span>{published}</span>}
                                        <Link href={hubUrlPath} className="ml-4 text-primary hover:underline">
                                            ← {t(ui.backToHub, locale)}
                                        </Link>
                                    </div>
                        </div>
                    </div>
                </main>
            </GuideAccentContext.Provider>
        </BaseLayout>
    );
}
