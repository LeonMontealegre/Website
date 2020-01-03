import {Vector, V} from "./vector";
import {Matrix2x3} from "./matrix";
import {Painter, LineStyle} from "./painter";

export interface TreeSettings {
    pos: Vector;
    len: number;
    angle: number;

    extraLen: number;
    dLen: number;
    dAngle: number;
    ddAngle: number;
}

export class Tree {
    public settings: TreeSettings;

    private root: Branch;

    public constructor(settings: TreeSettings, levels: number) {
        this.settings = settings;

        this.root = new Branch(undefined, settings);
        this.root.generate(levels);
    }

    public draw(painter: Painter, transform: Matrix2x3 = new Matrix2x3()): void {
        this.root.draw(painter, 0, transform)
    }

    public getRoot(): Branch {
        return this.root;
    }

    public getLeaves(): Branch[] {
        return this.root.getLeafs();
    }
}

export class Branch {
    public parent: Branch;
    private children: [Branch, Branch];

    private settings: TreeSettings;

    public constructor(parent: Branch, settings: TreeSettings) {
        this.parent = parent;
        this.settings = settings;
    }

    public generate(levels: number = 0): void {
        const A = new Branch(this, this.settings);
        const B = new Branch(this, this.settings);
        this.children = [A, B];

        // Generate more levels if > 0
        if (levels > 0) {
            A.generate(levels-1);
            B.generate(levels-1);
        }
    }

    public get(i: 0 | 1): Branch {
        return this.children[i];
    }

    public getLeafs(): Branch[] {
        if (!this.children)
            return [this];
        return this.get(0).getLeafs().concat(this.get(1).getLeafs());
    }

    public depth(): number {
        return (this.parent ? this.parent.depth() + 1 : 0);
    }

    public len(): number {
        return (this.parent ? this.parent.len() * this.settings.dLen : this.settings.len);
    }

    public angle(): number {
        if (!this.parent)
            return this.settings.angle;
        const flip = (this.parent.children[0] == this ? +1 : -1);
        return this.parent.angle() + flip*(this.settings.dAngle + (this.depth()-1)*this.settings.ddAngle);
    }

    public dir(): Vector {
        return Vector.fromAngle(this.angle());
    }

    public getStart(): Vector {
        return (this.parent ? this.parent.getEnd() : this.settings.pos);
    }

    public getEnd(): Vector {
        return this.getStart().add(this.dir().scale(this.len() + (this.parent ? 0 : this.settings.extraLen)));
    }

    public draw(p: Painter, d: number, transform: Matrix2x3): void {
        p.setLineStyle(new LineStyle("#000000", 3*Math.pow(d+1, -0.4), "round"));
        p.drawLine(transform.mul(this.getStart()), transform.mul(this.getEnd()));

        // Draw children
        if (this.children != undefined) {
            this.children[0].draw(p, d+1, transform);
            this.children[1].draw(p, d+1, transform);
        }
    }
}