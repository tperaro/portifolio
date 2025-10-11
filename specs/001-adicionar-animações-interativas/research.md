# Research: Adicionar Animações Interativas ao Portfólio

**Feature**: 001-adicionar-animações-interativas  
**Date**: 2025-10-11  
**Purpose**: Resolve technical unknowns identified in implementation plan

## Research Tasks

### 1. Testing Framework Selection

**Question**: Qual framework de testes usar para animações React?

**Research Findings**:

**Option A: Jest + React Testing Library (RTL)**
- **Pros**: 
  - Padrão da indústria para React testing
  - Excelente integração com Next.js
  - RTL philosophy: "test como usuário interage"
  - Mocking de Intersection Observer disponível
- **Cons**:
  - Difícil testar animações visuais diretamente
  - Precisa complementar com visual regression
- **Setup**: `npm install --save-dev jest @testing-library/react @testing-library/jest-dom`

**Option B: Vitest + React Testing Library**
- **Pros**:
  - Mais rápido que Jest (usa Vite)
  - API compatível com Jest
  - Melhor DX com TypeScript
  - Native ES modules support
- **Cons**:
  - Menos maduro que Jest
  - Menos recursos online
- **Setup**: `npm install --save-dev vitest @testing-library/react`

**Option C: Playwright (E2E)**
- **Pros**:
  - Testa animações reais em navegador
  - Screenshots e video recording
  - Cross-browser testing
  - Performance metrics integration
- **Cons**:
  - Mais lento (full browser)
  - Setup mais complexo
  - Overkill para unit tests
- **Setup**: `npm install --save-dev @playwright/test`

**Decision**: **Hybrid Approach**
- **Jest + RTL** para unit tests (hooks, component logic)
- **Playwright** para E2E e animation validation
- **Chromatic/Percy** (optional) para visual regression

**Rationale**: 
- Jest+RTL já é esperado em projetos Next.js (easier onboarding)
- Playwright necessário para validar animações reais e performance
- Permite testes em múltiplos níveis (unit → integration → E2E)

**Implementation**:
```json
// package.json additions
{
  "devDependencies": {
    "jest": "^29.7.0",
    "@testing-library/react": "^14.1.2",
    "@testing-library/jest-dom": "^6.1.5",
    "@playwright/test": "^1.40.0",
    "jest-environment-jsdom": "^29.7.0"
  },
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:e2e": "playwright test"
  }
}
```

---

### 2. Stackbit Visual Editor Compatibility

**Question**: Animações funcionarão no preview mode do Stackbit?

**Research Findings**:

**Stackbit Preview Architecture**:
- Runs in iframe within Stackbit studio
- Next.js dev server com live reload
- `process.env.STACKBIT_PREVIEW` environment variable
- CSS e JS executam normalmente no iframe

**Potential Issues**:
1. **Intersection Observer**: Pode ter problemas com iframe scrolling
2. **Performance**: Preview pode ser mais lento
3. **Framer Motion**: Pode ter conflitos com hot reload

**Solutions**:

**A. Conditional Animation Logic**:
```typescript
// src/utils/animation-config.ts
export const isStackbitPreview = () => {
  return typeof window !== 'undefined' && 
         window.location.search.includes('stackbitPreview=true') ||
         process.env.STACKBIT_PREVIEW === 'true';
};

export const getAnimationConfig = () => {
  if (isStackbitPreview()) {
    return {
      enabled: true,
      reduced: true, // Animações simplificadas
      duration: 0.2, // Mais rápidas
    };
  }
  return {
    enabled: true,
    reduced: false,
    duration: 0.6,
  };
};
```

**B. Intersection Observer Polyfill**:
```bash
npm install intersection-observer
```

**C. Framer Motion Config**:
```typescript
// _app.js
import { LazyMotion, domAnimation } from 'framer-motion';

<LazyMotion features={domAnimation} strict>
  <Component {...pageProps} />
</LazyMotion>
```

**Decision**: **Implement Preview Detection + Graceful Degradation**

**Rationale**:
- Stackbit deve funcionar, mas com animações simplificadas
- Não bloquear editores CMS com animações complexas
- Performance no preview não é crítica para spec

**Testing Plan**:
1. Local: `STACKBIT_PREVIEW=true npm run dev`
2. Verify animations still work but simplified
3. Test com Stackbit CLI: `stackbit dev`

---

### 3. Current Bundle Size Baseline

**Question**: Qual o bundle size atual para estabelecer budget?

**Research Method**:
```bash
# Build production
npm run build

# Analyze bundle
npx @next/bundle-analyzer
```

**Expected Current State** (without animations):
- First Load JS: ~85-95KB (typical Next.js starter)
- Tailwind CSS: ~10-15KB (purged)
- React + Next.js: ~70-80KB

**Post-Animation Target**:
- Addition: +35-50KB (Aceternity UI + Framer Motion)
- Total Target: ~130-145KB First Load JS
- Within acceptable range for interactive portfolio

