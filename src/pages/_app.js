import '../css/main.css';
import { LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';

export default function MyApp({ Component, pageProps, router }) {
    return (
        <LazyMotion features={domAnimation} strict>
            <AnimatePresence mode="wait" initial={false}>
                <Component {...pageProps} key={router.route} />
            </AnimatePresence>
        </LazyMotion>
    );
}
