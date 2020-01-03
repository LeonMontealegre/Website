import {Vector} from "vector";
import {Path} from "path";

export class Animation {
    public path: Path;

    private step: (t: number) => void;
    private finish: () => void;

    private t: number;
    private dt: number;

    public constructor(path: Path, dt: number, step: (t: number) => void, finish: () => void) {
        this.path = path;
        this.step = step;
        this.finish = finish;
        this.t = 0;
        this.dt = dt;
    }

    public animate(): void {
        if (this.t >= 1) {
            this.finish();
            return;
        }
        this.t = Math.min(this.t + this.dt, 1);
        this.step(this.t);

        requestAnimationFrame(() => this.animate());
    }

    public getInitialPos(): Vector {
        return this.path.getPos(0);
    }

    public getFinalPos(): Vector {
        return this.path.getPos(1);
    }

    public getInitialDir(): Vector {
        return this.path.getDir(0);
    }

    public getFinalDir(): Vector {
        return this.path.getDir(1);
    }

    public getPos(): Vector {
        return this.path.getPos(this.t);
    }

    public getDir(): Vector {
        return this.path.getDir(this.t);
    }
}