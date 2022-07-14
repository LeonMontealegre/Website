import {SideMenu} from "components/SideMenu";

import styles from "./index.module.scss";


type Props = {
    activePage: string;
    children: JSX.Element;
}
export const PageLayout = ({ activePage, children }: Props) => (<>
    <SideMenu activePage={activePage} />
    <div className={styles["wrapper"]}>
        <div className={styles["container"]}>
            {children}
        </div>
    </div>
</>);
