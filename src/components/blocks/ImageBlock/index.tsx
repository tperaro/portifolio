import * as React from 'react';
import classNames from 'classnames';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';

const intrinsicImageDimensions = {
    '/images/builders.webp': [900, 988],
    '/images/thiago-peraro-magnatas.webp': [720, 772],
    '/images/palestrante.webp': [900, 996],
    '/images/koru.webp': [1000, 750],
    '/images/sobrevidas.webp': [1000, 812],
    '/images/goiasprev.webp': [200, 200],
    '/images/live-clivia.webp': [960, 540],
    '/images/live-empreendedorismo.webp': [960, 540],
    '/images/business-model-canvas.webp': [960, 678],
    '/images/onboarding-ai.svg': [1200, 720],
    '/palestras/palco-aibrasil.webp': [1600, 1200],
    '/palestras/premio-ai-brasil-hero.webp': [1600, 1200],
    '/palestras/trofeu-ai-brasil-hero.webp': [1200, 1600],
    '/palestras/aibrasil-networking.webp': [1200, 1600],
    '/palestras/palestra-second-brain.webp': [1284, 2282],
    '/images/blog/docker-advanced.svg': [1200, 675],
    '/images/blog/microservices.svg': [1200, 675],
    '/images/blog/next-server-actions.svg': [1200, 675]
};

export default function ImageBlock(props) {
    const {
        elementId,
        className,
        imageClassName,
        url,
        altText = '',
        styles = {},
        loading = 'lazy',
        decoding = 'async',
        fetchPriority,
        width,
        height,
        sizes
    } = props;
    if (!url) {
        return null;
    }
    const intrinsicDimensions = intrinsicImageDimensions[url];
    const fieldPath = props['data-sb-field-path'];
    const annotations = fieldPath
        ? { 'data-sb-field-path': [fieldPath, `${fieldPath}.url#@src`, `${fieldPath}.altText#@alt`, `${fieldPath}.elementId#@id`].join(' ').trim() }
        : {};

    return (
        <div
            className={classNames(
                'sb-component',
                'sb-component-block',
                'sb-component-image-block',
                className,
                styles?.self?.margin ? mapStyles({ margin: styles?.self?.margin }) : undefined
            )}
            {...annotations}
        >
            <img
                id={elementId}
                className={classNames(
                    imageClassName,
                    styles?.self?.padding ? mapStyles({ padding: styles?.self?.padding }) : undefined,
                    styles?.self?.borderWidth && styles?.self?.borderWidth !== 0 && styles?.self?.borderStyle !== 'none'
                        ? mapStyles({
                              borderWidth: styles?.self?.borderWidth,
                              borderStyle: styles?.self?.borderStyle,
                              borderColor: styles?.self?.borderColor ?? 'border-primary'
                          })
                        : undefined,
                    styles?.self?.borderRadius ? mapStyles({ borderRadius: styles?.self?.borderRadius }) : undefined
                )}
                src={url}
                alt={altText}
                loading={loading}
                decoding={decoding}
                fetchPriority={fetchPriority}
                width={width ?? intrinsicDimensions?.[0]}
                height={height ?? intrinsicDimensions?.[1]}
                sizes={sizes}
            />
        </div>
    );
}
