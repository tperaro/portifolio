import * as React from 'react';
import { splitList } from './accent';

/** <Terminal lines="npm install -g @anthropic-ai/claude-code | claude" caption="..." /> */
export default function Terminal({ lines, caption, title }: { lines: string; caption?: string; title?: string }) {
    const commands = splitList(lines);
    return (
        <figure className="not-prose my-8">
            {title && (
                <figcaption className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-dark/45">
                    {title}
                </figcaption>
            )}
            <pre className="overflow-x-auto rounded-xl border border-dark/15 bg-dark p-5 font-mono text-sm leading-relaxed text-light">
                <code>
                    {commands.map((command) => (
                        <span key={command} className="block">
                            <span className="select-none text-light/40">$ </span>
                            {command}
                        </span>
                    ))}
                </code>
            </pre>
            {caption && <figcaption className="mt-3 text-sm leading-snug text-dark/55">{caption}</figcaption>}
        </figure>
    );
}
