import { AnimatePresence } from 'framer-motion'
import Head from 'next/head'
import '../styles/globals.css'
import Header from '../components/Header'

function MyApp({ Component, pageProps, router }) {
    
    return <>
        <Header />

        <AnimatePresence
            mode="wait"
            initial={false}>

            <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
    </>

}

export default MyApp
