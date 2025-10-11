import * as React from 'react';
import classNames from 'classnames';
import { m } from 'framer-motion';
import { iconMap } from '../../svgs';
import Link from '../Link';
import { useReducedMotion } from '@/hooks';

export default function Action(props) {
    const { elementId, className, label, altText, url, showIcon, icon, iconPosition = 'right', style = 'primary' } = props;
    const IconComponent = icon ? iconMap[icon] : null;
    const fieldPath = props['data-sb-field-path'];
    const annotations = fieldPath
        ? { 'data-sb-field-path': [fieldPath, `${fieldPath}.url#@href`, `${fieldPath}.altText#@aria-label`, `${fieldPath}.elementId#@id`].join(' ').trim() }
        : {};
    const type = props.__metadata?.modelName;
    const prefersReducedMotion = useReducedMotion();

    // Hover and tap animations (only for buttons)
    const isButton = type === 'Button';
    const hoverAnimation = !prefersReducedMotion && isButton ? { scale: 1.05 } : {};
    const tapAnimation = !prefersReducedMotion && isButton ? { scale: 0.95 } : {};

    const linkContent = (
        <>
            {label && <span {...(fieldPath && { 'data-sb-field-path': '.label' })}>{label}</span>}
            {showIcon && IconComponent && (
                <IconComponent
                    className={classNames('shrink-0', 'fill-current', 'w-[1.25em]', 'h-[1.25em]', {
                        'order-first': iconPosition === 'left',
                        'mr-[0.5em]': label && iconPosition === 'left',
                        'ml-[0.5em]': label && iconPosition === 'right'
                    })}
                    {...(fieldPath && { 'data-sb-field-path': '.icon' })}
                />
            )}
        </>
    );

    if (isButton && !prefersReducedMotion) {
        return (
            <m.div
                whileHover={hoverAnimation}
                whileTap={tapAnimation}
                transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
                style={{ display: 'inline-block' }}
            >
                <Link
                    href={url}
                    aria-label={altText}
                    id={elementId}
                    className={classNames(
                        'sb-component',
                        'sb-component-block',
                        'sb-component-button',
                        {
                            'sb-component-button-primary': style === 'primary',
                            'sb-component-button-secondary': style === 'secondary'
                        },
                        className
                    )}
                    {...annotations}
                >
                    {linkContent}
                </Link>
            </m.div>
        );
    }

    return (
        <Link
            href={url}
            aria-label={altText}
            id={elementId}
            className={classNames(
                'sb-component',
                'sb-component-block',
                type === 'Button' ? 'sb-component-button' : 'sb-component-link',
                {
                    'sb-component-button-primary': type === 'Button' && style === 'primary',
                    'sb-component-button-secondary': type === 'Button' && style === 'secondary',
                    'sb-component-link-primary': type === 'Link' && style === 'primary',
                    'sb-component-link-secondary': type === 'Link' && style === 'secondary'
                },
                className
            )}
            {...annotations}
        >
            {linkContent}
        </Link>
    );
}