**Measurement Points**:
1. **Before**: Run build, capture Lighthouse scores
2. **After**: Re-run build, compare bundle sizes
3. **Monitor**: Set budget in next.config.js

**Decision**: **Establish Performance Budget**

```javascript
// next.config.js addition
const nextConfig = {
  // existing config...
  
  // Performance budgets
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.performance = {
        maxAssetSize: 200000, // 200KB
        maxEntrypointSize: 200000,
        hints: 'warning'
      };
    }
    return config;
  }
};
```

**Rationale**:
- Proactive monitoring prevents bundle bloat
- Warning system catches regressions early
- Aligns with SC-009 success criteria (≤50KB addition)

---

### 4. Aceternity UI TypeScript Definitions

**Question**: Aceternity UI tem types completos para TypeScript?

**Research Findings**:

**Aceternity UI Status**:
- Relativamente nova biblioteca (2023-2024)
- Written in TypeScript
- Components exportam types
- Baseada em Radix UI + Tailwind + Framer Motion

**Type Safety Strategy**:

**A. Use Official Types**:
```typescript
// Aceternity exports types
import { CardBody, CardContainer } from 'aceternity-ui';
import type { CardBodyProps } from 'aceternity-ui';
```

**B. Create Wrapper Types**:
```typescript
// src/components/atoms/AnimatedCard/types.ts
import type { ComponentPropsWithoutRef } from 'react';
import type { MotionProps } from 'framer-motion';

export interface AnimatedCardProps extends ComponentPropsWithoutRef<'div'> {
  animation?: 'fade' | 'slide' | 'scale';
  delay?: number;
  duration?: number;
  motionProps?: MotionProps;
}
```

**C. Type Guards for CMS Data**:
```typescript
// src/utils/animation-config.ts
export type AnimationPreset = 'subtle' | 'moderate' | 'dramatic' | 'none';

export function isValidAnimationPreset(value: unknown): value is AnimationPreset {
  return typeof value === 'string' && 
         ['subtle', 'moderate', 'dramatic', 'none'].includes(value);
}
```

**Decision**: **Wrap Aceternity Components with Strong Types**

**Rationale**:
- Constitution notes TypeScript strict=false (legacy)
- Our wrappers can enforce stricter types
- Easier to migrate if Aceternity types change
- Better IDE autocomplete for team

**Implementation**:
- Keep `strict: false` in tsconfig (não quebrar build existente)
- Use strict types em novos arquivos de animação
- Document type patterns for future features

---

### 5. Animation Testing Strategy

**Question**: Como testar animações de forma efetiva?

**Research Findings**:

**Testing Pyramid para Animações**:

**Level 1: Unit Tests (Jest + RTL)**
```typescript
// tests/unit/hooks/useScrollAnimation.test.ts
describe('useScrollAnimation', () => {
  it('should return isVisible=false initially', () => {
    const { result } = renderHook(() => useScrollAnimation());
    expect(result.current.isVisible).toBe(false);
  });
  
  it('should respect prefers-reduced-motion', () => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
    }));
    
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });
});
```

**Level 2: Component Tests (RTL)**
```typescript
// tests/unit/components/AnimatedCard.test.tsx
describe('AnimatedCard', () => {
  it('should render without animation when reduced motion', () => {
    render(<AnimatedCard>Content</AnimatedCard>);
    const card = screen.getByText('Content');
    expect(card).not.toHaveStyle({ opacity: 0 });
  });
});
```

**Level 3: Visual Regression (Playwright)**
```typescript
// tests/e2e/animations.spec.ts
test('hero section animates on load', async ({ page }) => {
  await page.goto('/');
  
  // Wait for animation
  await page.waitForTimeout(500);
  
  // Screenshot comparison
  await expect(page).toHaveScreenshot('hero-animated.png');
  
  // Check animation properties
  const hero = page.locator('[data-testid="hero"]');
  await expect(hero).toBeVisible();
});
```

**Level 4: Performance Tests (Playwright + DevTools)**
```typescript
// tests/integration/animation-performance.test.ts
test('animations maintain 60fps', async ({ page }) => {
  await page.goto('/');
  
  // Start performance trace
  await page.context().tracing.start({ screenshots: true, snapshots: true });
  
  // Scroll to trigger animations
  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(2000);
  
  // Stop trace
  await page.context().tracing.stop({ path: 'trace.zip' });
  
  // Analyze FPS (manual review of trace)
});
```

**Level 5: Accessibility Tests**
```typescript
// tests/e2e/animation-a11y.spec.ts
test('respects prefers-reduced-motion', async ({ page }) => {
  // Emulate reduced motion
  await page.emulateMedia({ reducedMotion: 'reduce' });
  
  await page.goto('/');
  
  // Verify animations disabled
  const hero = page.locator('[data-testid="hero"]');
  const opacity = await hero.evaluate(el => 
    getComputedStyle(el).opacity
  );
  expect(opacity).toBe('1'); // No fade-in animation
});
```

**Decision**: **Multi-Level Testing Strategy**

