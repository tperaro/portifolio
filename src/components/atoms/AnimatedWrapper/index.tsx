/**
 * AnimatedWrapper Component
 * Feature: 001-adicionar-animações-interativas
 * 
 * Universal wrapper component for applying scroll-reveal animations to any children.
 * Automatically detects when element enters viewport and triggers animation.
 * Respects user's motion preferences and environment (Stackbit preview, etc.)
 * 
 * Usage:
 * ```tsx
 * <AnimatedWrapper direction="up" delay={0.2}>
 *   <h2>My Content</h2>
 * </AnimatedWrapper>
 * ```
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/hooks';
import { useReducedMotion } from '@/hooks';
import { getAnimationConfig, createScrollVariants } from '@/utils/animation-config';
import type { AnimatedWrapperProps } from '@/types/animation';

export default function AnimatedWrapper({
  children,
  preset = 'moderate',
  direction = 'up',
  delay = 0,
  duration,
  once = true,
  threshold = 0.3,
  className = '',
  as = 'div',
  'data-testid': testId
}: AnimatedWrapperProps): React.JSX.Element {
  // Get animation configuration based on preset and environment
  const config = getAnimationConfig(preset);
  const prefersReducedMotion = useReducedMotion();
  
  // Get scroll animation controls
  const { ref, controls } = useScrollAnimation({
    once,
    threshold,
    enabled: config.enabled && !prefersReducedMotion
  });
  
  // Create animation variants based on direction
  const variants = createScrollVariants(direction, 50);
  
  // Determine final animation duration (custom or from config)
  const finalDuration = duration !== undefined ? duration : config.duration;
  
  // If animations are disabled, render static content
  if (!config.enabled || prefersReducedMotion) {
    const Component = as;
    return (
      <Component className={className} data-testid={testId}>
        {children}
      </Component>
    );
  }
  
  // Cast 'as' prop to motion component
  const MotionComponent = motion[as] as any;
  
  return (
    <MotionComponent
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      transition={{
        duration: finalDuration,
        delay: delay + config.delay,
        ease: config.easing
      }}
      className={className}
      data-testid={testId}
    >
      {children}
    </MotionComponent>
  );
}
