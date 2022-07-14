import {useEffect, useMemo, useState} from "react";

import {Lerp, Normalize, PolarToCartesian, Rotate} from "utils/math";
import {OriginPos, PLANETS} from "utils/planets";
import {useWindowSize} from "utils/useWindowSize";


const RESIZE_END_AMT = 0.3;
const RESIZE_SCALING_AMT = 0.7;
const ECCENTRICITY = 0.5;

export const usePlanetsInfo = () => {
    const [show, setShow] = useState(false);
    const { w, h } = useWindowSize();

    useEffect(() => {
        setShow(true);
    }, []);

    return useMemo(() => {
        if (!show)
            return { curCircles: [], curOrbits: [] };

        const ratio = w/h;

        // Get the "time" parameter for the parametric formulas based on `ratio`
        const t = Normalize((ratio <= 1.0 ? ratio : 1/ratio), 1, RESIZE_END_AMT);

        // Calculate the current scale of all the coordinates
        const scale = (() => {
            const s = (ratio <= 1.0) ? (1) : (ratio);
            return Lerp(t, s, s*RESIZE_SCALING_AMT);
        })();
        const s = scale * h / 100;

        // Generate circle information
        const curCircles = PLANETS.map(({ radius, pos: { r, a }, fontSize, ...rest }) => {
            // Get current angle and then calculate size and cartesian coordinates
            const angle = Lerp(t, a, ((ratio <= 1.0) ? (Math.PI/2) : (0)));
            const size = (2 * radius);
            const [x, y] = PolarToCartesian(r, angle, OriginPos);
            return {
                ...rest, r, angle,
                left: x * s, top: y * s,
                width: size * s, height: size * s,
                fontSize: fontSize * scale,
                backgroundImage: `linear-gradient(\
                    ${angle + Math.PI/2}rad, \
                    ${rest.shineColor} ${100*((1-r/100)*0.11+0.05)}%, \
                    ${rest.color}      ${100*((1-r/100)*0.5+0.25)}%\
                `,
            };
        });

        // Generate orbit information
        const curOrbits = PLANETS.slice(1).map(({ pos: { r, a: a0 }, orbitAngle, ...rest }) => {
            // Get current angle and orbit angle
            const angle  = Lerp(t, a0,         ((ratio <= 1.0) ? ( Math.PI/2) : (0)));
            const oangle = Lerp(t, orbitAngle, ((ratio <= 1.0) ? (-Math.PI/2) : (0)));

            // Get current cartesian coordinates and then rotate them into ellipse's-space
            const [x, y] = PolarToCartesian(r, angle);
            const [u, v] = Rotate(x, y, oangle);

            // Calculate ellipse parameters which dictate width/height of div
            const a = Math.sqrt(u**2 + v**2 / ECCENTRICITY**2);
            const b = a * ECCENTRICITY;

            return {
                ...rest,
                left: s*OriginPos.x, top: s*OriginPos.y,
                transform: `translate(-50%, -50%) rotate(${-oangle}rad)`,
                width: 2*a*s, height: 2*b*s,
            };
        });

        return { curCircles, curOrbits };
    }, [show, w, h]);
}
