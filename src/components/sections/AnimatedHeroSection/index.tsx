/**
 * AnimatedHeroSection Component
 * Feature: 001-adicionar-animações-interativas
 * 
 * Hero section with special animations:
 * - Typing effect on title
 * - Animated background (gradient/particles)
 * - Sequential element entrance
 * - Respects reduced motion preferences
 * - Optimized for mobile (simplified animations)
 * 
 * User Story 4: "Wow factor" animations for homepage hero
 */

import React, { useState, useEffect } from 'react';
import { m, cubicBezier } from 'framer-motion';
import classNames from 'classnames';
import { useReducedMotion } from '@/hooks';
import { getAnimationConfig } from '@/utils/animation-config';
import Action from '../../atoms/Action';
import ImageBlock from '../../blocks/ImageBlock';

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
    [key: string]: any;
  }>;
  
  /**
   * Hero image/media
   */
  media?: {
    url: string;
    altText: string;
    type?: 'image' | 'video';
    [key: string]: any;
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
  
  /**
   * Element ID
   */
  elementId?: string;
  
  /**
   * Colors
   */
  colors?: string;
  
  /**
   * Styles
   */
  styles?: any;
}

export default function AnimatedHeroSection(props: AnimatedHeroSectionProps): React.JSX.Element {
  const {
    title,
    subtitle,
    text,
    actions = [],
    media,
    backgroundAnimation = 'gradient',
    typingEffect = true,
    typingSpeed = 15,
    preset = 'moderate',
    className,
    elementId,
    colors = 'bg-light-fg-dark',
    styles = {},
    'data-sb-field-path': fieldPath
  } = props;

  const prefersReducedMotion = useReducedMotion();
  const config = getAnimationConfig(preset);
  const [isMobile, setIsMobile] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  // Typing effect state
  const [displayedTitle, setDisplayedTitle] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Typing effect
  useEffect(() => {
    if (!typingEffect || prefersReducedMotion || !config.enabled || hasAnimated) {
      setDisplayedTitle(title);
      setIsTypingComplete(true);
      return;
    }

    const charactersPerMs = typingSpeed / 1000;
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= title.length) {
        setDisplayedTitle(title.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        setHasAnimated(true);
        clearInterval(typingInterval);
      }
    }, 1000 / typingSpeed);

    return () => clearInterval(typingInterval);
  }, [title, typingEffect, typingSpeed, prefersReducedMotion, config.enabled, hasAnimated]);

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: typingEffect && !prefersReducedMotion ? 2.5 : 0
      }
    }
  };

  const cubicEase = cubicBezier(0.4, 0, 0.2, 1);
  
  const itemVariants = prefersReducedMotion || !config.enabled
    ? {}
    : {
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: cubicEase
          }
        }
      };

  const mediaVariants = prefersReducedMotion || !config.enabled
    ? {}
    : {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.8,
            ease: cubicEase,
            delay: 0.3
          }
        }
      };

  // Background animation styles
  const getBackgroundAnimation = () => {
    if (backgroundAnimation === 'none' || prefersReducedMotion || !config.enabled) {
      return null;
    }

    if (backgroundAnimation === 'gradient' && !isMobile) {
      return (
        <m.div
          className="absolute inset-0 opacity-30 pointer-events-none"
          animate={{
            background: [
              'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
              'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              'linear-gradient(225deg, #667eea 0%, #764ba2 100%)',
              'linear-gradient(315deg, #667eea 0%, #764ba2 100%)',
              'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
            ]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      );
    }

    if (backgroundAnimation === 'particles' && !isMobile) {
      // Simplified particle effect using floating dots
      return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          {[...Array(20)].map((_, i) => (
            <m.div
              key={i}
              className="absolute w-2 h-2 bg-current rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, Math.random() * 20 - 10, 0],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      );
    }

    return null;
  };

  const hasTextContent = !!(subtitle || text || actions.length > 0);
  const hasMedia = !!media?.url;

  return (
    <section
      id={elementId}
      className={classNames(
        'relative',
        'overflow-hidden',
        colors,
        className,
        styles?.self?.padding ? `py-${styles.self.padding}` : 'py-16 md:py-24'
      )}
      data-sb-field-path={fieldPath}
    >
      {/* Background Animation */}
      {getBackgroundAnimation()}

      {/* Content */}
      <m.div
        className="relative z-10 max-w-screen-xl mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className={classNames(
          'flex',
          'flex-col',
          hasMedia ? 'md:flex-row md:items-center md:gap-12' : 'items-center text-center'
        )}>
          {/* Text Content */}
          <div className={classNames(
            'flex-1',
            hasMedia ? 'md:w-1/2' : 'max-w-3xl'
          )}>
            {/* Title with Typing Effect */}
            <m.h1
              className={classNames(
                'text-4xl md:text-5xl lg:text-6xl font-bold',
                'mb-6',
                styles?.title?.fontWeight ? `font-${styles.title.fontWeight}` : undefined
              )}
              variants={typingEffect && !prefersReducedMotion ? {} : itemVariants}
              {...(fieldPath && { 'data-sb-field-path': '.title' })}
            >
              {displayedTitle}
              {typingEffect && !isTypingComplete && !prefersReducedMotion && (
                <span className="animate-pulse">|</span>
              )}
            </m.h1>

            {/* Subtitle */}
            {subtitle && (
              <m.p
                className="text-xl md:text-2xl mb-6 opacity-90"
                variants={itemVariants}
                {...(fieldPath && { 'data-sb-field-path': '.subtitle' })}
              >
                {subtitle}
              </m.p>
            )}

            {/* Text */}
            {text && (
              <m.p
                className="text-lg mb-8 opacity-80"
                variants={itemVariants}
                {...(fieldPath && { 'data-sb-field-path': '.text' })}
              >
                {text}
              </m.p>
            )}

            {/* Actions */}
            {actions.length > 0 && (
              <m.div
                className="flex flex-wrap gap-4 justify-center md:justify-start"
                variants={itemVariants}
                {...(fieldPath && { 'data-sb-field-path': '.actions' })}
              >
                {actions.map((action, index) => (
                  <Action
                    key={index}
                    {...action}
                    {...(fieldPath && { 'data-sb-field-path': `.${index}` })}
                  />
                ))}
              </m.div>
            )}
          </div>

          {/* Media */}
          {hasMedia && (
            <m.div
              className={classNames(
                'flex-1',
                'md:w-1/2',
                'mt-12 md:mt-0'
              )}
              variants={mediaVariants}
              {...(fieldPath && { 'data-sb-field-path': '.media' })}
            >
              {media.type === 'video' ? (
                <video
                  src={media.url}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto rounded-lg shadow-2xl"
                  aria-label={media.altText}
                />
              ) : (
                <ImageBlock
                  {...media}
                  className="w-full h-auto rounded-lg shadow-2xl"
                />
              )}
            </m.div>
          )}
        </div>
      </m.div>
    </section>
  );
}
