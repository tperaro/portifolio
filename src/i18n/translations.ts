export type Locale = 'pt' | 'en';

type Dict = Record<string, any>;

export const translations: Record<Locale, Dict> = {
    pt: {
        header: {
            skip_to_main: 'Pular para o conteúdo principal',
            open_menu: 'Abrir Menu',
            close_menu: 'Fechar Menu'
        },
        carousel: {
            previous: 'Anterior',
            next: 'Próximo'
        }
    },
    en: {
        header: {
            skip_to_main: 'Skip to main content',
            open_menu: 'Open Menu',
            close_menu: 'Close Menu'
        },
        carousel: {
            previous: 'Previous',
            next: 'Next'
        }
    }
};

