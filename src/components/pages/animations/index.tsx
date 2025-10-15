import Image, {ImageLoader} from "next/image";
import {useState} from "react";

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
    src: `https://www.youtube.com/embed/${a.id}?feature=oembed&wmode=opaque&autoplay=1`,
}));


const thumbnailLoader: ImageLoader = (({ src: id }) => `https://img.youtube.com/vi/${id}/sddefault.jpg`);

type Props = {
    onBackClick: () => void;
}
export const AnimationsPage = ({ onBackClick }: Props) => {
    const [loadedVids, setLoadedVids] = useState(ANIMATIONS.map(_ => false));

    const playVid = (i: number) => (
        setLoadedVids([...loadedVids.slice(0,i), true, ...loadedVids.slice(i+1)])
    );

    return (
        <main className={styles["container"]}>
            <p style={{ fontSize: 40, lineHeight: 0, color: "black" }}
                onClick={onBackClick}>&#x2BC5;</p>
            <div className={styles["info"]}>
                <ul>
                    {ANIMATIONS.map(({ title, id, src }, i) => (
                        <li key={id}>
                            {loadedVids[i]
                                ? (
                                    <iframe
                                        title={title}
                                        src={src}
                                        width="400px" height="225px"
                                        frameBorder={0}
                                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen />
                                ) : (
                                    <div role="button"
                                            onClick={() => playVid(i)}>
                                        <Image
                                            title={title}
                                            // loader={thumbnailLoader}
                                            src={`https://img.youtube.com/vi/${id}/sddefault.jpg`}
                                            width="400" height="225"
                                            alt={title}
                                            />
                                    </div>
                                )}
                        </li>
                    ))}
                </ul>
            </div>

        </main>
    );
}
