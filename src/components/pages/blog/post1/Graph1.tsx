import {useCallback, useState} from "react";

import styles from "./Graph.module.scss";


const Graph1 = () => {
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
        calc.setMathBounds(({ left: -0.2, right: 2.2, bottom: -0.5, top: 1.7 }));
        calc.setExpression({ id: "t", latex: "t_t = 0", sliderBounds: { min: 0, max: 2, step: "" } });
        calc.setExpression({ latex: "u = e^{-10 (x - 1 t_t)^2}" });

        const state = calc.getState() as Record<string, any>;
        // state.expressions.list[0].slider.isPlaying = "false";
        state.expressions.list[0].slider.loopMode = "LOOP_FORWARD";
        calc.setState(state);

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

export default Graph1;