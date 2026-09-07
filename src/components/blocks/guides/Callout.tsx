import * as React from 'react';

const tones = {
    note: { color: '#4f5fd5', label: 'Nota' },
    tip: { color: '#0f7b6c', label: 'Na prática' },
    warn: { color: '#b4441f', label: 'Cuidado' },
    answer: { color: '#202238', label: 'Resposta direta' }
};

export default function Callout({
    type = 'note',
    title,
    children
}: {
    type?: keyof typeof tones;
    title?: string;
    children?: React.ReactNode;
}) {
    const tone = tones[type] ?? tones.note;
    return (
        <aside
            className="not-prose my-8 rounded-xl border-l-[3px] bg-neutral/35 px-5 py-4"
            style={{ borderLeftColor: tone.color }}
        >
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: tone.color }}>
                {title || tone.label}
            </p>
            <div className="mt-2 leading-relaxed [&>*+*]:mt-3">{children}</div>
        </aside>
    );
}
