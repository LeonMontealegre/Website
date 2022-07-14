import Link from "next/link";
import {Brighten, ColorToHex, HexToColor} from "utils/colors";

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
                    backgroundColor: `${p.shineColor}22`,
                    boxShadow: (p.text === activePage ? `inset 0 0 2px 2px ${p.borderColor}55` : ""),
                }}>
                    {p.text}
                </div>
            </Link>
        ))}
    </div>
);
