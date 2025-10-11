# Data Model: Adicionar Animações Interativas ao Portfólio

**Feature**: 001-adicionar-animações-interativas  
**Date**: 2025-10-11  
**Note**: Esta feature é UI-only sem persistência de dados. Este documento descreve schemas de configuração e tipos TypeScript.

## Overview

Feature não envolve banco de dados ou modelos de dados persistentes tradicionais. Entretanto, define:
1. **Configuration schemas** para animações (JSON/TypeScript)
2. **CMS content models** para Stackbit (optional animation properties)
3. **Runtime state** (React component state, não persistido)

---

## Configuration Schemas

### 1. Animation Preset

**Purpose**: Define animation presets que podem ser selecionados via CMS

**Location**: `content/data/animation-presets.json` (optional CMS data)

**Schema**:
```typescript
type AnimationPreset = {
  id: string;
  name: string;
  description: string;
  config: {
    duration: number;        // seconds
    delay: number;           // seconds
    easing: EasingFunction;
    stagger: number;         // seconds between staggered children
  };
};

type EasingFunction = 
  | 'linear'
  | 'easeIn'
  | 'easeOut'
  | 'easeInOut'
  | 'circIn'
  | 'circOut'
  | 'circInOut'
  | 'backIn'
  | 'backOut'
  | 'backInOut'
  | string; // Custom cubic-bezier

interface AnimationPresets {
  presets: {
    subtle: AnimationPreset;
    moderate: AnimationPreset;
    dramatic: AnimationPreset;
    none: AnimationPreset;
  };
  default: 'moderate';
}
```

**Example**:
```json
{
  "presets": {
    "subtle": {
      "id": "subtle",
      "name": "Subtle",
      "description": "Minimal, understated animations",
      "config": {
        "duration": 0.3,
        "delay": 0,
        "easing": "easeOut",
        "stagger": 0.05
      }
    },
    "moderate": {
      "id": "moderate",
      "name": "Moderate",
      "description": "Balanced animations (default)",
      "config": {
        "duration": 0.6,
        "delay": 0.1,
        "easing": "easeInOut",
        "stagger": 0.1
      }
    },
    "dramatic": {
      "id": "dramatic",
      "name": "Dramatic",
      "description": "Bold, attention-grabbing animations",
      "config": {
        "duration": 0.9,
        "delay": 0.2,
        "easing": "backOut",
        "stagger": 0.15
      }
    },
    "none": {
      "id": "none",
      "name": "No Animation",
      "description": "Disable animations (accessibility)",
      "config": {
        "duration": 0,
        "delay": 0,
        "easing": "linear",
        "stagger": 0
      }
    }
  },
  "default": "moderate"
}
```

**Validation Rules**:
- `duration`: 0 to 2 seconds
- `delay`: 0 to 1 second
- `stagger`: 0 to 0.3 seconds
- `easing`: must be valid Framer Motion easing

**Relationships**: Used by components to apply consistent timing

---

### 2. Component Animation Config

**Purpose**: Per-component animation settings

**Location**: TypeScript interfaces in `src/types/animation.ts`

**Schema**:
```typescript
interface ComponentAnimationConfig {
  // Animation type
  type: 'scroll-reveal' | 'hover' | 'page-transition' | 'hero-special';
  
  // Enabled state
  enabled: boolean;
  
  // Animation variants
  variants: {
    hidden: MotionVariant;
    visible: MotionVariant;
    exit?: MotionVariant;
    hover?: MotionVariant;
  };
  
  // Transition configuration
  transition?: {
    duration: number;
    delay: number;
    ease: string | number[];
    stagger?: {
      children: number;
      from?: 'first' | 'last' | 'center' | number;
    };
  };
  
  // Viewport detection (for scroll-reveal)
  viewport?: {
    once: boolean;      // Animate only once?
    amount: number;     // 0-1, percentage of element visible
    margin: string;     // e.g., "-100px"
  };
  
  // Accessibility
  reducedMotion?: 'disable' | 'reduce' | 'ignore';
}

type MotionVariant = {
  opacity?: number;
  x?: number | string;
  y?: number | string;
  scale?: number;
  rotate?: number;
  [key: string]: any; // Allow custom properties
};
```

**Example - Scroll Reveal Card**:
```typescript
const cardScrollReveal: ComponentAnimationConfig = {
  type: 'scroll-reveal',
  enabled: true,
  variants: {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0 
    }
  },
  transition: {
    duration: 0.6,
    delay: 0,
    ease: [0.25, 0.46, 0.45, 0.94], // easeOutQuad
  },
  viewport: {
    once: true,
    amount: 0.3,
    margin: "0px"
  },
  reducedMotion: 'disable'
};
```

**Example - Hover Button**:
```typescript
const buttonHover: ComponentAnimationConfig = {
  type: 'hover',
  enabled: true,
  variants: {
    hidden: { scale: 1 },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 40px rgba(0,0,0,0.2)"
    }
  },
  transition: {
    duration: 0.2,
    delay: 0,
    ease: "easeOut"
  },
  reducedMotion: 'reduce' // Scale to 1.02 instead
};
```

**Validation Rules**:
- `type`: must be one of defined types
- `enabled`: boolean
- `variants.hidden` and `variants.visible`: required for scroll-reveal
- `transition.duration`: 0 to 2 seconds
- `viewport.amount`: 0 to 1
- `reducedMotion`: must be valid option

---

### 3. Global Animation State

**Purpose**: Runtime configuration and user preferences

**Location**: React Context or hooks state (not persisted)

