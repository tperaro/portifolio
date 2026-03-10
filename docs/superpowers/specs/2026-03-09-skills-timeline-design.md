# Design: Página /skills — Skills Timeline

**Data:** 2026-03-09
**Status:** Aprovado

---

## Objetivo

Integrar o componente `skills-timeline.html` (atualmente em `/home/peras/gitperaro/thiago-knowledge/profissional/`) ao portfólio como uma página dedicada `/skills`, convertido para React/TypeScript com Tailwind, adaptado ao tema visual do portfólio.

---

## Decisões de Design

| Questão | Decisão |
|---|---|
| Onde fica | Nova página `/skills` |
| Visual | Adaptado ao tema do portfólio (lavanda suave `#E8E8F5`, tipografia Inter, botões `#2a2a2a`) |
| Técnica | Conversão completa para React + TypeScript + Tailwind |
| Idiomas | Bilíngue: pt (padrão) + en |
| Navegação | Link no header nav + CTA na página `/about` |

---

## Visual

### Paleta
- Fundo hero da página: `#E8E8F5` (lavanda suave — igual ao hero do portfólio)
- Texto primário: `#2a2a2a`
- Sidebar item ativo: fundo `#F0F0F8`, borda esquerda `#2a2a2a`
- Badges de categoria: cores suaves por categoria (roxo, azul, verde, âmbar, rosa)
- Botões: `background: #2a2a2a; color: #fff`

### Layout da página
```
[ Navbar do portfólio ]
[ Hero strip — lavanda — título + toggle Por Ano / Por Skill ]
[ Sidebar 180px | Painel de detalhe flex:1 ]
```

### Sidebar
- Lista de anos (2019 → 2026) com cargo/empresa
- Item ativo: borda esquerda escura + fundo lavanda suave
- Anos mais antigos com opacidade decrescente

### Painel de detalhe (modo Ano)
- Header: ano + badge de cargo + empresa
- Skills do ano: chips coloridos por categoria
- Conquista do ano: card com emoji + título + descrição

### Painel de detalhe (modo Skill)
- Card da skill: nome, nível (advanced/proficient/familiar), timeline bar
- Contexto profissional e projetos associados

### CTA na `/about`
- Card com fundo lavanda `#E8E8F5`
- Texto: "Ver evolução técnica completa →"
- Botão escuro "Explorar Skills"

---

## Arquitetura de componentes

```
src/
  components/
    sections/
      SkillsTimelineSection/
        index.tsx              ← componente principal (layout + state)
        SkillsSidebar.tsx      ← sidebar com timeline de anos / lista de categorias
        SkillsYearPanel.tsx    ← painel de detalhe no modo "Por Ano"
        SkillsDetailPanel.tsx  ← painel de detalhe no modo "Por Skill"
  data/
    skills-data.ts             ← CAREER, CATEGORIES, SKILLS, ACHIEVEMENTS, ACADEMIC_YEARS
```

### Fonte de dados
- Extrair as constantes JS do HTML original para `src/data/skills-data.ts`
- Tipagens TypeScript para `Skill`, `CareerEntry`, `Category`, `Achievement`, `AcademicYear`

### Integração Next.js
- Nova página em `content/pages/skills.md` (tipo `PageLayout`)
- Seção única `type: SkillsTimelineSection`
- Versão EN em `content/en/pages/skills.md`
- Registrar `SkillsTimelineSection` em `src/components/components-registry.ts`

### Navegação
- Adicionar link `Skills` em `content/data/header.json` (pt) e `content/en/data/header.json` (en)
- Adicionar CTA na seção de skills em `content/pages/about.md`

### i18n
- Labels da UI (títulos, toggles, labels de seção) via `src/i18n/translations.ts`
- Conteúdo das skills (desc, context) pode iniciar em pt com campo `descEn` opcional

### Estilização
- Tailwind para todo o layout e tipografia
- Sem CSS customizado — usar classes utilitárias
- Animações de entrada com Framer Motion (padrão `AnimatedWrapper` já existente)

---

## Arquivos a criar/modificar

| Arquivo | Ação |
|---|---|
| `src/data/skills-data.ts` | Criar — dados extraídos do HTML |
| `src/components/sections/SkillsTimelineSection/index.tsx` | Criar |
| `src/components/sections/SkillsTimelineSection/SkillsSidebar.tsx` | Criar |
| `src/components/sections/SkillsTimelineSection/SkillsYearPanel.tsx` | Criar |
| `src/components/sections/SkillsTimelineSection/SkillsDetailPanel.tsx` | Criar |
| `src/components/components-registry.ts` | Modificar — registrar novo componente |
| `content/pages/skills.md` | Criar — página PT |
| `content/en/pages/skills.md` | Criar — página EN |
| `content/pages/about.md` | Modificar — adicionar CTA |
| `content/data/header.json` | Modificar — adicionar link Skills |
| `content/en/data/header.json` | Modificar — adicionar link Skills |
| `src/i18n/translations.ts` | Modificar — labels da página skills |
| `.gitignore` | Modificar — adicionar `.superpowers/` |
