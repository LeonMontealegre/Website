import {PageLayout} from "components/layouts/PageLayout";
import type {NextPage} from "next";

import styles from "./index.module.scss";


const Positions = [
    { x:  20, y:  20, a:  30},
    { x: -30, y:  10, a: -20},
    { x:  10, y:  10, a:  70},
];

const BlogPage: NextPage = () => {
    return (
        <PageLayout activePage="Blog">
            {Positions.map(({ a, x, y }, i) => (
                <div key={i}
                     className={styles["construction"]}
                     style={{
                         transform: `translate(${x}vw, ${y}vh) rotate(${a}deg)`,
                     }} />
            ))}
            <div className={styles["info"]}>
                <h1>Under Development...</h1>
            </div>
        </PageLayout>
    );
}

export default BlogPage;
