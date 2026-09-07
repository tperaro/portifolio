import * as React from 'react';
import { m } from 'framer-motion';
import Link from '../../atoms/Link';
import ToolIcon from './ToolIcon';
import TldrBands from './TldrBands';
import { kindLabels, labelFor, levelLabels, pricingLabels, t, ui } from './labels';

export type GuideEntry = {
    title: string;
    urlPath: string;
    subtitle?: string;
    kind?: string;
    topics?: string[];
    level?: string;
    pricing?: string;
    vendor?: string;
    readingTime?: number;
    updatedDate?: string;
    date?: string;
    icon?: string;
    iconUrl?: any;
    accentColor?: string;
    tldr?: { what?: string; when?: string; whenNot?: string };
};

function formatDate(value: string | undefined, locale: string | undefined) {
    if (!value) return null;
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return null;
    return new Intl.DateTimeFormat(locale === 'pt' ? 'pt-BR' : 'en-US', {
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC'
    }).format(parsed);
}

export default function GuideCard({ guide, locale, index = 0 }: { guide: GuideEntry; locale?: string; index?: number }) {
    const accent = guide.accentColor || '#4f5fd5';
    const updated = formatDate(guide.updatedDate || guide.date, locale);
    const specs = [
        labelFor(levelLabels, guide.level, locale),
        guide.pricing && guide.pricing !== 'na' ? labelFor(pricingLabels, guide.pricing, locale) : null,
        guide.readingTime ? `${guide.readingTime} ${t(ui.reading, locale)}` : null,
        updated ? `${t(ui.updated, locale)} ${updated}` : null
    ].filter(Boolean);

    return (
        <m.article
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.35, delay: Math.min(index, 5) * 0.05, ease: 'easeOut' }}
            /* Mesmo card do resto do site (ver FeaturedItem): borda, raio, sombra e
               o realce de topo no hover. Só a cor do realce muda por ferramenta. */
            className="sb-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-dark/10 bg-light shadow-[0_12px_35px_rgba(37,44,81,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(37,44,81,0.16)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
            <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[3px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ backgroundImage: `linear-gradient(to right, transparent, ${accent}, transparent)` }}
            />
            <div className="flex flex-1 flex-col gap-5 p-6 sm:p-7">
                <header className="flex items-start gap-4">
                    <ToolIcon
                        name={guide.title}
                        icon={guide.icon}
                        iconUrl={guide.iconUrl}
                        accentColor={accent}
                        size="md"
                    />
                    <div className="min-w-0">
                        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-dark/50">
                            {[labelFor(kindLabels, guide.kind, locale), guide.vendor].filter(Boolean).join(' · ')}
                        </p>
                        <h3 className="mt-1 text-xl font-bold leading-tight tracking-tight">
                            <Link
                                href={guide.urlPath}
                                className="after:absolute after:inset-0 after:content-[''] hover:text-primary"
                            >
                                {guide.title}
                            </Link>
                        </h3>
                        {guide.subtitle && <p className="mt-1 text-sm leading-snug text-dark/60">{guide.subtitle}</p>}
                    </div>
                </header>

                <TldrBands tldr={guide.tldr} locale={locale} variant="card" />

                <footer className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-dark/10 pt-4 font-mono text-[11px] uppercase tracking-[0.12em] text-dark/50">
                    {specs.map((spec, specIndex) => (
                        <React.Fragment key={spec as string}>
                            {specIndex > 0 && <span aria-hidden="true" className="text-dark/25">/</span>}
                            <span>{spec}</span>
                        </React.Fragment>
                    ))}
                    <span className="ml-auto inline-flex items-center gap-1 font-semibold text-dark/70 transition group-hover:text-primary">
                        {t(ui.readGuide, locale)}
                        <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-0.5">
                            →
                        </span>
                    </span>
                </footer>
            </div>
        </m.article>
    );
}
