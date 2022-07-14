import type {NextPage} from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useMemo, useState} from "react";
import {Clamp, FractionalNormalize, Lerp, Normalize} from "utils/math";
import {useWindowSize} from "utils/useWindowSize";

import styles from "./index.module.scss";


type CircleButton = {
    href: string;
    text: string;
    radius: number;
    color: string;
    pos: { // Polar
        r: number;
        a: number;
    };
    fontSize: number;
}

const OriginPos = {
    x: 13, y: 13
};

const CIRCLES: CircleButton[] = [
    { href: "/",           text: "Home",       radius: 10, color: "#cdad46", pos: { r:   0, a:  0 }, fontSize: 4   },
    { href: "/about",      text: "About",      radius:  5, color: "#569cd6", pos: { r:  28, a: 45 }, fontSize: 2.5 },
    { href: "/blog",       text: "Blog",       radius:  4, color: "#ce9178", pos: { r:  46, a: 60 }, fontSize: 2.3 },
    { href: "/projects",   text: "Projects",   radius:  6, color: "#375772", pos: { r:  65, a: 80 }, fontSize: 2.8 },
    { href: "/animations", text: "Animations", radius:  8, color: "#6a9955", pos: { r:  80, a: 20 }, fontSize: 3   },
    { href: "/models",     text: "Models",     radius:  5, color: "#c586c0", pos: { r: 100, a: 45 }, fontSize: 2.2 },
].map((c) => ({ ...c, pos: { r: c.pos.r, a: c.pos.a * Math.PI/180 } }));


const Home: NextPage = () => {
    const [show, setShow] = useState(false);
    const { w, h } = useWindowSize();

    useEffect(() => {
        setShow(true);
    }, []);


    // Updates the circles by the current window-ratio in the following way:
    // For a ratio <= 0.8  : Lerp positions down to being vertical
    // For a ratio <= 1.0  : Scale the circles down
    // For any other ratio : Stay the same, but scale with the height of the screen
    const curCircles = useMemo(() => !show ? [] :
        CIRCLES.map(({ radius, pos: { r, a }, fontSize, ...rest }) => {
            const ratio = w/h;

            const [angle, scale] = (() => {
                // This essentially just lerps the positions of each circle
                //  as a function of the ratio between a ratio of 0.2 and 0.8
                if (ratio <= 4/5) {
                    // Do a non-linear normalization for a more interesting effect
                    const t = FractionalNormalize(ratio, 4/5, 1/5, 8/5);
                    return [Lerp(t, a, +Math.PI/2), 4/5];
                }

                const scale = (ratio <= 1) ? (ratio) : (1.0);
                return [a, scale];
            })();

            const size = (2 * radius);
            const x = r * Math.cos(angle) + OriginPos.x - radius;
            const y = r * Math.sin(angle) + OriginPos.y - radius;

            return {
                ...rest,
                width:  `${size * scale * h / 100}px`,
                height: `${size * scale * h / 100}px`,

                left: `${x * scale * h / 100}px`,
                top:  `${y * scale * h / 100}px`,

                fontSize: `${(fontSize * scale)}vh`,
            };
        }),
    [show, w, h]);

    if (!show)
        return null;

    return (
        <div className={styles["container"]}>
            {curCircles.map(({ href, text, color, width, height, left, top, fontSize }) => (
                <Link key={text} href={href}>
                    <div className={styles["circle"]}
                            style={{
                            width: width, height, lineHeight: height,
                            left, top,
                            backgroundColor: color,
                            }}>
                        <p style={{ fontSize }}>{text}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}


export default Home;
