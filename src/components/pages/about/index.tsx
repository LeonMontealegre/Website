import styles from "./index.module.scss";


type AboutPageProps = {
    onBackClick: () => void;
}
export const AboutPage = ({ onBackClick }: AboutPageProps) => {
    return (
        <main className={styles["container"]}>
            <p style={{ fontSize: 40, lineHeight: 0, color: "black" }}
               onClick={onBackClick}>&#x2BC5;</p>
            <h1 id="about">
                My name is <span className="text-success">Leon Montealegre</span> and I am a
                Site Reliability Engineer at
                <span style={{ color: "#4285F4" }}> G</span>
                <span style={{ color: "#EA4335" }}>o</span>
                <span style={{ color: "#FBBC05" }}>o</span>
                <span style={{ color: "#4285F4" }}>g</span>
                <span style={{ color: "#34A853" }}>l</span>
                <span style={{ color: "#EA4335" }}>e</span> in NYC for
                <span style={{ color: "#F57C00" }}> Firebase Messaging</span>.
                <br /><br />
                I studied <span className="text-info">
                    Computer Science
                </span> + <span className="text-warning">
                    Applied Mathematics
                </span> + <span className="text-danger">
                    Physics
                </span> as an undergraduate and received
                my Masters in <span className="text-info">Computer Science</span> at
                <span className="text-success"> Rensselaer Polytechnic Institute of Technology</span>.
                <br /><br />
                <p>My resume can be seen below</p>
            </h1>
            <div>
                <embed src="/res/resume.pdf#toolbar=0" width="100%" height="1020" />
            </div>
        </main>
    );
}
