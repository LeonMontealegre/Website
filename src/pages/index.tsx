import type {NextPage}       from "next";
import {useCallback, useEffect, useLayoutEffect, useState} from "react";

import {useWindowSize} from "utils/useWindowSize";
import {MoonInfo, PLANETS, PlanetInfo} from "utils/planets";
import { CalcMoonPos, CalcPlanetPos, GetInterpolationFactors, zoomTransitionLength } from "utils/planets/utils";

import {Footer} from "components/Footer";
import {Orbit}  from "components/Orbit";
import {Planet} from "components/Planet";

import {ProjectPages} from "components/pages/projects";
import {AboutPage} from "components/pages/about";
import {AnimationsPage} from "components/pages/animations";
import {ModelsPage} from "components/pages/models";
import {BlogPage} from "components/pages/blog";

import styles from "./index.module.scss";


const CalcPosDiff = (p: PlanetInfo | undefined, m: MoonInfo | undefined, w: number, h: number) => {
    if (!p)
        return { dx: 0, dy: 0, z: 1 };

    if (!m) {
        const [_, __, s] = GetInterpolationFactors(w, h);
        const [x, y] = CalcPlanetPos(p, w, h);
        const z = 15 / p.radius * (p.moons ? 1 : 5);

        return {
            dx: z*(w/2 - x*s),
            dy: z*(h/2 - y*s),
            z,
        };
    }

    const [_, __, s] = GetInterpolationFactors(w, h);
    const [x, y, ___, rr] = CalcMoonPos(p, m.index, m.index, true, w, h, true);
    const z = 80 / p.radius;

    return {
        dx: z*(w/2 - x - rr/2),
        dy: z*(h/2 - y - rr/2),
        z,
    };
};


const getURLHash = () => {
    return window.location.hash.substring(1);
};

const useHashState = () => {
    const [state, setStateInternal] = useState("");

    useEffect(() => {
        const listener = (ev: HashChangeEvent) => {
            setStateInternal(ev.newURL.split("#")[1] ?? "");
        };
        window.addEventListener("hashchange", listener);
        return () => window.removeEventListener("hashchange", listener);
    }, [setStateInternal]);

    const setState = useCallback((newVal: string) => {
        setStateInternal(newVal);
        window.location.hash = newVal;
    }, [setStateInternal]);

    return [state, setState] as const;
};


type ZoomedPageProps = {
    planet: PlanetInfo;
    moon?: MoonInfo;

    onBackClick: () => void;
}
const ZoomedPage = ({ planet, moon, onBackClick }: ZoomedPageProps) => {
    if (planet.text === "About") {
        return <AboutPage onBackClick={onBackClick} />
    }
    if (planet.text === "Blog") {
        return <BlogPage onBackClick={onBackClick} />
    }
    if (planet.text === "Projects" && moon) {
        if (moon.id in ProjectPages) {
            return ProjectPages[moon.id as keyof typeof ProjectPages]({ onBackClick });
        }
    }
    if (planet.text === "Animations") {
        return <AnimationsPage onBackClick={onBackClick} />
    }
    if (planet.text === "Models") {
        return <ModelsPage onBackClick={onBackClick} />
    }

    return null;
}

type State = {
    selectedPlanetIdx: number;
    selectedMoonIdx: number;
}

const encodeHash = (state: State): string => {
    return window.btoa(`${state.selectedPlanetIdx},${state.selectedMoonIdx}`);
}
const decodeHash = (hash: string): State => {
    if (hash.trim().length === 0) 
        return { selectedPlanetIdx: -1, selectedMoonIdx: -1 };

    try {
        // Need to try/catch in case hash is malformed
        const vals = window.atob(hash).split(",");
        if (vals.length === 0)
            return { selectedPlanetIdx: -1, selectedMoonIdx: -1 };

        const numVals = vals
            .map((s) => parseInt(s))
            .map((v) => (isNaN(v) ? -1 : v));

        return {
            selectedPlanetIdx: numVals[0],
            selectedMoonIdx: numVals[1] ?? -1,
        };
    } catch (e) {
        return { selectedPlanetIdx: -1, selectedMoonIdx: -1 };
    }
}

const noMoonPlanetZoomTime = 1;


const shouldShowPage = (selectedMoonIdx: number, selectedPlanetIdx: number) => {
    return (selectedMoonIdx !== -1 || (selectedPlanetIdx !== -1 && !PLANETS[selectedPlanetIdx].moons));
}

