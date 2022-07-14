import {PageLayout} from "components/layouts/PageLayout";
import type {NextPage} from "next";

import styles from "./index.module.scss";


const AboutPage: NextPage = () => {
    return (
        <PageLayout activePage="About">
            <div className={styles["container"]}>
                <h1 id="about">
                    My name is <span className="text-success">Leon Montealegre</span> and I am a
                    Software Engineer at
                    <span style={{ color: "#4285F4" }}> G</span>
                    <span style={{ color: "#EA4335" }}>o</span>
                    <span style={{ color: "#FBBC05" }}>o</span>
                    <span style={{ color: "#4285F4" }}>g</span>
                    <span style={{ color: "#34A853" }}>l</span>
                    <span style={{ color: "#EA4335" }}>e</span> in NYC.
                    <br /><br />
                    I studied <span className="text-info">
                        Computer Science
                    </span> + <span className="text-warning">
                        Applied Mathematics
                    </span> + <span className="text-danger">
                        Physics
                    </span> as an undergraduate and pursued
                    a Masters in <span className="text-success">Computer Science</span> at
                    <span className="text-secondary"> Rensselaer Polytechnic Institute of Technology</span>.
                    <br /><br />
                    <p>My resume can be seen below</p>
                </h1>
                <div>
                    <embed src="/res/resume.pdf#toolbar=0" width="100%" height="1020" />
                </div>
            </div>
        </PageLayout>
    );
}

export default AboutPage;
