import type {NextPage}       from "next";
import {useEffect, useState} from "react";

import {useWindowSize} from "utils/useWindowSize";
import {PLANETS}       from "utils/planets";

import {Footer} from "components/Footer";
import {Orbit}  from "components/Orbit";
import {Planet} from "components/Planet";

import styles from "./index.module.scss";


const Home: NextPage = () => {
    const [show, setShow] = useState(false);
    const { w, h } = useWindowSize();

    useEffect(() => {
        setShow(true);
    }, []);

    if (!show)
        return <div><div className={styles["container"]}></div></div>;

    return (<div>
        <div className={styles["container"]}>
            {PLANETS.slice(1).map(p => (
                <Orbit key={`${p.text}-orbit`} w={w} h={h} planet={p} />
            ))}
            {PLANETS.map(p => (
                <Planet key={p.text} w={w} h={h} planet={p} />
            ))}
        </div>
        <div className={styles["footer-wrapper"]}>
            <Footer />
        </div>
    </div>);
}

export default Home;
