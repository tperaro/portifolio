import * as React from 'react';
import { m } from 'framer-motion';
import { Figure, splitCells, splitList, useAccent } from './accent';

/**
 * Barras horizontais animadas para mostrar uma curva ou uma queda.
 * <BarChart unit="%" max="100" items="8k tokens :: 95 | 128k tokens :: 61" />
 */
export default function BarChart({
    items,
    unit = '',
    max,
    title,
    caption,
    axisLabel
}: {
    items: string;
    unit?: string;
    max?: string;
    title?: string;
    caption?: string;
    axisLabel?: string;
}) {
    const accent = useAccent();
    const rows = splitList(items).map((row) => {
        const [label, value, note] = splitCells(row);
        return { label, value: Number(value), note };
    });
    const ceiling = max ? Number(max) : Math.max(...rows.map((row) => row.value));

    return (
        <Figure title={title} caption={caption}>
            <div className="rounded-2xl border border-dark/12 bg-light p-5 sm:p-6">
                {axisLabel && (
                    <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-dark/45">{axisLabel}</p>
                )}
                <ul className="space-y-4">
                    {rows.map((row, index) => (
                        <li key={row.label} className="grid grid-cols-[7.5rem_1fr_3rem] items-center gap-3">
                            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-dark/60">{row.label}</span>
                            <span className="h-3 overflow-hidden rounded-full bg-neutral">
                                <m.span
                                    className="block h-full rounded-full"
                                    style={{ backgroundColor: accent, opacity: 1 - index * 0.13 }}
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${Math.max(2, (row.value / ceiling) * 100)}%` }}
                                    viewport={{ once: true, amount: 0.4 }}
                                    transition={{ duration: 0.7, delay: index * 0.1, ease: 'easeOut' }}
                                />
                            </span>
                            <span className="text-right font-mono text-sm tabular-nums text-dark/70">
                                {row.value}
                                {unit}
                            </span>
                            {row.note && <span className="col-span-3 -mt-2 text-sm text-dark/55">{row.note}</span>}
                        </li>
                    ))}
                </ul>
            </div>
        </Figure>
    );
}
