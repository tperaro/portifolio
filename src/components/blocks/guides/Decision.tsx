import * as React from 'react';
import { m } from 'framer-motion';
import { Figure, splitCells, splitList } from './accent';

/**
 * Árvore de decisão de duas saídas.
 * <Decision question="..." yes="Rótulo :: consequência" no="Rótulo :: consequência" />
 */
export default function Decision({
    question,
    yes,
    no,
    yesLabel,
    noLabel,
    title,
    caption
}: {
    question: string;
    yes: string;
    no: string;
    yesLabel?: string;
    noLabel?: string;
    title?: string;
    caption?: string;
}) {
    const [yesHead, yesBody] = splitCells(yes);
    const [noHead, noBody] = splitCells(no);

    const branches = [
        { tag: yesLabel || 'Sim', head: yesHead, body: yesBody, color: '#0f7b6c' },
        { tag: noLabel || 'Não', head: noHead, body: noBody, color: '#b4441f' }
    ];

    return (
        <Figure title={title} caption={caption}>
            <div className="rounded-2xl border border-dark/12 bg-neutral/30 p-5 sm:p-6">
                <m.p
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.3 }}
                    className="mx-auto max-w-xl rounded-xl border border-dark/15 bg-light px-4 py-3 text-center font-semibold leading-snug"
                >
                    {question}
                </m.p>
                <div className="mx-auto my-3 hidden h-6 w-px bg-dark/15 sm:block" aria-hidden="true" />
                <div className="grid gap-4 sm:grid-cols-2">
                    {branches.map((branch, index) => (
                        <m.div
                            key={branch.tag}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.35 }}
                            transition={{ duration: 0.3, delay: 0.12 + index * 0.08 }}
                            className="rounded-xl border bg-light p-4"
                            style={{ borderColor: `${branch.color}40` }}
                        >
                            <span
                                className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em]"
                                style={{ color: branch.color }}
                            >
                                {branch.tag}
                            </span>
                            <p className="mt-1.5 font-semibold leading-snug">{branch.head}</p>
                            {branch.body && <p className="mt-1.5 text-sm leading-relaxed text-dark/65">{branch.body}</p>}
                        </m.div>
                    ))}
                </div>
            </div>
        </Figure>
    );
}
