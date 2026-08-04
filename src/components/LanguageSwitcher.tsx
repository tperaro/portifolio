import React from 'react';
import { useRouter } from 'next/router';

interface LanguageSwitcherProps {
    className?: string;
    alternatePath?: string | null;
}

export default function LanguageSwitcher({ className = '', alternatePath }: LanguageSwitcherProps) {
    const router = useRouter();
    const { locale } = router;

    const changeLocale = async (nextLocale: string) => {
        if (nextLocale === locale) return;

        try {
            const targetPath = alternatePath || '/';
            await router.push(targetPath, targetPath, { locale: nextLocale, scroll: false });
        } catch {
            try {
                await router.push('/', '/', { locale: nextLocale });
            } catch {
                // no-op
            }
        }
    };

    const isActive = (code: string) => (locale === code ? 'font-semibold text-primary' : 'text-current opacity-70 hover:opacity-100');

    return (
        <div className={`flex items-center space-x-2 ${className}`}>
            <button
                type="button"
                aria-label="EN — View this page in English"
                aria-pressed={locale === 'en'}
                className={`text-sm px-2 py-1 rounded ${isActive('en')}`}
                onClick={() => changeLocale('en')}
            >
                EN
            </button>
            <span className="opacity-40" aria-hidden="true">|</span>
            <button
                type="button"
                aria-label="PT — Ver esta página em português"
                aria-pressed={locale === 'pt'}
                className={`text-sm px-2 py-1 rounded ${isActive('pt')}`}
                onClick={() => changeLocale('pt')}
            >
                PT
            </button>
        </div>
    );
}
