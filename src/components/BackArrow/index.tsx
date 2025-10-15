import Image from "next/image";

import img from "./img.svg";

interface Props {
    onBackClick: () => void;
}
export const BackArrow = ({ onBackClick }: Props) => (
    <p style={{ fontSize: 40, lineHeight: 0, color: "black" }}
        onClick={onBackClick}><Image src={img} alt="" /></p>
);
