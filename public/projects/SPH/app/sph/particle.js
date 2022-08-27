const GAS_STIFFNESS = 3;//k = 3;//8.314;
const REST_DENSITY = 998.29;//ρ0 = 998.29;//100;
let VISCOSITY = 10.5;

class Particle {
    constructor(pos, mass, restDensity, viscosity, gasConstant) {
        this.pos = pos;
        this.vel = V();
        this.acc = V();

        this.mass = mass ? mass : 0.02;
        this.restDensity = restDensity ? restDensity : REST_DENSITY;
        this.viscosity = viscosity ? viscosity : VISCOSITY;
        this.gasConstant = gasConstant ? gasConstant : GAS_STIFFNESS;

        this.density = 0;
        this.pressure = 0;
        this.neighbors = [];
    }
    accelerate(a) {
        // Newton's law a = F/m
        this.acc = a;
    }
}
