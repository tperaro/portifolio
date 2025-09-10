import React from 'react';
import { useRouter } from 'next/router';

export default function LanguageSwitcher({ className = '' }: { className?: string }) {
    const router = useRouter();
    const { locale, asPath, pathname, query } = router;

    const changeLocale = async (nextLocale: string) => {
        try {
            await router.push({ pathname, query }, asPath, { locale: nextLocale });
        } catch (e) {
            // no-op
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

