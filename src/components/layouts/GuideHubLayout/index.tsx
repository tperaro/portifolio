import * as React from 'react';
import { useRouter } from 'next/router';

import { getBaseLayoutComponent } from '../../../utils/base-layout';
import { getComponent } from '../../components-registry';
import GuideCard, { GuideEntry } from '../../blocks/guides/GuideCard';
import { kindLabels, labelFor, t, topicLabels, ui } from '../../blocks/guides/labels';

function normalize(value: string) {
    return value
        .toLocaleLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
}

function searchIndex(guide: GuideEntry, locale: string | undefined) {
    return normalize(
        [
            guide.title,
            guide.subtitle,
            guide.vendor,
            guide.tldr?.what,
            guide.tldr?.when,
            guide.tldr?.whenNot,
            labelFor(kindLabels, guide.kind, locale),
            ...(guide.topics ?? []).map((topic) => labelFor(topicLabels, topic, locale))
        ]
            .filter(Boolean)
            .join(' ')
    );
}

function Chip({
    active,
    children,
    onClick
}: {
    active: boolean;
    children: React.ReactNode;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            aria-pressed={active}
            className={`rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition duration-150 ${
                active
                    ? 'border-dark bg-dark text-light'
                    : 'border-dark/15 bg-transparent text-dark/60 hover:border-dark/40 hover:text-dark'
            }`}
        >
            {children}
        </button>
    );
}

export default function GuideHubLayout(props) {
    const { page, site } = props;
    const router = useRouter();
    const locale = router?.locale;
    const BaseLayout = getBaseLayoutComponent(page.baseLayout, site.baseLayout);
    const { enableAnnotations = true } = site;
    const { title, subtitle, intro, bottomSections = [] } = page;
    const guides: GuideEntry[] = page.guides ?? [];

    const [query, setQuery] = React.useState('');
    const [kind, setKind] = React.useState<string | null>(null);
    const [topic, setTopic] = React.useState<string | null>(null);

    const availableKinds = React.useMemo(
        () => Array.from(new Set(guides.map((guide) => guide.kind).filter(Boolean) as string[])),
        [guides]
    );
    const availableTopics = React.useMemo(
        () => Array.from(new Set(guides.flatMap((guide) => guide.topics ?? []))),
        [guides]
    );

    const filtered = React.useMemo(() => {
        const needle = normalize(query.trim());
        return guides.filter((guide) => {
            if (kind && guide.kind !== kind) return false;
            if (topic && !(guide.topics ?? []).includes(topic)) return false;
            if (needle && !searchIndex(guide, locale).includes(needle)) return false;
            return true;
        });
    }, [guides, kind, topic, query, locale]);

    const hasFilters = Boolean(query || kind || topic);
    const countLabel = `${filtered.length} ${filtered.length === 1 ? t(ui.entry, locale) : t(ui.entries, locale)}`;

    return (
        <BaseLayout page={page} site={site}>
            <main id="main" className="sb-layout sb-guide-hub-layout">
                <div className="mx-auto max-w-7xl px-4 pb-14 pt-16 sm:pt-24">
                    <header className="max-w-3xl">
                        <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-primary">
                            {locale === 'pt' ? 'Catálogo' : 'Catalog'}
                        </p>
                        <h1
                            className="mt-3 text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.045em]"
                            {...(enableAnnotations && { 'data-sb-field-path': 'title' })}
                        >
                            {title}
                        </h1>
                        {subtitle && (
                            <p
                                className="mt-6 max-w-2xl text-lg font-medium leading-snug text-dark/80 sm:text-xl lg:text-2xl"
                                {...(enableAnnotations && { 'data-sb-field-path': 'subtitle' })}
                            >
                                {subtitle}
                            </p>
                        )}
                        {intro && (
                            <p
                                className="mt-6 max-w-2xl text-base leading-relaxed text-dark/75 sm:text-lg"
                                {...(enableAnnotations && { 'data-sb-field-path': 'intro' })}
                            >
                                {intro}
                            </p>
                        )}
                    </header>
                </div>

                {/* O site alterna faixas brancas e #eef1fb entre seções; o catálogo é a faixa de cor. */}
                <div className="bg-neutral">
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16">
                    <section className="border-b border-dark/10 pb-5" aria-label={t(ui.search, locale)}>
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                            <div className="lg:w-80">
                                <label htmlFor="guide-search" className="sr-only">
                                    {t(ui.search, locale)}
                                </label>
                                <input
                                    id="guide-search"
                                    type="search"
                                    value={query}
                                    onChange={(event) => setQuery(event.target.value)}
                                    placeholder={t(ui.search, locale)}
                                    className="w-full rounded-xl border border-dark/15 bg-light px-4 py-2.5 text-sm placeholder-dark/40 transition focus:border-primary focus:outline-none"
                                />
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="mr-1 font-mono text-[11px] uppercase tracking-[0.14em] text-dark/40">
                                    {t(ui.filterKind, locale)}
                                </span>
                                {availableKinds.map((value) => (
                                    <Chip key={value} active={kind === value} onClick={() => setKind(kind === value ? null : value)}>
                                        {labelFor(kindLabels, value, locale)}
                                    </Chip>
                                ))}
                                <span className="ml-2 mr-1 font-mono text-[11px] uppercase tracking-[0.14em] text-dark/40">
                                    {t(ui.filterTopic, locale)}
                                </span>
                                {availableTopics.map((value) => (
                                    <Chip
                                        key={value}
                                        active={topic === value}
                                        onClick={() => setTopic(topic === value ? null : value)}
                                    >
                                        {labelFor(topicLabels, value, locale)}
                                    </Chip>
                                ))}
                            </div>
                        </div>
                        <div className="mt-4 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.14em] text-dark/50">
                            <span aria-live="polite">{countLabel}</span>
                            {hasFilters && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setQuery('');
                                        setKind(null);
                                        setTopic(null);
                                    }}
                                    className="text-primary underline underline-offset-4 hover:no-underline"
                                >
                                    {t(ui.clear, locale)}
                                </button>
                            )}
                        </div>
                    </section>

                    {filtered.length === 0 ? (
                        <p className="mt-16 max-w-md text-lg leading-relaxed text-dark/60">{t(ui.noResults, locale)}</p>
                    ) : (
                        <div className="mt-10 grid gap-6 md:grid-cols-2">
                            {filtered.map((guide, index) => (
                                <GuideCard key={guide.urlPath} guide={guide} locale={locale} index={index} />
                            ))}
                        </div>
                    )}
                    </div>
                </div>

                {bottomSections.length > 0 && (
                    <div {...(enableAnnotations && { 'data-sb-field-path': 'bottomSections' })}>
                        {bottomSections.map((section, index) => {
                            const Component = getComponent(section.__metadata.modelName);
                            if (!Component) {
                                throw new Error(`no component matching the page section's model name: ${section.__metadata.modelName}`);
                            }
                            return (
                                <Component
                                    key={index}
                                    {...section}
                                    enableAnnotations={enableAnnotations}
                                    {...(enableAnnotations && { 'data-sb-field-path': `bottomSections.${index}` })}
                                />
                            );
                        })}
                    </div>
                )}
            </main>
        </BaseLayout>
    );
}
