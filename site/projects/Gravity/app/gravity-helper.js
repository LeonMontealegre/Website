var isSidebarOpen = false;
var inBuildMode = false;

var planetMassMultiplier = 1;
var planetRadius = 50;
var planetColor = '#fff';
var planetRandomColor = false;
var planetInheritVelocity = false;

function sidebar() {
    isSidebarOpen = !isSidebarOpen;

    if (isSidebarOpen) {
        document.getElementById("options").style.width = "200px";
        document.getElementById("openOptionsTab").style.marginLeft = "200px";
        document.getElementById("openOptionsTab").innerHTML = "<";
    } else {
        document.getElementById("options").style.width = "0";
        document.getElementById("openOptionsTab").style.marginLeft = "0";
        document.getElementById("openOptionsTab").innerHTML = ">";
    }
}

function onInputChange() {
    timeScale = Number(document.getElementById("time-scale").value);
    planetMassMultiplier = Number(document.getElementById("mass-multiplier").value);
    planetRadius = Number(document.getElementById("radius").value);
    planetColor = document.getElementById("color").value;
    planetRandomColor = document.getElementById("random-color").checked;
    planetInheritVelocity = document.getElementById("inherit-velocity").checked;

    if (creationPlanet !== undefined)
        createPlanet();
}

function onCreateButtonClick() {
    var button = document.getElementById("create-button");
    if (button.value === "Create") {
        button.value = "Stop";
        createPlanet();
    } else {
        button.value = "Create";
        creationPlanet = undefined;
    }
}

function createPlanet() {
    var startPos = (creationPlanet === undefined) ? camera.getWorldPos(mousePos) : creationPlanet.pos;
    creationPlanet = new Planet(startPos.x, startPos.y, 0, 0, planetRadius, planetRandomColor ? getRandomColor() : planetColor);
    creationPlanet.mass *= planetMassMultiplier;
    creationPlanet.creationStage = (creationPlanet.creationStage === undefined) ? "place" : creationPlanet.creationStage;
}

function onFocusButtonClick() {
    if (selectedPlanet !== undefined)
        focusedPlanet = selectedPlanet;
}

function removeSelectedPlanet() {
    if (selectedPlanet !== undefined)
        planets.splice(planets.indexOf(selectedPlanet), 1);
}

function onBuildModeChange() {
    inBuildMode = document.getElementById("build-mode").checked;

    document.getElementById("mass-multiplier").disabled = !inBuildMode;
    document.getElementById("mass-multiplier-label").style.color = inBuildMode ? '#ddd' : '#aaa';
    document.getElementById("radius").disabled = !inBuildMode;
    document.getElementById("radius-label").style.color = inBuildMode ? '#ddd' : '#aaa';
    document.getElementById("color").disabled = !inBuildMode;
    document.getElementById("color-label").style.color = inBuildMode ? '#ddd' : '#aaa';
    document.getElementById("random-color").disabled = !inBuildMode;
    document.getElementById("random-color-label").style.color = inBuildMode ? '#ddd' : '#aaa';
    document.getElementById("inherit-velocity").disabled = !inBuildMode;
    document.getElementById("inherit-velocity-label").style.color = inBuildMode ? '#ddd' : '#aaa';
    document.getElementById("create-button").disabled = !inBuildMode;

    if (!inBuildMode) {
        document.getElementById("create-button").value = "Create";
        creationPlanet = undefined;
    }
}

function selectLeft() {
    selectedPlanetIndex = (selectedPlanetIndex - 1) % planets.length;
    if (selectedPlanetIndex < 0)
        selectedPlanetIndex += planets.length;
    selectedPlanet = planets[selectedPlanetIndex];
}

function selectRight() {
    selectedPlanetIndex = (selectedPlanetIndex + 1) % planets.length;
    if (selectedPlanetIndex < 0)
        selectedPlanetIndex += planets.length;
    selectedPlanet = planets[selectedPlanetIndex];
}
