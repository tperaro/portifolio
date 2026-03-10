import '../css/main.css';
import { useEffect } from 'react';
import { LazyMotion, domAnimation, AnimatePresence, m, MotionConfig } from 'framer-motion';
import gsap from 'gsap';
import Lenis from 'lenis';
import LoadingIndicator from '@/components/atoms/LoadingIndicator';

const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
    },
    exit: {
        opacity: 0,
        y: -20,
        transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }
    }
};

export default function MyApp({ Component, pageProps, router }) {
    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            return;
        }

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });

        const onTick = (time) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(onTick);
        gsap.ticker.lagSmoothing(0);

        const onRouteChangeComplete = () => {
            lenis.scrollTo(0, { immediate: true });
        };

        router.events.on('routeChangeComplete', onRouteChangeComplete);

        return () => {
            gsap.ticker.remove(onTick);
            gsap.ticker.lagSmoothing(500, 33); // restore GSAP defaults
            router.events.off('routeChangeComplete', onRouteChangeComplete);
            lenis.destroy();
        };
    }, []);

    return (
        <MotionConfig reducedMotion="user">
            <LazyMotion features={domAnimation} strict>
                {/* Loading indicator for page transitions */}
                <LoadingIndicator duration={400} />

                <AnimatePresence mode="wait" initial={false}>
                    <m.div
                        key={router.asPath}
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        style={{
                            width: '100%',
                            minHeight: '100vh'
                        }}
                    >
                        <Component {...pageProps} />
                    </m.div>
                </AnimatePresence>
            </LazyMotion>
        </MotionConfig>
    );
}
