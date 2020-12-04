const h = 0.0457;
const h2 = h*h;

function Wpoly6(r2) {
    // Poly 6 W
    const coef = 315.0 / (64.0 * Math.PI * Math.pow(h, 9));

    if (0 <= r2 && r2 <= h2)
        return coef * Math.pow(h2 - r2, 3);
    else
        return 0;
}

function Wpoly6Gradient(r, r2) {
    const coef = -945.0 / (32.0 * Math.PI * Math.pow(h, 9));

    if (0 <= r2 && r2 <= h2)
        return r.scl(coef * Math.pow(h2 - r2, 2));
    else
        return V(0,0);
}

function Wpoly6Laplacian(r2) {
    const coef = -45.0 / (Math.PI * Math.pow(h, 6));

    if (0 <= r2 && r2 <= h2)
        return coef * (h2 - r2) * (3.0 * h2 - 7.0 * r2);
    else
        return 0;
}

function WspikyGradient(r, r2) {
    const coef = -45.0 / (Math.PI * Math.pow(h, 6));
    const radius = Math.sqrt(r2);

    if (0 <= r2 && r2 <= h2)
        return r.scl(coef * Math.pow(h - radius, 2) / radius);
    else
        return V(0,0);
}

function WviscosityLaplacian(r2) {
    const coef = 45.0 / (Math.PI * Math.pow(h, 6));
    const radius = Math.sqrt(r2);

    if (0 <= r2 && r2 <= h2)
        return coef * (h - radius);
    else
        return 0;
}
