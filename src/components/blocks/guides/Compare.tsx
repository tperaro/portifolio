import * as React from 'react';
import { m } from 'framer-motion';
import { Figure, splitCells, splitList, useAccent } from './accent';

/**
 * Tabela comparativa.
 * <Compare columns="Claude Code | Cursor" rows="Interface :: Terminal :: IDE" highlight="1" />
 * A primeira célula de cada linha é o critério; as seguintes são as colunas.
 */
export default function Compare({
    columns,
    rows,
    title,
    caption,
    criteriaLabel = 'Critério',
    highlight
}: {
    columns: string;
    rows: string;
    title?: string;
    caption?: string;
    criteriaLabel?: string;
    highlight?: string;
}) {
    const accent = useAccent();
    const heads = splitList(columns);
    const body = splitList(rows).map(splitCells);
    const highlightIndex = highlight ? Number(highlight) : -1;

    return (
        <Figure title={title} caption={caption}>
            <m.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35 }}
                className="overflow-x-auto rounded-2xl border border-dark/12"
            >
                <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
                    <thead>
                        <tr className="bg-neutral/50">
                            <th scope="col" className="w-44 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em] text-dark/50">
                                {criteriaLabel}
                            </th>
                            {heads.map((head, index) => (
                                <th
                                    key={head}
                                    scope="col"
                                    className="px-4 py-3 font-semibold"
                                    style={index === highlightIndex ? { color: accent } : undefined}
                                >
                                    {head}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {body.map((cells) => {
                            const [criteria, ...values] = cells;
                            return (
                                <tr key={criteria} className="border-t border-dark/10 align-top">
                                    <th scope="row" className="px-4 py-3 font-medium text-dark/70">
                                        {criteria}
                                    </th>
                                    {values.map((value, index) => (
                                        <td
                                            key={index}
                                            className="px-4 py-3 leading-relaxed"
                                            style={index === highlightIndex ? { backgroundColor: `${accent}0d` } : undefined}
                                        >
                                            {value}
                                        </td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </m.div>
        </Figure>
    );
}
