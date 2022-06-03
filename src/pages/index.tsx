import type {NextPage} from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import styles from "./index.module.scss";


const Home: NextPage = () => {
    return (
        <div className={styles["container"]}>
            <Link href="/"          ><div className={styles["circle"]}><p>Home      </p></div></Link>
            <Link href="/about"     ><div className={styles["circle"]}><p>About     </p></div></Link>
            <Link href="/blog"      ><div className={styles["circle"]}><p>Blog      </p></div></Link>
            <Link href="/projects"  ><div className={styles["circle"]}><p>Projects  </p></div></Link>
            <Link href="/animations"><div className={styles["circle"]}><p>Animations</p></div></Link>
            <Link href="/models"    ><div className={styles["circle"]}><p>Models    </p></div></Link>
        </div>
    );
}


export default Home;
