import * as React from 'react';
import { t, ui } from './labels';

export type Tldr = {
    what?: string;
    when?: string;
    whenNot?: string;
};

type Props = {
    tldr?: Tldr;
    locale?: string;
    variant?: 'card' | 'page';
};

const bands = [
    { key: 'what', label: ui.what, color: '#4f5fd5' },
    { key: 'when', label: ui.when, color: '#0f7b6c' },
    { key: 'whenNot', label: ui.whenNot, color: '#b4441f' }
] as const;

export default function TldrBands({ tldr, locale, variant = 'card' }: Props) {
    if (!tldr) return null;
    const isPage = variant === 'page';

    return (
        <dl className={isPage ? 'divide-y divide-dark/10 border-y border-dark/10' : 'divide-y divide-dark/10'}>
            {bands.map(({ key, label, color }) => {
                const value = tldr[key];
                if (!value) return null;
                return (
                    <div
                        key={key}
                        className={`grid gap-x-4 gap-y-1 sm:grid-cols-[7.5rem_1fr] ${isPage ? 'py-4' : 'py-3'}`}
                    >
                        <dt
                            className="flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em]"
                            style={{ color }}
                        >
                            <span aria-hidden="true" className="h-3 w-[3px] rounded-full" style={{ backgroundColor: color }} />
                            {t(label, locale)}
                        </dt>
                        <dd className={isPage ? 'text-base leading-relaxed sm:text-lg' : 'text-sm leading-relaxed'}>{value}</dd>
                    </div>
                );
            })}
        </dl>
    );
}
