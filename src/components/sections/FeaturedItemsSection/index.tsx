import * as React from 'react';
import { useRef } from 'react';
import classNames from 'classnames';
import { m, cubicBezier } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { getComponent } from '../../components-registry';
import { getDataAttrs } from '../../../utils/get-data-attrs';
import Section from '../Section';
import { Action, Badge } from '../../atoms';
import TitleBlock from '../../blocks/TitleBlock';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Container variant: triggers stagger on children
const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08
        }
    }
};

// Child item variant: each card fades + slides up
const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: cubicBezier(0.4, 0, 0.2, 1) }
    }
};

export default function FeaturedItemsSection(props) {
    const { elementId, colors, backgroundImage, badge, title, subtitle, items = [], actions = [], variant, styles = {}, enableAnnotations } = props;
    return (
        <Section
            elementId={elementId}
            className="sb-component-featured-items-section"
            colors={colors}
            backgroundImage={backgroundImage}
            styles={styles?.self}
            {...getDataAttrs(props)}
        >
            <div className={classNames('w-full', 'flex', 'flex-col', mapStyles({ alignItems: styles?.self?.justifyContent ?? 'flex-start' }))}>
                {badge && <Badge {...badge} className="w-full max-w-sectionBody" {...(enableAnnotations && { 'data-sb-field-path': '.badge' })} />}
                {title && (
                    <TitleBlock
                        {...title}
                        className={classNames('w-full', 'max-w-sectionBody', { 'mt-4': badge?.label })}
                        {...(enableAnnotations && { 'data-sb-field-path': '.title' })}
                    />
                )}
                {subtitle && (
                    <p
                        className={classNames(
                            'w-full',
                            'max-w-sectionBody',
                            'text-lg',
                            'sm:text-2xl',
                            styles?.subtitle ? mapStyles(styles?.subtitle) : undefined,
                            {
                                'mt-4': badge?.label || title?.text
                            }
                        )}
                        {...(enableAnnotations && { 'data-sb-field-path': '.subtitle' })}
                    >
                        {subtitle}
                    </p>
                )}
                <FeaturedItemVariants
                    variant={variant}
                    items={items}
                    hasTopMargin={!!(badge?.label || title?.text || subtitle)}
                    hasSectionTitle={!!title?.text}
                    hasAnnotations={enableAnnotations}
                />
                {actions.length > 0 && (
                    <div
                        className={classNames('flex', 'flex-wrap', 'items-center', 'gap-4', {
                            'mt-12': badge?.label || title?.text || subtitle || items.length > 0
                        })}
                        {...(enableAnnotations && { 'data-sb-field-path': '.actions' })}
                    >
                        {actions.map((action, index) => (
                            <Action
                                key={index}
                                {...action}
                                className="lg:whitespace-nowrap"
                                {...(enableAnnotations && { 'data-sb-field-path': `.${index}` })}
                            />
                        ))}
                    </div>
                )}
            </div>
        </Section>
    );
}

function FeaturedItemVariants(props) {
    const { variant = 'three-col-grid', ...rest } = props;
    switch (variant) {
        case 'two-col-grid':
            return <FeaturedItemsTwoColGrid {...rest} />;
        case 'small-list':
            return <FeaturedItemsSmallList {...rest} />;
        case 'big-list':
            return <FeaturedItemsBigList {...rest} />;
        case 'toggle-list':
            return <FeaturedItemsToggleList {...rest} />;
        case 'timeline':
            return <FeaturedItemsTimeline {...rest} />;
        default:
            return <FeaturedItemsThreeColGrid {...rest} />;
    }
}

function FeaturedItemsTimeline(props) {
    const { items = [], hasTopMargin, hasSectionTitle, hasAnnotations } = props;
    const scopeRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const scope = scopeRef.current;
            if (!scope) return;

            const lineFill = scope.querySelector<HTMLDivElement>('.timeline-line-fill');
            if (lineFill) {
                gsap.fromTo(
                    lineFill,
                    { scaleY: 0 },
                    {
                        scaleY: 1,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: scope,
                            start: 'top 75%',
                            end: 'bottom 60%',
                            scrub: 0.6
                        }
                    }
                );
            }

            const dots = scope.querySelectorAll<HTMLSpanElement>('.timeline-dot');
            dots.forEach((dot) => {
                gsap.fromTo(
                    dot,
                    { scale: 0.5, opacity: 0.5 },
                    {
                        scale: 1,
                        opacity: 1,
                        duration: 0.5,
                        ease: 'back.out(2.2)',
                        scrollTrigger: {
                            trigger: dot,
                            start: 'top 80%',
                            toggleActions: 'play none none reverse'
                        }
                    }
                );
            });
        },
        { scope: scopeRef }
    );

    if (items.length === 0) {
        return null;
    }
    const FeaturedItem = getComponent('FeaturedItem');
    return (
        <m.div
            ref={scopeRef}
            className={classNames('w-full', 'max-w-3xl', 'relative', 'pl-10', 'md:pl-14', { 'mt-12': hasTopMargin })}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
            {...(hasAnnotations && { 'data-sb-field-path': '.items' })}
        >
            <div
                aria-hidden
                className="pointer-events-none absolute left-3 top-2 bottom-2 w-px md:left-5"
                style={{ background: 'rgba(102,126,234,0.18)' }}
            />
            <div
                aria-hidden
                className="timeline-line-fill pointer-events-none absolute left-3 top-2 bottom-2 w-[2px] origin-top md:left-[19px]"
                style={{
                    background: 'linear-gradient(to bottom, #667eea 0%, #8aa5ee 100%)',
                    boxShadow: '0 0 8px rgba(102,126,234,0.55)'
                }}
            />
            {items.map((item, index) => (
                <m.div
                    key={index}
                    variants={itemVariants}
                    className={classNames('relative', index === 0 ? '' : 'mt-8')}
                >
                    <span
                        aria-hidden
                        className="timeline-dot absolute left-[-28px] top-6 h-3 w-3 rounded-full md:left-[-37px]"
                        style={{
                            background: '#ffffff',
                            boxShadow: '0 0 0 2px #667eea, 0 0 0 6px rgba(102,126,234,0.22)'
                        }}
                    />
                    <FeaturedItem
                        {...item}
                        hasSectionTitle={hasSectionTitle}
                        {...(hasAnnotations && { 'data-sb-field-path': `.${index}` })}
                    />
                </m.div>
            ))}
        </m.div>
    );
}

