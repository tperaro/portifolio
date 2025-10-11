# Component Contracts: Animation System

**Feature**: 001-adicionar-animações-interativas  
**Date**: 2025-10-11  
**Type**: Component Interface Definitions (TypeScript)

## Overview

Este documento define os contratos (interfaces) dos componentes e hooks do sistema de animações. Como esta é uma feature UI-only sem backend, "contracts" referem-se às interfaces TypeScript dos componentes React e hooks customizados.

---

## 1. AnimatedWrapper Component

**Purpose**: Wrapper universal para aplicar scroll-reveal animations a qualquer children

**File**: `src/components/atoms/AnimatedWrapper/index.tsx`

### Interface

```typescript
interface AnimatedWrapperProps {
  /**
   * Content to be animated
   */
  children: React.ReactNode;
  
  /**
   * Animation preset name
   * @default 'moderate'
   */
  preset?: 'subtle' | 'moderate' | 'dramatic' | 'none';
  
  /**
   * Animation direction
   * @default 'up'
   */
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  
  /**
   * Delay before animation starts (seconds)
   * @default 0
   */
  delay?: number;
  
  /**
   * Custom animation duration (overrides preset)
   */
  duration?: number;
  
  /**
   * Trigger animation only once
   * @default true
   */
  once?: boolean;
  
  /**
   * Percentage of element that must be visible to trigger (0-1)
   * @default 0.3
   */
  threshold?: number;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * HTML element type to render
   * @default 'div'
   */
  as?: keyof JSX.IntrinsicElements;
  
  /**
   * Test ID for testing
   */
  'data-testid'?: string;
}

export default function AnimatedWrapper(props: AnimatedWrapperProps): JSX.Element;
```

### Usage Examples

```typescript
// Basic usage - fade up animation
<AnimatedWrapper>
  <h2>My Title</h2>
</AnimatedWrapper>

// Custom direction and delay
<AnimatedWrapper direction="left" delay={0.2}>
  <Card />
</AnimatedWrapper>

// Dramatic preset with custom threshold
<AnimatedWrapper preset="dramatic" threshold={0.5}>
  <Image />
</AnimatedWrapper>

// Disabled animation
<AnimatedWrapper preset="none">
  <Content />
</AnimatedWrapper>
```

### Behavior

- **Scroll Detection**: Uses Intersection Observer API
- **Reduced Motion**: Automatically disables if `prefers-reduced-motion: reduce`
- **Stackbit Preview**: Uses simplified animations in preview mode
- **Performance**: Uses GPU-accelerated properties only (transform, opacity)

### Test Cases

```typescript
describe('AnimatedWrapper', () => {
  it('renders children correctly');
  it('applies fade-up animation by default');
  it('respects preset configuration');
  it('delays animation by specified amount');
  it('triggers only once when once=true');
  it('disables animation with prefers-reduced-motion');
  it('uses correct threshold for visibility detection');
});
```

---

## 2. AnimatedCard Component

**Purpose**: Pre-styled card component with hover and scroll animations

**File**: `src/components/blocks/AnimatedCard/index.tsx`

### Interface

```typescript
interface AnimatedCardProps {
  /**
   * Card title
   */
  title: string;
  
  /**
   * Card description
   */
  description?: string;
  
  /**
   * Card image
   */
  image?: {
    url: string;
    altText: string;
  };
  
  /**
   * Optional link
   */
  link?: {
    url: string;
    label: string;
  };
  
  /**
   * Hover animation style
   * @default 'elevate'
   */
  hoverStyle?: 'elevate' | 'tilt' | 'glow' | 'none';
  
  /**
   * Scroll reveal animation
   * @default true
   */
  animateOnScroll?: boolean;
  
  /**
   * Animation delay
   * @default 0
   */
  delay?: number;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Callback when card is clicked
   */
  onClick?: () => void;
  
  /**
   * Test ID
   */
  'data-testid'?: string;
}

export default function AnimatedCard(props: AnimatedCardProps): JSX.Element;
```

### Usage Examples

```typescript
// Project card with elevate hover
<AnimatedCard
  title="Project Name"
  description="Project description"
  image={{ url: '/images/project.jpg', altText: 'Project' }}
  link={{ url: '/projects/my-project', label: 'View Project' }}
  hoverStyle="elevate"
/>

// Simple card without link
<AnimatedCard
  title="Feature"
  description="Feature description"
  hoverStyle="glow"
  delay={0.1}
/>
```

### Behavior

- **Hover**: Scale, shadow, or tilt effect based on `hoverStyle`
- **Scroll**: Fade-in animation when entering viewport
- **Touch**: Tap feedback on mobile devices
- **Accessibility**: Keyboard focusable, proper ARIA labels

### Test Cases

```typescript
describe('AnimatedCard', () => {
  it('renders title and description');
  it('renders image when provided');
  it('renders link when provided');
  it('applies hover animation');
  it('animates on scroll');
  it('respects delay prop');
  it('handles click events');
  it('is keyboard accessible');
});
```

