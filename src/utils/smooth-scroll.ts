/**
 * Smooth Scroll Utility
 * Feature: 001-adicionar-animações-interativas
 * Task: T029 - Create smooth scroll utility for anchor navigation
 * 
 * Provides smooth scrolling functionality with fallback support for older browsers.
 * Uses native scrollIntoView with smooth behavior when available,
 * falls back to Framer Motion animate() for compatibility.
 * 
 * Duration: 800-1000ms per spec
 * Easing: ease-in-out
 */

import { animate } from 'framer-motion';

/**
 * Options for smooth scroll behavior
 */
export interface SmoothScrollOptions {
    /**
     * Duration of scroll animation in milliseconds
     * @default 800
     */
    duration?: number;
    
    /**
     * Offset from top of target element (useful for fixed headers)
     * @default 0
     */
    offset?: number;
    
    /**
     * Easing function for scroll animation
     * @default 'easeInOut'
     */
    easing?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
    
    /**
     * Callback to execute after scroll completes
     */
    onComplete?: () => void;
}

/**
 * Check if browser supports native smooth scrolling
 */
const supportsNativeSmoothScroll = (): boolean => {
    if (typeof window === 'undefined') return false;
    
    try {
        return 'scrollBehavior' in document.documentElement.style;
    } catch {
        return false;
    }
};

/**
 * Smooth scroll to an element on the page
 * 
 * @param targetOrSelector - Element or CSS selector to scroll to
 * @param options - Scroll behavior options
 * @returns Promise that resolves when scroll completes
 * 
 * @example
 * ```tsx
 * // Scroll to element with ID
 * await smoothScrollTo('#section-about');
 * 
 * // Scroll with offset for fixed header
 * await smoothScrollTo('#contact', { offset: -80 });
 * 
 * // Custom duration and callback
 * await smoothScrollTo('#pricing', {
 *   duration: 1000,
 *   onComplete: () => console.log('Scroll complete')
 * });
 * ```
 */
export const smoothScrollTo = async (
    targetOrSelector: HTMLElement | string,
    options: SmoothScrollOptions = {}
): Promise<void> => {
    const {
        duration = 800,
        offset = 0,
        easing = 'easeInOut',
        onComplete
    } = options;
    
    // Get target element
    const target = typeof targetOrSelector === 'string'
        ? document.querySelector<HTMLElement>(targetOrSelector)
        : targetOrSelector;
    
    if (!target) {
        console.warn(`smoothScrollTo: Target element not found: ${targetOrSelector}`);
        return Promise.resolve();
    }
    
    // Calculate target scroll position
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset + offset;
    
    // Use native smooth scroll if supported
    if (supportsNativeSmoothScroll()) {
        return new Promise<void>((resolve) => {
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Native smooth scroll doesn't provide completion callback
            // Estimate completion time based on scroll distance
            const scrollDistance = Math.abs(targetPosition - window.pageYOffset);
            const estimatedDuration = Math.min(scrollDistance, duration);
            
            setTimeout(() => {
                onComplete?.();
                resolve();
            }, estimatedDuration);
        });
    }
    
    // Fallback to Framer Motion animate for older browsers
    return new Promise<void>((resolve) => {
        const startPosition = window.pageYOffset;
        
        animate(startPosition, targetPosition, {
            duration: duration / 1000, // Convert to seconds for Framer Motion
            ease: easing,
            onUpdate: (latest) => {
                window.scrollTo(0, latest);
            },
            onComplete: () => {
                onComplete?.();
                resolve();
            }
        });
    });
};

/**
 * Smooth scroll to top of page
 * 
 * @param options - Scroll behavior options
 * @returns Promise that resolves when scroll completes
 * 
 * @example
 * ```tsx
 * // Scroll to top with default duration
 * await smoothScrollToTop();
 * 
 * // Fast scroll to top
 * await smoothScrollToTop({ duration: 400 });
 * ```
 */
export const smoothScrollToTop = async (
    options: SmoothScrollOptions = {}
): Promise<void> => {
    const {
        duration = 600,
        easing = 'easeInOut',
        onComplete
    } = options;
    
    if (supportsNativeSmoothScroll()) {
        return new Promise<void>((resolve) => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            setTimeout(() => {
                onComplete?.();
                resolve();
            }, duration);
        });
    }
    
    // Fallback to Framer Motion animate
    return new Promise<void>((resolve) => {
        const startPosition = window.pageYOffset;
        
        animate(startPosition, 0, {
            duration: duration / 1000,
            ease: easing,
            onUpdate: (latest) => {
                window.scrollTo(0, latest);
            },
            onComplete: () => {
                onComplete?.();
                resolve();
            }
        });
    });
};

/**
 * Handle click event for anchor links with smooth scrolling
 * Prevents default jump behavior and applies smooth scroll
 * 
 * @param event - Click event from anchor link
 * @param options - Scroll behavior options
 * 
 * @example
 * ```tsx
 * <a href="#about" onClick={(e) => handleAnchorClick(e, { offset: -80 })}>
 *   About
 * </a>
 * ```
 */
export const handleAnchorClick = async (
    event: React.MouseEvent<HTMLAnchorElement>,
    options: SmoothScrollOptions = {}
): Promise<void> => {
    const href = event.currentTarget.getAttribute('href');
    
    if (!href || !href.startsWith('#')) {
        return; // Not an anchor link
    }
    
    event.preventDefault();
    
    // Handle scroll to top
    if (href === '#' || href === '#top') {
        await smoothScrollToTop(options);
        return;
    }
    
    // Scroll to target element
    await smoothScrollTo(href, options);
    
    // Update URL hash without jumping
    if (window.history && window.history.pushState) {
        window.history.pushState(null, '', href);
    }
};

/**
 * Hook for handling smooth scroll with anchor links
 * Returns a click handler that can be attached to anchor elements
 * 
 * @param options - Default scroll behavior options
 * @returns Click handler function
 * 
 * @example
 * ```tsx
 * const handleClick = useSmoothScroll({ offset: -80 });
 * 
 * return (
 *   <nav>
 *     <a href="#about" onClick={handleClick}>About</a>
 *     <a href="#contact" onClick={handleClick}>Contact</a>
 *   </nav>
 * );
 * ```
 */
export const useSmoothScroll = (options: SmoothScrollOptions = {}) => {
    return (event: React.MouseEvent<HTMLAnchorElement>) => {
        handleAnchorClick(event, options);
    };
};

/**
 * Utility to check if an element is in viewport
 * Useful for conditional smooth scrolling
 * 
 * @param element - Element to check
 * @param offset - Optional offset threshold
 * @returns True if element is visible in viewport
 */
export const isElementInViewport = (
    element: HTMLElement,
    offset: number = 0
): boolean => {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    return (
        rect.top >= offset &&
        rect.left >= 0 &&
        rect.bottom <= windowHeight - offset &&
        rect.right <= windowWidth
    );
};
