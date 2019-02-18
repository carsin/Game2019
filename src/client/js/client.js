const socket = io();
const canvas = document.getElementById("gameView");
const gfx = canvas.getContext("2d");
canvas.offScreenCanvas = document.createElement("canvas");

canvas.offScreenCanvas.width = canvas.width;
canvas.offScreenCanvas.height = canvas.height;

canvas.preGfx = canvas.offScreenCanvas.getContext("2d");

function fillScreen() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.offScreenCanvas.width = canvas.width;
    canvas.offScreenCanvas.height = canvas.height;
    gfx.imageSmoothingEnabled = false;
    canvas.preGfx.imageSmoothingEnabled = false;
}

fillScreen();
window.addEventListener("resize", fillScreen);


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
document.addEventListener("keydown", (e) => {
    input.keys[e.keyCode] = true;
    if (e.keyCode == 189) if (scale > 2) scale -= 1;
    if (e.keyCode == 187) if (scale < 8) scale += 1;
});

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
gfx.imageSmoothingEnabled = false;

// World data
var worldData;

socket.on("load map", (world) => {
    console.log("Loaded map with size " + world.xMax + "x" + world.yMax);
    worldData = world;
});

// TODO: permanent tileSize variable
var tileSize = 8;
var scale = 4;

// Render the map
function renderMap(world) {
    if (world == undefined) return;

    // Calculate bounds of triangle to render
    var xStart = Math.floor(Math.max(0, camera.xOffset / (tileSize * scale)));
    var yStart = Math.floor(Math.max(0, camera.yOffset / (tileSize * scale)));
    var xEnd = Math.ceil(Math.min(world.xMax, xStart + (canvas.width / (tileSize * scale))));
    var yEnd = Math.ceil(Math.min(world.yMax, yStart + (canvas.height / (tileSize * scale))));
    // console.log("xStart: " + xStart + " | yStart: " + yStart + " | xEnd: " + xEnd + " | yEnd: " + yEnd);

    // From top left of screen to bottom right of screen
    for (var x = xStart; x <= xEnd; x++) {
        for (var y = yStart; y <= yEnd; y++) {
            var tex;

            // Choose texture based on tile id
            switch (world.map[x][y]) {
                case "0": tex = resources.textures["dirt"]; break;
                case "1": tex = resources.textures["grass"]; break;
            }

            canvas.preGfx.drawImage(tex, (x * tileSize) * scale - camera.xOffset, (y * tileSize) * scale - camera.yOffset, tileSize * scale, tileSize * scale);
        }
    }
}

// Move camera with mouse
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

        camera.xOffset = Math.round(camera.xOffset + xDiff);
        camera.yOffset = Math.round(camera.yOffset + yDiff);

        input.mouse.lastX = e.clientX;
        input.mouse.lastY = e.clientY;
    }
}, true);

function update() {
    // Update camera position
    // TODO: make permanent variable
    var scrollSpeed = 4 * scale;

    // Breaks camera panning boundaries
    if (input.keys[87]) camera.yOffset -= scrollSpeed;
    if (input.keys[83]) camera.yOffset += scrollSpeed;
    if (input.keys[65]) camera.xOffset -= scrollSpeed;
    if (input.keys[68]) camera.xOffset += scrollSpeed;
}

function render() {
    if (worldData === undefined) return;

    // Lock camera
    camera.xOffset = Math.max(0, Math.min((worldData.xMax + 1) * scale * tileSize - canvas.width, camera.xOffset));
    camera.yOffset = Math.max(0, Math.min((worldData.yMax + 1) * scale * tileSize - canvas.height, camera.yOffset));

    gfx.drawImage(canvas.offScreenCanvas, 0, 0);
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

    fpsChange = (performance.now() - lastFrame) / 1000;
    lastFrame = performance.now();
    fps = 1 / fpsChange;
    fpsView.innerHTML = Math.round(fps);
    update();
    render();
    window.requestAnimationFrame(onFrame);
}

window.requestAnimationFrame(onFrame);