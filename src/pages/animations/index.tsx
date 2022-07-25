import {PageLayout} from "components/layouts/PageLayout";
import type {NextPage} from "next";

import styles from "./index.module.scss";


const ANIMATIONS = [
    { title: "Traffic Laws"                                     , id: "xx5a2DZZYeU" },
    { title: "AP Lang - Rhetorical Terms Project"               , id: "cZsAoQ4-YrY" },
    { title: "How it Works : Accordion"                         , id: "-rwHO5oltX8" },
    { title: "PSA: Smoking and Tobacco Use"                     , id: "ocr_DNFUD4M" },
    { title: "The Fibonacci Sequence"                           , id: "quX3r7m37Sw" },
    { title: "Do Androids Dream of Electric Sheep? Book Trailer", id: "h-o5h7zlR4U" },
    { title: "Berlin Wall Project Thing Summer 2014"            , id: "Eq_kH7YvXtY" },
    { title: "Okinawa Animation"                                , id: "B7fHl4qQ54o" },
    { title: "My First Animation"                               , id: "cBch8ZC5tqs" },
].map((a) => ({
    ...a,
    // Create YouTube URL from ID
    src: `https://www.youtube.com/embed/${a.id}?feature=oembed&amp;amp;wmode=opaque`,
}));

const AnimationsPage: NextPage = () => {
    return (
        <PageLayout activePage="Animations">
            <div className={styles["info"]}>
                <ul>
                    {ANIMATIONS.map(({ title, id, src }) => (
                        <li key={id}>
                            <iframe
                                title={title}
                                src={src}
                                width="400px" height="225px"
                                frameBorder={0}
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen />
                        </li>
                    ))}
                </ul>
            </div>
        </PageLayout>
    );
}

export default AnimationsPage;
