import * as React from 'react';
import { m } from 'framer-motion';
import { Figure, splitCells, splitList, useAccent } from './accent';

/**
 * Organograma de um sistema multiagente.
 * <OrgChart root="Orquestrador :: papel" nodes="Pesquisador :: busca, resume | Revisor :: valida" />
 * A partir da segunda célula, os itens separados por vírgula viram tarefas do nó.
 */
export default function OrgChart({
    root,
    nodes,
    title,
    caption,
    rootLabel = 'Orquestrador'
}: {
    root: string;
    nodes: string;
    title?: string;
    caption?: string;
    rootLabel?: string;
}) {
    const accent = useAccent();
    const [rootName, rootDetail] = splitCells(root);
    const children = splitList(nodes).map(splitCells);

    return (
        <Figure title={title} caption={caption}>
            <div className="rounded-2xl border border-dark/12 bg-neutral/25 p-5 sm:p-7">
                <m.div
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.3 }}
                    className="mx-auto max-w-sm rounded-xl border-2 bg-light px-4 py-3 text-center"
                    style={{ borderColor: accent }}
                >
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em]" style={{ color: accent }}>
                        {rootLabel}
                    </span>
                    <p className="mt-1 font-semibold leading-snug">{rootName}</p>
                    {rootDetail && <p className="mt-1 text-sm leading-snug text-dark/60">{rootDetail}</p>}
                </m.div>

                <div className="relative mt-6">
                    <m.span
                        aria-hidden="true"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.4, delay: 0.15 }}
                        className="absolute -top-6 left-[12.5%] right-[12.5%] hidden h-px origin-center bg-dark/20 sm:block"
                    />
                    <div className="grid gap-4 sm:grid-cols-3">
                        {children.map(([name, tasks], index) => (
                            <m.div
                                key={name}
                                initial={{ opacity: 0, y: 12 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.3, delay: 0.25 + index * 0.08 }}
                                className="relative rounded-xl border border-dark/12 bg-light p-4"
                            >
                                <span
                                    aria-hidden="true"
                                    className="absolute -top-6 left-1/2 hidden h-6 w-px bg-dark/20 sm:block"
                                />
                                <p className="font-semibold leading-snug">{name}</p>
                                {tasks && (
                                    <ul className="mt-2 space-y-1 text-sm text-dark/65">
                                        {tasks.split(',').map((task) => (
                                            <li key={task} className="flex gap-2 leading-snug">
                                                <span aria-hidden="true" style={{ color: accent }}>
                                                    ·
                                                </span>
                                                {task.trim()}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </m.div>
                        ))}
                    </div>
                </div>
            </div>
        </Figure>
    );
}
