import { useRef } from 'react';
import Head from 'next/head';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Left column: skills & tech (goes up)
const LEFT_WORDS = [
    'Python',
    'AI AGENTS',
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

// Right column: roles, projects, communities (goes down)
const RIGHT_WORDS = [
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

type Variant = 'solid' | 'accent' | 'outline';

const variants: Variant[] = ['solid', 'outline', 'accent', 'solid', 'outline'];

function wordStyle(i: number): React.CSSProperties {
    const v = variants[i % variants.length];
    if (v === 'accent') return { color: '#4db8ff', opacity: 0.35 };
    if (v === 'outline')
        return {
            color: 'transparent',
            opacity: 0.45,
            WebkitTextStroke: '1px rgba(255,255,255,0.6)'
        } as React.CSSProperties;
    return { color: 'white', opacity: 0.18 };
}

export default function RobotDemo() {
    const containerRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const bgVideoRef = useRef<HTMLVideoElement>(null);
    const leftTrackRef = useRef<HTMLDivElement>(null);
    const rightTrackRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const video = videoRef.current;
            const bg = bgVideoRef.current;
            const leftTrack = leftTrackRef.current;
            const rightTrack = rightTrackRef.current;
            if (!video || !leftTrack || !rightTrack) return;

            // Seamless loop: each track renders its list twice (see JSX).
            // Animate from 0 to -50% so the second half slides into the first's position.
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

            const buildTimeline = () => {
                const videoDur = video.duration || 3;
                const proxy = { t: 0 };
                const speedCtrl = { val: 1 };

                const tl = gsap.timeline({
                    defaults: { ease: 'none' },
                    scrollTrigger: {
                        trigger: '.robot-stage',
                        start: 'top top',
                        end: '+=3200',
                        scrub: 0.4,
                        pin: true,
                        pinType: 'fixed',
                        anticipatePin: 1
                    }
                });

                tl.to('.scroll-hint', { opacity: 0, duration: 0.05 }, 0);

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

                // Marquee speed boost on scroll
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

                tl.to('.hl-1', { opacity: 0, y: -40, duration: 0.15 }, 0.2);
                tl.fromTo('.hl-2', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.15 }, 0.35);
                tl.to('.hl-2', { opacity: 0, y: -40, duration: 0.15 }, 0.65);
                tl.fromTo(
                    '.hl-3',
                    { opacity: 0, y: 40, scale: 0.92 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.18 },
                    0.78
                );
            };

            if (video.readyState >= 1) buildTimeline();
            else video.addEventListener('loadedmetadata', buildTimeline, { once: true });
        },
        { scope: containerRef }
    );

    const renderTrack = (words: string[]) => (
        <div className="flex flex-col items-center gap-10 py-8">
            {[...words, ...words].map((w, i) => {
                const long = w.length >= 10;
                return (
                    <span
                        key={`${w}-${i}`}
                        className={`block text-center font-black uppercase leading-none tracking-tight ${
                            long ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-4xl md:text-5xl lg:text-6xl'
                        }`}
                        style={wordStyle(i)}
                    >
                        {w}
                    </span>
                );
            })}
        </div>
    );

    return (
        <>
            <Head>
                <title>Robot Demo — scroll-scrubbed hero</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <div ref={containerRef} className="bg-black text-white">
                <section className="robot-stage relative h-screen w-full overflow-hidden bg-black">
                    <video
                        ref={bgVideoRef}
                        src="/hero-robot/robot-cross-scrub.mp4"
                        muted
                        playsInline
                        preload="auto"
                        aria-hidden
                        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
                        style={{ filter: 'blur(40px) brightness(0.9) saturate(1.4)', transform: 'scale(1.15)' }}
                    />

                    <video
                        ref={videoRef}
                        src="/hero-robot/robot-cross-scrub.mp4"
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
                                'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.15) 70%, rgba(0,0,0,0.45) 100%)'
                        }}
                    />

                    {/* Lateral marquees — sit over the blurred backdrop */}
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
                        <div ref={leftTrackRef} className="will-change-transform">
                            {renderTrack(LEFT_WORDS)}
                        </div>
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
                        <div ref={rightTrackRef} className="will-change-transform">
                            {renderTrack(RIGHT_WORDS)}
                        </div>
                    </div>

                    <div className="pointer-events-none absolute inset-0 z-[200] flex items-center justify-center px-6 text-center">
                        <h1
                            className="hl-1 absolute text-5xl font-bold tracking-tight md:text-7xl"
                            style={{ textShadow: '0 2px 30px rgba(0,0,0,0.8)' }}
                        >
                            Olá, eu sou <span className="text-[#4db8ff]">Thiago.</span>
                        </h1>
                        <h2
                            className="hl-2 absolute text-4xl font-semibold opacity-0 md:text-6xl"
                            style={{ textShadow: '0 2px 30px rgba(0,0,0,0.8)' }}
                        >
                            Construo coisas com <span className="text-[#4db8ff]">IA.</span>
                        </h2>
                        <h3
                            className="hl-3 absolute text-4xl font-bold opacity-0 md:text-6xl"
                            style={{ textShadow: '0 2px 30px rgba(0,0,0,0.8)' }}
                        >
                            Bora <span className="text-[#4db8ff]">trampar?</span>
                        </h3>
                    </div>

                    <div className="scroll-hint absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] opacity-70">
                        scroll ↓
                    </div>
                </section>

                <section className="flex min-h-screen items-center justify-center px-6">
                    <div className="max-w-xl text-center">
                        <h2 className="mb-4 text-3xl font-semibold md:text-4xl">Aqui começa o resto do site.</h2>
                        <p className="opacity-70">
                            Esta é só uma página de teste do hero scroll-scrubbed. Role de volta pra cima pra ver a animação
                            reversa.
                        </p>
                    </div>
                </section>
            </div>
        </>
    );
}
