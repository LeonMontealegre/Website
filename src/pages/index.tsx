import type {NextPage} from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useMemo, useState} from "react";
import {Brighten, ColorToHex, HexToColor} from "utils/colors";
import {Clamp, FractionalNormalize, Lerp, Normalize, PolarToCartesian} from "utils/math";
import {useWindowSize} from "utils/useWindowSize";

import styles from "./index.module.scss";


type CircleButton = {
    href: string;
    text: string;
    radius: number;
    color: string;
    shineColor: string;
    shadowRadius: number;
    pos: { // Polar
        r: number;
        a: number;
    };
    fontSize: number;
}

const OriginPos = {
    x: 13, y: 13
};

const RESIZE_END_AMT = 0.2;
const RESIZE_SCALING_AMT = 0.7;

const CIRCLES: CircleButton[] = [
    { href: "/",           text: "Home",       radius: 10, color: "#f7ce48", pos: { r:   0, a:  0 }, fontSize: 4   },
    { href: "/about",      text: "About",      radius:  5, color: "#375772", pos: { r:  28, a: 45 }, fontSize: 2.5 },
    { href: "/blog",       text: "Blog",       radius:  4, color: "#a3715d", pos: { r:  46, a: 60 }, fontSize: 2.3 },
    { href: "/projects",   text: "Projects",   radius:  6, color: "#873939", pos: { r:  65, a: 80 }, fontSize: 2.8 },
    { href: "/animations", text: "Animations", radius:  8, color: "#6a9955", pos: { r:  80, a: 20 }, fontSize: 3   },
    { href: "/models",     text: "Models",     radius:  5, color: "#ae6ea9", pos: { r: 100, a: 45 }, fontSize: 2.2 },
].map((c) => ({
    ...c,
    pos: { r: c.pos.r, a: c.pos.a * Math.PI/180 },
    shineColor: ColorToHex(Brighten(HexToColor(c.color), 1.0)),
    shadowRadius: (c.href === "/" ? 10 : 3),
}));


const Home: NextPage = () => {
    const [show, setShow] = useState(false);
    const { w, h } = useWindowSize();

    useEffect(() => {
        setShow(true);
    }, []);


    // Updates the circles by the current window-ratio in the following way:
    // For a ratio <= 1.0  : Lerp positions from initial angles to being vertical
    // For a ratio >  1.0  : Lerp positions from initial angles to being horizontal
    const curCircles = useMemo(() => !show ? [] :
        CIRCLES.map(({ radius, pos: { r, a }, fontSize, ...rest }) => {
            const ratio = w/h;

            const [scale, angle] = (() => {
                const t = Normalize((ratio <= 1.0 ? ratio : 1/ratio), 1, RESIZE_END_AMT);
                const s = (ratio <= 1.0) ? (1) : (ratio);
                return [
                    Lerp(t, s, s*RESIZE_SCALING_AMT),
                    Lerp(t, a, ((ratio <= 1.0) ? (Math.PI/2) : (0))),
                ];
            })();

            const size = (2 * radius);
            const { x, y } = PolarToCartesian(r, angle);

            const s = scale * h / 100;
            return {
                ...rest,
                width:  `${size * s}px`,
                height: `${size * s}px`,

                left: `${(x + OriginPos.x - radius) * s}px`,
                top:  `${(y + OriginPos.y - radius) * s}px`,

                fontSize: `${(fontSize * scale)}vh`,
            };
        }),
    [show, w, h]);

    if (!show)
        return null;

    return (
        <div className={styles["container"]}>
            {curCircles.map(({ href, text, color, shineColor, shadowRadius, width, height, left, top, fontSize }) => (
                <Link key={text} href={href}>
                    <div className={styles["circle"]}
                         style={{
                             width: width, height, lineHeight: height,
                             left, top,
                             backgroundColor: color,
                             boxShadow: `0 0 ${shadowRadius}px ${shadowRadius}px ${shineColor}`,
                         }}>
                        <p style={{ fontSize }}>{text}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}


export default Home;
