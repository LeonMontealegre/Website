import {useState} from "react";
import {useEffect} from "react";
import {useMemo} from "react";

import styles from "./index.module.scss";


const NUM_STARS = 100;
const NUM_SHOOTING_STARS = 4;

type StarProps = {
    c: { x: number, y: number };
    r: number;
    brightness: number;
} & ({
    isShooting: false;
} | {
    isShooting: true;
    t: { x: number, y: number };
    delay: number;
    duration: number;
})
const Star = ({ c, r, brightness, ...other }: StarProps) => (
    <circle
        className={other.isShooting ? styles["shooting__star"] : styles["star"]}
        fill="white"
        cx={`${c.x}%`} cy={`${c.y}%`} r={r} transform-origin={`${c.x}% ${c.y}%`}
        opacity={brightness}
        style={(other.isShooting ? {
            "--star-target-dx": `${other.t.x}%`,
            "--star-target-dy": `${other.t.y}%`,
            "--star-animation-delay": `${other.delay}ms`,
            "--star-animation-duration": `${other.duration}ms`,
            "--star-animation-glow-duration": `${other.duration}ms`,
            "--star-brightness": brightness,
        } : {}) as React.CSSProperties} />
)

const GenRandomStar = (i: number, isShooting = false): StarProps => {
    const star = {
        c: { x: Math.random()*100, y: Math.random()*100 },
        r: (Math.random() + 1),
        brightness: (0.7 + 0.3 * Math.random()),
    };
    if (!isShooting)
        return { isShooting, ...star };
    return {
        isShooting,
        ...star,
        t: { x: (Math.random()*100 - star.c.x), y: (Math.random()*100 - star.c.y) },
        delay: (i*1000 + 5000 * Math.random()),
        duration: 3000 + 4000 * Math.random(),
    };
}

const stars = Array(NUM_STARS).fill(0).map((_, i) => (GenRandomStar(i)));
const shootingStars = Array(NUM_SHOOTING_STARS).fill(0).map((_, i) => (GenRandomStar(i, true)));


export const Background = () => {
    const [showStars, setShowStars] = useState(false);

    useEffect(() => {
        // Wait for hydration to finish then show stars
        setShowStars(true);
    }, []);

    return useMemo(() => (
        <div className={styles["background"]}>
            <svg>{showStars &&         stars.map((star, i) => <Star key={`star-${i}`} {...star} />)}</svg>
            <div className={styles["twinkling"]}></div>
            <svg>{showStars && shootingStars.map((star, i) => <Star key={`star-${i}`} {...star} />)}</svg>
        </div>
    ), [showStars]);
}
