var lastFrame;
var fps;
var fpsChange;
var fpsView = document.getElementById("fpsView");
var worldData;

var gfx = new GFX(8, 4);
var input = new Input(8, 4);
var resources = new Resources(8, 4);

resources.loadTexture("dirt", "../res/img/dirt.png");
resources.loadTexture("grass", "../res/img/grass.png");

window.onload = gfx.fillScreen;
window.addEventListener("resize", gfx.fillScreen);

function update() {
    var scrollSpeed = 4 * gfx.scale;

    if (input.keys[87]) gfx.camera.yOffset -= scrollSpeed;
    if (input.keys[83]) gfx.camera.yOffset += scrollSpeed;
    if (input.keys[65]) gfx.camera.xOffset -= scrollSpeed;
    if (input.keys[68]) gfx.camera.xOffset += scrollSpeed;
}


// Main game loop.
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
    gfx.render();
    window.requestAnimationFrame(onFrame);
}

window.requestAnimationFrame(onFrame);