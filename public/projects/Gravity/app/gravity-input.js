var mousePos = new Vector(0,0);
var mouseDown = false;
var mouseDownPos = undefined;
var z = 0;
var isDragging = false;
var startTapTime = undefined;

function setupInput(canvas) {
    canvas.addEventListener('click', onClick, false);
    canvas.addEventListener('dblclick', onDoubleClick, false);
    canvas.addEventListener('wheel', onWheel, false);
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mouseup', onMouseUp, false);
    canvas.addEventListener('mousemove', onMouseMove, false);
}

function onClick(e) {
    if (creationPlanet === undefined) {
        if (!isDragging) {
            var pos = camera.getWorldPos(V(e.clientX, e.clientY));
            for (i = 0; i < planets.length; i++) {
                if (planets[i].contains(pos.x, pos.y)) {
                    if (!inBuildMode) {
                        selectedPlanet = (selectedPlanet === planets[i]) ? undefined : planets[i];
                        selectedPlanetIndex = (selectedPlanet === undefined) ? selectedPlanetIndex : i;
                    }
                    return;
                }
            }
            selectedPlanet = undefined;
        }
    }
    if (inBuildMode) {
        if (creationPlanet !== undefined) {
            if (!isDragging && creationPlanet.creationStage === "place") {
                creationPlanet.creationStage = "velocity";
                creationPlanet.pos = camera.getWorldPos(V(e.clientX, e.clientY));
                creationPlanet.spos = V(e.clientX, e.clientY);
            } else if (creationPlanet.creationStage === "velocity") {
                var pos1 = creationPlanet.pos;
                var pos2 = camera.getWorldPos(V(e.clientX, e.clientY));
                var amount = pos1.distanceTo(pos2) / 50;
                var dir = pos1.sub(pos2).normalize();
                var vel = dir.scale(amount);
                vel = vel.add((focusedPlanet !== undefined && planetInheritVelocity) ? focusedPlanet.vel : new Vector(0, 0));

                var planet = new Planet(creationPlanet.pos.x, creationPlanet.pos.y, vel.x, vel.y, creationPlanet.radius, creationPlanet.color);
                planet.mass *= planetMassMultiplier;
                planets.push(planet);
                creationPlanet.creationStage = "place";
                if (planetRandomColor)
                    creationPlanet.color = getRandomColor();
            }
        }
    }
}

function onDoubleClick(e) {
    if (creationPlanet === undefined) {
        var pos = camera.getWorldPos(V(e.clientX, e.clientY));
        for (i = 0; i < planets.length; i++) {
            if (planets[i].contains(pos.x, pos.y)) {
                focusedPlanet = (focusedPlanet === planets[i]) ? undefined : planets[i];
                selectedPlanet = (focusedPlanet === undefined) ? undefined : planets[i];
                return;
            }
        }
        focusedPlanet = undefined;
        selectedPlanet = undefined;
    }
}

function onWheel(e) {
    z = Math.max(Math.min(z + e.wheelDelta / 100, 4), -4);
    camera.zoom = Math.exp(z);
}

function onMouseDown(e) {
    isDragging = false;
    startTapTime = Date.now();
    mouseDown = true;
    mouseDownPos = new Vector(e.clientX, e.clientY);
}

function onMouseUp(e) {
    mouseDown = false;
}

function onMouseMove(e) {
    mousePos = new Vector(e.clientX, e.clientY);
    if (mouseDown && (Date.now() - startTapTime > 50)) {
        isDragging = true;
        var pos = new Vector(e.clientX, e.clientY);
        var dPos = mouseDownPos.sub(pos);
        camera.pos.x += camera.zoom * dPos.x;
        camera.pos.y += camera.zoom * dPos.y;
        mouseDownPos = pos;
        focusedPlanet = undefined;
    }
}