---

## 3. AnimatedHeroSection Component

**Purpose**: Hero section with typing effect and background animations

**File**: `src/components/sections/AnimatedHeroSection/index.tsx`

### Interface

```typescript
interface AnimatedHeroSectionProps {
  /**
   * Hero title (supports typing effect)
   */
  title: string;
  
  /**
   * Optional subtitle
   */
  subtitle?: string;
  
  /**
   * Text content
   */
  text?: string;
  
  /**
   * Call-to-action buttons
   */
  actions?: Array<{
    label: string;
    url: string;
    type: 'primary' | 'secondary';
  }>;
  
  /**
   * Hero image/media
   */
  media?: {
    url: string;
    altText: string;
    type: 'image' | 'video';
  };
  
  /**
   * Background animation type
   * @default 'gradient'
   */
  backgroundAnimation?: 'gradient' | 'particles' | 'none';
  
  /**
   * Enable typing effect on title
   * @default true
   */
  typingEffect?: boolean;
  
  /**
   * Typing speed (characters per second)
   * @default 15
   */
  typingSpeed?: number;
  
  /**
   * Animation preset
   * @default 'moderate'
   */
  preset?: 'subtle' | 'moderate' | 'dramatic';
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Stackbit field paths for CMS
   */
  'data-sb-field-path'?: string;
}

export default function AnimatedHeroSection(props: AnimatedHeroSectionProps): JSX.Element;
```

### Usage Examples

```typescript
// Full hero with typing and gradient
<AnimatedHeroSection
  title="Thiago Peraro"
  subtitle="Empreendedor e Pesquisador de IA"
  text="Combinando paixão por tecnologia..."
  actions={[
    { label: 'Ver Projetos', url: '/projects', type: 'primary' },
    { label: 'Contato', url: '/contact', type: 'secondary' }
  ]}
  media={{ url: '/images/hero.jpg', altText: 'Hero', type: 'image' }}
  backgroundAnimation="gradient"
  typingEffect={true}
/>

// Simple hero without effects
<AnimatedHeroSection
  title="About Me"
  subtitle="My Story"
  typingEffect={false}
  backgroundAnimation="none"
/>
```

### Behavior

- **Typing Effect**: Simulates typing animation on title
- **Background**: Animated gradient or particle system
- **Stagger**: Sequential animation of elements (title → subtitle → text → buttons)
- **Parallax**: Subtle parallax effect on scroll (optional)
- **Mobile**: Simplified animations on mobile devices

### Test Cases

```typescript
describe('AnimatedHeroSection', () => {
  it('renders title with typing effect');
  it('renders subtitle and text');
  it('renders action buttons');
  it('renders media when provided');
  it('applies background animation');
  it('staggers element animations');
  it('disables typing effect when specified');
  it('simplifies on mobile');
});
```

---

## 4. Hooks Contracts

### useScrollAnimation Hook

**Purpose**: Detect when element enters viewport and provide animation controls

**File**: `src/hooks/useScrollAnimation.ts`

```typescript
interface UseScrollAnimationOptions {
  /**
   * Trigger animation only once
   * @default true
   */
  once?: boolean;
  
  /**
   * Percentage of element visible to trigger (0-1)
   * @default 0.3
   */
  threshold?: number;
  
  /**
   * Root margin for Intersection Observer
   * @default '0px'
   */
  rootMargin?: string;
  
  /**
   * Enable/disable animation
   * @default true
   */
  enabled?: boolean;
}

interface UseScrollAnimationReturn {
  /**
   * Ref to attach to element
   */
  ref: React.RefObject<HTMLElement>;
  
  /**
   * Whether element is currently visible
   */
  isVisible: boolean;
  
  /**
   * Whether element has been animated at least once
   */
  hasAnimated: boolean;
  
  /**
   * Framer Motion animation controls
   */
  controls: AnimationControls;
}

export function useScrollAnimation(
  options?: UseScrollAnimationOptions
): UseScrollAnimationReturn;
```

**Usage Example**:
```typescript
function MyComponent() {
  const { ref, isVisible, controls } = useScrollAnimation({ 
    threshold: 0.5,
    once: true 
  });
  
  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{ opacity: 0 }}
    >
      Content
    </motion.div>
  );
}
```

---

### useReducedMotion Hook

**Purpose**: Detect user's motion preference

**File**: `src/hooks/useReducedMotion.ts`

```typescript
interface UseReducedMotionReturn {
  /**
   * True if user prefers reduced motion
   */
  prefersReducedMotion: boolean;
  
  /**
   * Recommended: whether animations should run
   * (considers both user pref and performance)
   */
  shouldAnimate: boolean;
}

export function useReducedMotion(): UseReducedMotionReturn;
```

