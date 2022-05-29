import type { AppProps } from "next/app";

import {Background} from "components/Background";
import {Footer} from "components/Footer";

import "styles/globals.scss";


function MyApp({ Component, pageProps }: AppProps) {
    return <>
        <Background />
        <Component {...pageProps} />
        <Footer />
    </>
}


export default MyApp;
