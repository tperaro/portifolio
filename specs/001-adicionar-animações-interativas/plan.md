# Implementation Plan: Adicionar Animações Interativas ao Portfólio

**Branch**: `001-adicionar-animações-interativas` | **Date**: 2025-10-11 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-adicionar-animações-interativas/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implementar sistema de animações interativas no portfólio usando Aceternity UI (biblioteca React com Tailwind CSS + Framer Motion). Feature prioriza animações de scroll-reveal (P1), hover effects em elementos interativos (P2), transições de página (P3) e efeitos especiais no hero section (P3). Objetivo é melhorar engajamento do usuário mantendo performance de 60fps e acessibilidade WCAG 2.1 AA, com bundle adicional limitado a 50KB gzipped.

## Technical Context

**Language/Version**: TypeScript 5.6.2 / JavaScript ES2018+  
**Primary Dependencies**: 
- Next.js 15.5.0 (React 19.1.0)
- Aceternity UI (to be installed - React animation components)
- Framer Motion (peer dependency of Aceternity UI - ~30KB gzipped)
- Tailwind CSS 3.4.3 (already installed)
- Stackbit CMS Git-based content source

**Storage**: N/A (UI-only feature, no data persistence)  
**Testing**: NEEDS CLARIFICATION (current testing framework not documented - need to research: Jest/Vitest + React Testing Library, or Playwright for E2E)  
**Target Platform**: Web browsers (Chrome, Firefox, Safari, Edge - últimas 2 versões), Mobile browsers (iOS Safari, Chrome Android)  
**Project Type**: Web application (Next.js SSG with dynamic components)  
**Performance Goals**: 
- 60fps durante animações em 95% dos devices
- FCP não aumenta >200ms
- Bundle adicional ≤50KB gzipped
- Animações respondem <200ms após trigger

**Constraints**: 
- Deve funcionar com Stackbit visual editor (não quebrar preview)
- Respeitar `prefers-reduced-motion` (acessibilidade)
- Progressive enhancement (conteúdo acessível sem JS)
- GPU-accelerated animations only (transform/opacity)
- Sem dependências de backend/API

**Scale/Scope**: 
- ~10 pages no portfólio (home, about, projects, experience, blog posts)
- ~30-40 componentes React para animar
- 4 tipos de animação: scroll-reveal, hover, page transitions, hero specials
- Target: visitantes desktop e mobile

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Architecture Alignment ✅

**Next.js 15 + React 19 + Tailwind CSS**:
- ✅ Aceternity UI é compatível com stack atual
- ✅ Usa Tailwind CSS (já instalado v3.4.3)
- ✅ Components React integram naturalmente com arquitetura existente
- ✅ Framer Motion peer dependency é library bem estabelecida

**Component Architecture**:
- ✅ Mantém padrão existente: atoms/ → blocks/ → sections/ → layouts/
- ✅ Aceternity components podem ser wrapped como atoms/blocks
- ✅ Não quebra components-registry.ts pattern
- ✅ Dynamic imports continuam funcionando

**File-Based Routing**:
- ✅ Animações não afetam routing [[...slug]].js
- ✅ Page transitions trabalham com navegação existente
- ✅ Sem mudanças necessárias em static-paths/props resolvers

### Performance Budget ✅

**Bundle Size**:
- Current: Unknown (NEEDS RESEARCH)
- Addition: ~35-50KB gzipped (Aceternity UI + Framer Motion)
- Constitution allows reasonable additions for value delivered
- ✅ Within acceptable range for animation library

**Build Performance**:
- ✅ Não adiciona build steps complexos
- ✅ Netlify deploy continua funcionando
- ✅ Hot reload não afetado significativamente

### CMS Integration ⚠️

**Stackbit Compatibility**:
- ⚠️ NEEDS VERIFICATION: Animações no preview mode
- ⚠️ NEEDS RESEARCH: Quais props de animação expor via CMS
- ✅ Content models não precisam mudar
- ✅ Git-based source continua intacto

### Accessibility & Standards ✅

**WCAG 2.1 AA Compliance**:
- ✅ Aceternity UI respeita `prefers-reduced-motion`
- ✅ Spec define progressive enhancement
- ✅ Sem animações bloqueando conteúdo
- ✅ Keyboard navigation não afetada

### TypeScript Configuration ⚠️

