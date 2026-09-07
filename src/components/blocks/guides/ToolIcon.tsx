import * as React from 'react';

/**
 * Glyphs are drawn here instead of shipping third-party logo files: brand assets
 * carry usage terms, and a monogram keeps the catalog visually consistent. A guide
 * can override this with `iconUrl` once an official asset is cleared for use.
 */
const glyphs: Record<string, React.ReactNode> = {
    terminal: (
        <>
            <path d="M6 8.5 9.5 12 6 15.5" />
            <path d="M12.5 16h5.5" />
        </>
    ),
    braces: (
        <>
            <path d="M10 5.5c-2 0-2.5 1-2.5 2.6 0 1.5-.3 2.6-1.8 2.9v.2c1.5.3 1.8 1.4 1.8 2.9 0 1.6.5 2.6 2.5 2.6" />
            <path d="M14 5.5c2 0 2.5 1 2.5 2.6 0 1.5.3 2.6 1.8 2.9v.2c-1.5.3-1.8 1.4-1.8 2.9 0 1.6-.5 2.6-2.5 2.6" />
        </>
    ),
    caret: (
        <>
            <path d="M7 4.5 17 11l-4.2 1.3L11 17 7 4.5Z" />
            <path d="M15 15.5 18.5 19" />
        </>
    ),
    liftoff: (
        <>
            <path d="M12 4.5v9" />
            <path d="M8.5 8 12 4.5 15.5 8" />
            <path d="M5.5 17.5h13" />
            <path d="M8 20.5h8" />
        </>
    ),
    decay: (
        <>
            <path d="M5 18V9" />
            <path d="M9.3 18v-5.5" />
            <path d="M13.6 18v-3" />
            <path d="M18 18v-1.2" />
        </>
    ),
    layers: (
        <>
            <path d="m12 4.5 7 3.5-7 3.5-7-3.5 7-3.5Z" />
            <path d="m5 13 7 3.5 7-3.5" />
        </>
    ),
    retrieval: (
        <>
            <circle cx="11" cy="10.5" r="4.5" />
            <path d="m14.5 14 4 4" />
            <path d="M9 10.5h4" />
        </>
    ),
    stack: (
        <>
            <ellipse cx="12" cy="6.5" rx="6.5" ry="2.5" />
            <path d="M5.5 6.5v5c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-5" />
            <path d="M5.5 11.5v5c0 1.4 2.9 2.5 6.5 2.5s6.5-1.1 6.5-2.5v-5" />
        </>
    ),
    agents: (
        <>
            <circle cx="12" cy="6" r="2.2" />
            <circle cx="6" cy="17" r="2.2" />
            <circle cx="18" cy="17" r="2.2" />
            <path d="M12 8.2v3.3M12 11.5 6.9 15M12 11.5 17.1 15" />
        </>
    )
};

function monogram(name: string) {
    const cleaned = name.replace(/[^\p{L}\p{N} ]/gu, ' ').trim();
    const words = cleaned.split(/\s+/).filter(Boolean);
    if (words.length >= 2) {
        return (words[0][0] + words[1][0]).toUpperCase();
    }
    return cleaned.slice(0, 2).toUpperCase();
}

export type ToolIconProps = {
    name: string;
    icon?: string;
    iconUrl?: string | { url?: string; altText?: string };
    accentColor?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
};

const sizes = {
    sm: 'h-9 w-9 text-[11px]',
    md: 'h-12 w-12 text-[13px]',
    lg: 'h-16 w-16 text-base'
};

const glyphSizes = { sm: 20, md: 26, lg: 34 };

export default function ToolIcon({ name, icon, iconUrl, accentColor = '#4f5fd5', size = 'md', className }: ToolIconProps) {
    const url = typeof iconUrl === 'string' ? iconUrl : iconUrl?.url;
    const glyph = icon ? glyphs[icon] : null;

    return (
        <span
            aria-hidden="true"
            className={`inline-flex shrink-0 items-center justify-center rounded-xl border ${sizes[size]} ${className ?? ''}`}
            style={{
                color: accentColor,
                borderColor: `${accentColor}33`,
                backgroundColor: `${accentColor}14`
            }}
        >
            {url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={url} alt="" className="h-2/3 w-2/3 object-contain" loading="lazy" />
            ) : glyph ? (
                <svg
                    width={glyphSizes[size]}
                    height={glyphSizes[size]}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {glyph}
                </svg>
            ) : (
                <span className="font-mono font-semibold tracking-tight">{monogram(name)}</span>
            )}
        </span>
    );
}
