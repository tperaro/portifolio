/**
 * Loading Indicator Component
 * Feature: 001-adicionar-animações-interativas
 * Task: T031 - Create loading indicator for page transitions
 * 
 * Displays a progress bar at the top of the viewport during page navigation.
 * Integrates with usePageTransition hook to show/hide based on transition state.
 * Progress bar width animates based on transition progress (0-100%).
 * 
 * Design:
 * - Position: Fixed at top of viewport (z-index: 9999)
 * - Height: 3px
 * - Color: Primary theme color with glow effect
 * - Animation: Smooth width transition based on progress
 * - Opacity: Fade in/out during transition
 */

import * as React from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { usePageTransition } from '@/hooks';

export interface LoadingIndicatorProps {
    /**
     * Background color of progress bar
     * @default 'bg-primary'
     */
    color?: string;
    
    /**
     * Height of progress bar in pixels
     * @default 3
     */
    height?: number;
    
    /**
     * Duration of page transition in milliseconds
     * Should match _app.js transition duration
     * @default 400
     */
    duration?: number;
}

/**
 * Loading indicator that displays during page transitions
 * 
 * @example
 * ```tsx
 * // In _app.js or layout component
 * <LoadingIndicator />
 * ```
 * 
 * @example
 * ```tsx
 * // Custom color and height
 * <LoadingIndicator color="bg-blue-500" height={4} />
 * ```
 */
export default function LoadingIndicator(props: LoadingIndicatorProps) {
    const {
        color = 'bg-primary',
        height = 3,
        duration = 400
    } = props;
    
    // Track page transition state
    const { isTransitioning, progress } = usePageTransition({ duration });
    
    return (
        <AnimatePresence>
            {isTransitioning && (
                <m.div
                    className="fixed top-0 left-0 right-0 z-[9999] overflow-hidden"
                    style={{ height: `${height}px` }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Background track (optional subtle background) */}
                    <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 opacity-30" />
                    
                    {/* Progress bar */}
                    <m.div
                        className={`absolute top-0 left-0 h-full ${color}`}
                        style={{
                            boxShadow: '0 0 10px currentColor, 0 0 5px currentColor'
                        }}
                        initial={{ width: '0%' }}
                        animate={{
                            width: `${progress * 100}%`
                        }}
                        transition={{
                            duration: 0.1,
                            ease: 'linear'
                        }}
                    />
                    
                    {/* Glowing effect at the end of progress bar */}
                    <m.div
                        className={`absolute top-0 h-full w-20 ${color}`}
                        style={{
                            left: `${progress * 100}%`,
                            transform: 'translateX(-50%)',
                            filter: 'blur(10px)',
                            opacity: 0.6
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        exit={{ opacity: 0 }}
                    />
                </m.div>
            )}
        </AnimatePresence>
    );
}

/**
 * Simple loading spinner alternative
 * Can be used instead of progress bar
 */
export function LoadingSpinner(props: { size?: number; color?: string }) {
    const { size = 40, color = 'border-primary' } = props;
    const { isTransitioning } = usePageTransition();
    
    return (
        <AnimatePresence>
            {isTransitioning && (
                <m.div
                    className="fixed top-4 right-4 z-[9999]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.2 }}
                >
                    <div
                        className={`border-4 ${color} border-t-transparent rounded-full animate-spin`}
                        style={{ width: size, height: size }}
                    />
                </m.div>
            )}
        </AnimatePresence>
    );
}

/**
 * Loading dots alternative
 * Minimalist dot animation
 */
export function LoadingDots(props: { color?: string }) {
    const { color = 'bg-primary' } = props;
    const { isTransitioning } = usePageTransition();
    
    if (!isTransitioning) return null;
    
    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999]">
            <div className="flex gap-2">
                {[0, 1, 2].map((index) => (
                    <m.div
                        key={index}
                        className={`w-3 h-3 rounded-full ${color}`}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: index * 0.2,
                            ease: 'easeInOut'
                        }}
                    />
                ))}
            </div>
        </div>
    );
}
