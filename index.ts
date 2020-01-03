import {V} from "./vector";
import {TreeNavMenu} from "./treenavmenu";

new TreeNavMenu("canvas",
                ["HOME", "ABOUT", "RESUME", "BLOG", "MODELS", "ANIMATIONS", "PROJECTS", "CONTACT"],
                {
                    pos: V(0, 0),
                    len: 375,
                    angle: Math.PI/2,
                    extraLen: 100,
                    dLen: 0.9,
                    dAngle: Math.PI/3,
                    ddAngle: -Math.PI/18
                });
