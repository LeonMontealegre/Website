import styles from "./index.module.scss";


export const Footer = () => (
    <footer className={styles["footer"]}>
        <div className={styles["footer-left"]}>
            <span className="text-secondary">
                &#169; {new Date().getFullYear()} Leon Montealegre
            </span>
        </div>
        <div className={styles["footer-icons"]}>
            <a href="https://www.instagram.com/leonmontealegre/"
               className={styles["footer-icons-instagram"]} target="_blank" rel="noreferrer"></a>
            <a href="https://twitter.com/KingDolphinGuy"
               className={styles["footer-icons-twitter"]}   target="_blank" rel="noreferrer"></a>
            <a href="https://www.linkedin.com/in/leonmontealegre/"
               className={styles["footer-icons-linkedin"]}  target="_blank" rel="noreferrer"></a>
            <a href="https://www.youtube.com/user/leonmontealegre/"
               className={styles["footer-icons-youtube"]}   target="_blank" rel="noreferrer"></a>
            <a href="https://github.com/LeonMontealegre"
               className={styles["footer-icons-github"]}    target="_blank" rel="noreferrer"></a>
        </div>
        <div className={styles["footer-right"]}>
            <span>leonmontealegre.com</span>
        </div>
    </footer>
);
