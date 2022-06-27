import Head from "next/head";

import styles from "./index.module.scss";


type Props = {
    children: JSX.Element;
}
export const BlogLayout = ({ children }: Props) => (<>
    <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.15.0/dist/katex.min.css" />
    </Head>

    <div className={styles["container"]}>
        {children}
    </div>
</>);