const Home: NextPage = () => {
    const [show, setShow] = useState(false);
    const { w, h } = useWindowSize();

    const [showPage, setShowPage] = useState(false);

    const [hashState, setHashState] = useHashState();
    const { selectedPlanetIdx, selectedMoonIdx } = decodeHash(hashState);

    const [curTransition, setTransition] = useState("none" as "none" | "zoomPlanetNoMoons");

    // Catch edge case where user clicks on moon and quickly clicks off before timeout is done
    const actuallyShowPage = (showPage && shouldShowPage(selectedMoonIdx, selectedPlanetIdx));
    if (showPage && !actuallyShowPage)
        setShowPage(false);
    
    useEffect(() => {
        // On client load, set state to current url hash and show
        setHashState(getURLHash());
        setShow(true);
        // Also check if a moon is currently selected and show its page
        const { selectedMoonIdx, selectedPlanetIdx } = decodeHash(getURLHash());
        setShowPage(shouldShowPage(selectedMoonIdx, selectedPlanetIdx));
    }, []);

    // Use effect on moon idx in case the user changed the URL hash manually (or went forward/back)
    // to show the page of the selected moon
    useEffect(() => {
        // curMoonIdx changed to something
        if (selectedMoonIdx !== -1) {
            setTimeout(() => {
                setShowPage(true);
            }, zoomTransitionLength*1000/2);
        }
    }, [selectedMoonIdx]);

    // Check for planet selection to change transition speed
    useLayoutEffect(() => {
        const p = PLANETS[selectedPlanetIdx];
        if (!p) {
            return;
        }
        if (p.moons) {
            setTransition("none");
            return;
        }
        // No moons, set transition
        setTransition("zoomPlanetNoMoons");
        setTimeout(() => setTransition("none"), noMoonPlanetZoomTime*1000);
    }, [selectedPlanetIdx, setTransition]);

    if (!show)
        return (<div></div>);

    const selectedPlanet = PLANETS[selectedPlanetIdx];
    const selectedMoon = PLANETS[selectedPlanetIdx]?.moons?.[selectedMoonIdx];
    const { dx, dy, z } = CalcPosDiff(selectedPlanet, selectedMoon, w, h);

    const setStatus = (planetI: number, moonI?: number) => {
        if (planetI === -1) {
            setHashState("");
            return;
        }
        setHashState(encodeHash({
            selectedPlanetIdx: planetI,
            selectedMoonIdx: (moonI ?? -1),
        }));
    }
    const onPlanetClick = (planetI: number) => {
        if (planetI === 0) {  // Don't do anything if click on sun
            return;
        }

        if (selectedPlanetIdx === planetI) {  // Go back if we're already on the planet
            setStatus(-1);  // reset
            setShowPage(false);
        } else {
            setStatus(planetI);
            // If no moons, then show page for this planet
            if (!PLANETS[planetI].moons) {
                setTimeout(() => {
                    setShowPage(true);
                }, noMoonPlanetZoomTime*1000*0.8);
            }
        }
    }
    const onMoonClick = (planetI: number, moonI: number) => {
        if (selectedMoonIdx === moonI) {
            setStatus(planetI, -1);  // reset moon
            setShowPage(false);
        } else {
            setStatus(planetI, moonI);
            setTimeout(() => {
                setShowPage(true);
            }, zoomTransitionLength*1000/2);
        }
    }

    return (<div className={styles["parent-container"]} 
                 onClick={(e) => {
                     // Go back if we clicked the bg
                     if (e.target === e.currentTarget)
                         setStatus(-1, -1);
                 }}>
        <div className={styles["container"]}
             style={{
                transform: `translate(${dx}px, ${dy}px) scale(${z})`,
                transition: (curTransition === "none" 
                            ? "transform 0.5s linear 0s"
                            : (curTransition === "zoomPlanetNoMoons"
                            ? `transform ${noMoonPlanetZoomTime}s linear`
                            : "")),
             }}>
            <div className={styles["orbit-container"]} style={{ opacity: (selectedPlanetIdx === -1 ? 1 : 0) }}>
                {PLANETS.slice(1).map(p => (
                    <Orbit key={`${p.text}-orbit`} w={w} h={h} planet={p} />
                ))}
            </div>
            {PLANETS.map((p, i) => (
                <Planet key={p.text} 
                    w={w} 
                    h={h} 
                    planet={p} 
                    isSelected={selectedPlanetIdx === i}
                    selectedMoon={selectedMoonIdx}
                    hide={selectedPlanetIdx === -1 ? false : (selectedPlanet !== p)} 
                    onClick={() => onPlanetClick(i)}
                    onMoonClick={(j) => onMoonClick(i, j)} />
            ))}
        </div>
        <div className={styles["container"]}
             style={{
                opacity: (actuallyShowPage ? 1 : 0),

                transition: "opacity 0.5s",

                // If a no-moon planet is zoomed, then show it as the background color
                backgroundColor: (selectedMoonIdx === -1 ? 
                    selectedPlanet?.color :
                    "gray"),

                pointerEvents: (actuallyShowPage ? "all" : "none"),

                overflowY: "scroll",
             }}>
            {actuallyShowPage && 
                <ZoomedPage planet={selectedPlanet!}
                            moon={selectedMoon}
                            onBackClick={() => {
                                if (selectedMoonIdx === -1) {
                                    setStatus(-1);
                                } else {
                                    onMoonClick(selectedPlanetIdx, selectedMoonIdx);
                                }
                            }} />}
        </div>
        <div className={styles["footer-wrapper"]}>
            <Footer />
        </div>
    </div>);
}

export default Home;
