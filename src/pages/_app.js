import '../css/main.css';
import { LazyMotion, domAnimation, AnimatePresence, m, MotionConfig } from 'framer-motion';
import LoadingIndicator from '@/components/atoms/LoadingIndicator';

const pageVariants = {
    initial: { opacity: 0 },
    animate: {
        opacity: 1,
        transition: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }
    }
};

export default function MyApp({ Component, pageProps, router }) {
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
