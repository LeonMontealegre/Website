import {useState} from "react";
import {useEffect} from "react";
import {useMemo} from "react";

import styles from "./index.module.scss";


const NUM_STARS = 200;
const NUM_SHOOTING_STARS = 4;

const stars = Array(NUM_STARS).fill(0).map((_, i) => ({
    cx: `${Math.random()*100}%`,
    cy: `${Math.random()*100}%`,
    r: (Math.random() + 1),
    delay:    `${i*100 +  500 * Math.random()}ms`,
    duration: `${ 3000 + 4000 * Math.random()}ms`,
    brightness: 0.7 + 0.3 * Math.random(),
}));

export const Background = () => {
    const [showStars, setShowStars] = useState(false);

    useEffect(() => {
        // Wait for hydration to finish then show stars
        setShowStars(true);
    }, []);

    return useMemo(() => (
        <svg className={styles["background"]} preserveAspectRatio="xMinYMin slice">
            {showStars &&
             stars.map(({ cx, cy, r, delay, duration, brightness }, i) => (
                <circle
                    key={`star-${i}`}
                    className={styles["star"]}
                    fill="white"
                    cx={cx} cy={cy} r={r} transform-origin={`${cx} ${cy}`}
                    style={{
                        "--star-animation-delay": delay,
                        "--star-animation-duration": duration,
                        "--star-animation-glow-duration": "1000ms",
                        "--star-brightness": brightness,
                    } as React.CSSProperties} />
            ))}
        </svg>
    ), [showStars]);
}