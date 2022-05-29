
import styles from "./index.module.scss";

console.log(styles);

export const Footer = () => (
    <footer className={styles["footer"]}>
        <div className={styles["footer-left"]}>
            <span className="text-secondary">
                &#169; {new Date().getFullYear()} Leon Montealegre
            </span>
        </div>
        <div className={styles["footer-icons"]}>
            <a href="https://www.instagram.com/leonmontealegre/"    className={styles["fa"] + " " + styles["fa-instagram"]} target="_blank" rel="noreferrer"></a>
            <a href="https://twitter.com/KingDolphinGuy"            className={styles["fa"] + " " + styles["fa-twitter"]}   target="_blank" rel="noreferrer"></a>
            <a href="https://www.linkedin.com/in/leonmontealegre/"  className={styles["fa"] + " " + styles["fa-linkedin"]}  target="_blank" rel="noreferrer"></a>
            <a href="https://www.youtube.com/user/leonmontealegre/" className={styles["fa"] + " " + styles["fa-youtube"]}   target="_blank" rel="noreferrer"></a>
            <a href="https://github.com/LeonMontealegre"            className={styles["fa"] + " " + styles["fa-github"]}    target="_blank" rel="noreferrer"></a>
        </div>
        <div className={styles["footer-right"]}>
            <span>leonmontealegre.com</span>
        </div>
    </footer>
);

