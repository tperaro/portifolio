/**
 * AnimatedCard Component
 * Feature: 001-adicionar-animações-interativas
 *
 * Pre-styled card component with hover and scroll animations.
 * Provides interactive feedback on hover/tap and smooth scroll-reveal.
 *
 * Usage:
 * ```tsx
 * <AnimatedCard
 *   title="Project Name"
 *   description="Project description"
 *   image={{ url: '/images/project.jpg', altText: 'Project' }}
 *   link={{ url: '/projects/my-project', label: 'View Project' }}
 *   hoverStyle="elevate"
 * />
 * ```
 */

import React from 'react';
import { m, cubicBezier, easeInOut, easeOut } from 'framer-motion';
import classNames from 'classnames';
import { useScrollAnimation } from '@/hooks';
import { useReducedMotion } from '@/hooks';
import { useParallaxOnHover } from '@/hooks';
import { getAnimationConfig } from '@/utils/animation-config';

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

export default function AnimatedCard({
  title,
  description,
  image,
  link,
  hoverStyle = 'elevate',
  animateOnScroll = true,
  delay = 0,
  className = '',
  onClick,
  'data-testid': testId
}: AnimatedCardProps): React.JSX.Element {
  const config = getAnimationConfig('moderate');
  const prefersReducedMotion = useReducedMotion();
  const { ref, controls } = useScrollAnimation({
    once: true,
    threshold: 0.2,
    enabled: animateOnScroll && config.enabled && !prefersReducedMotion
  });

  // Hover parallax on image
  const { ref: parallaxRef, x: imgX, y: imgY } = useParallaxOnHover({ intensity: 8 });

  // Hover variants based on style
  const getHoverVariant = () => {
    if (prefersReducedMotion || hoverStyle === 'none') {
      return {};
    }

    const cubicEase = cubicBezier(0.4, 0, 0.2, 1);
    switch (hoverStyle) {
      case 'elevate':
        return {
          y: -8,
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
          transition: { duration: 0.3, ease: cubicEase }
        };
      case 'tilt':
        return {
          rotateZ: 2,
          scale: 1.02,
          boxShadow: '0 15px 30px rgba(0, 0, 0, 0.12)',
          transition: { duration: 0.3, ease: cubicEase }
        };
      case 'glow':
        return {
          scale: 1.02,
          boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)',
          transition: { duration: 0.3, ease: cubicEase }
        };
      default:
        return {};
    }
  };

  // Tap variant for mobile feedback
  const tapVariant = prefersReducedMotion ? {} : {
    scale: 0.98,
    transition: { duration: 0.1 }
  };

  // Scroll animation variants (body text: title, description, link)
  const scrollVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  // Convert easing to Framer Motion compatible format
  const getEasing = () => {
    if (typeof config.easing === 'string') {
      // Map string names to Framer Motion easing functions
      const easingMap: Record<string, any> = {
        linear: 'linear',
        easeIn: 'easeIn',
        easeOut: easeOut,
        easeInOut: easeInOut,
        circIn: 'circIn',
        circOut: 'circOut',
        circInOut: 'circInOut',
        backIn: 'backIn',
        backOut: 'backOut',
        backInOut: 'backInOut'
      };
      return easingMap[config.easing] || easeInOut;
    }
    if (Array.isArray(config.easing) && config.easing.length === 4) {
      return cubicBezier(config.easing[0], config.easing[1], config.easing[2], config.easing[3]);
    }
    return easeInOut;
  };

  const animationProps = animateOnScroll && !prefersReducedMotion ? {
    ref: ref as any,
    initial: 'hidden',
    animate: controls,
    variants: scrollVariants,
    transition: {
      duration: config.duration,
      delay: delay + config.delay,
      ease: getEasing()
    }
  } : {};

  const cardContent = (
    <m.div
      className={classNames(
        'relative',
        'overflow-hidden',
        'rounded-lg',
        'bg-white',
        'dark:bg-gray-800',
        'border',
        'border-gray-200',
        'dark:border-gray-700',
        'shadow-md',
        'transition-shadow',
        'cursor-pointer',
        className
      )}
      whileHover={getHoverVariant()}
      whileTap={tapVariant}
      onClick={onClick}
      data-testid={testId}
    >
      {image && (
        <m.div
          ref={parallaxRef as React.Ref<HTMLDivElement>}
          className="relative w-full h-48 overflow-hidden"
          initial={!prefersReducedMotion ? { clipPath: 'inset(100% 0 0 0)' } : {}}
          whileInView={!prefersReducedMotion ? { clipPath: 'inset(0% 0 0 0)' } : {}}
          viewport={{ once: true, margin: '200px' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <m.img
            src={image.url}
            alt={image.altText}
            className="w-full h-full object-cover"
            style={{ x: imgX, y: imgY }}
            whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
            transition={{ duration: 0.4, ease: cubicBezier(0.4, 0, 0.2, 1) }}
          />
        </m.div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>

        {description && (
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {description}
          </p>
        )}

        {link && (
          <a
            href={link.url}
            className={classNames(
              'inline-flex',
              'items-center',
              'text-blue-600',
              'dark:text-blue-400',
              'font-medium',
              'hover:text-blue-700',
              'dark:hover:text-blue-300',
              'transition-colors'
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {link.label}
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        )}
      </div>
    </m.div>
  );

  if (!animateOnScroll || prefersReducedMotion) {
    return cardContent;
  }

  return (
    <m.div {...animationProps}>
      {cardContent}
    </m.div>
  );
}
