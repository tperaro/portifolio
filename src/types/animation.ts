/**
 * Animation Type Definitions
 * Feature: 001-adicionar-animações-interativas
 * 
 * This file contains TypeScript interfaces and types for the animation system.
 * Based on data-model.md specifications.
 */

import React from 'react';

// ============================================================================
// Easing Functions
// ============================================================================

export type EasingFunction = 
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
  | string; // Custom cubic-bezier like [0.25, 0.46, 0.45, 0.94]

// ============================================================================
// Animation Presets
// ============================================================================

export interface AnimationPreset {
  id: string;
  name: string;
  description: string;
  config: {
    duration: number;    // seconds (0-2)
    delay: number;       // seconds (0-1)
    easing: EasingFunction;
    stagger: number;     // seconds between staggered children (0-0.3)
  };
}

export interface AnimationPresets {
  presets: {
    subtle: AnimationPreset;
    moderate: AnimationPreset;
    dramatic: AnimationPreset;
    none: AnimationPreset;
  };
  default: 'subtle' | 'moderate' | 'dramatic' | 'none';
}

export type PresetName = 'subtle' | 'moderate' | 'dramatic' | 'none';

// ============================================================================
// Motion Variants
// ============================================================================

export type MotionVariant = {
  opacity?: number;
  x?: number | string;
  y?: number | string;
  scale?: number;
  rotate?: number;
  rotateX?: number;
  rotateY?: number;
  skewX?: number;
  skewY?: number;
  transition?: {
    duration?: number;
    delay?: number;
    ease?: string | number[];
  };
  [key: string]: any; // Allow custom properties
};

// ============================================================================
// Component Animation Config
// ============================================================================

export type AnimationType = 'scroll-reveal' | 'hover' | 'page-transition' | 'hero-special';

export type ReducedMotionBehavior = 'disable' | 'reduce' | 'ignore';

export interface ComponentAnimationConfig {
  // Animation type
  type: AnimationType;
  
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
  reducedMotion?: ReducedMotionBehavior;
}

// ============================================================================
// Global Animation State
// ============================================================================

export interface AnimationMetrics {
  averageFPS: number;
  droppedFrames: number;
  animationCount: number;
}

export interface GlobalAnimationState {
  // User preference
  prefersReducedMotion: boolean;
  
  // Environment
  isStackbitPreview: boolean;
  isLowPerformanceDevice: boolean;
  
  // Active preset
  activePreset: PresetName;
  
  // Debug mode
  debugMode: boolean;
  showAnimationTriggers: boolean;
  
  // Performance metrics
  metrics?: AnimationMetrics;
}

// ============================================================================
// Component Props Types
// ============================================================================

export type AnimationDirection = 'up' | 'down' | 'left' | 'right' | 'fade';

export interface AnimatedWrapperProps {
  children: React.ReactNode;
  preset?: PresetName;
  direction?: AnimationDirection;
  delay?: number;
  duration?: number;
  once?: boolean;
  threshold?: number;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  'data-testid'?: string;
}

export interface AnimatedCardProps {
  title: string;
  description?: string;
  image?: string;
  href?: string;
  hoverStyle?: 'elevate' | 'tilt' | 'glow';
  className?: string;
  'data-testid'?: string;
}

export interface AnimatedHeroSectionProps {
  title: string;
  subtitle?: string;
  backgroundAnimation?: 'parallax' | 'gradient' | 'particles' | 'none';
  typingEffect?: boolean;
  className?: string;
  'data-testid'?: string;
}

// ============================================================================
// Utility Types
// ============================================================================

export interface AnimationConfig {
  enabled: boolean;
  duration: number;
  delay: number;
  easing: string | number[] | ((t: number) => number);
  stagger: number;
}

export interface ScrollAnimationResult {
  ref: React.RefObject<any>;
  isVisible: boolean;
  controls: any; // AnimationControls from framer-motion
}

// ============================================================================
// Validation Types
// ============================================================================

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

// ============================================================================
// CMS Integration Types (Stackbit)
// ============================================================================

export interface SectionAnimationProps {
  animationPreset?: PresetName;
  animationDirection?: AnimationDirection;
  animationDelay?: number;
  disableAnimation?: boolean;
}
