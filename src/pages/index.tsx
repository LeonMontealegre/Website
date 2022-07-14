import type {NextPage} from "next";
import Link from "next/link";

import {usePlanetsInfo} from "./planets";

import styles from "./index.module.scss";


const Home: NextPage = () => {
    // Updates the circles by the current window-ratio in the following way:
    // For a ratio <= 1.0  : Lerp positions from initial angles to being vertical
    // For a ratio >  1.0  : Lerp positions from initial angles to being horizontal
    const { curCircles, curOrbits } = usePlanetsInfo();

    if (curCircles.length === 0)
        return <div><div className={styles["container"]}></div></div>;

    // Get styles for orbits and planets
    const orbitStyles = curOrbits.map(({ left, top, width, height, color, borderColor, shadowRadius, transform }) => ({
        left:  `${left}px`,  top:    `${top}px`,
        width: `${width}px`, height: `${height}px`,
        border: `4px solid ${color}`, transform,

        boxShadow: `\
                  0 0 ${shadowRadius*3}px ${shadowRadius*3}px ${borderColor}11, \
            inset 0 0 ${shadowRadius*2}px ${shadowRadius*2}px ${borderColor}11 \
        `,
    }));
    const circleStyles = curCircles.map(({ backgroundImage, borderColor, shadowRadius, width, height, left, top }) => ({
        left:  `${left}px`,  top:    `${top}px`,
        width: `${width}px`, height: `${height}px`, lineHeight: `${height}px`,
        backgroundImage,

        boxShadow: `0 0 ${shadowRadius}px ${shadowRadius}px ${borderColor}`,
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
