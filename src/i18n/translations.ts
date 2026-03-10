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
        },
        skills: {
            page_title: 'Habilidades Técnicas',
            page_subtitle: 'Explore minha evolução técnica por ano ou por categoria de skill',
            by_year: 'Por Ano',
            by_skill: 'Por Skill',
            timeline: 'Linha do Tempo',
            categories: 'Categorias',
            new_this_year: 'Skills deste ano',
            active_skills: 'Skills ativas',
            achievements: 'Conquistas',
            context: 'Contexto Profissional',
            academic: 'Base Acadêmica',
            projects: 'Projetos',
            select_skill: 'Selecione uma skill',
            present: 'presente',
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
        },
        skills: {
            page_title: 'Technical Skills',
            page_subtitle: 'Explore my technical evolution by year or skill category',
            by_year: 'By Year',
            by_skill: 'By Skill',
            timeline: 'Timeline',
            categories: 'Categories',
            new_this_year: 'New this year',
            active_skills: 'Active skills',
            achievements: 'Achievements',
            context: 'Professional Context',
            academic: 'Academic Foundation',
            projects: 'Projects',
            select_skill: 'Select a skill',
            present: 'present',
        }
    }
};

