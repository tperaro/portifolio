import { useRouter } from 'next/router';
import { translations, Locale } from './translations';

function get(obj: any, path: string, fallback?: string) {
    return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj) ?? fallback ?? path;
}

export function useTranslation() {
    const { locale: rawLocale } = useRouter();
    const locale = (rawLocale as Locale) || 'pt';
    const dict = translations[locale] ?? translations.pt;
    const t = (key: string, fallback?: string) => get(dict, key, fallback);
    return { t, locale };
}

