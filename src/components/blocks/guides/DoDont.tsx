import * as React from 'react';
import { m } from 'framer-motion';
import { Figure, splitList } from './accent';

/** <DoDont do="a | b" dont="x | y" doLabel="Faça" dontLabel="Evite" /> */
export default function DoDont(props: {
    do?: string;
    dont?: string;
    doLabel?: string;
    dontLabel?: string;
    title?: string;
    caption?: string;
}) {
    const columns = [
        { label: props.doLabel || 'Faça', items: splitList(props.do), color: '#0f7b6c', mark: '✓' },
        { label: props.dontLabel || 'Evite', items: splitList(props.dont), color: '#b4441f', mark: '✕' }
    ];

    return (
        <Figure title={props.title} caption={props.caption}>
            <div className="grid gap-4 sm:grid-cols-2">
                {columns.map((column, index) => (
                    <m.div
                        key={column.label}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ duration: 0.3, delay: index * 0.08 }}
                        className="rounded-xl border p-5"
                        style={{ borderColor: `${column.color}33`, backgroundColor: `${column.color}08` }}
                    >
                        <p
                            className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em]"
                            style={{ color: column.color }}
                        >
                            {column.label}
                        </p>
                        <ul className="mt-3 space-y-2.5">
                            {column.items.map((item) => (
                                <li key={item} className="flex gap-2.5 text-sm leading-relaxed">
                                    <span aria-hidden="true" className="mt-px font-semibold" style={{ color: column.color }}>
                                        {column.mark}
                                    </span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </m.div>
                ))}
            </div>
        </Figure>
    );
}
