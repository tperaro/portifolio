import { Model } from '@stackbit/types';

export const ScrollHeroSection: Model = {
    type: 'object',
    name: 'ScrollHeroSection',
    label: 'Scroll Hero (video scrubbed)',
    labelField: 'elementId',
    fields: [
        {
            type: 'string',
            name: 'videoUrl',
            label: 'Video URL',
            required: false,
            default: '/hero-robot/robot-cross-scrub.mp4',
            hidden: false,
            localized: false
        },
        {
            type: 'list',
            name: 'leftWords',
            label: 'Left marquee words',
            required: false,
            hidden: false,
            localized: true,
            items: { type: 'string' }
        },
        {
            type: 'list',
            name: 'rightWords',
            label: 'Right marquee words',
            required: false,
            hidden: false,
            localized: true,
            items: { type: 'string' }
        },
        {
            type: 'list',
            name: 'phrases',
            label: 'Phrases (3 slides)',
            description: 'Each phrase = before + highlight + after. Highlight uses the accent color.',
            required: false,
            hidden: false,
            localized: true,
            items: {
                type: 'object',
                fields: [
                    { type: 'string', name: 'before', label: 'Before', required: false, localized: true },
                    { type: 'string', name: 'highlight', label: 'Highlight (accent)', required: false, localized: true },
                    { type: 'string', name: 'after', label: 'After', required: false, localized: true }
                ]
            }
        },
        {
            type: 'color',
            name: 'accentColor',
            label: 'Accent color',
            required: false,
            default: '#667eea',
            hidden: false,
            localized: false
        },
        {
            type: 'color',
            name: 'bgColor',
            label: 'Background color',
            required: false,
            default: '#0e0a18',
            hidden: false,
            localized: false
        },
        {
            type: 'string',
            name: 'scrollHint',
            label: 'Scroll hint label',
            required: false,
            default: 'scroll ↓',
            hidden: false,
            localized: true
        },
        {
            type: 'string',
            name: 'elementId',
            label: 'Element ID',
            required: false,
            default: 'scroll-hero',
            hidden: false,
            localized: false
        }
    ]
};
