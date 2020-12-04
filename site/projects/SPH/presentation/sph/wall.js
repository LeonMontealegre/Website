const WALL_K = 10000.0;
const WALL_DAMPING = -0.9;

class Wall {
    constructor(normal, pos) {
        this.pos = pos;
        this.normal = normal;
    }
}
