import { useCallback, useEffect, useRef, useState } from 'react';
import Head from 'next/head';

/* ============================================================================
 *  NOSSA HISTÓRIA — homenagem em formato "stories / Spotify Wrapped"
 *  URL: /nossa-historia/   (noindex — não aparece no Google)
 *
 *  COMO EDITAR:
 *  - Mexa só no array STORIES abaixo. Cada item é uma tela.
 *  - Tipos: 'cover' (capa), 'photo' (foto + legenda), 'stat' (número grande),
 *           'np' (tocando agora), 'final' (encerramento).
 *  - Fotos: coloque em public/nossa-historia/ (foto-1.jpg, foto-2.jpg, ...).
 *    Enquanto o arquivo não existe, aparece um placeholder bonito.
 *  - Música: public/nossa-historia/musica.mp3
 * ========================================================================== */

type Slide =
    | { type: 'cover'; kicker: string; big: string; sub: string; dur?: number }
    | { type: 'photo'; image?: string; eyebrow?: string; title: string; text: string; dur?: number }
    | { type: 'stat'; pre?: string; value: string; label: string; bg?: string; dur?: number }
    | { type: 'text'; kicker?: string; lines: string[]; bg?: string; dur?: number }
    | { type: 'np'; eyebrow: string; title: string; text: string; song: string; meta: string; dur?: number }
    | { type: 'final'; title: string; sub: string; dur?: number };

// 👉 EDITE AQUI. Legendas escritas a partir dos contextos reais — ajuste à vontade.
const STORIES: Slide[] = [
    { type: 'cover', kicker: 'um replay de nós dois', big: 'NOSSA\nHISTÓRIA', sub: 'toque para começar ▶' },

    { type: 'photo', image: '/nossa-historia/foto-1.jpg', eyebrow: 'onde começou', title: 'Onde os caminhos cruzaram', text: 'Você já me acompanhava de longe nos eventos de tech. O nosso “oi” de verdade veio no JoinCommunity — e dali não teve mais volta.' },

    { type: 'text', kicker: 'sem clipe', lines: ['O primeiro encontro', 'foi de bicicleta 🚲', '— não rendeu foto,', 'rendeu história.'], bg: 'c' },

    { type: 'photo', image: '/nossa-historia/foto-2.jpg', eyebrow: '2º encontro', title: 'A noite que tudo acendeu', text: 'Voltei de São Paulo depois de 15 dias só conversando com você. Cheguei e já te chamei pra ver o Natal. Mil luzes — e eu só olhando pra você.' },

    { type: 'stat', pre: 'a gente já colecionou', value: '365+', label: 'dias — e nenhum repetido', bg: 'b' },

    { type: 'photo', image: '/nossa-historia/foto-3.jpg', title: 'Nossa primeira viagem', text: 'Na chácara do João, onde você pescou pela primeira vez — e, de quebra, me fisgou de vez.' },
    { type: 'photo', image: '/nossa-historia/foto-4.jpg', title: 'A pescadora oficial', text: 'Olha o tamanho do troféu! Sorte de principiante? Que nada — talento. 🎣' },
    { type: 'photo', image: '/nossa-historia/foto-5.jpg', title: 'Coração mole', text: 'Bastou um gatinho perdido pra eu lembrar do tamanho do seu coração.' },

    { type: 'stat', pre: 'no meu coração você é', value: 'Top 1', label: 'disparada, todos os dias', bg: 'c' },

    { type: 'photo', image: '/nossa-historia/foto-6.jpg', title: 'A vida imita a arte', text: 'A gente posou igualzinho ao quadro atrás — de propósito, claro. Porque com você até a brincadeira vira arte.' },
    { type: 'photo', image: '/nossa-historia/foto-7.jpg', title: 'O hambúrguer era gigante', text: '…minha vontade de dividir tudo com você, maior ainda.' },
    { type: 'photo', image: '/nossa-historia/foto-8.jpg', title: 'Na galeria', text: 'No meio de tanta obra, a mais bonita ali era você.' },
    { type: 'photo', image: '/nossa-historia/foto-9.jpg', title: 'Minha parceira de bobeira', text: 'Óculos de natação no shopping? Só com você isso faz todo o sentido. 😂' },
    { type: 'photo', image: '/nossa-historia/foto-10.jpg', title: 'Do nosso jeito', text: 'Sem pose, sem filtro — só a gente, que é como eu amo.' },

    { type: 'np', eyebrow: 'a música mais tocada do ano', title: '“A nossa”', text: 'Aquela que toca e em 1 segundo eu penso em você.', song: 'Manchild', meta: 'Sabrina Carpenter', dur: 25000 },

    { type: 'photo', image: '/nossa-historia/foto-11.jpg', title: 'Perdendo o medo de avião', text: 'Sua primeira viagem pra fora do estado — e o medo de voar ficou pra trás, de mãos dadas comigo.' },
    { type: 'photo', image: '/nossa-historia/foto-12.jpg', title: 'Minha co-piloto', text: 'Capitã do avião e da minha vida. Pode decolar que eu vou junto, sempre.' },
    { type: 'photo', image: '/nossa-historia/foto-13.jpg', title: 'No topo de São Paulo', text: 'A cidade inteira lá embaixo e o meu mundo todo do meu lado. Oficialmente: o casal mais lindo do Brasil. 🏆' },
    { type: 'photo', image: '/nossa-historia/foto-14.jpg', title: 'Café da manhã', text: 'Tem manhã que eu só queria que o relógio parasse e a gente ficasse ali.' },
    { type: 'photo', image: '/nossa-historia/foto-15.jpg', title: 'A primeira vez no mar', text: 'Você conhecendo a praia — e eu do lado, só pra ver o seu encanto de perto.' },
    { type: 'photo', image: '/nossa-historia/foto-16.jpg', title: 'Parceira pra tudo', text: 'Canoa, remo, perrengue, risada — o que vier, a gente encara junto.' },

    { type: 'stat', pre: 'motivos pra te amar', value: '∞', label: 'e a lista só cresce', bg: 'a' },

    { type: 'photo', image: '/nossa-historia/foto-17.jpg', title: 'Hora dourada', text: 'A luz mais bonita do fim de tarde sempre escolhe cair em você.' },
    { type: 'photo', image: '/nossa-historia/foto-18.jpg', title: 'Pôr do sol', text: 'Já vi muitos. Nenhum se compara a assistir com você no meu ombro.' },
    { type: 'photo', image: '/nossa-historia/foto-19.jpg', title: 'Até o calor valeu', text: 'Picolé derretendo, a gente rindo — simples assim, do jeito que eu amo.' },

    { type: 'final', title: 'Feliz Dia dos\nNamorados,\nLudmila', sub: 'com todo o meu amor — hoje e sempre, seu Thiago' }
];

