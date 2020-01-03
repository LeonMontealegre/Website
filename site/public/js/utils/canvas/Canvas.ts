import {V} from "Vector";

import {Painter} from "./Painter";
import {CanvasPainter} from "./CanvasPainter";

export class Canvas {
    private canvas: HTMLCanvasElement;
    private painter: Painter;

    private onResizeCallback: () => void;

    public constructor(id: string, onResize: () => void) {
        this.onResizeCallback = onResize;

        this.canvas = document.getElementById(id) as HTMLCanvasElement;
        this.painter = new CanvasPainter(this.canvas);

        window.addEventListener("resize", () => this.onResize(), false);
    }

    public draw(func: (p: Painter) => void): void {
        this.painter.save();

        this.painter.clear();

        this.painter.translate(V(this.canvas.width/2, this.canvas.height));
        this.painter.scale(V(1, -1));

        func(this.painter);

        this.painter.restore();
    }

    public onResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.onResizeCallback();
    }

    public get width(): number {
        return this.canvas.width;
    }

    public get height(): number {
        return this.canvas.height;
    }
}