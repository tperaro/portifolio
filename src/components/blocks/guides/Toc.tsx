import * as React from 'react';
import { Heading } from './slugify';

export default function Toc({ headings, label }: { headings: Heading[]; label: string }) {
    if (headings.length < 3) return null;
    return (
        <nav aria-labelledby="guide-toc-title" className="rounded-2xl border border-dark/12 bg-neutral/25 p-5">
            <p id="guide-toc-title" className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-dark/45">
                {label}
            </p>
            <ol className="mt-3 space-y-2 text-sm">
                {headings.map((heading, index) => (
                    <li key={heading.slug} className="flex gap-3 leading-snug">
                        <span className="font-mono text-[11px] tabular-nums text-dark/30">
                            {String(index + 1).padStart(2, '0')}
                        </span>
                        <a href={`#${heading.slug}`} className="text-dark/70 underline-offset-4 hover:text-primary hover:underline">
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
