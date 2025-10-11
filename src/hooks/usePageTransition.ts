/**
 * usePageTransition Hook
 * Feature: 001-adicionar-animações-interativas
 * 
 * Manages page transition state for smooth navigation between pages.
 * Tracks transition progress, provides callbacks, and integrates with Next.js routing.
 * 
 * User Story 3: Smooth page transitions and navigation
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/router';

export interface UsePageTransitionOptions {
  /**
   * Transition duration (milliseconds)
   * @default 400
   */
  duration?: number;
  
  /**
   * Callback when transition starts
   */
  onTransitionStart?: () => void;
  
  /**
   * Callback when transition ends
   */
  onTransitionEnd?: () => void;
}

export interface UsePageTransitionReturn {
  /**
   * Whether page is currently transitioning
   */
  isTransitioning: boolean;
  
  /**
   * Start transition (call before navigation)
   */
  startTransition: () => void;
  
  /**
   * End transition (call after new page loaded)
   */
  endTransition: () => void;
  
  /**
   * Transition progress (0-1)
   */
  progress: number;
}

export function usePageTransition(
  options: UsePageTransitionOptions = {}
): UsePageTransitionReturn {
  const {
    duration = 400,
    onTransitionStart,
    onTransitionEnd
  } = options;

  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [progress, setProgress] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Start transition
  const startTransition = useCallback(() => {
    setIsTransitioning(true);
    setProgress(0);
    
    // Callback
    if (onTransitionStart) {
      onTransitionStart();
    }

    // Animate progress from 0 to 0.8 (leaves 20% for actual page load)
    const startTime = Date.now();
    const targetProgress = 0.8;
    
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * targetProgress, targetProgress);
      setProgress(newProgress);
      
      if (newProgress >= targetProgress) {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
      }
    }, 16); // ~60fps
  }, [duration, onTransitionStart]);

  // End transition
  const endTransition = useCallback(() => {
    // Complete progress to 100%
    setProgress(1);
    
    // Clear any ongoing progress animation
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    // End transition after a short delay (allow animation to complete)
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
      setProgress(0);
      
      // Callback
      if (onTransitionEnd) {
        onTransitionEnd();
      }
    }, 200);
  }, [onTransitionEnd]);

  // Listen to Next.js router events
  useEffect(() => {
    const handleRouteChangeStart = () => {
      startTransition();
    };

    const handleRouteChangeComplete = () => {
      endTransition();
    };

    const handleRouteChangeError = () => {
      endTransition();
    };

    // Subscribe to router events
    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    // Cleanup
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
      
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [router.events, startTransition, endTransition]);

  return {
    isTransitioning,
    startTransition,
    endTransition,
    progress
  };
}
