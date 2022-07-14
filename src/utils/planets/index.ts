import {Brighten, ColorToHex, HexToColor} from "utils/colors";


export const OriginPos = {
    x: 13, y: 13
};

export const PLANETS = [
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

export type PlanetInfo = typeof PLANETS[number];
