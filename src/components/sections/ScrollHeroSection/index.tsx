import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

type Variant = 'solid' | 'accent' | 'outline';
type DeviceMode = 'pending' | 'desktop' | 'lite';

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

function wordStyle(i: number, accent: string): React.CSSProperties {
    const v = variantSequence[i % variantSequence.length];
    if (v === 'accent') return { color: accent, opacity: 0.5 };
    if (v === 'outline')
        return {
            color: 'transparent',
            opacity: 0.45,
            WebkitTextStroke: '1px rgba(255,255,255,0.55)'
        } as React.CSSProperties;
    return { color: 'white', opacity: 0.16 };
}

export default function ScrollHeroSection(props: ScrollHeroSectionProps) {
    const {
        videoUrl = '/hero-robot/robot-cross-scrub.mp4',
        posterUrl = '/hero-robot/robot-poster.jpg',
        leftWords = DEFAULT_LEFT,
        rightWords = DEFAULT_RIGHT,
        phrases = DEFAULT_PHRASES,
        accentColor = '#667eea',
        bgColor = '#0e0a18',
        scrollHint = 'scroll ↓',
        elementId
    } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const bgVideoRef = useRef<HTMLVideoElement>(null);
    const leftTrackRef = useRef<HTMLDivElement>(null);
    const rightTrackRef = useRef<HTMLDivElement>(null);

    // Detect devices that can't smoothly scrub a <video> via ScrollTrigger:
    // mobile viewport, coarse/touch pointer, or prefers-reduced-motion.
    // Runs client-side after mount so SSR renders the neutral "pending" placeholder.
    const [mode, setMode] = useState<DeviceMode>('pending');
    useEffect(() => {
        const liteQuery = window.matchMedia(
            '(max-width: 767px), (hover: none) and (pointer: coarse), (prefers-reduced-motion: reduce)'
        );
        const apply = () => setMode(liteQuery.matches ? 'lite' : 'desktop');
        apply();
        liteQuery.addEventListener?.('change', apply);
        return () => liteQuery.removeEventListener?.('change', apply);
    }, []);

    useGSAP(
        () => {
            if (mode !== 'desktop') return;
            const video = videoRef.current;
            const bg = bgVideoRef.current;
            const leftTrack = leftTrackRef.current;
            const rightTrack = rightTrackRef.current;
            if (!video || !leftTrack || !rightTrack) return;

            const leftTween = gsap.to(leftTrack, {
                yPercent: -50,
                duration: 40,
                ease: 'none',
                repeat: -1
            });

            const rightTween = gsap.fromTo(
                rightTrack,
                { yPercent: -50 },
                {
                    yPercent: 0,
                    duration: 28,
                    ease: 'none',
                    repeat: -1
                }
            );

            gsap.to('.scroll-hero-arrow', {
                y: 8,
                duration: 0.9,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1
            });

            const buildTimeline = () => {
                const videoDur = video.duration || 3;
                const proxy = { t: 0 };
                const speedCtrl = { val: 1 };

                const tl = gsap.timeline({
                    defaults: { ease: 'none' },
                    scrollTrigger: {
                        trigger: '.scroll-hero-stage',
                        start: 'top top',
                        end: '+=3200',
                        scrub: 0.4,
                        pin: true,
                        pinType: 'fixed',
                        anticipatePin: 1
                    }
                });

                tl.to('.scroll-hero-hint', { opacity: 0, duration: 0.05 }, 0);

                tl.to(
                    proxy,
                    {
                        t: videoDur,
                        duration: 1,
                        onUpdate: () => {
                            if (Math.abs(video.currentTime - proxy.t) > 0.03) video.currentTime = proxy.t;
                            if (bg && Math.abs(bg.currentTime - proxy.t) > 0.03) bg.currentTime = proxy.t;
                        }
                    },
                    0
                );

                tl.to(
                    speedCtrl,
                    {
                        val: 3,
                        duration: 1,
                        onUpdate: () => {
                            leftTween.timeScale(speedCtrl.val);
                            rightTween.timeScale(speedCtrl.val);
                        }
                    },
                    0
                );

                tl.to('.scroll-hero-hl-1', { opacity: 0, y: -40, duration: 0.15 }, 0.2);
                tl.fromTo(
                    '.scroll-hero-hl-2',
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, duration: 0.15 },
                    0.35
                );
                tl.to('.scroll-hero-hl-2', { opacity: 0, y: -40, duration: 0.15 }, 0.65);
                tl.fromTo(
                    '.scroll-hero-hl-3',
                    { opacity: 0, y: 40, scale: 0.92 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.18 },
                    0.78
                );
            };

            if (video.readyState >= 1) buildTimeline();
            else video.addEventListener('loadedmetadata', buildTimeline, { once: true });
        },
        { scope: containerRef, dependencies: [mode] }
    );

    // Lite-mode animations: arrow bounce + phrase stagger in. No pin, no video scrub.
    useGSAP(
        () => {
            if (mode !== 'lite') return;

            gsap.to('.scroll-hero-arrow', {
                y: 8,
                duration: 0.9,
                ease: 'sine.inOut',
                yoyo: true,
                repeat: -1
            });

            gsap.from('.scroll-hero-lite-phrase', {
                opacity: 0,
                y: 24,
                stagger: 0.18,
                duration: 0.6,
                ease: 'power2.out',
                delay: 0.15
            });
        },
        { scope: containerRef, dependencies: [mode] }
    );

    const renderTrack = (words: string[], trackRef: React.RefObject<HTMLDivElement>) => (
        <div ref={trackRef} className="will-change-transform">
            <div className="flex flex-col items-center gap-10 py-8">
                {[...words, ...words].map((w, i) => {
                    const long = w.length >= 10;
                    return (
                        <span
                            key={`${w}-${i}`}
                            className={`block text-center font-black uppercase leading-none tracking-tight ${
                                long ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-4xl md:text-5xl lg:text-6xl'
                            }`}
                            style={wordStyle(i, accentColor)}
                        >
                            {w}
                        </span>
                    );
                })}
            </div>
        </div>
    );

    const renderPhrase = (phrase: HighlightPhrase, index: number) => {
        const sizeClass = index === 0 ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-2xl md:text-3xl lg:text-5xl';
        const weight = index === 0 || index === 2 ? 'font-bold' : 'font-semibold';
        const hlClass = `scroll-hero-hl-${index + 1}`;
        const initialHidden = index > 0 ? 'opacity-0' : '';
        return (
            <p
                key={index}
                className={`${hlClass} absolute text-center tracking-tight leading-tight ${sizeClass} ${weight} ${initialHidden}`}
                style={{ textShadow: '0 2px 30px rgba(0,0,0,0.8)' }}
            >
                {phrase.before && <span>{phrase.before} </span>}
                {phrase.highlight && (
                    <span style={{ color: accentColor }}>{phrase.highlight}</span>
                )}
                {phrase.after && <span> {phrase.after}</span>}
            </p>
        );
    };

    const renderLitePhrase = (phrase: HighlightPhrase, index: number) => {
        const sizeClass = index === 0 ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl';
        const weight = index === 0 || index === 2 ? 'font-bold' : 'font-semibold';
        return (
            <p
                key={index}
                className={`scroll-hero-lite-phrase text-center tracking-tight leading-tight ${sizeClass} ${weight}`}
                style={{ textShadow: '0 2px 30px rgba(0,0,0,0.8)' }}
            >
                {phrase.before && <span>{phrase.before} </span>}
                {phrase.highlight && (
                    <span style={{ color: accentColor }}>{phrase.highlight}</span>
                )}
                {phrase.after && <span> {phrase.after}</span>}
            </p>
        );
    };

    const renderScrollHint = () => (
        <div className="scroll-hero-hint absolute bottom-6 left-1/2 -translate-x-1/2 z-[190] flex flex-col items-center gap-2">
            <span
                className="text-[10px] uppercase tracking-[0.4em] opacity-80"
                style={{ color: accentColor }}
            >
                {scrollHint}
            </span>
            <span
                className="scroll-hero-arrow block h-6 w-6 opacity-90"
                style={{ color: accentColor }}
            >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
                    <path d="M6 9l6 6 6-6" />
                </svg>
            </span>
        </div>
    );

    // LITE: mobile / touch / reduced-motion — static poster, stacked phrases, no pin, no scrub.
    if (mode === 'lite') {
        return (
            <div
                ref={containerRef}
                id={elementId}
                className="text-white"
                style={{ backgroundColor: bgColor }}
            >
                <section
                    className="scroll-hero-stage-lite relative min-h-screen w-full overflow-hidden flex flex-col"
                    style={{ backgroundColor: bgColor }}
                >
                    <img
                        src={posterUrl}
                        alt=""
                        aria-hidden
                        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                        style={{ filter: 'blur(40px) brightness(0.9) saturate(1.4)', transform: 'scale(1.15)' }}
                    />
                    <img
                        src={posterUrl}
                        alt=""
                        aria-hidden
                        className="absolute left-1/2 top-[44%] w-[72%] max-w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-2xl object-contain shadow-2xl"
                    />
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0"
                        style={{
                            background:
                                'radial-gradient(ellipse at center, transparent 0%, rgba(14,10,24,0.25) 55%, rgba(14,10,24,0.75) 100%)'
                        }}
                    />
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-x-0 bottom-0 h-56 z-[180]"
                        style={{
                            background: `linear-gradient(to bottom, transparent 0%, ${bgColor} 85%)`
                        }}
                    />
                    <div className="relative z-[200] mt-auto flex flex-col gap-4 px-6 pb-28 pt-10 text-center">
                        {phrases.map(renderLitePhrase)}
                    </div>
                    {renderScrollHint()}
                </section>
            </div>
        );
    }

    // PENDING: SSR / pre-hydration placeholder. Poster-only, no videos, no animation.
    // Avoids a flash of heavy video on touch devices before we know the mode.
    if (mode === 'pending') {
        return (
            <div
                ref={containerRef}
                id={elementId}
                className="text-white"
                style={{ backgroundColor: bgColor }}
            >
                <section
                    className="relative h-screen w-full overflow-hidden"
                    style={{ backgroundColor: bgColor }}
                >
                    <img
                        src={posterUrl}
                        alt=""
                        aria-hidden
                        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                        style={{ filter: 'blur(40px) brightness(0.9) saturate(1.4)', transform: 'scale(1.15)' }}
                    />
                    <img
                        src={posterUrl}
                        alt=""
                        aria-hidden
                        className="absolute left-1/2 top-1/2 h-full w-auto max-w-none -translate-x-1/2 -translate-y-1/2"
                    />
                </section>
            </div>
        );
    }

    // DESKTOP: full experience — pinned, scrubbed video, marquees, phrase fades.
    return (
        <div
            ref={containerRef}
            id={elementId}
            className="text-white"
            style={{ backgroundColor: bgColor }}
        >
            <section
                className="scroll-hero-stage relative h-screen w-full overflow-hidden"
                style={{ backgroundColor: bgColor }}
            >
                <video
                    ref={bgVideoRef}
                    src={videoUrl}
                    poster={posterUrl}
                    muted
                    playsInline
                    preload="auto"
                    aria-hidden
                    className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                    style={{ filter: 'blur(40px) brightness(0.9) saturate(1.4)', transform: 'scale(1.15)' }}
                />

                <video
                    ref={videoRef}
                    src={videoUrl}
                    poster={posterUrl}
                    muted
                    playsInline
                    preload="auto"
                    className="absolute left-1/2 top-1/2 h-full w-auto max-w-none -translate-x-1/2 -translate-y-1/2"
                />

                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background:
                            'radial-gradient(ellipse at center, transparent 0%, rgba(14,10,24,0.15) 70%, rgba(14,10,24,0.55) 100%)'
                    }}
                />

                <div
                    aria-hidden
                    className="pointer-events-none absolute left-0 top-0 hidden h-full w-[24%] overflow-hidden md:block"
                    style={{
                        maskImage:
                            'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                        WebkitMaskImage:
                            'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
                    }}
                >
                    {renderTrack(leftWords, leftTrackRef)}
                </div>

                <div
                    aria-hidden
                    className="pointer-events-none absolute right-0 top-0 hidden h-full w-[24%] overflow-hidden md:block"
                    style={{
                        maskImage:
                            'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
                        WebkitMaskImage:
                            'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
                    }}
                >
                    {renderTrack(rightWords, rightTrackRef)}
                </div>

                <div className="pointer-events-none absolute inset-y-0 left-0 right-0 md:left-[26%] md:right-[26%] z-[200] flex items-center justify-center px-4 text-center">
                    {phrases.map(renderPhrase)}
                </div>

                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-32 z-[180]"
                    style={{
                        background: `linear-gradient(to bottom, transparent 0%, ${bgColor} 85%)`
                    }}
                />

                {renderScrollHint()}
            </section>
        </div>
    );
}