**Usage Example**:
```typescript
function AnimatedComponent() {
  const { shouldAnimate } = useReducedMotion();
  
  if (!shouldAnimate) {
    return <StaticComponent />;
  }
  
  return <MotionComponent animate={{ opacity: 1 }} />;
}
```

---

### usePageTransition Hook

**Purpose**: Manage page transition state

**File**: `src/hooks/usePageTransition.ts`

```typescript
interface UsePageTransitionOptions {
  /**
   * Transition duration (milliseconds)
   * @default 400
   */
  duration?: number;
  
  /**
   * Callback when transition starts
   */
  onTransitionStart?: () => void;
  
  /**
   * Callback when transition ends
   */
  onTransitionEnd?: () => void;
}

interface UsePageTransitionReturn {
  /**
   * Whether page is currently transitioning
   */
  isTransitioning: boolean;
  
  /**
   * Start transition (call before navigation)
   */
  startTransition: () => void;
  
  /**
   * End transition (call after new page loaded)
   */
  endTransition: () => void;
  
  /**
   * Transition progress (0-1)
   */
  progress: number;
}

export function usePageTransition(
  options?: UsePageTransitionOptions
): UsePageTransitionReturn;
```

**Usage Example**:
```typescript
function Navigation() {
  const router = useRouter();
  const { startTransition, isTransitioning } = usePageTransition();
  
  const handleClick = (url: string) => {
    startTransition();
    setTimeout(() => router.push(url), 200);
  };
  
  return (
    <nav className={isTransitioning ? 'transitioning' : ''}>
      <Link onClick={() => handleClick('/about')}>About</Link>
    </nav>
  );
}
```

---

## 5. Utility Functions

### getAnimationConfig

**Purpose**: Get animation configuration based on context

**File**: `src/utils/animation-config.ts`

```typescript
interface AnimationConfigOptions {
  /**
   * Preset name
   */
  preset?: 'subtle' | 'moderate' | 'dramatic' | 'none';
  
  /**
   * Override user preferences (use with caution)
   */
  forceEnable?: boolean;
}

interface AnimationConfig {
  enabled: boolean;
  duration: number;
  delay: number;
  easing: string | number[];
  stagger: number;
  reducedMotion: boolean;
  isPreview: boolean;
}

export function getAnimationConfig(
  options?: AnimationConfigOptions
): AnimationConfig;
```

**Usage Example**:
```typescript
const config = getAnimationConfig({ preset: 'dramatic' });

<motion.div
  animate={{ opacity: config.enabled ? 1 : 1 }}
  transition={{ duration: config.duration, ease: config.easing }}
>
```

---

### isStackbitPreview

**Purpose**: Detect if running in Stackbit preview mode

**File**: `src/utils/animation-config.ts`

```typescript
export function isStackbitPreview(): boolean;
```

**Usage Example**:
```typescript
if (isStackbitPreview()) {
  // Use simplified animations in preview
  return <SimpleAnimation />;
}
return <ComplexAnimation />;
```

---

## Testing Contracts

### Animation Test Utilities

**File**: `tests/utils/animation-helpers.ts`

```typescript
/**
 * Wait for animation to complete
 */
export async function waitForAnimation(
  element: HTMLElement,
  duration: number
): Promise<void>;

/**
 * Check if element has animated
 */
export function hasAnimated(element: HTMLElement): boolean;

/**
 * Mock Intersection Observer
 */
export function mockIntersectionObserver(): void;

/**
 * Mock prefers-reduced-motion
 */
export function mockReducedMotion(enabled: boolean): void;

/**
 * Measure FPS during animation
 */
export async function measureFPS(
  callback: () => void,
  duration: number
): Promise<number>;
```

---

## Contract Validation

### Runtime Validation

All components should validate props using TypeScript and runtime checks:

```typescript
import { z } from 'zod';

const AnimatedWrapperPropsSchema = z.object({
  children: z.any(),
  preset: z.enum(['subtle', 'moderate', 'dramatic', 'none']).optional(),
  direction: z.enum(['up', 'down', 'left', 'right', 'fade']).optional(),
  delay: z.number().min(0).max(2).optional(),
  // ...
});

export function AnimatedWrapper(props: AnimatedWrapperProps) {
  // Validate in development
  if (process.env.NODE_ENV === 'development') {
    AnimatedWrapperPropsSchema.parse(props);
  }
  
  // Component logic...
}
```

---

## Summary

**Component Contracts**:
1. ✅ AnimatedWrapper - Universal animation wrapper
2. ✅ AnimatedCard - Pre-styled animated card
3. ✅ AnimatedHeroSection - Hero with special effects

**Hook Contracts**:
1. ✅ useScrollAnimation - Viewport detection
2. ✅ useReducedMotion - Accessibility preference
3. ✅ usePageTransition - Page navigation state

**Utility Contracts**:
1. ✅ getAnimationConfig - Configuration resolver
2. ✅ isStackbitPreview - Preview detection
3. ✅ Animation test utilities

All contracts include TypeScript types, usage examples, and test cases.
