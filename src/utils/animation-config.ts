/**
 * Animation Configuration Utilities
 * Feature: 001-adicionar-animações-interativas
 * 
 * Provides utility functions for animation configuration and detection.
 */

import type { AnimationConfig, PresetName } from '../types/animation';

/**
 * Detect if running in Stackbit preview mode
 * @returns {boolean} True if in Stackbit preview
 */
export const isStackbitPreview = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return (
    window.location.search.includes('stackbitPreview=true') ||
    process.env.STACKBIT_PREVIEW === 'true' ||
    process.env.NEXT_PUBLIC_STACKBIT_PREVIEW === 'true'
  );
};

/**
 * Detect if user prefers reduced motion
 * @returns {boolean} True if prefers-reduced-motion is enabled
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Detect low-performance device based on hardware concurrency
 * @returns {boolean} True if device appears to be low-performance
 */
export const isLowPerformanceDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const cores = navigator.hardwareConcurrency || 0;
  const memory = (navigator as any).deviceMemory || 0;
  
  // Consider low-performance if <= 2 cores or <= 2GB RAM
  return cores <= 2 || memory <= 2;
};

/**
 * Get animation configuration based on preset and environment
 * @param {PresetName} preset - Animation preset name
 * @returns {AnimationConfig} Animation configuration object
 */
export function getAnimationConfig(preset: PresetName = 'moderate'): AnimationConfig {
  const reducedMotion = prefersReducedMotion();
  const isPreview = isStackbitPreview();
  const lowPerf = isLowPerformanceDevice();
  
  // Disable animations if user prefers reduced motion or preset is 'none'
  if (reducedMotion || preset === 'none') {
    return { 
      enabled: false, 
      duration: 0, 
      delay: 0, 
      easing: 'linear', 
      stagger: 0 
    };
  }
  
  // Simplify animations in Stackbit preview for better editor experience
  if (isPreview) {
    return { 
      enabled: true, 
      duration: 0.2, 
      delay: 0, 
      easing: 'easeOut', 
      stagger: 0.05 
    };
  }
  
  // Reduce animation intensity on low-performance devices
  if (lowPerf) {
    return {
      enabled: true,
      duration: 0.3,
      delay: 0,
      easing: 'easeOut',
      stagger: 0.05
    };
  }
  
  // Standard presets for normal conditions
  const presets: Record<PresetName, Omit<AnimationConfig, 'enabled'>> = {
    subtle: { 
      duration: 0.3, 
      delay: 0, 
      easing: 'easeOut', 
      stagger: 0.05 
    },
    moderate: { 
      duration: 0.6, 
      delay: 0.1, 
      easing: 'easeInOut', 
      stagger: 0.1 
    },
    dramatic: { 
      duration: 0.9, 
      delay: 0.2, 
      easing: [0.25, 0.46, 0.45, 0.94] as any, // easeOutQuad cubic-bezier
      stagger: 0.15 
    },
    none: {
      duration: 0,
      delay: 0,
      easing: 'linear',
      stagger: 0
    }
  };
  
  return { enabled: true, ...presets[preset] };
}

/**
 * Get direction variants for animations
 * @param {string} direction - Animation direction
 * @param {number} distance - Distance to move (pixels)
 * @returns {object} Motion variants for hidden state
 */
export function getDirectionVariants(
  direction: 'up' | 'down' | 'left' | 'right' | 'fade',
  distance: number = 50
) {
  switch (direction) {
    case 'up':
      return { y: distance };
    case 'down':
      return { y: -distance };
    case 'left':
      return { x: distance };
    case 'right':
      return { x: -distance };
    case 'fade':
    default:
      return {};
  }
}

/**
 * Create scroll animation variants
 * @param {string} direction - Animation direction
 * @param {number} distance - Distance to move (pixels)
 * @returns {object} Framer Motion variants object
 */
export function createScrollVariants(
  direction: 'up' | 'down' | 'left' | 'right' | 'fade' = 'up',
  distance: number = 50
) {
  const directionOffset = getDirectionVariants(direction, distance);
  
  return {
    hidden: {
      opacity: 0,
      ...directionOffset
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0
    }
  };
}

/**
 * Create hover animation variants
 * @param {string} style - Hover style type
 * @returns {object} Framer Motion hover variants
 */
export function createHoverVariants(style: 'elevate' | 'tilt' | 'glow' = 'elevate') {
  switch (style) {
    case 'elevate':
      return {
        scale: 1.05,
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.15)',
        y: -5
      };
    case 'tilt':
      return {
        scale: 1.02,
        rotateY: 5,
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.12)'
      };
    case 'glow':
      return {
        scale: 1.03,
        boxShadow: '0 0 30px rgba(59, 130, 246, 0.5)' // blue glow
      };
    default:
      return {
        scale: 1.05
      };
  }
}

/**
 * Get easing function
 * @param {string|number[]} easing - Easing name or cubic-bezier array
 * @returns {string|number[]} Valid Framer Motion easing
 */
export function getEasing(easing: string | number[]): string | number[] {
  if (Array.isArray(easing)) {
    return easing;
  }
  
  // Map string names to Framer Motion easing
  const easingMap: Record<string, string> = {
    linear: 'linear',
    easeIn: 'easeIn',
    easeOut: 'easeOut',
    easeInOut: 'easeInOut',
    circIn: 'circIn',
    circOut: 'circOut',
    circInOut: 'circInOut',
    backIn: 'backIn',
    backOut: 'backOut',
    backInOut: 'backInOut'
  };
  
  return easingMap[easing] || 'easeInOut';
}

/**
 * Debug helper to log animation config
 * @param {string} componentName - Name of component
 * @param {AnimationConfig} config - Animation config to log
 */
export function debugAnimation(componentName: string, config: AnimationConfig): void {
  if (typeof window !== 'undefined' && window.location.search.includes('debug-animations=true')) {
    console.log(`[Animation Debug] ${componentName}:`, config);
  }
}

/**
 * Check if animations should be enabled globally
 * @returns {boolean} True if animations are enabled
 */
export function shouldEnableAnimations(): boolean {
  return !prefersReducedMotion() && !isLowPerformanceDevice();
}
