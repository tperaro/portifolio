import * as React from 'react';

type Variant = 'solid' | 'accent' | 'outline';

interface HighlightPhrase {
    before?: string;
    highlight?: string;
    after?: string;
}

interface ScrollHeroSectionProps {
    videoUrl?: string;
    posterUrl?: string;
    leftWords?: string[];
    rightWords?: string[];
    phrases?: HighlightPhrase[];
    accentColor?: string;
    bgColor?: string;
    scrollHint?: string;
    elementId?: string;
}

const DEFAULT_LEFT: string[] = [
    'Python',
    'AI Agents',
    'LangGraph',
    'Java',
    'Infraestrutura',
    'Segurança',
    'Fullstack',
    'LLM',
    'FastAPI',
    'Postgres',
    'Docker'
];

const DEFAULT_RIGHT: string[] = [
    'Pesquisador',
    'Builder',
    'Fundador',
    'CLIVIA',
    'CEIA-UFG',
    'Go.IAs',
    'Magnatas',
    'Comunidade',
    'CNPq',
    'EMBRAPII',
    'UFG'
];

const DEFAULT_PHRASES: HighlightPhrase[] = [
    { before: 'Sou o Thiago,', highlight: 'bem-vindo ao meu portfólio.' },
    { before: 'Construo aplicações sólidas e seguras com', highlight: 'IA.' },
    { before: 'Conheça minhas experiências, skills e', highlight: 'me chame pra conversar!' }
];

const variantSequence: Variant[] = ['solid', 'outline', 'accent', 'solid', 'outline'];

function wordStyle(index: number, accent: string): React.CSSProperties {
    const variant = variantSequence[index % variantSequence.length];
    if (variant === 'accent') return { color: accent, opacity: 0.5 };
    if (variant === 'outline') {
        return {
            color: 'transparent',
            opacity: 0.45,
            WebkitTextStroke: '1px rgba(255,255,255,0.55)'
        } as React.CSSProperties;
    }
    return { color: 'white', opacity: 0.16 };
}

export default function ScrollHeroSection(props: ScrollHeroSectionProps) {
    const {
        posterUrl = '/hero-robot/robot-poster.webp',
        leftWords = DEFAULT_LEFT,
        rightWords = DEFAULT_RIGHT,
        phrases = DEFAULT_PHRASES,
        accentColor = '#667eea',
        bgColor = '#0e0a18',
        scrollHint = 'scroll ↓',
        elementId
    } = props;

    const renderTrack = (words: string[]) => (
        <div className="flex flex-col items-center gap-10 py-8">
            {words.map((word, index) => {
                const long = word.length >= 10;
                return (
                    <span
                        key={`${word}-${index}`}
                        className={`block text-center font-black uppercase leading-none tracking-tight ${
                            long ? 'text-2xl lg:text-4xl' : 'text-4xl lg:text-6xl'
                        }`}
                        style={wordStyle(index, accentColor)}
                    >
                        {word}
                    </span>
                );
            })}
        </div>
    );

    const renderPhrase = (phrase: HighlightPhrase, index: number) => {
        const sizeClass = index === 0
            ? 'text-2xl sm:text-3xl md:text-5xl lg:text-6xl'
            : 'text-lg sm:text-xl md:text-2xl lg:text-3xl';
        const weight = index === 0 || index === 2 ? 'font-bold' : 'font-semibold';
        return (
            <p
                key={index}
                className={`scroll-hero-lite-phrase text-center tracking-tight leading-tight ${sizeClass} ${weight}`}
                style={{
                    textShadow: '0 2px 30px rgba(0,0,0,0.85)',
                    animationDelay: `${120 + index * 100}ms`
                }}
            >
                {phrase.before && <span>{phrase.before} </span>}
                {phrase.highlight && <span style={{ color: accentColor }}>{phrase.highlight}</span>}
                {phrase.after && <span> {phrase.after}</span>}
            </p>
        );
    };

    return (
        <div id={elementId} className="text-white" style={{ backgroundColor: bgColor }}>
            <section
                className="relative flex min-h-[calc(100svh-5rem)] w-full overflow-hidden px-5 py-8 sm:min-h-[680px] sm:px-8 sm:py-10 md:min-h-screen"
                style={{ backgroundColor: bgColor }}
            >
                <img
                    src={posterUrl}
                    alt=""
                    aria-hidden
                    width={552}
                    height={672}
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                    style={{ filter: 'blur(40px) brightness(0.9) saturate(1.4)', transform: 'scale(1.15)' }}
                />

                <img
                    src={posterUrl}
                    alt=""
                    aria-hidden
                    width={552}
                    height={672}
                    fetchPriority="high"
                    className="pointer-events-none absolute left-1/2 top-1/2 hidden h-full w-[64%] max-w-[920px] -translate-x-1/2 -translate-y-1/2 object-cover shadow-2xl md:block"
                />

                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            'radial-gradient(ellipse at center, transparent 0%, rgba(14,10,24,0.28) 56%, rgba(14,10,24,0.82) 100%)'
                    }}
                />

                <div
                    aria-hidden
                    className="pointer-events-none absolute left-0 top-0 hidden h-full w-[24%] overflow-hidden md:block"
                    style={{
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
                    }}
                >
                    {renderTrack(leftWords)}
                </div>

                <div
                    aria-hidden
                    className="pointer-events-none absolute right-0 top-0 hidden h-full w-[24%] overflow-hidden md:block"
                    style={{
                        maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
                    }}
                >
                    {renderTrack(rightWords)}
                </div>

                <div className="relative z-20 mx-auto flex w-full max-w-xl flex-1 flex-col justify-end md:max-w-3xl md:justify-center">
                    <div className="mx-auto mb-7 aspect-[4/5] w-[68%] max-w-[300px] overflow-hidden rounded-3xl border border-white/15 shadow-2xl md:hidden">
                        <img
                            src={posterUrl}
                            alt=""
                            aria-hidden
                            width={552}
                            height={672}
                            fetchPriority="high"
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="flex flex-col gap-3 pb-12 text-center md:gap-5 md:rounded-3xl md:bg-[#0e0a18]/35 md:p-8 md:backdrop-blur-sm">
                        {phrases.map(renderPhrase)}
                    </div>
                </div>

                <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 flex-col items-center gap-2">
                    <span className="text-[10px] uppercase tracking-[0.4em] opacity-80" style={{ color: accentColor }}>
                        {scrollHint}
                    </span>
                    <span className="block h-6 w-6 opacity-90 motion-safe:animate-bounce" style={{ color: accentColor }}>
                        <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-full w-full"
                            aria-hidden="true"
                        >
                            <path d="M6 9l6 6 6-6" />
                        </svg>
                    </span>
                </div>
            </section>
        </div>
    );
}
