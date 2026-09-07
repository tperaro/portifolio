import * as React from 'react';
import { slugify } from './slugify';

export type FaqItem = { question: string; answer: string };

export default function Faq({ items, title }: { items: FaqItem[]; title: string }) {
    if (!items?.length) return null;
    return (
        <section aria-labelledby="guide-faq" className="mt-16">
            <h2 id="guide-faq" className="text-2xl font-bold tracking-tight sm:text-3xl">
                {title}
            </h2>
            <div className="mt-6 divide-y divide-dark/10 border-y border-dark/10">
                {items.map((item) => (
                    <details key={slugify(item.question)} id={slugify(item.question)} className="group py-4">
                        <summary className="flex cursor-pointer list-none items-start gap-3 font-semibold leading-snug marker:hidden">
                            <span
                                aria-hidden="true"
                                className="mt-1 shrink-0 text-primary transition-transform duration-200 group-open:rotate-45"
                            >
                                +
                            </span>
                            {item.question}
                        </summary>
                        <p className="mt-3 pl-6 leading-relaxed text-dark/75">{item.answer}</p>
                    </details>
                ))}
            </div>
        </section>
    );
}
