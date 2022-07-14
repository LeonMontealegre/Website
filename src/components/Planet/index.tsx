import Link from "next/link";

import {OriginPos, PlanetInfo} from "src/utils/planets";
import {Lerp, PolarToCartesian} from "utils/math";
import {GetInterpolationFactors} from "utils/planets/utils";

import styles from "./index.module.scss";


type Props = {
    planet: PlanetInfo;
    w: number;
    h: number;
};
export const Planet = ({ w, h, planet }: Props) => {
    const { radius, pos: { r: dist, a }, color, shineColor, fontSize } = planet;

    const [r, t, s] = GetInterpolationFactors(w, h);

    // Get current angle and then calculate size and cartesian coordinates
    const angle = Lerp(t, a, ((r <= 1.0) ? (Math.PI/2) : (0)));
    const size = (2 * radius);
    const [x, y] = PolarToCartesian(dist, angle, OriginPos);

    const { text, href, shadowRadius, borderColor } = planet;

    return (
        <Link key={text} href={href}>
            <div className={styles["planet"]}
                 style={{
                     left: `${x * s}px`, top: `${y * s}px`,
                     width: `${size * s}px`, height: `${size * s}px`, lineHeight: `${size * s}px`,
                     fontSize: `${fontSize * s}px`,

                     // Shading gradient pointing towards the sun, with shine that falls
                     //  off as a function of distance from the sun `dist`
                     backgroundImage: `linear-gradient(\
                         ${angle + Math.PI/2}rad, \
                         ${shineColor} ${16 - 0.11*dist}%, \
                         ${color}      ${75 - 0.50*dist}%\
                     `,

                     // Box shadow halo around the planet
                     boxShadow: `0 0 ${shadowRadius}px ${shadowRadius}px ${borderColor}`,
                 }}>
                <p style={{ fontSize: fontSize * s }}>{text}</p>
            </div>
        </Link>
    )
}