**Schema**:
```typescript
interface GlobalAnimationState {
  // User preference
  prefersReducedMotion: boolean;
  
  // Environment
  isStackbitPreview: boolean;
  isLowPerformanceDevice: boolean;
  
  // Active preset
  activePreset: 'subtle' | 'moderate' | 'dramatic' | 'none';
  
  // Debug mode
  debugMode: boolean;
  showAnimationTriggers: boolean;
  
  // Performance metrics
  metrics?: {
    averageFPS: number;
    droppedFrames: number;
    animationCount: number;
  };
}
```

**Example**:
```typescript
const defaultState: GlobalAnimationState = {
  prefersReducedMotion: false,
  isStackbitPreview: false,
  isLowPerformanceDevice: false,
  activePreset: 'moderate',
  debugMode: false,
  showAnimationTriggers: false,
  metrics: undefined
};
```

**State Transitions**:
1. User visits site → Check `prefers-reduced-motion` media query
2. Performance monitoring → Detect low FPS → Set `isLowPerformanceDevice`
3. Debug mode → Toggle via URL param `?debug-animations=true`
4. Preset change → CMS update → Re-render with new config

---

## CMS Content Models (Stackbit)

### Extended Section Model

**Purpose**: Add optional animation properties to existing Stackbit sections

**Location**: `sources/local/models/*Section.ts` (modifications)

**Addition to Section Models**:
```typescript
// Example for GenericSection.ts
{
  type: 'object',
  name: 'animationConfig',
  label: 'Animation Settings',
  description: 'Configure how this section animates',
  required: false,
  fields: [
    {
      type: 'enum',
      name: 'preset',
      label: 'Animation Preset',
      options: [
        { label: 'Subtle', value: 'subtle' },
        { label: 'Moderate (Default)', value: 'moderate' },
        { label: 'Dramatic', value: 'dramatic' },
        { label: 'None', value: 'none' }
      ],
      default: 'moderate'
    },
    {
      type: 'boolean',
      name: 'animateOnScroll',
      label: 'Animate on Scroll',
      default: true
    },
    {
      type: 'number',
      name: 'delay',
      label: 'Delay (seconds)',
      default: 0,
      validation: (value) => value >= 0 && value <= 2
    }
  ]
}
```

**YAML Frontmatter Example**:
```yaml
---
type: GenericSection
title: 
  text: My Projects
animationConfig:
  preset: dramatic
  animateOnScroll: true
  delay: 0.2
---
```

**Note**: This is optional enhancement. MVP can work without CMS configuration, using defaults.

---

## Runtime Types (TypeScript)

### Hook Return Types

**useScrollAnimation Hook**:
```typescript
interface UseScrollAnimationReturn {
  ref: RefObject<HTMLElement>;
  isVisible: boolean;
  hasAnimated: boolean;
  controls: AnimationControls;
}
```

**useReducedMotion Hook**:
```typescript
interface UseReducedMotionReturn {
  prefersReducedMotion: boolean;
  shouldAnimate: boolean;
}
```

**usePageTransition Hook**:
```typescript
interface UsePageTransitionReturn {
  isTransitioning: boolean;
  startTransition: () => void;
  endTransition: () => void;
}
```

---

## Validation & Constraints

### Animation Config Validation

**Function**: `validateAnimationConfig(config: ComponentAnimationConfig): boolean`

**Rules**:
1. Duration between 0 and 2 seconds
2. Delay between 0 and 1 second
3. Viewport amount between 0 and 1
4. Valid easing function
5. If type='scroll-reveal', variants.hidden and variants.visible required
6. If type='hover', variants.hover required

**Example Implementation**:
```typescript
export function validateAnimationConfig(
  config: ComponentAnimationConfig
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (config.transition) {
    if (config.transition.duration < 0 || config.transition.duration > 2) {
      errors.push('Duration must be between 0 and 2 seconds');
    }
    if (config.transition.delay < 0 || config.transition.delay > 1) {
      errors.push('Delay must be between 0 and 1 second');
    }
  }
  
  if (config.viewport) {
    if (config.viewport.amount < 0 || config.viewport.amount > 1) {
      errors.push('Viewport amount must be between 0 and 1');
    }
  }
  
  if (config.type === 'scroll-reveal') {
    if (!config.variants.hidden || !config.variants.visible) {
      errors.push('Scroll-reveal requires hidden and visible variants');
    }
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
}
```

---

## Performance Considerations

### Animation Registry

**Purpose**: Track active animations to prevent performance issues

**Schema**:
```typescript
interface AnimationRegistry {
  activeAnimations: Map<string, {
    componentId: string;
    type: string;
    startTime: number;
    element: HTMLElement;
  }>;
  
  maxConcurrentAnimations: number; // e.g., 20
  
  register(id: string, animation: AnimationInfo): void;
  unregister(id: string): void;
  getActive(): AnimationInfo[];
  shouldThrottle(): boolean;
}
```

**Usage**:
- Components register on mount
- Unregister on unmount
- If `getActive().length > maxConcurrentAnimations`, reduce animation quality

---

## Summary

**Key Entities**:
1. ✅ AnimationPreset - Configuration presets
2. ✅ ComponentAnimationConfig - Per-component settings
3. ✅ GlobalAnimationState - Runtime state
4. ✅ CMS Extensions - Optional Stackbit fields

**Relationships**:
- AnimationPreset → ComponentAnimationConfig (provides defaults)
- GlobalAnimationState → All components (provides runtime context)
- CMS fields → ComponentAnimationConfig (user customization)

**No Database Required**: All configuration is code-based or CMS-based (Git), no separate database needed.
