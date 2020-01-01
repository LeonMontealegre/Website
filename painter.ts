import {Vector} from "./vector";

type CapType = "butt" | "round" | "square";
export class LineStyle {
    public color: string;
    public width: number;
    public cap: CapType;

    public constructor(color: string, width: number, cap: CapType) {
        this.color = color;
        this.width = width;
        this.cap = cap;
    }
}

export interface Painter {
    translate(p: Vector): void;
    rotateAbout(a: number, v: Vector): void;
    scale(s: Vector): void;
    scaleAbout(s: Vector, v: Vector): void;

    save(): void;
    restore(): void;

    clear(): void;

    drawLine(a: Vector, b: Vector): void;
    drawCurve(p1: Vector, p2: Vector, c1: Vector, c2: Vector): void;

    fillRect(pos: Vector, size: Vector): void;

    setStrokeColor(col: string): void;
    setFillColor(col: string): void;

    setLineStyle(style: LineStyle): void;
}