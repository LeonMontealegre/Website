import {useMemo} from "react";

import {OriginPos, PlanetInfo} from "src/utils/planets";
import {Lerp, PolarToCartesian, Rotate} from "utils/math";
import {GetInterpolationFactors} from "utils/planets/utils";

import styles from "./index.module.scss";


const ECCENTRICITY = 0.5;

type Props = {
    planet: PlanetInfo;
    w: number;
    h: number;
};
export const Orbit = ({ w, h, planet }: Props) => {
    const { pos: { r: r0, a: a0 }, orbitAngle } = planet;

    const [r, t, s] = GetInterpolationFactors(w, h);

    // Get current angle and orbit angle
    const angle  = Lerp(t, a0,         ((r <= 1.0) ? ( Math.PI/2) : (0)));
    const oangle = Lerp(t, orbitAngle, ((r <= 1.0) ? (-Math.PI/2) : (0)));

    // Get current cartesian coordinates and then rotate them into ellipse's-space
    const [x, y] = PolarToCartesian(r0, angle);
    const [u, v] = Rotate(x, y, oangle);

    // Calculate ellipse parameters which dictate width/height of div
    const a = Math.sqrt(u**2 + v**2 / ECCENTRICITY**2);
    const b = a * ECCENTRICITY;

    const { text, shadowRadius, borderColor } = planet;

    return (
        <div key={`${text}-orbit`}
             className={styles["orbit"]}
             style={{
                 left: `${OriginPos.x * s}px`,  top: `${OriginPos.y * s}px`,
                 width: `${2 * a * s}px`, height: `${2 * b * s}px`,
                 border: `4px solid ${planet.color}`,

                 // Rotate the ellipse to be skewed
                 transform: `translate(-50%, -50%) rotate(${-oangle}rad)`,

                 // Double shadow halo on the outer and inner sides of the orbit respectively
                 boxShadow: `\
                           0 0 ${shadowRadius*3}px ${shadowRadius*3}px ${borderColor}11, \
                     inset 0 0 ${shadowRadius*2}px ${shadowRadius*2}px ${borderColor}11 \
                 `,
             }}></div>
    )
}
