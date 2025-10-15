import styles from "./index.module.scss";


const Positions = [
    { x:  20, y:  20, a:  30},
    { x: -30, y:  10, a: -20},
    { x:  10, y:  10, a:  70},
];

type Props = {
    onBackClick: () => void;
}
export const BlogPage = ({ onBackClick }: Props) => {
    return (
        <main className={styles["container"]}>
            <p style={{ fontSize: 40, lineHeight: 0, color: "black" }}
               onClick={onBackClick}>&#x2BC5;</p>
            {Positions.map(({ a, x, y }, i) => (
                <div key={i}
                     className={styles["construction"]}
                     style={{
                         transform: `translate(${x}vw, ${y}vh) rotate(${a}deg)`,
                     }} />
            ))}
            <h1>Under Development...</h1>
        </main>
    );
}
