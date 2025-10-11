/**
 * useScrollAnimation Hook
 * Feature: 001-adicionar-animações-interativas
 * 
 * Detects when an element enters the viewport using Intersection Observer API
 * and provides animation controls via Framer Motion.
 * 
 * Usage:
 * ```tsx
 * const { ref, isVisible, controls } = useScrollAnimation({ 
 *   threshold: 0.3,
 *   once: true 
 * });
 * 
 * <motion.div
 *   ref={ref}
 *   animate={controls}
 *   initial={{ opacity: 0, y: 50 }}
 * >
 *   Content
 * </motion.div>
 * ```
 */

import { useEffect, useRef, useState } from 'react';
import { useAnimation, AnimationControls } from 'framer-motion';

export interface UseScrollAnimationOptions {
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

export interface UseScrollAnimationReturn {
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
  options: UseScrollAnimationOptions = {}
): UseScrollAnimationReturn {
  const {
    once = true,
    threshold = 0.3,
    rootMargin = '0px',
    enabled = true
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    // Skip if disabled or SSR
    if (!enabled || typeof window === 'undefined') {
      return;
    }

    const element = ref.current;
    if (!element) {
      return;
    }

    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: assume visible
      setIsVisible(true);
      setHasAnimated(true);
      controls.start('visible');
      return;
    }

    // Create observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isIntersecting = entry.isIntersecting;
        
        // Update visibility state
        setIsVisible(isIntersecting);
        
        // Trigger animation on first intersection
        if (isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          controls.start('visible');
          
          // Unobserve if once=true
          if (once) {
            observer.unobserve(element);
          }
        } else if (!isIntersecting && !once && hasAnimated) {
          // Reset animation if element exits and once=false
          controls.start('hidden');
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    // Start observing
    observer.observe(element);

    // Cleanup
    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [controls, once, threshold, rootMargin, enabled, hasAnimated]);

  return {
    ref,
    isVisible,
    hasAnimated,
    controls
  };
}

export default useScrollAnimation;
