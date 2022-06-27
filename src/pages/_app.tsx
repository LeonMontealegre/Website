import type { AppProps } from "next/app";

import {Background} from "components/Background";
import {Footer} from "components/Footer";

import "styles/globals.scss";

import styles from "./app.module.scss";


function MyApp({ Component, pageProps }: AppProps) {
    return <>
        <Background />
        <div className={styles["wrapper"]}>
            <Component {...pageProps} />
            <Footer />
        </div>
    </>
}


export default MyApp;
