import {Vector, V} from "Vector";
import {Matrix2x3} from "math/Matrix";

import {Path, BezierPath, LinePath} from "utils/animation/Path";
import {Animation} from "utils/animation/Animation";

import {Canvas} from "utils/canvas/Canvas";

import {TreeAnimation} from "./TreeAnimation";
import {Branch, Tree, TreeSettings} from "./tree";

export function CreatePath(b1: Branch, b2: Branch): Path {
    const p1 = b1.getEnd();
    const p2 = b2.getStart();
    const c1 = p1.add(b1.dir().scale(-2*b1.len()));
    const c2 = p2.add(b2.dir().scale(1*b2.len()));

    return new BezierPath(p1, p2, c1, c2);
}

export class TreeNavMenu {
    private canvas: Canvas;

    private tree1: Tree;
    private navItems: HTMLElement[];

    private tree2: Tree;
    private navItems2: HTMLElement[];

    private firstPath: Path;
    private curAnimation: Animation;

    public constructor(canvasId: string, navTexts: string[], settings: TreeSettings) {
        this.canvas = new Canvas(canvasId, () => this.onResize());

        // create nav items with their text and class
        this.navItems = navTexts.map((text) => {
            const item = document.createElement("div");
            item.innerHTML = text;
            item.classList.add("nav__item");
            document.body.appendChild(item);
            return item;
        });
        // create copies and hide them (for second tree)
        this.navItems2 = this.navItems.map((item) => {
            const copy = item.cloneNode(true) as HTMLElement;
            copy.style.display = "none";
            document.body.appendChild(copy);
            return copy;
        });

        // create trees and position nav items
        this.tree1 = new Tree(settings, 2);
        this.tree2 = new Tree(settings, 2);

        this.positionNavItems(this.navItems, true);
        this.positionNavItems(this.navItems2, true);

        this.canvas.onResize();

        this.hookupNavItems();
    }

    private positionNavItems(items: HTMLElement[], instant: boolean = false, transform: Matrix2x3 = new Matrix2x3()): void {
        if (instant)
            items.forEach(item => item.classList.remove("move__slow"));

        const leaves = this.tree1.getLeaves();
        items.forEach((item, i) => {
            const leaf = leaves[i];

            const s = V(item.offsetWidth, item.offsetHeight);

            const p1 = transform.mul(leaf.getStart());
            const p2 = transform.mul(leaf.getEnd());

            const flip = Math.sign(Vector.dir(p1, p2).angle());
            const pos = p2.add(V(0, flip * s.y/2));

            item.style.left = `${pos.x + this.canvas.width/2 - s.x/2}px`;
            item.style.bottom = `${pos.y - s.y/2}px`;
        });

        // add slow move transitions back after moving them
        if (instant)
            setTimeout(() => this.navItems.forEach(item => item.classList.add("move__slow")), 0);
    }

    private hookupNavItems(): void {
        const root = this.tree1.getRoot();
        const leaves = this.tree1.getLeaves();
        this.navItems.forEach((item, i) => {
            item.onclick = () => {
                // show the nav items for second tree
                this.navItems2.forEach((item2) => item2.style.display = "inherit");

                this.firstPath = CreatePath(leaves[i], root);
                this.curAnimation = new TreeAnimation(
                    this.firstPath,
                    0.01,
                    (t, t1, t2) => this.step1(t, t1, t2),
                    () => this.onFinish1()
                );
                this.curAnimation.animate();
            }
        });
    }

    private step1(t: number, t1: Matrix2x3, t2: Matrix2x3): void {
        // scale and position navs
        this.navItems2.forEach((item2) => item2.style.setProperty("transform", `scale(${t})`));

        // draw trees and position nav items
        this.canvas.draw((p) => {
            this.tree1.draw(p, t1);
            this.tree2.draw(p, t2);
        });

        this.positionNavItems(this.navItems, false, t1);
        this.positionNavItems(this.navItems2, false, t2);
    }

    private step2(_: number): void {
        const t1 = new Matrix2x3();

        const pos = this.curAnimation.getPos();
        const angle = this.curAnimation.getDir().angle();
        t1.rotateAbout(angle - this.firstPath.getDir(0).angle(), pos);
        t1.translate(pos.sub(this.firstPath.getPos(0)));

        // draw trees and position nav items
        this.canvas.draw((p) => {
            this.tree1.draw(p, t1);
            this.tree2.draw(p);
        });

        this.positionNavItems(this.navItems, false, t1);
        this.positionNavItems(this.navItems2, false);
    }

    private onFinish1(): void {
        const endPos = this.curAnimation.path.getPos(1);

        // setup next animation to move initial tree down off the screen
        this.curAnimation = new Animation(
            new LinePath(endPos, endPos.sub(V(0, 300))),
            0.05,
            (t) => this.step2(t),
            () => this.onFinish2()
        );
        this.curAnimation.animate();
    }

    private onFinish2(): void {
        this.firstPath = undefined;
        this.curAnimation = undefined;

        // hide old nav items
        this.navItems2.forEach((item2) => item2.style.display = "none");

        // draw and position initial setup
        this.canvas.draw((p) => this.tree1.draw(p));
        this.positionNavItems(this.navItems, true);
    }

    private onResize(): void {
        // calculate new length and extra length
        const len = Math.min(this.canvas.height, this.canvas.width*0.5)*0.28;;
        const extraLen = this.canvas.height*0.28 - len;

        // set settings for both trees
        this.tree1.settings.len = this.tree2.settings.len = len;
        this.tree1.settings.extraLen = this.tree2.settings.extraLen = extraLen;

        // default behavior
        if (!this.curAnimation) {
            // draw tree and position nav items
            this.canvas.draw((p) => this.tree1.draw(p));
            this.positionNavItems(this.navItems, true);
            return;
        }
    }
}