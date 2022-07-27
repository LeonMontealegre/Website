import {PageLayout} from "components/layouts/PageLayout";
import type {NextPage} from "next";
import Image from "next/image";

import styles from "./index.module.scss";


const PROJECTS = [
    {
        id:    "OpenCircuits",
        title: "OpenCircuits",
        desc:  "A free, online circuit designer for digital (and soon analog) electronics.",
        links: {
            first:  ["Open Site", "https://opencircuits.io/"],
            second: ["More Info", "https://github.com/OpenCircuits/OpenCircuits"],
        },
        objectFit: "contain" as React.CSSProperties["objectFit"],
    },
    {
        id:    "DoublePendulum",
        title: "Double Pendulum",
        desc:  "A simple simulation of a double pendulum using my own Physics library with all computation " +
               "performed in Web Assembly",
        links: {
            first:  ["Open Simulation", "/DoublePendulum/app"],
            second: ["More Info", "/DoublePendulum"],
        },
    },
    {
        id:    "SWEs",
        title: "Shallow Water Equations",
        desc:  "C++/OpenGL Simulation of the Shallow Water Equations",
        links: {
            first:  ["Paper", "/SWEs/paper"],
            second: ["More Info", "/SWEs"],
        },
    },
    {
        id:    "SPH",
        title: "Smoothed Particle Hydrodynamics",
        desc:  "JS and C++/OpenGL Simulation of fluids using Smoothed Particle Hydrodynamics",
        tag:   "SPH",
        links: {
            first:  ["Presentation", "/SPH/presentation"],
            second: ["More Info", "/SPH"],
        },
    },
    {
        id:    "Mandelbrot",
        title: "Mandelbrot Set",
        desc:  "A simple, interactive Mandelbrot set visualizer using JS + WebGL (golfed to <1500 characters)",
        links: {
            first:  ["Open Visualizer", "/Mandelbrot/app"],
            second: ["More Info", "/Mandelbrot"],
        },
    },
    {
        id:    "NebularHypothesis",
        title: "Nebular Hypothesis Simulation",
        desc:  "A simple, interactive simulation of the Nebular Hypothesis which is a theory about " +
               "how solar systems are formed.",
        tag:   "Nebular Hypothesis",
        links: {
            first:  ["Open Visualizer", "/NebularHypothesis/app"],
            second: ["More Info", "/NebularHypothesis"],
        },
    },
    {
        id:    "Gravity",
        title: "Gravity",
        desc:  "A simple, interactive simulation of gravitational attraction between bodies.",
        links: {
            first:  ["Open Visualizer", "/Gravity/app"],
            second: ["More Info", "/Gravity"],
        },
    },
].map(p => ({
    ...p,
    tag: (p.tag ?? p.title),
    links: p.links as { first: [string, string], second: [string, string] },
    thumb: `/projects/${p.id}/thumb.png`,
}));

const ProjectsPage: NextPage = () => {
    return (
        <PageLayout activePage="Projects">
            <div className={styles["info"]}>
                <ul>
                    {PROJECTS.map(({ id, title, desc, tag, links, thumb, objectFit }) => (
                        <li key={id}>
                            <div>
                                <Image src={thumb} className={styles["card-header"]}
                                       objectFit={objectFit}
                                       width={styles.cardWidth} height={styles.cardThumbHeight}
                                       alt={desc} />
                                <div>
                                    <h3><strong>{title}</strong></h3>
                                    <p>{desc}</p>
                                    <div>
                                        <div>
                                            <a href={links.first[1]}
                                               {...(() => (links.first[1].startsWith("/")
                                                            ? {}
                                                            : { target: "_blank", rel: "noreferrer" }
                                                          ))}>
                                                {links.first[0]}
                                            </a>
                                            <a href={links.second[1]}
                                               {...(() => (links.second[1].startsWith("/")
                                                            ? {}
                                                            : { target: "_blank", rel: "noreferrer" }
                                                          ))}>
                                                {links.second[0]}
                                            </a>
                                        </div>
                                        <small>{tag}</small>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </PageLayout>
    );
}

export default ProjectsPage;
