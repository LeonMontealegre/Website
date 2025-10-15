import Link from "next/link";

import {OriginPos, PLANETS, PlanetInfo} from "src/utils/planets";
import {Lerp, PolarToCartesian} from "utils/math";
import {CalcMoonPos, CalcPlanetPos, GetInterpolationFactors, zoomTransitionLength, zoomTransitionOutLength} from "utils/planets/utils";

import styles from "./index.module.scss";
import { useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import {useOnResize} from "utils/useWindowSize";



type MoonProps = {
    planet: PlanetInfo;
    isPlanetSelected: boolean;
    selectedMoon: number;
    moonI: number;
    curI: number;
    w: number;
    h: number;
    onClick?: () => void;
};
export const Moon = ({ planet, isPlanetSelected, selectedMoon, moonI, curI, w, h, onClick }: MoonProps) => {
    const { radius, pos: { r: dist, a } } = planet;
    const { id, title, desc, thumb, bgCol } = planet.moons![moonI];

    const isSelected = (selectedMoon === moonI);

    const [_, __, s] = GetInterpolationFactors(w, h);

    const [x, y, z, size, angle] = CalcMoonPos(planet, moonI, curI, isPlanetSelected, w, h);

    const [curTransition, setTransition] = useState("none" as "none" | "planetSelected" | "selected" | "deselected" | "move" | "resize");

    useLayoutEffect(() => {
        // Called when `isPlanetSelected` changes
        setTransition("planetSelected");
        setTimeout(() => setTransition("none"), 0.3*1000);
    }, [isPlanetSelected, setTransition]);
    useLayoutEffect(() => {
        // Called when `isSelected` changes
        if (isSelected) {
            setTransition("selected");
            setTimeout(() => setTransition("none"), zoomTransitionLength*1000);
        } else {
            setTransition("deselected");
            setTimeout(() => setTransition("none"), zoomTransitionOutLength*1000);
        }
    }, [isSelected, setTransition]);
    useLayoutEffect(() => {
        // Called when `curI` changes
        setTransition("move");
        setTimeout(() => setTransition("none"), 0.3*1000);
    }, [curI, setTransition]);

    const insetShadow = { 
        dx: -radius*2 * Math.cos(angle),
        dy: -radius*2 * Math.sin(angle),
        blur: 10,
        spread: radius/2,
    };

    return (
        // <Link href={(curI === moonI) ? `/projects/${id}` : "javascript:;"}>
        <div className={styles["moon"] + " " + (isSelected ? "" : styles["moon__deselected"])}
             style={{
                position: "absolute",
                zIndex: z + (moonI === curI ? 1 : 0),
                left: `${x}px`, top: `${y}px`,
                width: `${size}px`, height: `${size}px`, lineHeight: `normal`,
                borderRadius: "50%",
                
                backgroundColor: (bgCol ?? "gray"),
                backgroundSize: "cover",
                backgroundPosition: "center",

                opacity: (selectedMoon !== -1 && !isSelected) ? 0 : 1,

                transition: curTransition === "selected"
                    ? `transform ${zoomTransitionLength}s, width ${zoomTransitionLength}s, height ${zoomTransitionLength}s, left ${zoomTransitionLength}s, top ${zoomTransitionLength}s, z-index 0s, border-radius ${zoomTransitionLength}s`
                    : curTransition === "deselected"
                    ? `transform ${zoomTransitionOutLength}s, width ${zoomTransitionOutLength}s, height ${zoomTransitionOutLength}s, left ${zoomTransitionOutLength}s, top ${zoomTransitionOutLength}s, z-index 0s, border-radius ${zoomTransitionOutLength/4}s`
                    : (isSelected ? "none" : "transform 0.3s, width 1s, height 1s, left linear 1s, top linear 1s, z-index 1s, opacity 0.3s"),
                
                // isSelected ? "none" : "transform 0.3s, width 1s, height 1s, left linear 1s, top linear 1s, z-index 1s, opacity 0.3s",
                // transition: (curTransition === "none" 
                //             ? (isSelected ? "none" : "transform 0.3s, width 0s, height 0s, left 0s, top 0s, z-index 0s, opacity 0.3s") 
                //             : (curTransition === "planetSelected") 
                //             ? "transform 0.3s, width 0.3s, height 0.3s, left 0.3s, top 0.3s, z-index 0s, opacity 0.3s"
                //             : (curTransition === "move" 
                //             ? "transform 0.3s, width 1s, height 1s, left 1s, top 1s, z-index 1s, opacity 0.3s" 
                //             : (curTransition === "selected"
                //             ? `transform ${zoomTransitionLength}s, width ${zoomTransitionLength}s, height ${zoomTransitionLength}s, left ${zoomTransitionLength}s, top ${zoomTransitionLength}s, z-index 0s, border-radius ${zoomTransitionLength}s`
                //             : (curTransition === "deselected"
                //             ? `transform ${zoomTransitionOutLength}s, width ${zoomTransitionOutLength}s, height ${zoomTransitionOutLength}s, left ${zoomTransitionOutLength}s, top ${zoomTransitionOutLength}s, z-index 0s, border-radius ${zoomTransitionOutLength/4}s`
                //             : "")))),

                ...(() => {
                    if (isSelected) {
                        const newSize = Math.max(2*w/s, 2*h/s);
                        return {
                            width: `${newSize}px`,
                            height: `${newSize}px`,
                            left: x - newSize/2 + size/2,
                            top: y - newSize/2 + size/2,
                        };
                    }
                    return {};
                })(),
             }}
            onClick={(e) => {
                onClick?.();
                e.stopPropagation();
            }}>
            <Image src={thumb} fill alt="" layout="raw" 
                   style={{
                    borderRadius: "50%",

                    width: "100%",
                    height: "100%",

                    objectFit: "cover",

                    opacity: (isSelected ? 0 : 1),

                    transition: (curTransition === "selected"
                                ? `opacity 0.3s, border-radius ${zoomTransitionLength}s`
                                : (curTransition === "deselected"
                                ? `opacity 2s, border-radius ${zoomTransitionOutLength/4}s`
                                : "")),
                   }} />
            {/* Apply shadow as separate div since it doesn't go over img... */}
            <div style={{
                position: "absolute",

                left: 0,
                top: 0,
                width: "100%",
                height: "100%",
                
                borderRadius: (isSelected ? 0 : "50%"),

                boxShadow: `rgba(0, 0, 0, 0.5) 4px 8px 8px 0px, 
                            rgba(0, 0, 0, 0.4) ${insetShadow.dx}px ${insetShadow.dy}px ${insetShadow.blur}px ${-insetShadow.spread}px inset`,

                opacity: (isSelected ? 0 : 1),

                transition: (curTransition === "selected"
                            ? `opacity 0.3s, border-radius ${zoomTransitionLength}s`
                            : (curTransition === "deselected"
                            ? `opacity 2s, border-radius ${zoomTransitionOutLength/4}s`
                            : "")),
            }}></div>
            <p style={{
                position: "absolute",

                width: "100%",
                top: "100%",

                fontSize: 1.2 * s * radius / 8,
                opacity: (isSelected ? 0 : (isPlanetSelected && z > 0) ? 1 : 0),

                transition: "opacity 0.3s",
            }}>{title}</p>
        </div>
        // </Link>
    );
}


type Props = {
    planet: PlanetInfo;
    w: number;
    h: number;
    hide: boolean;
    isSelected: boolean;
    selectedMoon: number;
    onClick?: () => void;
    onMoonClick?: (i: number) => void;
};
export const Planet = ({ w, h, planet, hide, isSelected, selectedMoon, onClick, onMoonClick }: Props) => {
    const { radius, pos: { r: dist, a }, color, shineColor, fontSize } = planet;

    const [_, __, s] = GetInterpolationFactors(w, h);
    const [x, y, angle] = CalcPlanetPos(planet, w, h);
    const size = (2 * radius);

    const { text, shadowRadius, borderColor, boxShadow } = planet;

    const [curMoon, setCurMoon] = useState((selectedMoon === -1 ? 0 : selectedMoon));

    const insetShadow = {
        dx: -radius*2 * Math.cos(angle),
        dy: -radius*2 * Math.sin(angle),
        blur: 10,
        spread: radius/2,
    };

    return (<>
        <div className={styles["planet"]}
             style={{
                opacity: (hide ? 0 : 1),

                left: `${x * s}px`, top: `${y * s}px`,
                width: `${size * s}px`, height: `${size * s}px`, lineHeight: `${size * s}px`,
                fontSize: `${fontSize * s}px`,

                // Shading gradient pointing towards the sun, with shine that falls
                //  off as a function of distance from the sun `dist`
                backgroundImage: `linear-gradient(\
                    ${angle + Math.PI/2}rad, \
                    ${shineColor} ${16 - 0.11*dist}%, \
                    ${color}      ${75 - 0.50*dist}%\
                )`,

                // Box shadow halo around the planet
                boxShadow: (boxShadow ? `0 0 ${shadowRadius}px ${shadowRadius}px ${borderColor}` : ""),
             }}
             onClick={onClick}>
            <p style={{
                fontSize: fontSize * s,
                boxShadow: !boxShadow ? `rgba(0, 0, 0, 0.7) ${insetShadow.dx}px ${insetShadow.dy}px ${insetShadow.blur}px ${-insetShadow.spread}px inset` : "",

                transition: "opacity 0.75s",
                opacity: (isSelected && !planet.moons ? 0 : 1),
            }}>{text}</p>

            {(planet.moons && planet.moons.length > 0 && planet.moons.map((moon, i) => (
                <Moon key={i} 
                    isPlanetSelected={isSelected}
                    selectedMoon={selectedMoon}
                    planet={planet}
                    moonI={i}
                    curI={curMoon}
                    w={w} h={h}
                    onClick={() => {
                        if (curMoon === i)  // already focused, so zoom
                            onMoonClick?.(i);
                        setCurMoon(i);
                    }} />
            )))}
        </div>
    </>)
}
