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

window.onload = fillScreen();
window.addEventListener("resize", fillScreen);

// Zoom and position of camera
var camera = {
    xOffset: 0,
    yOffset: 0,
    zoom: 1
}

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

function render() {
    if (worldData === undefined) return;

    // Lock camera
    camera.xOffset = Math.max(0, Math.min((worldData.xMax + 1) * scale * tileSize - canvas.width, camera.xOffset));
    camera.yOffset = Math.max(0, Math.min((worldData.yMax + 1) * scale * tileSize - canvas.height, camera.yOffset));

    gfx.drawImage(canvas.offScreenCanvas, 0, 0);
    renderMap(worldData);
}