function FeaturedItemsThreeColGrid(props) {
    const { items = [], hasTopMargin, hasSectionTitle, hasAnnotations } = props;
    if (items.length === 0) {
        return null;
    }
    const FeaturedItem = getComponent('FeaturedItem');
    return (
        <m.div
            className={classNames(
                'w-full',
                'grid',
                'gap-10',
                'sm:grid-cols-2',
                'lg:grid-cols-3',
                'items-stretch',
                'auto-rows-fr',
                { 'mt-12': hasTopMargin }
            )}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
            {...(hasAnnotations && { 'data-sb-field-path': '.items' })}
        >
            {items.map((item, index) => (
                <m.div key={index} variants={itemVariants} className="h-full">
                    <FeaturedItem {...item} hasSectionTitle={hasSectionTitle} {...(hasAnnotations && { 'data-sb-field-path': `.${index}` })} />
                </m.div>
            ))}
        </m.div>
    );
}

function FeaturedItemsTwoColGrid(props) {
    const { items = [], hasTopMargin, hasSectionTitle, hasAnnotations } = props;
    if (items.length === 0) {
        return null;
    }
    const FeaturedItem = getComponent('FeaturedItem');
    return (
        <m.div
            className={classNames(
                'w-full',
                'grid',
                'gap-10',
                'sm:grid-cols-2',
                'items-stretch',
                'auto-rows-fr',
                { 'mt-12': hasTopMargin }
            )}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
            {...(hasAnnotations && { 'data-sb-field-path': '.items' })}
        >
            {items.map((item, index) => (
                <m.div key={index} variants={itemVariants}>
                    <FeaturedItem {...item} hasSectionTitle={hasSectionTitle} {...(hasAnnotations && { 'data-sb-field-path': `.${index}` })} />
                </m.div>
            ))}
        </m.div>
    );
}

function FeaturedItemsSmallList(props) {
    const { items = [], hasTopMargin, hasSectionTitle, hasAnnotations } = props;
    if (items.length === 0) {
        return null;
    }
    const FeaturedItem = getComponent('FeaturedItem');
    return (
        <m.div
            className={classNames('w-full', 'max-w-3xl', 'grid', 'gap-10', { 'mt-12': hasTopMargin })}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
            {...(hasAnnotations && { 'data-sb-field-path': '.items' })}
        >
            {items.map((item, index) => (
                <m.div key={index} variants={itemVariants}>
                    <FeaturedItem {...item} hasSectionTitle={hasSectionTitle} {...(hasAnnotations && { 'data-sb-field-path': `.${index}` })} />
                </m.div>
            ))}
        </m.div>
    );
}

function FeaturedItemsBigList(props) {
    const { items = [], hasTopMargin, hasSectionTitle, hasAnnotations } = props;
    if (items.length === 0) {
        return null;
    }
    const FeaturedItem = getComponent('FeaturedItem');
    return (
        <m.div
            className={classNames('w-full', 'grid', 'gap-10', { 'mt-12': hasTopMargin })}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0 }}
            {...(hasAnnotations && { 'data-sb-field-path': '.items' })}
        >
            {items.map((item, index) => (
                <m.div key={index} variants={itemVariants}>
                    <FeaturedItem {...item} hasSectionTitle={hasSectionTitle} {...(hasAnnotations && { 'data-sb-field-path': `.${index}` })} />
                </m.div>
            ))}
        </m.div>
    );
}

function FeaturedItemsToggleList(props) {
    const { items = [], hasTopMargin, hasSectionTitle, hasAnnotations } = props;
    if (items.length === 0) {
        return null;
    }
    const FeaturedItemToggle = getComponent('FeaturedItemToggle');
    return (
        <div
            className={classNames('w-full', 'max-w-3xl', 'grid', 'gap-6', { 'mt-12': hasTopMargin })}
            {...(hasAnnotations && { 'data-sb-field-path': '.items' })}
        >
            {items.map((item, index) => (
                <FeaturedItemToggle key={index} {...item} hasSectionTitle={hasSectionTitle} {...(hasAnnotations && { 'data-sb-field-path': `.${index}` })} />
            ))}
        </div>
    );
}
