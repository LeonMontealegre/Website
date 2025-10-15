import {Lerp, Normalize, PolarToCartesian} from "utils/math";
import {OriginPos, PlanetInfo} from ".";


const RESIZE_END_AMT = 0.3;
const RESIZE_SCALING_AMT = 0.7;

export const zoomTransitionLength = 2;
export const zoomTransitionOutLength = 2;

export function GetInterpolationFactors(w: number, h: number) {
    const ratio = w/h;

    // Get the "time" parameter for the parametric formulas based on `ratio`
    const t = Normalize((ratio <= 1.0 ? ratio : 1/ratio), 1, RESIZE_END_AMT);

    // Calculate the current scale of all the coordinates
    const scale = (() => {
        const s = (ratio <= 1.0) ? (1) : (ratio);
        return Lerp(t, s, s*RESIZE_SCALING_AMT);
    })();
    

    // console.log(ratio, t, scale * h/100);

    return [ratio, t, scale * h / 100];
}

export function CalcPlanetPos(p: PlanetInfo, w: number, h: number) {
    const [r, t, s] = GetInterpolationFactors(w, h);

    // Get current angle and then calculate size and cartesian coordinates
    const angle = Lerp(t, p.pos.a, ((r <= 1.0) ? (Math.PI/2) : (0)));
    const size = (2 * p.radius);
    const [x, y] = PolarToCartesian(p.pos.r, angle, OriginPos);

    return [x, y, angle];
}

export function CalcMoonPos(p: PlanetInfo, moonI: number, curI: number, isSelected: boolean, w: number, h: number, absolute = false) {
    function fmod(f: number, m: number) {
        const ff = f % m;
        return (ff < 0 ? ff + m : ff);
    }

    const { radius, pos: { r: dist, a } } = p;
    const numMoons = p.moons!.length;
    const [r, t, s] = GetInterpolationFactors(w, h);

    const angle = Lerp(t, a, ((r <= 1.0) ? (Math.PI/2) : (0)));
    const ttt = (moonI - curI) / (numMoons);
    const oo = {
        x: 0,
        y: (isSelected ? 0 : 20),
        sx: 1.4 * (isSelected ? 1 : 0.9),
        sy: 0.75 * (isSelected ? 1 : 0.6),
    };
    const [x0, y0] = (absolute ? PolarToCartesian(dist, angle, OriginPos) : [0, 0]); //;

    const ss = (1 - 0.8*(1 - Math.abs(2*fmod(ttt, 1.0) - 1))) * (isSelected ? 1 : 0.7) * p.radius / 8;  // Scale factor for the moons
    const rr = 70 * ss;
    const x = radius * oo.sx * s * Math.cos(2*Math.PI*ttt + Math.PI/2) + x0*s - rr/2 + (absolute ? 0 : radius * s);
    const y = radius * oo.sy * s * Math.sin(2*Math.PI*ttt + Math.PI/2) + oo.y + y0*s - rr/2 + (absolute ? 0 : radius * s);
    const z = (Math.PI - Math.abs(Math.PI - 2*Math.PI*fmod(ttt, 1.0)) <= Math.PI/1.9 ? 1 : 0);

    return [x, y, z, rr, angle];
}