const DEFAULT_DUR: Record<Slide['type'], number> = {
    cover: 4000,
    photo: 5200,
    stat: 3600,
    text: 4400,
    np: 8000,
    final: 60000 // fica parado no final
};

// "A nossa música" (Manchild) começa nesse segundo quando entra a tela 'np'
const OUR_SONG_START = 44;

const BG: Record<string, string> = {
    a: 'radial-gradient(circle at 30% 20%, #ff4d8d, #7a1133 70%)',
    b: 'radial-gradient(circle at 70% 80%, #b5179e, #3a0ca3 75%)',
    c: 'linear-gradient(160deg, #ff758c, #ff7eb3 40%, #7a1133)',
    final: 'radial-gradient(circle at 50% 35%, #ff4d8d, #7a1133 70%)'
};

export default function NossaHistoria() {
    const [started, setStarted] = useState(false);
    const [muted, setMuted] = useState(false);
    const [index, setIndex] = useState(0);
    const [progress, setProgress] = useState(0); // 0..1 da tela atual
    const pausedRef = useRef(false);
    const audioRef = useRef<HTMLAudioElement>(null); // trilha de fundo
    const ourSongRef = useRef<HTMLAudioElement>(null); // "a nossa música" (toca só no slide 'np')

    const total = STORIES.length;

    const goNext = useCallback(() => setIndex((i) => Math.min(i + 1, total - 1)), [total]);
    const goPrev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);

    const start = useCallback(() => {
        setStarted(true);
        setIndex((i) => (i === 0 ? 1 : i)); // sai da capa
        // No gesto do usuário: toca o fundo e DESTRAVA a "nossa música"
        // (toca+pausa) pra ela poder tocar depois no mobile.
        const bg = audioRef.current;
        const our = ourSongRef.current;
        if (bg) {
            bg.volume = 0.85;
            bg.play().catch(() => {});
        }
        if (our) {
            our.volume = 0.85;
            const p = our.play();
            if (p) p.then(() => our.pause()).catch(() => {});
        }
    }, []);

    // autoplay + barra de progresso da tela atual
    useEffect(() => {
        if (!started) return;
        let raf = 0;
        let last = performance.now();
        let elapsed = 0;
        const dur = STORIES[index].dur ?? DEFAULT_DUR[STORIES[index].type];
        setProgress(0);
        const tick = (now: number) => {
            const dt = now - last;
            last = now;
            if (!pausedRef.current) elapsed += dt;
            const p = Math.min(1, elapsed / dur);
            setProgress(p);
            if (p >= 1) {
                if (index < total - 1) goNext();
                return;
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [index, started, goNext, total]);

    // troca de trilha: fundo no story todo, "a nossa música" só no slide 'np'
    useEffect(() => {
        if (!started) return;
        const bg = audioRef.current;
        const our = ourSongRef.current;
        const isNp = STORIES[index]?.type === 'np';
        if (isNp) {
            bg?.pause();
            if (our) {
                try {
                    our.currentTime = OUR_SONG_START;
                } catch {
                    /* metadata ainda não carregou; toca do início */
                }
                our.play().catch(() => {});
            }
        } else {
            our?.pause();
            bg?.play().catch(() => {});
        }
    }, [index, started]);

    // teclado
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (!started) {
                if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight') start();
                return;
            }
            if (e.key === 'ArrowRight') goNext();
            if (e.key === 'ArrowLeft') goPrev();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [started, start, goNext, goPrev]);

    const toggleMute = () => {
        const next = !muted;
        [audioRef.current, ourSongRef.current].forEach((el) => {
            if (el) el.muted = next;
        });
        setMuted(next);
    };

    // segurar para pausar
    const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const onHoldStart = () => {
        holdTimer.current = setTimeout(() => {
            pausedRef.current = true;
        }, 220);
    };
    const onHoldEnd = () => {
        if (holdTimer.current) clearTimeout(holdTimer.current);
        pausedRef.current = false;
    };

    const slide = STORIES[index];

    return (
        <>
            <Head>
                <title>♥</title>
                <meta name="robots" content="noindex,nofollow" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,600&family=Outfit:wght@300;400;600;800&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <main className="stage">
                <audio ref={audioRef} src="/nossa-historia/musica.mp3" loop preload="auto" />
                <audio ref={ourSongRef} src="/nossa-historia/musica-nossa.mp3" loop preload="auto" />

                <div className="phone" onMouseDown={onHoldStart} onMouseUp={onHoldEnd} onTouchStart={onHoldStart} onTouchEnd={onHoldEnd}>
                    {/* barras de progresso */}
                    {started && (
                        <div className="bars">
                            {STORIES.map((_, i) => (
                                <div className="bar" key={i}>
                                    <i style={{ width: i < index ? '100%' : i === index ? `${progress * 100}%` : '0%' }} />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* slides */}
                    {STORIES.map((s, i) => (
                        <SlideView key={i} slide={s} active={i === index} />
                    ))}

                    {/* capa: gate de início */}
                    {!started && (
                        <button className="startBtn" onClick={start} aria-label="Começar">
                            <span className="play">▶</span>
                        </button>
                    )}

                    {/* navegação */}
                    {started && (
                        <>
                            <div className="tap left" onClick={goPrev} />
                            <div className="tap right" onClick={goNext} />
                            <button className="mute" onClick={toggleMute} aria-label="Mudo">
                                {muted ? '🔇' : '🔊'}
                            </button>
                            <div className="hint">toque na direita → para avançar · segure para pausar</div>
                        </>
                    )}
                </div>
            </main>

            <style jsx global>{`
                html,
                body {
                    margin: 0;
                    padding: 0;
                    height: 100%;
                    background: #0a0205;
                    overflow: hidden;
                    font-family: 'Outfit', system-ui, sans-serif;
                    -webkit-tap-highlight-color: transparent;
                }
                * {
                    box-sizing: border-box;
                }
            `}</style>

            <style jsx>{`
                .stage {
                    position: fixed;
                    inset: 0;
                    display: grid;
                    place-items: center;
                    background: radial-gradient(circle at 50% 20%, #2a0a16, #0a0205 70%);
                }
                .phone {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    max-width: 430px;
                    max-height: 100vh;
                    overflow: hidden;
                    background: #000;
                    box-shadow: 0 0 80px rgba(255, 77, 141, 0.25);
                    user-select: none;
                }
                @media (min-width: 480px) {
                    .phone {
                        border-radius: 26px;
                        height: 92vh;
                    }
                }
                .bars {
                    position: absolute;
                    top: 14px;
                    left: 12px;
                    right: 12px;
                    display: flex;
                    gap: 5px;
                    z-index: 30;
                }
                .bar {
                    flex: 1;
                    height: 3px;
                    border-radius: 3px;
                    background: rgba(255, 255, 255, 0.28);
                    overflow: hidden;
                }
                .bar > :global(i) {
                    display: block;
                    height: 100%;
                    background: #fff;
                    border-radius: 3px;
                }
                .startBtn {
                    position: absolute;
                    inset: 0;
                    z-index: 40;
                    background: transparent;
                    border: 0;
                    cursor: pointer;
                    display: flex;
                    align-items: flex-end;
                    justify-content: center;
                    padding-bottom: 15vh;
                }
                .play {
                    width: 84px;
                    height: 84px;
                    border-radius: 999px;
                    display: grid;
                    place-items: center;
                    font-size: 30px;
                    color: #fff;
                    background: rgba(255, 77, 141, 0.25);
                    border: 1.5px solid rgba(255, 255, 255, 0.7);
                    backdrop-filter: blur(6px);
                    animation: pulse 1.8s ease-in-out infinite;
                }
                @keyframes pulse {
                    0%,
                    100% {
                        transform: scale(1);
                        box-shadow: 0 0 0 0 rgba(255, 77, 141, 0.5);
                    }
                    50% {
                        transform: scale(1.06);
                        box-shadow: 0 0 0 18px rgba(255, 77, 141, 0);
                    }
                }
                .tap {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 38%;
                    z-index: 20;
                    cursor: pointer;
                }
                .tap.left {
                    left: 0;
                }
                .tap.right {
                    right: 0;
                }
                .mute {
                    position: absolute;
                    top: 28px;
                    right: 14px;
                    z-index: 35;
                    background: rgba(0, 0, 0, 0.35);
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    border-radius: 999px;
                    width: 38px;
                    height: 38px;
                    font-size: 15px;
                    cursor: pointer;
                    backdrop-filter: blur(6px);
                }
                .hint {
                    position: absolute;
                    bottom: 10px;
                    left: 0;
                    right: 0;
                    text-align: center;
                    color: rgba(255, 255, 255, 0.35);
                    font-size: 11px;
                    z-index: 25;
                    letter-spacing: 0.08em;
                    pointer-events: none;
                }
            `}</style>
        </>
    );
}

/* ---- uma tela ---- */
function SlideView({ slide, active }: { slide: Slide; active: boolean }) {
    const [imgOk, setImgOk] = useState(true);

    const bgFor = (s: Slide) => {
        if (s.type === 'stat') return BG[s.bg ?? 'a'];
        if (s.type === 'text') return BG[s.bg ?? 'b'];
        if (s.type === 'np' || s.type === 'final') return BG.final;
        if (s.type === 'cover') return BG.a;
        return BG.b;
    };

    return (
        <div className={`slide ${active ? 'active' : ''}`} style={{ background: bgFor(slide) }}>
            {slide.type === 'photo' && (
                <>
                    {slide.image && imgOk ? (
                        <div className="photo" style={{ backgroundImage: `url(${slide.image})` }} />
                    ) : (
                        <div className="photo placeholder">
                            <span>📷 SUA FOTO</span>
                            <small>{slide.title}</small>
                        </div>
                    )}
                    {/* preload p/ detectar 404 e cair no placeholder */}
                    {slide.image && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={slide.image} alt="" style={{ display: 'none' }} onError={() => setImgOk(false)} onLoad={() => setImgOk(true)} />
                    )}
                    <div className="scrim" />
                    <div className="caption">
                        {slide.eyebrow && <div className="eyebrow">{slide.eyebrow}</div>}
                        <h2>{slide.title}</h2>
                        <p>{slide.text}</p>
                    </div>
                </>
            )}

            {slide.type === 'cover' && (
                <div className="center">
                    <div className="kicker">{slide.kicker}</div>
                    <div className="bigtitle grad">
                        {slide.big.split('\n').map((l, i) => (
                            <span key={i}>{l}</span>
                        ))}
                    </div>
                    <div className="sub">{slide.sub}</div>
                </div>
            )}

            {slide.type === 'stat' && (
                <div className="center">
                    {slide.pre && <div className="sub">{slide.pre}</div>}
                    <div className="num grad">{slide.value}</div>
                    <div className="label">{slide.label}</div>
                </div>
            )}

            {slide.type === 'text' && (
                <div className="center">
                    {slide.kicker && <div className="kicker">{slide.kicker}</div>}
                    {slide.lines.map((l, i) => (
                        <div key={i} className="textline">
                            {l}
                        </div>
                    ))}
                </div>
            )}

            {slide.type === 'np' && (
                <>
                    <Hearts />
                    <div className="caption" style={{ paddingBottom: 120 }}>
                        <div className="eyebrow">{slide.eyebrow}</div>
                        <h2>{slide.title}</h2>
                        <p>{slide.text}</p>
                    </div>
                    <div className="np">
                        <div className="cover">🎵</div>
                        <div className="meta">
                            <b>{slide.song}</b>
                            <span>{slide.meta}</span>
                        </div>
                        <div className="eq">
                            <i />
                            <i />
                            <i />
                            <i />
                        </div>
                    </div>
                </>
            )}

            {slide.type === 'final' && (
                <div className="center">
                    <Hearts />
                    <div className="heart">❤️</div>
                    <h1 className="finalTitle">
                        {slide.title.split('\n').map((l, i) => (
                            <span key={i}>
                                {l}
                                <br />
                            </span>
                        ))}
                    </h1>
                    <div className="sub" style={{ marginTop: 18 }}>
                        {slide.sub}
                    </div>
                </div>
            )}

            <style jsx>{`
                .slide {
                    position: absolute;
                    inset: 0;
                    opacity: 0;
                    visibility: hidden;
                    transition: opacity 0.5s ease;
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-end;
                    color: #fff;
                }
                .slide.active {
                    opacity: 1;
                    visibility: visible;
                }
                .photo {
                    position: absolute;
                    inset: 0;
                    background-size: cover;
                    background-position: center;
                    transform: scale(1.05);
                }
                .slide.active .photo {
                    animation: ken 6s ease-out forwards;
                }
                @keyframes ken {
                    from {
                        transform: scale(1.18) translateY(2%);
                    }
                    to {
                        transform: scale(1) translateY(0);
                    }
                }
                .placeholder {
                    display: grid;
                    place-items: center;
                    align-content: center;
                    color: rgba(255, 255, 255, 0.6);
                    font-weight: 600;
                    letter-spacing: 0.05em;
                    background: linear-gradient(135deg, #b5179e, #3a0ca3 75%);
                }
                .placeholder small {
                    display: block;
                    opacity: 0.6;
                    font-weight: 400;
                    margin-top: 6px;
                    text-align: center;
                }
                .scrim {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, rgba(10, 2, 5, 0.92) 8%, rgba(10, 2, 5, 0.15) 45%, rgba(10, 2, 5, 0.35) 100%);
                }
                .caption {
                    position: relative;
                    z-index: 5;
                    padding: 30px 26px 64px;
                }
                .eyebrow {
                    font-size: 13px;
                    letter-spacing: 0.32em;
                    text-transform: uppercase;
                    color: #ffb3c8;
                    font-weight: 600;
                }
                h2 {
                    font-family: 'Playfair Display', serif;
                    font-size: 34px;
                    line-height: 1.1;
                    margin: 10px 0 0;
                    font-weight: 800;
                }
                p {
                    margin: 12px 0 0;
                    font-size: 16px;
                    line-height: 1.5;
                    color: rgba(255, 255, 255, 0.86);
                    font-weight: 300;
                    max-width: 90%;
                }
                .slide.active .caption > :global(*) {
                    opacity: 0;
                    transform: translateY(16px);
                    animation: rise 0.7s cubic-bezier(0.2, 0.7, 0.2, 1) forwards;
                }
                .slide.active .caption > :global(*):nth-child(1) {
                    animation-delay: 0.25s;
                }
                .slide.active .caption > :global(*):nth-child(2) {
                    animation-delay: 0.4s;
                }
                .slide.active .caption > :global(*):nth-child(3) {
                    animation-delay: 0.55s;
                }
                @keyframes rise {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .center {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                    padding: 30px;
                }
                .slide.active .center > :global(*) {
                    opacity: 0;
                    transform: translateY(24px) scale(0.96);
                    animation: pop 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                }
                .slide.active .center > :global(*):nth-child(2) {
                    animation-delay: 0.18s;
                }
                .slide.active .center > :global(*):nth-child(3) {
                    animation-delay: 0.34s;
                }
                @keyframes pop {
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                .grad {
                    background: linear-gradient(135deg, #ff4d8d, #ffd166);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                }
                .kicker {
                    font-size: 13px;
                    letter-spacing: 0.32em;
                    text-transform: uppercase;
                    color: #ffb3c8;
                    font-weight: 600;
                }
                .bigtitle {
                    font-family: 'Playfair Display', serif;
                    font-weight: 800;
                    font-size: 52px;
                    line-height: 0.95;
                    margin: 14px 0;
                    display: flex;
                    flex-direction: column;
                }
                .num {
                    font-family: 'Playfair Display', serif;
                    font-weight: 800;
                    font-size: 96px;
                    line-height: 0.92;
                }
                .label {
                    font-size: 20px;
                    font-weight: 600;
                    margin-top: 14px;
                }
                .textline {
                    font-family: 'Playfair Display', serif;
                    font-size: 29px;
                    line-height: 1.25;
                    font-weight: 600;
                    margin: 5px 0;
                }
                .sub {
                    font-size: 15px;
                    color: rgba(255, 255, 255, 0.78);
                    font-weight: 300;
                    margin-top: 8px;
                }
                .np {
                    position: absolute;
                    left: 18px;
                    right: 18px;
                    bottom: 26px;
                    z-index: 6;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    background: rgba(0, 0, 0, 0.35);
                    backdrop-filter: blur(8px);
                    border: 1px solid rgba(255, 255, 255, 0.12);
                    padding: 10px 12px;
                    border-radius: 14px;
                }
                .np .cover {
                    width: 42px;
                    height: 42px;
                    border-radius: 8px;
                    background: linear-gradient(135deg, #1db954, #0a0205);
                    display: grid;
                    place-items: center;
                    font-size: 18px;
                    flex: none;
                }
                .np .meta {
                    overflow: hidden;
                }
                .np .meta b {
                    font-size: 14px;
                    display: block;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .np .meta span {
                    font-size: 12px;
                    color: rgba(255, 255, 255, 0.6);
                }
                .eq {
                    display: flex;
                    gap: 3px;
                    align-items: flex-end;
                    height: 18px;
                    margin-left: auto;
                }
                .eq :global(i) {
                    width: 3px;
                    background: #1db954;
                    border-radius: 2px;
                    animation: eq 1s ease-in-out infinite;
                }
                .eq :global(i):nth-child(2) {
                    animation-delay: 0.2s;
                }
                .eq :global(i):nth-child(3) {
                    animation-delay: 0.4s;
                }
                .eq :global(i):nth-child(4) {
                    animation-delay: 0.1s;
                }
                @keyframes eq {
                    0%,
                    100% {
                        height: 5px;
                    }
                    50% {
                        height: 18px;
                    }
                }
                .heart {
                    font-size: 60px;
                    animation: beat 1.1s ease-in-out infinite;
                }
                @keyframes beat {
                    0%,
                    100% {
                        transform: scale(1);
                    }
                    15% {
                        transform: scale(1.18);
                    }
                    30% {
                        transform: scale(1);
                    }
                    45% {
                        transform: scale(1.12);
                    }
                }
                .finalTitle {
                    font-family: 'Playfair Display', serif;
                    font-size: 40px;
                    font-weight: 800;
                    line-height: 1.05;
                    margin: 6px 0 0;
                }
            `}</style>
        </div>
    );
}

/* corações flutuantes */
function Hearts() {
    const items = ['❤️', '💕', '💗', '🤍'];
    return (
        <div className="hearts" aria-hidden>
            {Array.from({ length: 14 }).map((_, i) => (
                <span
                    key={i}
                    style={{
                        left: `${(i * 37) % 100}%`,
                        animationDelay: `${(i * 0.43) % 6}s`,
                        fontSize: `${12 + ((i * 7) % 22)}px`
                    }}
                >
                    {items[i % items.length]}
                </span>
            ))}
            <style jsx>{`
                .hearts {
                    position: absolute;
                    inset: 0;
                    pointer-events: none;
                    overflow: hidden;
                    z-index: 4;
                }
                .hearts span {
                    position: absolute;
                    bottom: -30px;
                    opacity: 0;
                    animation: float 6s linear infinite;
                }
                @keyframes float {
                    0% {
                        transform: translateY(0);
                        opacity: 0;
                    }
                    10% {
                        opacity: 0.8;
                    }
                    100% {
                        transform: translateY(-115vh);
                        opacity: 0;
                    }
                }
            `}</style>
        </div>
    );
}
