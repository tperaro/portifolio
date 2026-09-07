import { Model } from '@stackbit/types';

export const GuideHubLayout: Model = {
    type: 'page',
    name: 'GuideHubLayout',
    label: 'Hub de guias',
    labelField: 'title',
    singleInstance: true,
    canDelete: false,
    filePath: 'content/pages/guias/index.md',
    fieldGroups: [
        { name: 'settings', label: 'Settings', icon: 'gear' },
        { name: 'seo', label: 'SEO', icon: 'page' }
    ],
    fields: [
        {
            type: 'string',
            name: 'title',
            label: 'Título',
            required: true,
            default: 'Guias',
            hidden: false,
            localized: false
        },
        {
            type: 'string',
            name: 'subtitle',
            label: 'Subtítulo',
            required: false,
            hidden: false,
            localized: false
        },
        {
            type: 'text',
            name: 'intro',
            label: 'Introdução',
            required: false,
            hidden: false,
            localized: false
        },
        {
            type: 'list',
            name: 'bottomSections',
            label: 'Seções finais',
            required: false,
            hidden: false,
            localized: false,
            items: {
                type: 'model',
                models: [
                    'CarouselSection',
                    'DividerSection',
                    'FeaturedItemsSection',
                    'FeaturedPeopleSection',
                    'FeaturedPostsSection',
                    'GenericSection',
                    'ImageGallerySection',
                    'PricingSection',
                    'RecentPostsSection'
                ]
            }
        },
        {
            type: 'slug',
            name: 'slug',
            label: 'Slug',
            required: true,
            hidden: false,
            localized: false,
            group: 'settings'
        },
        {
            type: 'boolean',
            name: 'isDraft',
            label: 'Rascunho',
            required: false,
            default: false,
            hidden: false,
            localized: false,
            group: 'settings'
        },
        {
            type: 'model',
            name: 'seo',
            label: 'SEO',
            required: false,
            hidden: false,
            localized: false,
            models: ['Seo'],
            group: 'seo'
        }
    ]
};
