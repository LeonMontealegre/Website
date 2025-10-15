import {useCallback, useState} from "react";

import GraphData from "./Graph2.json";

import styles from "./Graph.module.scss";


const Graph = () => {
    const [calc, setCalc] = useState(undefined as Desmos.Calculator | undefined);
    const [isPaused, setIsPaused] = useState(true);

    const ref = useCallback((node: HTMLDivElement) => {
        const calc = Desmos.GraphingCalculator(node, {
            expressions: false,
            settingsMenu: false,
            zoomButtons: false,
            lockViewport: true,
            pointsOfInterest: false,
            trace: false,
        });
        calc.setState(GraphData);
        setCalc(calc);
    }, []);

    return (
        <div className={isPaused ? styles["paused"] : ""}
             style={{ position: "relative", display: "block", width: "100%", height: "400px" }}
             onClick={() => {
                 const state = calc?.getState() as Record<string, any>;
                 if (isPaused)
                    state.expressions.list[0].slider.isPlaying = "true";
                 else
                    delete state.expressions.list[0].slider.isPlaying;
                 calc?.setState(state);
                 setIsPaused(!isPaused);
             }}>
            <div ref={ref} style={{ position: "absolute", width: "100%", height: "100%" }}></div>
        </div>
    );
}

export default Graph;