**Type Safety**:
- ⚠️ Constitution notes: "strict: false" (room for improvement)
- ⚠️ Aceternity UI types podem não estar completos
- ⚠️ NEEDS RESEARCH: Type definitions para componentes animados
- ✅ Não quebra build existente

### Testing Strategy ⚠️

**Current State**:
- ⚠️ Constitution: "To Be Implemented"
- ⚠️ NEEDS CLARIFICATION: Testing framework não documentado
- ⚠️ NEEDS RESEARCH: Como testar animações (visual regression?)
- ⚠️ NEEDS RESEARCH: Performance testing approach

### Gate Decision: ⚠️ CONDITIONAL PASS

**Blockers Requiring Research (Phase 0)**:
1. Testing framework decision (Jest vs Vitest + RTL)
2. Stackbit preview mode compatibility verification
3. Current bundle size baseline measurement
4. Aceternity UI TypeScript definitions assessment
5. Animation testing strategy (visual regression tools)

**Non-Blocking Issues**:
- TypeScript strict mode (existing tech debt, não piorado por feature)
- Algolia search integration (não afetado por animações)

**Proceed to Phase 0**: YES - Research tasks identified above

## Project Structure

### Documentation (this feature)

```
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

```
src/
├── components/
│   ├── atoms/                    # Atomic components (existing)
│   │   ├── Badge/
│   │   ├── Button/
│   │   ├── Link/
│   │   └── [NEW] AnimatedWrapper/    # Wrapper for scroll-reveal
│   ├── blocks/                   # Composite elements (existing)
│   │   └── [NEW] AnimatedCard/       # Animated card component
│   ├── sections/                 # Page sections (existing)
│   │   ├── HeroSection/
│   │   │   └── [MODIFY] index.tsx    # Add hero animations
│   │   ├── FeaturedPeopleSection/
│   │   └── [NEW] AnimatedHeroSection/ # Aceternity-powered hero
│   ├── layouts/                  # Page layouts (existing)
│   │   └── [MODIFY] BaseLayout.tsx   # Add page transition wrapper
│   └── components-registry.ts     # [MODIFY] Register animated components
├── hooks/                        # [NEW] Custom React hooks
│   ├── useScrollAnimation.ts     # Scroll-reveal logic
│   ├── useReducedMotion.ts       # Accessibility hook
│   └── usePageTransition.ts      # Page transition state
├── utils/                        # Utilities (existing)
│   └── [NEW] animation-config.ts # Animation constants & easing functions
├── css/
│   └── [MODIFY] main.css         # Add animation utility classes
└── pages/                        # Next.js pages (existing)
    ├── _app.js                   # [MODIFY] Add Framer Motion AnimatePresence
    └── [[...slug]].js            # [MODIFY] Add transition support

content/                          # Stackbit content (existing)
├── data/
│   └── [NEW] animation-presets.json # CMS-configurable animation options
└── pages/                        # Page content (unchanged structure)

public/                           # Static assets (existing, no changes)

[NEW] tests/                      # Testing structure (to be created)
├── unit/
│   ├── components/
│   │   └── AnimatedWrapper.test.tsx
│   └── hooks/
│       └── useScrollAnimation.test.ts
├── integration/
│   └── animation-performance.test.ts
└── e2e/
    └── page-transitions.spec.ts

node_modules/
└── [NEW] aceternity-ui/          # Will be installed via npm
└── [NEW] framer-motion/          # Peer dependency

package.json                      # [MODIFY] Add Aceternity UI dependency
tailwind.config.js               # [MODIFY] Extend for Aceternity components
```

**Structure Decision**: 

This is a **Web Application** (Next.js) with frontend-only modifications. We're extending the existing component architecture without changing the fundamental structure. Key decisions:

1. **Component Integration**: Aceternity UI components wrapped as custom atoms/blocks to maintain existing architecture patterns
2. **Hooks Pattern**: New `hooks/` directory for animation logic (React best practice)
3. **Utility Configuration**: Centralized animation config for consistency
4. **Testing Addition**: New `tests/` directory (currently missing, will establish foundation)
5. **No Backend Changes**: Pure UI feature, no API/server modifications needed
6. **CMS Integration**: Optional animation presets in `content/data/` for Stackbit configuration

## Complexity Tracking

*No violations requiring justification - feature aligns with existing architecture*

Constitution check identified research needs but no architectural violations. Feature integrates naturally with existing Next.js + React + Tailwind stack.
