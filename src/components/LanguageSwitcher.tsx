import React from 'react';
import { useRouter } from 'next/router';

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
    const router = useRouter();
    const { locale, asPath, pathname, query } = router;

    const changeLocale = async (nextLocale: string) => {
        try {
            // Check if we're on a blog post page (not the blog index)
            const isBlogPost = asPath.match(/^\/(en\/)?blog\/[^/]+\/?$/) && !asPath.endsWith('/blog') && !asPath.endsWith('/blog/');
            
            if (isBlogPost) {
                // For blog posts, redirect to the blog index page in the target language
                const blogPath = nextLocale === 'en' ? '/en/blog' : '/blog';
                await router.push(blogPath, blogPath, { locale: nextLocale, scroll: false });
            } else {
                // For other pages, try to navigate to the same path
                await router.push({ pathname, query }, undefined, { locale: nextLocale, scroll: false });
            }
        } catch (e) {
            // If navigation fails, try to go to the home page in the target locale
            try {
                await router.push('/', '/', { locale: nextLocale });
            } catch (err) {
                // no-op
            }
        }
    };

    const isActive = (code: string) => (locale === code ? 'font-semibold text-primary' : 'text-current opacity-70 hover:opacity-100');

    return (
        <div className={`flex items-center space-x-2 ${className}`}>
            <button type="button" className={`text-sm px-2 py-1 rounded ${isActive('pt')}`} onClick={() => changeLocale('pt')}>
                PT
            </button>
            <span className="opacity-40">|</span>
            <button type="button" className={`text-sm px-2 py-1 rounded ${isActive('en')}`} onClick={() => changeLocale('en')}>
                EN
            </button>
        </div>
    );
}

