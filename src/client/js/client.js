var socket = io();
var canvas = document.getElementById("gameView");
var gfx = canvas.getContext("2d");

// Store keyboard and mouse input
var input = {
    keys: new Array(256),
    mouse: {
        x: 0,
        y: 0,
        click: false
    }
};

// Listen for key activity
document.addEventListener("keydown", (e) => { input.keys[e.keyCode] = true; });
document.addEventListener("keyup", (e) => { input.keys[e.keyCode] = false; });

// Zoom and position of camera
var camera = {
    xOffset: 0,
    yOffset: 0,
    zoom: 1
}

// Textures and other resources
var resources = {
    textures: [],
    loadTexture: (name, path) => {
        var tex = new Image(8, 8);
        tex.src = path;
        resources.textures[name] = tex;
    }
};

resources.loadTexture("dirt", "../res/img/dirt.png");
resources.loadTexture("grass", "../res/img/grass.png");

// World data
var worldData;

socket.on("load map", (world) => {
    console.log("Loaded map with size " + world.xMax + "x" + world.yMax);
    worldData = world;
});

// Render the map
function renderMap(world) {

    // Don't try to render empty world
    if (world == undefined) return;

    // TODO: permanent tileSize variable
    var tileSize = 8;

    for (var x = 0; x <= world.xMax; x++) {
        for (var y = 0; y <= world.yMax; y++) {

            var tex;

            // Choose texture based on tile id
            switch (world.map[x][y]) {
                case "0": tex = resources.textures["dirt"]; break;
                case "1": tex = resources.textures["grass"]; break;
            }

            gfx.drawImage(tex, x * tileSize - camera.xOffset, y * tileSize - camera.yOffset, tileSize, tileSize);
        }
    }
}

function update() {

    // Update camera position
    // TODO: make permanent variable
    var scrollSpeed = 4;

    if (input.keys[87]) camera.yOffset -= scrollSpeed;
    if (input.keys[83]) camera.yOffset += scrollSpeed;
    if (input.keys[65]) camera.xOffset -= scrollSpeed;
    if (input.keys[68]) camera.xOffset += scrollSpeed;
}

function render() {
    gfx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    renderMap(worldData);
}

function onFrame() {
    update();
    render();
    requestAnimationFrame(onFrame);
}

requestAnimationFrame(onFrame);