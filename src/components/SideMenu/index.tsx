import Link from "next/link";

import {PLANETS} from "utils/planets";

import styles from "./index.module.scss";


type Props = {
    activePage: string;
}
export const SideMenu = ({ activePage }: Props) => (
    <div className={styles["sidemenu"]}>
        {PLANETS.map(p => (
            <Link key={p.text} href={p.href}>
                <div style={{
                    color: p.shineColor,
                    backgroundColor: `${p.shineColor}77`,
                    boxShadow: (p.text === activePage ? `inset 0 0 3px 3px ${p.borderColor}77` : "none"),
                }}>
                    {p.text}
                </div>
            </Link>
        ))}
    </div>
);
