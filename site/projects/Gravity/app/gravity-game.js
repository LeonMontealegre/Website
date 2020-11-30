const GRAV_CONST = 0.667; // Gravitational Constant - not really, but it was too small otherwise
const UPS = 60; // The amount of updates and frames per second
const MAX_PATH_LENGTH = 60;

/* OPTIONS */
var timeScale = 1;

var planets = []; // Planets
var creationPlanet = undefined;
var selectedPlanetIndex = -1;
var selectedPlanet = undefined;
var focusedPlanet = undefined;

var frame = {
    // Create canvas
    canvas : document.getElementById("canvas"),
    start : function() {
        // Set canvas to be full-screen on the page
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.context = this.canvas.getContext("2d");

        // Insert the canvas into the page
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        // Setup input
        setupInput(this.canvas);

        // Setup resize event
        window.addEventListener('resize', resize, false);

        // Begin timer that repeats 'update' every UPS times per second
        this.interval = setInterval(update, 1000 / UPS);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

var camera = {
    pos:new Vector(0, 0),
    zoom:1,
    getScreenPos: function(vec) {
        return vec.sub(this.pos).scale(1.0 / this.zoom).add(frame.canvas.width/2, frame.canvas.height/2);
    },
    getWorldPos: function(vec) {
        return vec.sub(frame.canvas.width/2, frame.canvas.height/2).scale(this.zoom).add(this.pos);
    }
}

function resize(e) {
    frame.canvas.width = window.innerWidth;
    frame.canvas.height = window.innerHeight;
}

function start() {
    frame.start();
    planets.push(new Planet(0, 0, 0, 0, 50, getRandomColor()));
    planets.push(new Planet(0, -200, 5.1179, 0, 15, getRandomColor()));
    // planets.push(new Planet(0, 200, -5.1179, 0, 15, getRandomColor()));
}

function update() {
    // Clear screen
    frame.clear();

    // camera.pos.y += 1;
    if (focusedPlanet !== undefined) {
        camera.pos.x = focusedPlanet.pos.x;
        camera.pos.y = focusedPlanet.pos.y;
    }

    for (i = 0; i < planets.length; i++) {
        var p1 = planets[i];

        p1.update();
        p1.draw();
        // Second loop for applying gravity and collision detection
        for (j = i+1; j < planets.length; j++) {
            var p2 = planets[j];

            // If planets are colliding, combine them into one bigger planet
            if (p1.isCollidingWith(p2)) {
                // Add masses to combine, solve for radius, r = (r1^3 + r2^3)^(1/3)
                var radius = Math.cbrt((p1.mass+p2.mass) * 3 / 4 / Math.PI);

                var color1 = hexToRgb(p1.color);
                var color2 = hexToRgb(p2.color);
                console.log(p1.color + ", " + p2.color + " : " + color1 + ", " + color2);
                var color = rgbToHex(Math.floor((p1.mass*color1.r + p2.mass*color2.r) / (p1.mass+p2.mass)),
                                     Math.floor((p1.mass*color1.g + p2.mass*color2.g) / (p1.mass+p2.mass)),
                                     Math.floor((p1.mass*color1.b + p2.mass*color2.b) / (p1.mass+p2.mass)));
                console.log(color);

                // Create planet
                var compositePlanet = new Planet(0, 0, 0, 0, radius, color);

                // Mid-point of objects
                var pos = p1.pos.scale(p1.mass).add(p2.pos.scale(p2.mass)).scale(1.0 / compositePlanet.mass);
                compositePlanet.pos = pos;

                // Conservation of momentum, v3 = (m1*v1 + m2*v2) / m3
                var rho1 = p1.vel.scale(p1.mass);
                var rho2 = p2.vel.scale(p2.mass);
                var vel = rho1.add(rho2).scale(1.0 / compositePlanet.mass);
                compositePlanet.vel = vel;

                if (focusedPlanet == p1 || focusedPlanet == p2)
                    focusedPlanet = compositePlanet;

                // Remove planets
                planets.splice(j, 1);
                planets.splice(i, 1);

                // Put in composite planet
                planets.push(compositePlanet);
                i--;
                break;
            }

            // Direction is difference in positions; normalized
            var dir = p2.pos.sub(p1.pos).normalize();

            // F = G*m1*m2 / r^2
            var forceAmt = GRAV_CONST * p1.mass * p2.mass / p1.distSqrdTo(p2);
            var force = dir.scale(forceAmt);

            // Apply to each planet
            p1.addForce(force);
            p2.addForce(force.scale(-1));
        }
    }

    if (creationPlanet !== undefined) {
        creationPlanet.draw();
        creationPlanet.update();
        if (creationPlanet.creationStage === "place") {
            creationPlanet.pos = camera.getWorldPos(mousePos);
        } else if (creationPlanet.creationStage === "velocity") {
            ctx = frame.context;

            creationPlanet.pos = camera.getWorldPos(creationPlanet.spos);

            var pos = creationPlanet.spos;
            ctx.moveTo(pos.x, pos.y);
            ctx.lineTo(mousePos.x, mousePos.y);
            ctx.lineWidth = 1;
            ctx.strokeStyle = '#fff';
            ctx.stroke();
        }
    }
}

// Constructor for a Planet with a position, velocity, radius, and color
function Planet(x, y, vx, vy, radius, color) {
    this.pos = new Vector(x, y);
    this.vel = new Vector(vx, vy);
    this.radius = radius;
    this.mass = 4 / 3 * Math.PI * radius * radius * radius;
    this.color = color;
    this.path = [];

    // Update position from velocity
    this.update = function() {
        this.pos.translate(this.vel.scale(timeScale));

        // Push position to path
        this.path.push(new Vector(this.pos.x, this.pos.y));

        // If path is too long, remove last position
        if (this.path.length > MAX_PATH_LENGTH/timeScale)
            this.path.splice(0, this.path.length - MAX_PATH_LENGTH/timeScale);
    }

    this.draw = function() {
        ctx = frame.context;

        // Draw path of planet with gradient path
        if (this.path.length > 1) {
            ctx.lineWidth = 1;
            for (l = 1; l < this.path.length; l++) {
                var ppos = camera.getScreenPos(this.path[l-1]);
                var pos = camera.getScreenPos(this.path[l]);
                ctx.beginPath();
                ctx.moveTo(ppos.x, ppos.y);
                ctx.lineTo(pos.x, pos.y);
                ctx.globalAlpha = (l - 1) / this.path.length;
                ctx.strokeStyle = this.color;
                // ctx.strokeStyle = lerp('#333333', this.color, (l-1) / this.path.length);
                ctx.stroke();
            }
        }
        ctx.globalAlpha = 1.0;

        // Draw circle
        ctx.moveTo(0, 0);
        ctx.beginPath();
        var pos = camera.getScreenPos(this.pos);
        ctx.arc(pos.x, pos.y, this.radius / camera.zoom, 0, 2*Math.PI);
        ctx.fillStyle = this === selectedPlanet ? "#118C4E" : this.color;
        ctx.fill();
    }

    // Distance squared between two planets
    this.distSqrdTo = function(other) {
        var dx = other.pos.x - this.pos.x;
        var dy = other.pos.y - this.pos.y;
        return dx*dx + dy*dy;
    }

    // Checks for collision between two planets
    this.isCollidingWith = function(other) {
        var sr = this.radius + other.radius;
        return this.distSqrdTo(other) <= sr*sr;
    }

    // Checks if given point is within the planet
    this.contains = function(x, y) {
        var dx = x - this.pos.x;
        var dy = y - this.pos.y;
        return dx*dx + dy*dy <= this.radius*this.radius;
    }

    // Applies force to planet over a time of 1 frame, 1 / UPS
    // vf = v0 + at,   F = ma; a = F/m
    // vf = v0 + Ft / m,   t = 1 / UPS
    // vf = v0 + F / (UPS * m) = v0 + F * 1.0 / (UPS * m)
    this.addForce = function(force) {
        this.vel = this.vel.add(force.scale(timeScale / (this.mass * UPS)));
    }
}

function getRandomColor() {
	var num = Math.floor(0x7FFFFF * Math.random() + 0x7FFFFF);
	var col = num.toString(16);
	for (c = 0; c < 6 - col.length; c++)
		col = '0' + col;

    var g = Math.floor(0x7F * Math.random()).toString(16);
    if (g.length === 1)
        g = '0' + g;

    col = col.substring(0, 2) + g + col.substring(4, 6);

	return '#' + col;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}
