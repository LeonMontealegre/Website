import type {NextPage} from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {useEffect, useMemo, useState} from "react";
import {Brighten, ColorToHex, HexToColor} from "utils/colors";
import {Clamp, FractionalNormalize, Lerp, Normalize, PolarToCartesian, Remap, Rotate} from "utils/math";
import {useWindowSize} from "utils/useWindowSize";

import styles from "./index.module.scss";


const OriginPos = {
    x: 13, y: 13
};

const RESIZE_END_AMT = 0.2;
const RESIZE_SCALING_AMT = 0.7;

const CIRCLES = [
    { href: "/",           text: "Home",       radius: 10, color: "#f7ce48", pos: { r:   0, a:  0 }, fontSize: 4.0 },
    { href: "/about",      text: "About",      radius:  5, color: "#375772", pos: { r:  28, a: 45 }, fontSize: 2.5 },
    { href: "/blog",       text: "Blog",       radius:  4, color: "#a3715d", pos: { r:  46, a: 10 }, fontSize: 2.3 },
    { href: "/projects",   text: "Projects",   radius:  8, color: "#873939", pos: { r:  65, a: 70 }, fontSize: 3.1 },
    { href: "/animations", text: "Animations", radius:  6, color: "#6a9955", pos: { r:  85, a: 30 }, fontSize: 2.2 },
    { href: "/models",     text: "Models",     radius:  5, color: "#ae6ea9", pos: { r: 100, a: 50 }, fontSize: 2.2 },
].map((c, i) => ({
    ...c,
    pos: { r: c.pos.r, a: c.pos.a * Math.PI/180 },
    shineColor: ColorToHex(Brighten(HexToColor(c.color), 1.0)),
    orbitAngle: [0, -15, -35, -45, -46, -49].map(a => a*Math.PI/180)[i],
    // orbitAngle: 4*Math.PI/5 + Remap(Math.random(), 0, 1, -Math.PI/20, Math.PI/20),
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
    const { curCircles, curOrbits } = useMemo(() => {
        if (!show)
            return { curCircles: [], curOrbits: [] };

        const ratio = w/h;

        const t = Normalize((ratio <= 1.0 ? ratio : 1/ratio), 1, RESIZE_END_AMT);

        const scale = (() => {
            const s = (ratio <= 1.0) ? (1) : (ratio);
            return Lerp(t, s, s*RESIZE_SCALING_AMT);
        })();
        const s = scale * h / 100;

        const curCircles = CIRCLES.map(({ radius, pos: { r, a }, fontSize, ...rest }) => {
            const angle = Lerp(t, a, ((ratio <= 1.0) ? (Math.PI/2) : (0)));
            const size = (2 * radius);
            const [x, y] = PolarToCartesian(r, angle, OriginPos);
            return {
                ...rest,
                left: x * s, top: y * s,
                width: size * s, height: size * s,
                fontSize: fontSize * scale,
            };
        });

        const curOrbits = CIRCLES.slice(1).map(({ radius, pos: { r, a: a0 }, orbitAngle, ...rest }) => {
            const e = 0.5;

            const angle  = Lerp(t, a0,         ((ratio <= 1.0) ? (Math.PI/2) : (0)));
            const oangle = Lerp(t, orbitAngle, ((ratio <= 1.0) ? (-Math.PI/2) : (0)));

            const [x, y] = PolarToCartesian(r, angle);
            const [u, v] = Rotate(x, y, oangle);

            const a = Math.sqrt(u**2 + v**2 / e**2);
            const b = a * e;

            return {
                ...rest,
                left: s*OriginPos.x, top: s*OriginPos.y,
                transform: `translate(-50%, -50%) rotate(${-oangle}rad)`,
                width: 2*a*s, height: 2*b*s,
            };
        });

        return { curCircles, curOrbits };
    }, [show, w, h]);

    if (!show)
        return null;

    // Get styles for orbits and planets
    const orbitStyles = curOrbits.map(({ left, top, width, height, color, transform }) => ({
        left:  `${left}px`,  top:    `${top}px`,
        width: `${width}px`, height: `${height}px`,
        border: `4px solid ${color}`, transform,
    }));
    const circleStyles = curCircles.map(({ color, shineColor, shadowRadius, width, height, left, top }) => ({
        left:  `${left}px`,  top:    `${top}px`,
        width: `${width}px`, height: `${height}px`, lineHeight: `${height}px`,
        backgroundColor: color,
        boxShadow: `0 0 ${shadowRadius}px ${shadowRadius}px ${shineColor}`,
    }));

    return (<div>
        <div className={styles["container"]}>
            {curCircles.slice(1).map(({ text }, i) => (
                // Orbits
                <div key={`${text}-orbit`} className={styles["orbit"]} style={orbitStyles[i]}></div>
            ))}
            {curCircles.map(({ href, text, fontSize }, i) => (
                // Planets
                <Link key={text} href={href}>
                    <div className={styles["circle"]} style={circleStyles[i]}>
                        <p style={{ fontSize: `${fontSize}vh` }}>{text}</p>
                    </div>
                </Link>
            ))}
        </div>
    </div>);
}


export default Home;
