import {Matrix2x3} from "./matrix";
import {Path} from "./path";

import {Animation} from "./animation";

export class TreeAnimation extends Animation {
    private step2: (t: number, t1: Matrix2x3, t2: Matrix2x3) => void;

    public constructor(path: Path, dt: number, step: (t: number, t1: Matrix2x3, t2: Matrix2x3) => void, finish: () => void) {
        super(path, dt, (t) => this.onStep(t), finish);

        this.step2 = step;
    }

    private onStep(t: number): void {
        const t1 = new Matrix2x3();
        const t2 = new Matrix2x3();

        const pos = this.getPos();
        const angle = this.getDir().angle();

        t1.rotateAbout(angle - this.getInitialDir().angle(), pos);
        t1.translate(pos.sub(this.getInitialPos()));

        t2.translate(t1.mul(this.getInitialPos()));
        t2.rotate(angle + Math.PI/2);
        t2.scale(t);

        this.step2(t, t1, t2);
    }
}