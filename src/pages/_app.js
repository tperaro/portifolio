import '../css/main.css';
import { LazyMotion, domAnimation, AnimatePresence, m } from 'framer-motion';
import LoadingIndicator from '@/components/atoms/LoadingIndicator';

export default function MyApp({ Component, pageProps, router }) {
    return (
        <LazyMotion features={domAnimation} strict>
            {/* Loading indicator for page transitions */}
            <LoadingIndicator duration={400} />
            
            <AnimatePresence mode="wait" initial={false}>
                <m.div
                    key={router.route}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                        duration: 0.4,
                        ease: 'easeInOut'
                    }}
                    style={{
                        width: '100%',
                        minHeight: '100vh'
                    }}
                >
                    <Component {...pageProps} />
                </m.div>
            </AnimatePresence>
        </LazyMotion>
    );
}
