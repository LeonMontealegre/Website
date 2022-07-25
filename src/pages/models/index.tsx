import {PageLayout} from "components/layouts/PageLayout";
import type {NextPage} from "next";

import styles from "./index.module.scss";


const MODELS = [
    { title: "Icarus",                 id: "LVWg4" },
    { title: "Xenoanimalia-arioforme", id: "KHrYt" },
    { title: "Lamborghini",            id: "Qw0hK" },
    { title: "Turret",                 id: "Xf2sS" },
    { title: "Tank",                   id: "M8oZf" },
    { title: "Furniture",              id: "k1KLL" },
    { title: "Kitchen Sink",           id: "m75Yt" },
    { title: "Piano",                  id: "yWYcb" },
    { title: "Elephant Heart",         id: "j0pAf" },
    { title: "Animatronic Turtle",     id: "MMvKg" },
    { title: "Animatronic Spider",     id: "7EmQ6" },
].map((m) => ({
    ...m,
    // Create YouTube URL from ID
    src: `https://p3d.in/e/${m.id}+bg-d9d9d9ff+controls-hidden`,
}));

const ModelsPage: NextPage = () => {
    return (
        <PageLayout activePage="Models">
            <div className={styles["info"]}>
                <ul>
                    {MODELS.map(({ title, id, src }) => (
                        <li key={id}>
                            <iframe
                                title={title}
                                src={src}
                                width="480px" height="480px"
                                frameBorder={0}
                                allowFullScreen seamless />
                        </li>
                    ))}
                </ul>
            </div>
        </PageLayout>
    );
}

export default ModelsPage;
