import {Clamp} from "./math";

export type Color = {
    r: number;
    g: number;
    b: number;
}

export function HexToColor(col: string): Color {
    const is6DigitHex = /^\#(?:[0-9A-F]{6})$/i;
    if (!is6DigitHex.test(col))
        throw new Error("Color failed to match pattern: #DDDDDD!");
    return {
        r: Number.parseInt(col.slice(1, 3), 16),
        g: Number.parseInt(col.slice(3, 5), 16),
        b: Number.parseInt(col.slice(5, 7), 16)
    }
}

export function ColorToHex(col: Color) {
    return `#${[col.r, col.g, col.b].map(x => {
        const hex = Math.round(x).toString(16);
        return (hex.length === 1 ? "0" : "") + hex;
    }).join("")}`;
}

export function ClampColor({ r, g, b }: Color) {
    return {
        r: Clamp(r, 0, 255),
        g: Clamp(g, 0, 255),
        b: Clamp(b, 0, 255),
    };
}

export function Brighten(col: Color, amt: number, useHSL = false): Color {
    if (useHSL) {
        const [h, s, l] = rgbToHsl(col);
        return ClampColor(hslToRgb([ h, s, amt ]));
    }
    const [h, s, v] = rgbToHsv(col);
    return ClampColor(hsvToRgb([ h, s, amt ]));
}


// From https://gist.github.com/mjackson/5311256
export const { hslToRgb, hsvToRgb, rgbToHsl, rgbToHsv } = (() => {
    const calcHue = ({ r, g, b }: Color) => {
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        const d = max - min;

        if (d === 0)
            return 0; // achromatic

        switch (max) {
            case r: return ((g - b) / d + (g < b ? 6 : 0)) / 6;
            case g: return ((b - r) / d + 2)               / 6;
            case b: return ((r - g) / d + 4)               / 6;
        }
        throw new Error("Undefined Hue Calculation!");
    }

    const rgbToHsl = ({ r, g, b }: Color) => {
        r /= 255, g /= 255, b /= 255;

        const max = Math.max(r, g, b), min = Math.min(r, g, b);

        const l = (max + min) / 2;
        const s = (max !== min) ? ((max - min)/2 / ((l > 0.5) ? (1 - l) : (l))) : (0);
        const h = calcHue({ r, g, b });

        return [h, s, l] as const;
    }
    const rgbToHsv = ({ r, g, b }: Color) => {
        r /= 255, g /= 255, b /= 255;

        const max = Math.max(r, g, b), min = Math.min(r, g, b);

        const v = max;
        const s = (max === 0) ? (0) : ((max - min) / max);
        const h = calcHue({ r, g, b });

        return [h, s, v] as const;
    }

    const hslToRgb = ([ h, s, l ]: [number, number, number]): Color => {
        let r, g, b;

        if (s === 0) {
            r = g = b = l; // achromatic
        } else {
            const hue2rgb = (p: number, q: number, t: number) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }

            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;

            r = 255 * hue2rgb(p, q, h + 1/3);
            g = 255 * hue2rgb(p, q, h);
            b = 255 * hue2rgb(p, q, h - 1/3);
        }

        return { r, g, b };
    }
    const hsvToRgb = ([ h, s, v ]: [number, number, number]): Color => {
        let r, g, b;

        const i = Math.floor(h * 6);
        const f = h * 6 - i;
        const p = v * (1 - s);
        const q = v * (1 - f * s);
        const t = v * (1 - (1 - f) * s);

        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
            default: throw new Error("Undefined HSV -> RGB Calculation!");
        }

        return { r: 255*r, g: 255*g, b: 255*b };
    }

    return { rgbToHsl, rgbToHsv, hslToRgb, hsvToRgb };
})();
