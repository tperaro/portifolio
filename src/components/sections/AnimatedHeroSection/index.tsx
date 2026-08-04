import React from 'react';
import classNames from 'classnames';

import { mapStylesToClassNames as mapStyles } from '@/utils/map-styles-to-class-names';
import Action from '../../atoms/Action';
import ImageBlock from '../../blocks/ImageBlock';

interface AnimatedHeroSectionProps {
    title: string;
    subtitle?: string;
    text?: string;
    actions?: Array<{
        label: string;
        url: string;
        type: 'primary' | 'secondary';
        [key: string]: any;
    }>;
    media?: {
        url: string;
        altText: string;
        type?: 'image' | 'video';
        [key: string]: any;
    };
    backgroundAnimation?: 'gradient' | 'particles' | 'none';
    typingEffect?: boolean;
    typingSpeed?: number;
    preset?: 'subtle' | 'moderate' | 'dramatic';
    className?: string;
    'data-sb-field-path'?: string;
    elementId?: string;
    colors?: string;
    styles?: any;
}

function NoiseOverlay() {
    return (
        <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-[1] opacity-[0.025]"
            style={{
                backgroundImage:
                    'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")'
            }}
        />
    );
}

export default function AnimatedHeroSection(props: AnimatedHeroSectionProps): React.JSX.Element {
    const {
        title,
        subtitle,
        text,
        actions = [],
        media,
        backgroundAnimation = 'gradient',
        className,
        elementId,
        colors = 'bg-light-fg-dark',
        styles = {},
        'data-sb-field-path': fieldPath
    } = props;

    const hasMedia = Boolean(media?.url);
    const showAmbientBackground = backgroundAnimation !== 'none';

    return (
        <section
            id={elementId}
            className={classNames(
                'relative overflow-hidden',
                colors,
                className,
                styles?.self?.padding ? mapStyles({ padding: styles.self.padding }) : 'px-4 py-12 sm:py-16 lg:py-20'
            )}
            data-sb-field-path={fieldPath}
        >
            {showAmbientBackground && (
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
                    <div className="absolute -left-32 -top-36 h-80 w-80 rounded-full bg-primary/20 blur-3xl" />
                    <div className="absolute -bottom-44 right-[-5%] h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl" />
                    <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.82),rgba(238,241,251,0.5))]" />
                </div>
            )}
            <NoiseOverlay />

            <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.85fr)] lg:gap-16">
                <div className={classNames('max-w-3xl', { 'mx-auto text-center': !hasMedia })}>
                    <h1
                        className="text-[clamp(2.5rem,7vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.045em]"
                        {...(fieldPath && { 'data-sb-field-path': '.title' })}
                    >
                        {title}
                    </h1>

                    {subtitle && (
                        <p
                            className="mt-6 max-w-2xl text-lg font-medium leading-snug text-dark/80 sm:text-xl lg:text-2xl"
                            {...(fieldPath && { 'data-sb-field-path': '.subtitle' })}
                        >
                            {subtitle}
                        </p>
                    )}

                    {text && (
                        <p
                            className="mt-6 max-w-2xl text-base leading-relaxed text-dark/75 sm:text-lg"
                            {...(fieldPath && { 'data-sb-field-path': '.text' })}
                        >
                            {text}
                        </p>
                    )}

                    {actions.length > 0 && (
                        <div
                            className={classNames('mt-8 flex flex-wrap gap-3', hasMedia ? 'justify-start' : 'justify-center')}
                            {...(fieldPath && { 'data-sb-field-path': '.actions' })}
                        >
                            {actions.map((action, index) => (
                                <Action
                                    key={index}
                                    {...action}
                                    {...(fieldPath && { 'data-sb-field-path': `.${index}` })}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {hasMedia && (
                    <div
                        className="relative mx-auto aspect-[4/3] w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/70 bg-white/55 p-2 shadow-[0_24px_70px_rgba(33,42,86,0.2)] sm:p-3 lg:aspect-[5/4]"
                        {...(fieldPath && { 'data-sb-field-path': '.media' })}
                    >
                        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-primary/15" />
                        {media?.type === 'video' ? (
                            <video
                                src={media.url}
                                muted
                                playsInline
                                preload="metadata"
                                className="relative h-full w-full rounded-[1.4rem] object-cover"
                                aria-label={media.altText}
                            />
                        ) : (
                            <ImageBlock
                                {...media}
                                className="relative h-full w-full overflow-hidden rounded-[1.4rem]"
                                imageClassName="h-full w-full object-cover"
                                loading="eager"
                                fetchPriority="high"
                            />
                        )}
                    </div>
                )}
            </div>
        </section>
    );
}
