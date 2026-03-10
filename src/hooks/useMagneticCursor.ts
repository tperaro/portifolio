/**
 * useMagneticCursor Hook
 * Feature: 001-adicionar-animações-interativas
 *
 * Makes an element magnetically follow the cursor when within a given radius.
 * Disabled on touch/mobile devices and when prefers-reduced-motion is active.
 *
 * Usage:
 * ```tsx
 * const { ref, x, y } = useMagneticCursor({ strength: 0.3, radius: 80 });
 * <motion.button ref={ref} style={{ x, y }}>Click me</motion.button>
 * ```
 */

import { useEffect, useRef } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export interface UseMagneticCursorOptions {
  /** How far the element moves toward the cursor (0–1 scale). @default 0.3 */
  strength?: number;
  /** Pixel radius within which the magnetic effect activates. @default 80 */
  radius?: number;
}

const SPRING_CONFIG = { stiffness: 150, damping: 15, mass: 0.1 };

export function useMagneticCursor(options: UseMagneticCursorOptions = {}) {
  const { strength = 0.3, radius = 80 } = options;

  const ref = useRef<HTMLElement | null>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const x = useSpring(rawX, SPRING_CONFIG);
  const y = useSpring(rawY, SPRING_CONFIG);

  useEffect(() => {
    // SSR guard
    if (typeof window === 'undefined') return;

    // Disable on touch/coarse-pointer devices (mobile)
    if (window.matchMedia('(pointer: coarse)').matches) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const offsetX = event.clientX - centerX;
      const offsetY = event.clientY - centerY;
      const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);

      if (distance < radius) {
        rawX.set(offsetX * strength);
        rawY.set(offsetY * strength);
      } else {
        rawX.set(0);
        rawY.set(0);
      }
    };

    const handleMouseLeave = () => {
      rawX.set(0);
      rawY.set(0);
    };

    window.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, radius, rawX, rawY]);

  return { ref, x, y };
}
