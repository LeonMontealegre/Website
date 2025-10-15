import {Brighten, ColorToHex, HexToColor} from "utils/colors";


export const OriginPos = {
    x: 13, y: 13
};

type MoonInfoI = {
    id: string;

    title: string;
    desc?: string;

    thumb: string;
    banner?: string;

    bgCol?: string;
}

export type MoonInfo = MoonInfoI & {
    index: number;
    banner: string;
}

type PlanetInfoI = {
    text: string;

    color: string;
    fontSize: number;

    radius: number;
    pos: {
        r: number;
        a: number;
    };
    orbitAngle: number;

    moons?: MoonInfoI[];
}

export type PlanetInfo = Omit<PlanetInfoI, "moons"> & {
    shineColor: string;
    borderColor: string;
    boxShadow: boolean;
    shadowRadius: number;

    moons?: MoonInfo[];
}


const distinctColors = ["#f7ce48", "#477ba6", "#d48e72", "#c24646", "#84c267", "#d180ca"];

const coolDarkColors = ["#f7ce48", "#a67b4d", "#9b5c4f", "#703535", "#442030", "#362138"];

const test2 = ["#d28c3f", "#bf6352", "#af5739", "#903f3d", "#5f2a41", "#4b2d4e"];

const test = [test2[0], ...test2.slice(1).map((c) => ColorToHex(Brighten(HexToColor(c), 0.55, true)))];

const planetColors = distinctColors;

const PLANETS_I: PlanetInfoI[] = [
    {
        text: "",  // "Home",
        radius: 10,
        color: planetColors[0],
        pos: {
            r: 0,
            a: 0
        },
        orbitAngle: 0,
        fontSize: 4.0
    },
    {
        text: "About",
        radius:  5,
        color: planetColors[1],
        pos: {
            r: 28,
            a: 45
        },
        orbitAngle: -15,
        fontSize: 2.5,
    },
    {
        text: "Blog",
        radius:  4,
        color: planetColors[2],
        pos: {
            r: 46,
            a: 10
        },
        orbitAngle: -35,
        fontSize: 2.3
    },
    {
        text: "Projects",
        radius:  8,
        color: planetColors[3],
        pos: {
            r: 65,
            a: 70
        },
        orbitAngle: -45,
        fontSize: 3.1,
        moons: [
            {
                id:    "OpenCircuits",
                title: "OpenCircuits",
                desc:  "A free, online circuit designer for digital (and soon analog) electronics.",
                thumb: "/projects/OpenCircuits/thumb.png",
            },
            {
                id:    "DoublePendulum",
                title: "Double Pendulum",
                desc:  "A simple simulation of a double pendulum using my own Physics library with all computation " +
                       "performed in Web Assembly",
                thumb: "/projects/DoublePendulum/thumb.png",
                banner: "/projects/DoublePendulum/results.gif",
            },
            {
                id:    "SWEs",
                title: "Shallow Water Equations",
                desc:  "C++/OpenGL Simulation of the Shallow Water Equations",
                thumb: "/projects/SWEs/thumb.png",
            },
            {
                id:    "SPH",
                title: "Smoothed Particle Hydrodynamics",
                desc:  "JS and C++/OpenGL Simulation of fluids using Smoothed Particle Hydrodynamics",
                thumb: "/projects/SPH/thumb.jpg",
            },
            {
                id:    "Mandelbrot",
                title: "Mandelbrot Set",
                desc:  "A simple, interactive Mandelbrot set visualizer using JS + WebGL (golfed to <1500 characters)",
                thumb: "/projects/Mandelbrot/thumb.png",
            },
            {
                id:    "NebularHypothesis",
                title: "Nebular Hypothesis Simulation",
                desc:  "A simple, interactive simulation of the Nebular Hypothesis which is a theory about " +
                       "how solar systems are formed.",
                thumb: "/projects/NebularHypothesis/thumb.png",
            },
            {
                id:    "Gravity",
                title: "Gravity",
                desc:  "A simple, interactive simulation of gravitational attraction between bodies.",
                thumb: "/projects/Gravity/thumb.png",
                banner: "/projects/Gravity/banner.png",
            },
        ]
    },
    {
        text: "Animations",
        radius:  6,
        color: planetColors[4],
        pos: {
            r: 85,
            a: 30
        },
        orbitAngle: -46,
        fontSize: 2.2,
    },
    {
        text: "Models",
        radius:  5,
        color: planetColors[5],
        pos: {
            r: 100,
            a: 50
        },
        orbitAngle: -49,
        fontSize: 2.2,
    },
]

export const PLANETS: PlanetInfo[] = PLANETS_I.map((c, i) => ({
    ...c,
    pos: { r: c.pos.r, a: c.pos.a * Math.PI/180 },
    orbitAngle: c.orbitAngle * Math.PI/180,

    shineColor:  (i > 0 ? ColorToHex(Brighten(HexToColor(c.color), 0.7, true)) : c.color),
    borderColor: ColorToHex(Brighten(HexToColor(c.color), 0.8)),

    boxShadow: (i === 0),

    shadowRadius: (i === 0 ? 7 : 7),

    moons: c.moons?.map((m, i) => ({
        ...m,
        index: i,
        banner: (m.banner ?? m.thumb),
    })) as MoonInfo[],
}));

export function GetMoonInfo(planetText: string, moonId: string) {
    return PLANETS.find((p) => (p.text === planetText))
        ?.moons
        ?.find((m) => (m.id === moonId));
}
