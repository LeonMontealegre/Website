import type {AppProps} from "next/app";

import {Background} from "components/Background";

import "styles/globals.scss";


function MyApp({ Component, pageProps }: AppProps) {
    return (<>
        <Background />
        <Component {...pageProps} />
    </>);
}

export default MyApp;
