import {Vector, V} from "./vector";

export interface Path {
    getPos(t: number): Vector;
    getDir(t: number): Vector;
}

export class LinePath implements Path {
    private p1: Vector;
    private p2: Vector;

    public constructor(p1: Vector, p2: Vector) {
        this.p1 = p1;
        this.p2 = p2;
    }

    public getPos(t: number): Vector {
        return this.p1.scale(1 - t).add(this.p2.scale(t));
    }

    public getDir(_: number): Vector {
        return Vector.dir(this.p1, this.p2);
    }
}

export class BezierPath implements Path {
    private p1: Vector;
    private p2: Vector;
    private c1: Vector;
    private c2: Vector;

    public constructor(p1: Vector, p2: Vector, c1: Vector, c2: Vector) {
        this.p1 = p1;
        this.p2 = p2;
        this.c1 = c1;
        this.c2 = c2;
    }

    public getX(t: number): number {
        const it = 1 - t;
        return this.p1.x*it*it*it + 3*this.c1.x*t*it*it + 3*this.c2.x*t*t*it + this.p2.x*t*t*t;
    }

    public getY(t: number): number {
        const it = 1 - t;
        return this.p1.y*it*it*it + 3*this.c1.y*t*it*it + 3*this.c2.y*t*t*it + this.p2.y*t*t*t;
    }

    public getPos(t: number): Vector {
        return V(this.getX(t), this.getY(t));
    }

    public getDX(t: number): number {
        const it = 1 - t;
        return -3*this.p1.x*it*it + 3*this.c1.x*it*(1-3*t) + 3*this.c2.x*t*(2-3*t) + 3*this.p2.x*t*t;
    }

    public getDY(t: number): number {
        const it = 1 - t;
        return -3*this.p1.y*it*it + 3*this.c1.y*it*(1-3*t) + 3*this.c2.y*t*(2-3*t) + 3*this.p2.y*t*t;
    }

    public getDir(t: number): Vector {
        return V(this.getDX(t), this.getDY(t));
    }
}