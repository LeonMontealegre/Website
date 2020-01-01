import {Vector, V} from "./vector";
import {Painter, LineStyle} from "./painter";

export class CanvasPainter implements Painter {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;

    public constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    }

    public translate(p: Vector): void {
        this.ctx.translate(p.x, p.y);

        this.ctx.getTransform().multiply()
    }

    public rotateAbout(a: number, v: Vector): void {
        this.translate(v);
        this.ctx.rotate(a);
        this.translate(v.scale(-1));
    }

    public scaleAbout(s: Vector, v: Vector): void {
        this.translate(v);
        this.scale(s);
        this.translate(v.scale(-1));
    }

    public scale(s: Vector): void {
        this.ctx.scale(s.x, s.y);
    }

    public save(): void {
        this.ctx.save();
    }

    public restore(): void {
        this.ctx.restore();
    }

    public clear(): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public fillRect(pos: Vector, size: Vector): void {
        this.ctx.fillRect(pos.x, pos.y, size.x, size.y);
    }

    public drawLine(a: Vector, b: Vector): void {
        this.ctx.beginPath();
        this.ctx.moveTo(a.x, a.y);
        this.ctx.lineTo(b.x, b.y);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    public drawCurve(p1: Vector, p2: Vector, c1: Vector, c2: Vector): void {
        this.ctx.beginPath();
        this.ctx.moveTo(p1.x, p1.y);
        this.ctx.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, p2.x, p2.y);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    public setStrokeColor(col: string): void {
        this.ctx.strokeStyle = col;
    }
    public setFillColor(col: string): void {
        this.ctx.fillStyle = col;
    }

    public setLineStyle(style: LineStyle): void {
        this.ctx.strokeStyle = style.color;
        this.ctx.lineWidth = style.width;
        this.ctx.lineCap = style.cap;
    }

}

export class Canvas {
    private canvas: HTMLCanvasElement;
    private painter: Painter;

    private callback: (canvas: Canvas, painter: Painter) => void;

    public constructor(id: string, callback: (canvas: Canvas, painter: Painter) => void) {
        this.callback = callback;

        this.canvas = document.getElementById(id) as HTMLCanvasElement;
        this.painter = new CanvasPainter(this.canvas);

        window.addEventListener("resize", () => this.onResize(), false);

        this.onResize();
    }

    public draw(): void {
        this.painter.save();

        this.painter.clear();

        this.painter.translate(V(this.canvas.width/2, this.canvas.height));
        this.painter.scale(V(1, -1));

        this.callback(this, this.painter);

        this.painter.restore();
    }

    private onResize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.draw();
    }

    public get width(): number {
        return this.canvas.width;
    }

    public get height(): number {
        return this.canvas.height;
    }
}