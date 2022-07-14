import {useEffect, useMemo, useState} from "react";

import {Brighten, ColorToHex, HexToColor} from "utils/colors";
import {Lerp, Normalize, PolarToCartesian, Rotate} from "utils/math";
import {useWindowSize} from "utils/useWindowSize";


const RESIZE_END_AMT = 0.3;
const RESIZE_SCALING_AMT = 0.7;
const ECCENTRICITY = 0.5;

export const OriginPos = {
    x: 13, y: 13
};

export const CIRCLES = [
    { text: "Home",       radius: 10, color: "#f7ce48", pos: { r:   0, a:  0 }, orbitAngle:   0, fontSize: 4.0 },
    { text: "About",      radius:  5, color: "#375772", pos: { r:  28, a: 45 }, orbitAngle: -15, fontSize: 2.5 },
    { text: "Blog",       radius:  4, color: "#a3715d", pos: { r:  46, a: 10 }, orbitAngle: -35, fontSize: 2.3 },
    { text: "Projects",   radius:  8, color: "#873939", pos: { r:  65, a: 70 }, orbitAngle: -45, fontSize: 3.1 },
    { text: "Animations", radius:  6, color: "#6a9955", pos: { r:  85, a: 30 }, orbitAngle: -46, fontSize: 2.2 },
    { text: "Models",     radius:  5, color: "#ae6ea9", pos: { r: 100, a: 50 }, orbitAngle: -49, fontSize: 2.2 },
].map((c, i) => ({
    ...c,
    pos: { r: c.pos.r, a: c.pos.a * Math.PI/180 },
    orbitAngle: c.orbitAngle * Math.PI/180,

    href: (i === 0 ? "/" : `/${c.text.toLowerCase()}`),

    shineColor:  ColorToHex(Brighten(HexToColor(c.color), 1.0, false)),
    borderColor: ColorToHex(Brighten(HexToColor(c.color), 0.8)),

    shadowRadius: (i === 0 ? 7 : 2),
}));


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
        const curCircles = CIRCLES.map(({ radius, pos: { r, a }, fontSize, ...rest }) => {
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
        const curOrbits = CIRCLES.slice(1).map(({ radius, pos: { r, a: a0 }, orbitAngle, ...rest }) => {
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
