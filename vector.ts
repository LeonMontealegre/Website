
export class Vector {
    public x: number;
    public y: number;

    public constructor();
    public constructor(v: Vector);
    public constructor(x: number);
    public constructor(x: number, y: number);
    public constructor(x: Vector | number = 0, y?: number) {
        if (x instanceof Vector) {
            this.x = x.x;
            this.y = x.y;
        } else {
            this.x = x;
            this.y = (y == null ? x : y);
        }
    }

    public add(v: Vector): Vector;
    public add(x: number): Vector;
    public add(x: number, y: number): Vector;
    public add(x: Vector | number, y?: number): Vector {
        const dx = (x instanceof Vector ? x.x : x);
        const dy = (x instanceof Vector ? x.y : (y == null ? x : y));
        return new Vector(this.x + dx, this.y + dy);
    }

    public sub(v: Vector): Vector;
    public sub(x: number): Vector;
    public sub(x: number, y: number): Vector;
    public sub(x: Vector | number, y?: number): Vector {
        const dx = (x instanceof Vector ? x.x : x);
        const dy = (x instanceof Vector ? x.y : (y == null ? x : y));
        return new Vector(this.x - dx, this.y - dy);
    }

    public scale(v: Vector): Vector;
    public scale(x: number): Vector;
    public scale(a: Vector | number): Vector {
        if (a instanceof Vector)
            return new Vector(a.x * this.x, a.y * this.y);
        return new Vector(a * this.x, a * this.y);
    }

    public abs(): Vector {
        return new Vector(Math.abs(this.x), Math.abs(this.y));
    }
    public normalize(): Vector {
        const len = this.len();
        if (len === 0)
            return new Vector(0, 0);
        return this.scale(1 / len);
    }
    public len(): number {
        return Math.sqrt(this.len2());
    }
    public len2(): number {
        return this.dot(this);
    }
    public angle(): number {
        return Math.atan2(this.y, this.x);
    }
    public distanceTo(v: Vector): number {
        return this.sub(v).len();
    }
    public dot(v: Vector): number {
        return this.x * v.x + this.y * v.y;
    }
    public project(v: Vector): Vector {
        return this.scale(v.dot(this) / this.len2());
    }
    public negativeReciprocal(): Vector {
        return new Vector(this.y, -this.x);
    }
    public copy(): Vector {
        return new Vector(this.x, this.y);
    }

    public static min(...vectors: Vector[]): Vector {
        return new Vector(Math.min(...vectors.map((v) => v.x)),
                          Math.min(...vectors.map((v) => v.y)));
    }
    public static max(...vectors: Vector[]): Vector {
        return new Vector(Math.max(...vectors.map((v) => v.x)),
                          Math.max(...vectors.map((v) => v.y)));
    }
    public static clamp(x: Vector, lo: Vector, hi: Vector): Vector {
        return Vector.min(Vector.max(x, lo), hi);
    }
    public static dir(a: Vector, b: Vector): Vector {
        return b.sub(a).normalize();
    }
    public static fromAngle(a: number): Vector {
        return new Vector(Math.cos(a), Math.sin(a));
    }
}

export function V(): Vector;
export function V(v: Vector): Vector;
export function V(x: number): Vector;
export function V(x: number, y: number): Vector;
export function V(x: Vector | number = 0, y?: number): Vector {
    if (x instanceof Vector)
        return new Vector(x);
    return new Vector(x, y);
}


// export class Vector {
//     public x: number;
//     public y: number;

//     public constructor(x: number, y: number) {
//         this.x = x;
//         this.y = y;
//     }

//     public translate(p: Vector): void {
//         this.x += p.x;
//         this.y += p.y;
//     }

//     public magnitude(): number {
//         return Math.sqrt(this.x*this.x + this.y*this.y);
//     }

//     public static add(a: Vector, b: Vector): Vector {
//         return new Vector(a.x + b.x, a.y + b.y);
//     }
//     public static sub(a: Vector, b: Vector): Vector {
//         return new Vector(a.x - b.x, a.y - b.y);
//     }
//     public static dir(a: Vector, b: Vector): Vector {
//         const ab = Vector.sub(b, a);
//         const mag = ab.magnitude();
//         if (mag == 0)
//             throw new Error("Magnitude between two vectors is zero! Can't find direction!");
//         return new Vector(ab.x/mag, ab.y/mag);
//     }
//     public static scale(p: Vector, s: number): Vector {
//         return new Vector(p.x * s, p.y * s);
//     }
//     public static rotate(p: Vector, a: number): Vector {
//         const cs = Math.cos(-a);
//         const sn = Math.sin(-a);
//         return new Vector(p.x * cs - p.y * sn,
//                          p.x * sn + p.y * cs);
//     }
// }

// export function V(x: number, y: number): Vector {
//     return new Vector(x, y);
// }