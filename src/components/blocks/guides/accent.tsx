import * as React from 'react';

export const GuideAccentContext = React.createContext('#4f5fd5');

export function useAccent() {
    return React.useContext(GuideAccentContext);
}

/** Parses "a | b | c" into ['a', 'b', 'c']. */
export function splitList(value?: string) {
    if (!value) return [];
    return value
        .split('|')
        .map((item) => item.trim())
        .filter(Boolean);
}

/** Parses "label :: detail :: detail" into ['label', 'detail', 'detail']. */
export function splitCells(value: string) {
    return value
        .split('::')
        .map((cell) => cell.trim())
        .filter((cell, index, all) => cell.length > 0 || index < all.length - 1);
}

export const reveal = {
    hidden: { opacity: 0, y: 10 },
    show: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.32, delay: index * 0.07, ease: 'easeOut' as const }
    })
};

export function Figure({
    title,
    caption,
    children
}: {
    title?: string;
    caption?: string;
    children: React.ReactNode;
}) {
    return (
        <figure className="not-prose my-10">
            {title && (
                <figcaption className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-dark/45">
                    {title}
                </figcaption>
            )}
            {children}
            {caption && <figcaption className="mt-3 text-sm leading-snug text-dark/55">{caption}</figcaption>}
        </figure>
    );
}
