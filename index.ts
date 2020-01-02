import {Vector, V} from "./vector";
import {Matrix2x3} from "./matrix";

import {Tree} from "./tree";
import {BezierPath} from "./bezierpath";

import {Canvas} from "./canvas";
import {Path} from "path";

// Get nav items
const home = document.getElementById("home");
const about = document.getElementById("about");
const resume = document.getElementById("resume");
const blog = document.getElementById("blog");
const models = document.getElementById("models");
const animations = document.getElementById("animations");
const projects = document.getElementById("projects");
const contact = document.getElementById("contact");
const navItems = [home, about, resume, blog, models, animations, projects, contact];

const home2 = document.getElementById("home2");
const about2 = document.getElementById("about2");
const resume2 = document.getElementById("resume2");
const blog2 = document.getElementById("blog2");
const models2 = document.getElementById("models2");
const animations2 = document.getElementById("animations2");
const projects2 = document.getElementById("projects2");
const contact2 = document.getElementById("contact2");
const navItems2 = [home2, about2, resume2, blog2, models2, animations2, projects2, contact2];

const settings = {
    pos: V(0, 0),
    len: 375,
    angle: Math.PI/2,
    extraLen: 100,
    dLen: 0.9,
    dAngle: Math.PI/3,
    ddAngle: -Math.PI/18
};
const settings2 = {
    pos: V(0, 0),
    len: 375,
    angle: Math.PI/2,
    extraLen: 100,
    dLen: 0.9,
    dAngle: Math.PI/3,
    ddAngle: -Math.PI/18
};

let b1: Tree;
let b2: Tree;
let path: Path;

const root = new Tree(undefined, settings);
root.generate(2);

const root2 = new Tree(undefined, settings2);
root2.generate(2);

function hookupNavItems(): void {
    const leafs = root.getLeafs();
    navItems.forEach((item, i) => {
        item.onclick = () => {
            b1 = leafs[i];
            b2 = root;

            const p1 = b1.getEnd();
            const p2 = b2.getStart();
            const c1 = p1.add(b1.dir().scale(-2*b1.len()));
            const c2 = p2.add(b2.dir().scale(1*b2.len()));

            path = new BezierPath(p1, p2, c1, c2);

            thing1 = true;

            navItems2.forEach((item2) => item2.style.display = "inherit");

            animate();
        }
    });
}

hookupNavItems();

let thing1 = false;
let thing2 = false;

let t = 0;
const canvas = new Canvas("canvas", (canvas, p) => {
    settings.len = Math.min(canvas.height, canvas.width*0.5)*0.28;
    settings.extraLen = canvas.height*0.28 - settings.len + -settings.pos.y;

    settings2.len = Math.min(canvas.height, canvas.width*0.5)*0.28;
    settings2.extraLen = canvas.height*0.28 - settings2.len + -settings2.pos.y;

    const transform = new Matrix2x3();

    if (thing1) {
        const pos = path.getPos(t);
        const angle = path.getDir(t).angle();
        // const s = 1 + t*(b2.len()/b1.len());
        // transform.scaleAbout(s, pos);
        transform.rotateAbout(angle - b1.angle() + Math.PI, pos);
        transform.translate(pos.sub(path.getPos(0)));

        const t2 = new Matrix2x3();
        t2.translate(transform.mul(b1.getEnd()));
        t2.rotate(angle + Math.PI/2);
        t2.scale(t);

        navItems2.forEach((item2) => item2.style.setProperty("transform", `scale(${t})`));
        moveNavItems(navItems2, canvas, t2);

        root2.draw(p, 0, t2);
    }

    if (thing2) {
        const pos = path.getPos(1).sub(V(0, 300*t));
        const angle = path.getDir(1).angle();
        transform.rotateAbout(angle - b1.angle() + Math.PI, pos);
        transform.translate(pos.sub(path.getPos(0)));

        const t2 = new Matrix2x3();
        navItems2.forEach((item2) => item2.style.setProperty("transform", `scale(${1})`));
        moveNavItems(navItems2, canvas, t2);

        root2.draw(p, 0, t2);
    }

    root.draw(p, 0, transform);

    moveNavItems(navItems, canvas, transform);
});

let first = true;
function moveNavItems(items: HTMLElement[], canvas: Canvas, transform: Matrix2x3): void {
    const yOffsets = [0, 0, 0, 0, 0, 0, 1, 0];
    const leafs = root.getLeafs();
    items.forEach((item, i) => {
        const leaf = leafs[i];

        var w = item.offsetWidth;
        var h = item.offsetHeight;
        var pos0 = transform.mul(leaf.getStart());
        var pos1 = transform.mul(leaf.getEnd());

        // Push the text (visually) out of the branch
        const dir = Vector.dir(pos0, pos1);
        const flip  = Math.sign(dir.angle());

        const pos = pos1.add(dir.scale(0)).add(V(0, yOffsets[i] + flip * h/2));

        item.style.left     = (pos.x + canvas.width/2 - w/2) + "px";
        item.style.bottom   = (pos.y - h/2) + "px";
        item.style.fontSize = (canvas.height < canvas.width*0.5 ? "5vh" : "2.5vw");
    });

    // add slow move transitions after initial placements
    if (first) {
        first = false;
        setTimeout(() => {
            navItems.forEach(item => item.classList.add("move__slow"));
        }, 0);
    }
}

let dt = 0.01;
function animate(): void {
    if (t >= 1) {
        // end
        if (thing1) {
            thing1 = false;
            t = 0;
            thing2 = true;
            dt = 0.05;
            animate();
        }
        else if (thing2) {
            thing2 = false;
            t = 0;
            first = true;
            navItems.forEach(item => item.classList.remove("move__slow"));
            navItems2.forEach((item2) => item2.style.display = "none");
            dt = 0.01;
            canvas.draw();
        }

        return;
    }
    t += dt;
    canvas.draw();

    requestAnimationFrame(animate);
}

canvas.draw();