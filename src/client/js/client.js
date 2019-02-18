var socket = io();
var canvas = document.getElementById("gameView");
var gfx = canvas.getContext("2d");

// Store keyboard and mouse input
var input = {
    keys: new Array(256),
    mouse: {
        lastX: 0,
        lastY: 0,
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

/* 
 * Move camera with mouse
 * TODO: For some reason the smoothness and speed at which camera is panned 
 * is dependent on the size of map. Figure out why & make it standard across
 * map sizes
 * TODO: Add panning boundaries, so when edge of map is reached camera cannot
 * be scrolled further.
 */

canvas.addEventListener("mousedown", (e) => {
    input.mouse.click = true;
    input.mouse.lastX = e.clientX;
    input.mouse.lastY = e.clientY;
}, true);

document.addEventListener("mouseup", () => {
    input.mouse.click = false;
}, true);

document.addEventListener("mousemove", (e) => {
    if (input.mouse.click) {
        var xDiff = input.mouse.lastX - e.clientX;
        var yDiff = input.mouse.lastY - e.clientY;
        // console.log("xDiff: " + xDiff + " | yDiff: " + yDiff);

        camera.xOffset = Math.round(camera.xOffset + xDiff / 5);
        camera.yOffset = Math.round(camera.yOffset += yDiff / 5);

        input.mouse.lastX = e.clientX;
        input.mouse.lastY = e.clientY;
    }
}, true);

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

var lastFrame;
var fps;
var fpsChange;
var fpsView = document.getElementById("fpsView");

function onFrame() {
    if (!lastFrame) {
        lastFrame = performance.now();
        fps = 0;
    }

    fpsChange = (performance.now() - lastFrame)/1000;
    lastFrame = performance.now();
    fps = 1/fpsChange;
    fpsView.innerHTML = Math.round(fps);
    update();
    render();
    window.requestAnimationFrame(onFrame);
}

window.requestAnimationFrame(onFrame);