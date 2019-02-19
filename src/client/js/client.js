var lastFrame;
var fps;
var fpsChange;
var fpsView = document.getElementById("fpsView");
var worldData;

var gfx = new GFX(8, 4);

function update() {
    // Update camera position
    // TODO: make permanent variable
    var scrollSpeed = 4 * gfx.scale;

    // Breaks camera panning boundaries
    if (input.keys[87]) gfx.camera.yOffset -= scrollSpeed;
    if (input.keys[83]) gfx.camera.yOffset += scrollSpeed;
    if (input.keys[65]) gfx.camera.xOffset -= scrollSpeed;
    if (input.keys[68]) gfx.camera.xOffset += scrollSpeed;
}

gfx.fillScreen();
window.addEventListener("resize", gfx.fillScreen);

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