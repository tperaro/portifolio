import * as React from 'react';
import classNames from 'classnames';
import { m } from 'framer-motion';
import Link from '../Link';
import { iconMap } from '../../svgs';
import { useReducedMotion } from '@/hooks';

export default function Social(props) {
    const { elementId, className, altText, url, icon = 'facebook' } = props;
    const IconComponent = iconMap[icon];
    const fieldPath = props['data-sb-field-path'];
    const prefersReducedMotion = useReducedMotion();
    const annotations = fieldPath
        ? { 'data-sb-field-path': [fieldPath, `${fieldPath}.url#@href`, `${fieldPath}.altText#@aria-label`, `${fieldPath}.elementId#@id`].join(' ').trim() }
        : {};

    // Animation variants for hover and tap
    const iconVariants = prefersReducedMotion
        ? {}
        : {
              hover: {
                  scale: 1.2,
                  rotate: [0, -10, 10, -10, 0],
                  transition: {
                      rotate: {
                          duration: 0.5,
                          ease: 'easeInOut'
                      },
                      scale: {
                          duration: 0.2,
                          ease: 'easeOut'
                      }
                  }
              },
              tap: {
                  scale: 0.9
              }
          };

    return (
        <Link
            id={elementId}
            className={classNames(
                'sb-component',
                'sb-component-block',
                'sb-component-social',
                'inline-flex',
                'items-center',
                'justify-center',
                className
            )}
            href={url}
            aria-label={altText}
            {...annotations}
        >
            <m.span
                className="inline-flex items-center justify-center"
                variants={iconVariants}
                whileHover="hover"
                whileTap="tap"
            >
                {IconComponent && <IconComponent className="shrink-0 fill-current w-[1em] h-[1em]" {...(fieldPath && { 'data-sb-field-path': '.icon' })} />}
            </m.span>
        </Link>
    );
}
