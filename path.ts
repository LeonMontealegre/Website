import {Vector} from "./vector";

export interface Path {
    getPos(t: number): Vector;
    getDir(t: number): Vector;
}