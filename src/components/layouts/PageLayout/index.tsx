import {Footer} from "components/Footer";
import {SideMenu} from "components/SideMenu";

import styles from "./index.module.scss";


type Props = {
    activePage: string;
    children: React.ReactNode;
}
export const PageLayout = ({ activePage, children }: Props) => (
    <div className={styles["wrapper"]}>
        <SideMenu activePage={activePage} />
        <div className={styles["container"]}>
            {children}
            <Footer />
        </div>
    </div>
);