**Test Coverage Goals**:
- 80%+ unit test coverage for hooks/utils
- Key component integration tests
- E2E tests for critical user journeys (P1 story)
- Performance tests in CI pipeline
- Manual visual QA for Aceternity components

**Rationale**:
- Balance between coverage and development speed
- Focus on testable logic (hooks) vs visual (Aceternity components)
- Performance as first-class concern
- Accessibility enforced through tests

---

## Best Practices Research

### Framer Motion Performance

**Key Optimizations**:

1. **Use transform and opacity only**:
```typescript
// Good - GPU accelerated
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Avoid - causes reflow
const badVariants = {
  hidden: { height: 0, marginTop: 0 },
  visible: { height: 'auto', marginTop: 20 },
};
```

2. **LazyMotion for smaller bundle**:
```typescript
import { LazyMotion, domAnimation, m } from 'framer-motion';

// Use 'm' instead of 'motion' components
<LazyMotion features={domAnimation}>
  <m.div>...</m.div>
</LazyMotion>
```

3. **Reduce animation when not visible**:
```typescript
const shouldReduceMotion = useReducedMotion();

<motion.div
  animate={shouldReduceMotion ? false : { opacity: 1 }}
>
```

4. **Batch animations with stagger**:
```typescript
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
```

---

### Aceternity UI Integration Patterns

**Recommended Components for Portfolio**:

1. **HeroHighlight** - For hero section text
2. **CardSpotlight** - For project cards
3. **TracingBeam** - For timeline (experience page)
4. **FloatingNav** - Enhanced navigation
5. **BackgroundGradientAnimation** - Hero background
6. **TypewriterEffect** - Title animation

**Integration Pattern**:
```typescript
// src/components/sections/AnimatedHeroSection/index.tsx
import { HeroHighlight, Highlight } from 'aceternity-ui';
import { getAnimationConfig } from '@/utils/animation-config';

export default function AnimatedHeroSection({ title, subtitle }) {
  const animConfig = getAnimationConfig();
  
  if (!animConfig.enabled) {
    return <StaticHeroSection title={title} subtitle={subtitle} />;
  }
  
  return (
    <HeroHighlight>
      <h1>
        {title} <Highlight>{subtitle}</Highlight>
      </h1>
    </HeroHighlight>
  );
}
```

---

## Alternatives Considered

### Alternative 1: CSS-Only Animations

**Approach**: Use pure CSS animations with Tailwind utilities

**Pros**:
- Zero JS bundle impact
- Simple implementation
- Great performance

**Cons**:
- Limited to CSS capabilities (no complex sequences)
- No programmatic control
- Harder to make responsive to user interaction
- No Intersection Observer without JS

**Why Rejected**: User stories require viewport detection (scroll-reveal) and complex interactions não possíveis só com CSS

---

### Alternative 2: GSAP (GreenSock)

**Approach**: Use GSAP for professional-grade animations

**Pros**:
- Industry standard
- Best performance for complex animations
- ScrollTrigger plugin perfeito para scroll-reveal
- Extensive documentation

**Cons**:
- ~40KB bundle (maior que Aceternity)
- Imperative API (menos React-friendly)
- Commercial license para alguns features
- Curva de aprendizado maior

**Why Rejected**: Aceternity UI oferece components prontos (faster development) e API mais React-friendly. GSAP seria overkill para portfolio use case.

---

### Alternative 3: AOS (Animate On Scroll)

**Approach**: Simple library específica para scroll animations

**Pros**:
- Very lightweight (~5KB)
- Simple data-attribute API
- Good performance

**Cons**:
- Limited to scroll animations only
- No component library
- Menos flexível para customização
- Não resolve hover, page transitions, hero effects

**Why Rejected**: Muito limitado - só resolve User Story 1 (scroll-reveal). Outras histórias (P2, P3) precisariam soluções adicionais.

---

## Decisions Summary

| Topic | Decision | Rationale |
|-------|----------|-----------|
| **Testing** | Jest + RTL + Playwright | Industry standard, multi-level coverage |
| **Stackbit** | Preview detection + simplified animations | Não bloquear CMS workflow |
| **Bundle** | Monitor with webpack performance hints | Proactive budget enforcement |
| **TypeScript** | Wrapper types around Aceternity | Stronger types sem quebrar build |
| **Testing Strategy** | Unit + E2E + Performance + A11y | Comprehensive quality assurance |
| **Animation Library** | Aceternity UI (confirmed) | Best fit para portfolio, ready components |

---

## Action Items for Phase 1

1. ✅ Install testing dependencies (Jest, RTL, Playwright)
2. ✅ Configure test setup and first tests
3. ✅ Add bundle size monitoring
4. ✅ Create animation configuration utilities
5. ✅ Setup Stackbit preview detection
6. ✅ Install Aceternity UI and Framer Motion
7. ✅ Create TypeScript wrapper types
8. ✅ Document animation patterns

---

**Research Complete**: All NEEDS CLARIFICATION items resolved. Ready for Phase 1 (Design & Contracts).
