# Quickstart: Adicionar Animações Interativas ao Portfólio

**Feature**: 001-adicionar-animações-interativas  
**Date**: 2025-10-11  
**Audience**: Developers implementing this feature

## Prerequisites

- Node.js 18.x installed
- Repository cloned: `git clone <repo>`
- Branch checked out: `git checkout 001-adicionar-animações-interativas`
- Dependencies installed: `npm install`

---

## 🚀 Quick Setup (5 minutes)

### 1. Install New Dependencies

```bash
# Animation libraries
npm install aceternity-ui framer-motion

# Testing dependencies
npm install --save-dev jest @testing-library/react @testing-library/jest-dom @playwright/test jest-environment-jsdom

# Intersection Observer polyfill (for older browsers)
npm install intersection-observer
```

### 2. Configure Testing

Create `jest.config.js`:
```javascript
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
  ],
}

module.exports = createJestConfig(customJestConfig)
```

Create `jest.setup.js`:
```javascript
import '@testing-library/jest-dom'
import 'intersection-observer'
```

### 3. Update Tailwind Config

Add Aceternity UI to Tailwind configuration in `tailwind.config.js`:
```javascript
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './content/**/*.{md,json}',
    './node_modules/aceternity-ui/**/*.{js,ts,jsx,tsx}', // Add this
  ],
  // ... rest of config
}
```

### 4. Setup Framer Motion in _app.js

Modify `src/pages/_app.js`:
```javascript
import { LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import '../css/main.css';

export default function MyApp({ Component, pageProps, router }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence mode="wait" initial={false}>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </LazyMotion>
  );
}
```

### 5. Create Animation Config

Create `src/utils/animation-config.ts`:
```typescript
export const isStackbitPreview = () => {
  if (typeof window === 'undefined') return false;
  return (
    window.location.search.includes('stackbitPreview=true') ||
    process.env.STACKBIT_PREVIEW === 'true'
  );
};

export function getAnimationConfig(preset: 'subtle' | 'moderate' | 'dramatic' | 'none' = 'moderate') {
  const prefersReducedMotion = 
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  const isPreview = isStackbitPreview();
  
  if (prefersReducedMotion || preset === 'none') {
    return { enabled: false, duration: 0, delay: 0, easing: 'linear', stagger: 0 };
  }
  
  if (isPreview) {
    return { enabled: true, duration: 0.2, delay: 0, easing: 'easeOut', stagger: 0.05 };
  }
  
  const presets = {
    subtle: { duration: 0.3, delay: 0, easing: 'easeOut', stagger: 0.05 },
    moderate: { duration: 0.6, delay: 0.1, easing: 'easeInOut', stagger: 0.1 },
    dramatic: { duration: 0.9, delay: 0.2, easing: [0.25, 0.46, 0.45, 0.94], stagger: 0.15 },
  };
  
  return { enabled: true, ...presets[preset] };
}
```

---

## 📝 Development Workflow

### Step 1: Create Your First Animated Component

Create `src/components/atoms/AnimatedWrapper/index.tsx`:
```typescript
import { motion, useInView, useAnimation } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { getAnimationConfig } from '@/utils/animation-config';

interface Props {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;
  className?: string;
}

export default function AnimatedWrapper({ 
  children, 
  direction = 'up', 
  delay = 0,
  className = ''
}: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();
  const config = getAnimationConfig();
  
  useEffect(() => {
    if (isInView && config.enabled) {
      controls.start('visible');
    }
  }, [isInView, controls, config.enabled]);
  
  const variants = {
    hidden: {
      opacity: 0,
      y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0,
      x: direction === 'left' ? 50 : direction === 'right' ? -50 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration: config.duration,
        delay: delay + config.delay,
        ease: config.easing,
      },
    },
  };
  
  if (!config.enabled) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

### Step 2: Use in Existing Component

Modify an existing section, e.g., `src/components/sections/GenericSection/index.tsx`:
```typescript
import AnimatedWrapper from '@/components/atoms/AnimatedWrapper';

