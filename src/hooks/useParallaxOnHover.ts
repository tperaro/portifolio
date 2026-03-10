/**
 * useParallaxOnHover Hook
 * Feature: 001-adicionar-animações-interativas
 *
 * Creates a subtle parallax effect on an inner element when hovering the ref
 * container. The inner element moves opposite to the cursor direction.
 * Only enabled for fine-pointer (mouse) devices; disabled on touch/mobile and
 * when prefers-reduced-motion is active.
 *
 * Usage:
 * ```tsx
 * const { ref, x, y } = useParallaxOnHover({ intensity: 8 });
 * <div ref={ref}>
 *   <motion.img style={{ x, y }} />
 * </div>
 * ```
 */

import { useEffect, useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion } from './useReducedMotion';

export interface UseParallaxOnHoverOptions {
  /** Max pixels to move in each direction. @default 8 */
  intensity?: number;
}

const SPRING_CONFIG = { stiffness: 100, damping: 30 };

export function useParallaxOnHover(options: UseParallaxOnHoverOptions = {}) {
  const { intensity = 8 } = options;

  const ref = useRef<HTMLElement | null>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, SPRING_CONFIG);
  const y = useSpring(rawY, SPRING_CONFIG);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // SSR guard
    if (typeof window === 'undefined') return;

    // Only enable for fine-pointer (mouse) devices
    if (!window.matchMedia('(pointer: fine)').matches) return;

    // Respect prefers-reduced-motion (reactive: re-runs if user toggles OS setting)
    if (prefersReducedMotion) return;

    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width;
      const relY = (event.clientY - rect.top) / rect.height;

      // (relX - 0.5) ranges from -0.5 to 0.5; multiply by 2 to reach full [-intensity, intensity] range
      rawX.set(-(relX - 0.5) * 2 * intensity);
      rawY.set(-(relY - 0.5) * 2 * intensity);
    };

    const handleMouseLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity, prefersReducedMotion]);

  return { ref, x, y };
}
