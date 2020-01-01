import {V} from "./vector";
import {Matrix2x3} from "./matrix";

import {Tree} from "./tree";
import {BezierPath} from "./bezierpath";

import {Canvas} from "./canvas";

// Get nav items
var home = document.getElementById("home");
var about = document.getElementById("about");
var resume = document.getElementById("resume");
var blog = document.getElementById("blog");
var models = document.getElementById("models");
var animations = document.getElementById("animations");
var projects = document.getElementById("projects");
var contact = document.getElementById("contact");
var navItems = [home, about, resume, blog, models, animations, projects, contact];


const settings = {
    pos: V(0, -75),
    len: 375,
    angle: Math.PI/2,
    extraLen: 0,
    dLen: 0.7,
    dAngle: Math.PI/3,
    ddAngle: -Math.PI/18
};

const root = new Tree(undefined, settings);
root.generate(2);

// root.get(0).get(0).get(0).generate(2);

const b1 = root.get(0).get(0).get(0);
const b2 = root;

console.log(b1.angle())

const p1 = b1.getEnd();
const p2 = b2.getEnd();
const c1 = p1.add(b1.dir().scale(-2*b1.len()));
const c2 = p2.add(b2.dir().scale(1*b2.len()));

const path = new BezierPath(p1, p2, c1, c2);
// b1.break();
// b1.generate(2);

let t = 0;
const canvas = new Canvas("canvas", (canvas, p) => {
    settings.len = Math.min(canvas.height, canvas.width*0.5)*0.28;

    moveNavItems(canvas);

    const pos = path.getPos(t);
    const angle = path.getDir(t).angle();
    const s = 1 + t*(b2.len()/b1.len() - 1);

    const transform = new Matrix2x3();
    transform.scaleAbout(s, pos);
    transform.rotateAbout(angle - b1.angle() + Math.PI, pos);
    transform.translate(pos.sub(path.getPos(0)));

    root.draw(p, 0, transform);

    p.setStrokeColor("#00ff00");
    p.drawCurve(p1, p2, c1, c2);
});

function moveNavItems(canvas: Canvas): void {
    const leafs = root.getLeafs();
    navItems.forEach((item, i) => {
        const leaf = leafs[i];
        const depth = leaf.depth();

        var w = item.offsetWidth;
        var h = item.offsetHeight;
        var pos0 = leaf.getStart();//this.getPos(i/2, depth-1);
        var pos1 = leaf.getEnd();//this.getPos(i, depth);

        // Push the text (visually) out of the branch
        var dx = (pos1.x - pos0.x);
        var dy = (pos1.y - pos0.y);
        var len = Math.sqrt(dx*dx + dy*dy);
        var lx = Math.min(Math.abs(0.5*h*dx/dy), w/2);
        var ly = Math.min(Math.abs(0.5*w*dy/dx), h/2);
        var l = Math.sqrt(lx*lx + ly*ly);
        var x = pos1.x + dx/len * (ly+15);
        var y = pos1.y + dy/len * (lx+15);

        item.style.left     = (x + canvas.width/2 - w/2) + "px";
        item.style.bottom   = (y - h/2) + "px";
        item.style.fontSize = (canvas.height < canvas.width*0.5 ? "5vh" : "2.5vw");
    });
}

function animate(): void {
    if (t >= 1) {
        canvas.draw();
        return;
    }
    t += 0.01;
    canvas.draw();

    requestAnimationFrame(animate);
}

setTimeout(() => {
    // animate();
}, 1000);



canvas.draw();