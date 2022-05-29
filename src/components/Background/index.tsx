import {useState} from "react";
import {useEffect} from "react";
import {useMemo} from "react";

import styles from "./index.module.scss";


const NUM_STARS = 200;
const NUM_SHOOTING_STARS = 4;

const GenRandomStar = (i: number) => ({
    cx: Math.random()*100,
    cy: Math.random()*100,
    tx: undefined as number | undefined,
    ty: undefined as number | undefined,
    r: (Math.random() + 1),
    delay:       (i*100 +  500 * Math.random()),
    duration:    (3000  + 4000 * Math.random()),
    glowDuration: 1000,
    brightness:  (0.7   +  0.3 * Math.random()),
});
const GenRandomShootingStar = (i: number) => {
    const star = GenRandomStar(i);
    return {
        ...star,
        tx: Math.random()*100 - star.cx,
        ty: Math.random()*100 - star.cy,
        delay: star.delay * 10,
        glowDuration: star.duration,
    }
}

const stars = [
    ...Array(NUM_STARS).fill(0).map((_, i) => (GenRandomStar(i))),
    ...Array(NUM_SHOOTING_STARS).fill(0).map((_, i) => (GenRandomShootingStar(i)))
];

export const Background = () => {
    const [showStars, setShowStars] = useState(false);

    useEffect(() => {
        // Wait for hydration to finish then show stars
        setShowStars(true);
    }, []);

    return useMemo(() => (
        <svg className={styles["background"]} preserveAspectRatio="xMinYMin slice">
            {showStars &&
             stars.map(({ cx, cy, tx, ty, r, delay, duration, glowDuration, brightness }, i) => (
                <circle
                    key={`star-${i}`}
                    className={tx ? styles["shooting__star"] : styles["star"]}
                    fill="white"
                    cx={`${cx}%`} cy={`${cy}%`} r={r} transform-origin={`${cx}% ${cy}%`}
                    style={{
                        "--star-target-dx": `${tx}%`,
                        "--star-target-dy": `${ty}%`,
                        "--star-animation-delay": `${delay}ms`,
                        "--star-animation-duration": `${duration}ms`,
                        "--star-animation-glow-duration": `${glowDuration}ms`,
                        "--star-brightness": brightness,
                    } as React.CSSProperties} />
            ))}
        </svg>
    ), [showStars]);
}