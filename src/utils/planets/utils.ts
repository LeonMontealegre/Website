import {Lerp, Normalize} from "utils/math";


const RESIZE_END_AMT = 0.3;
const RESIZE_SCALING_AMT = 0.7;

export function GetInterpolationFactors(w: number, h: number) {
    const ratio = w/h;

    // Get the "time" parameter for the parametric formulas based on `ratio`
    const t = Normalize((ratio <= 1.0 ? ratio : 1/ratio), 1, RESIZE_END_AMT);

    // Calculate the current scale of all the coordinates
    const scale = (() => {
        const s = (ratio <= 1.0) ? (1) : (ratio);
        return Lerp(t, s, s*RESIZE_SCALING_AMT);
    })();

    return [ratio, t, scale * h / 100];
}
