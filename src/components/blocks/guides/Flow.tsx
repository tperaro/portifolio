import * as React from 'react';
import { m } from 'framer-motion';
import { Figure, reveal, splitCells, splitList, useAccent } from './accent';

/**
 * Fluxograma linear.
 * <Flow title="..." items="Passo :: detalhe | Passo :: detalhe" direction="row" />
 */
export default function Flow({
    items,
    title,
    caption,
    direction = 'row',
    numbered = 'true'
}: {
    items?: string;
    title?: string;
    caption?: string;
    direction?: 'row' | 'column';
    numbered?: string;
}) {
    const accent = useAccent();
    const steps = splitList(items).map(splitCells);
    // Mais de quatro caixas lado a lado espremem o texto a ponto de não se ler;
    // acima disso o fluxo vira vertical mesmo quando pedido em linha.
    const isRow = direction === 'row' && splitList(items).length <= 4;
    const showNumbers = numbered !== 'false';

    return (
        <Figure title={title} caption={caption}>
            <ol className={`flex gap-0 ${isRow ? 'flex-col md:flex-row md:items-stretch' : 'flex-col'}`}>
                {steps.map(([label, detail], index) => (
                    <React.Fragment key={label + index}>
                        {index > 0 && (
                            <li aria-hidden="true" className={`flex items-center justify-center ${isRow ? 'md:px-2' : ''}`}>
                                <m.span
                                    initial={{ opacity: 0, scale: 0.6 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, amount: 0.6 }}
                                    transition={{ duration: 0.25, delay: index * 0.07 }}
                                    className={`block ${isRow ? 'py-2 md:py-0' : 'py-2'}`}
                                    style={{ color: `${accent}80` }}
                                >
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className={isRow ? 'rotate-90 md:rotate-0' : 'rotate-90'}
                                    >
                                        <path d="M5 12h14M13 6l6 6-6 6" />
                                    </svg>
                                </m.span>
                            </li>
                        )}
                        <m.li
                            custom={index}
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={reveal}
                            className="flex-1 rounded-xl border border-dark/12 bg-light p-4"
                            style={{ borderTopColor: accent, borderTopWidth: 2 }}
                        >
                            {showNumbers && (
                                <span className="font-mono text-[11px] font-semibold tracking-[0.14em]" style={{ color: accent }}>
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                            )}
                            <p className="mt-1 font-semibold leading-snug">{label}</p>
                            {detail && <p className="mt-1.5 text-sm leading-relaxed text-dark/65">{detail}</p>}
                        </m.li>
                    </React.Fragment>
                ))}
            </ol>
        </Figure>
    );
}