export default function GenericSection(props) {
  const { title, text } = props;
  
  return (
    <div className="section">
      <AnimatedWrapper direction="up">
        <h2>{title}</h2>
      </AnimatedWrapper>
      
      <AnimatedWrapper direction="up" delay={0.1}>
        <p>{text}</p>
      </AnimatedWrapper>
    </div>
  );
}
```

### Step 3: Test Your Component

Create `tests/unit/components/AnimatedWrapper.test.tsx`:
```typescript
import { render, screen } from '@testing-library/react';
import AnimatedWrapper from '@/components/atoms/AnimatedWrapper';

describe('AnimatedWrapper', () => {
  it('renders children correctly', () => {
    render(
      <AnimatedWrapper>
        <div>Test Content</div>
      </AnimatedWrapper>
    );
    
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
  
  it('disables animation with prefers-reduced-motion', () => {
    window.matchMedia = jest.fn().mockImplementation(query => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
    
    render(<AnimatedWrapper>Content</AnimatedWrapper>);
    // Animation should be disabled
  });
});
```

Run tests:
```bash
npm test
```

### Step 4: Run Development Server

```bash
npm run dev
```

Visit http://localhost:3000 and scroll to see your animations!

---

## 🎨 Common Patterns

### Pattern 1: Staggered Children

```typescript
<motion.div
  variants={{
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }}
  initial="hidden"
  animate="visible"
>
  {items.map(item => (
    <AnimatedWrapper key={item.id}>
      <Card {...item} />
    </AnimatedWrapper>
  ))}
</motion.div>
```

### Pattern 2: Hover Animation

```typescript
<motion.button
  whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(0,0,0,0.2)" }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
>
  Click Me
</motion.button>
```

### Pattern 3: Page Transition

```typescript
// In _app.js
<AnimatePresence mode="wait">
  <motion.div
    key={router.route}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Component {...pageProps} />
  </motion.div>
</AnimatePresence>
```

---

## 🐛 Debugging

### Enable Debug Mode

Add query parameter: `http://localhost:3000?debug-animations=true`

### Check Animation Performance

```typescript
// In browser console
performance.mark('animation-start');
// ... animation occurs ...
performance.mark('animation-end');
performance.measure('animation', 'animation-start', 'animation-end');
console.log(performance.getEntriesByName('animation')[0].duration);
```

### Common Issues

**Issue**: Animations not working in Stackbit preview  
**Solution**: Check `isStackbitPreview()` returns correct value

**Issue**: Intersection Observer errors  
**Solution**: Ensure polyfill is loaded: `import 'intersection-observer'`

**Issue**: Animations janky on mobile  
**Solution**: Use only transform/opacity, check GPU acceleration

---

## 📦 Build for Production

```bash
# Build
npm run build

# Check bundle size
npm run build -- --analyze

# Test production build locally
npm start
```

---

## ✅ Verification Checklist

Before marking feature complete:

- [ ] Animations work on homepage
- [ ] Scroll-reveal triggers correctly
- [ ] Hover effects responsive
- [ ] Respects `prefers-reduced-motion`
- [ ] Works in Stackbit preview
- [ ] Bundle size ≤ 50KB increase
- [ ] Lighthouse score maintained
- [ ] All tests passing
- [ ] No console errors
- [ ] Cross-browser tested (Chrome, Firefox, Safari)

---

## 📚 Further Reading

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Aceternity UI Components](https://ui.aceternity.com/)
- [Web Animations Best Practices](https://web.dev/animations/)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

---

## 🆘 Getting Help

- Check `research.md` for technical decisions
- Review `contracts/component-interfaces.md` for API reference
- See `data-model.md` for configuration schemas
- Open issue on GitHub if stuck

---

**Ready to code!** Start with Step 1 above and build incrementally. Test each component before moving to the next.
