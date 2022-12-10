import Head from "next/head";
import { motion } from "framer-motion";
import styled from "styled-components";

const variants = {
    enter: { x: -300, opacity: 0 },
    movement: { x: 0, opacity: 1 },
    exit: { x: 300, opacity: 0 },

}

const LayoutStyles = styled.div`
    max-width: 100vw;
    overflow-x:hidden;
`

const Layout = ({ children, title = "Galleria" }) => (
    <LayoutStyles>
    <motion.div
        initial="enter"
        animate="movement"
        exit="exit"
        transition={{ duration: .5 }}
        variants={variants}
    >

        <Head>
            <title>{title}</title>
        </Head>


            {children}
    </motion.div>
        </LayoutStyles>
);
export default Layout;