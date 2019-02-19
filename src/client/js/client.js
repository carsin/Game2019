var lastFrame;
var fps;
var fpsChange;
var fpsView = document.getElementById("fpsView");
var worldData;

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

window.onload = gfx.cfx.fillScreen();
window.addEventListener("resize", gfx.ctx.fillScreen);


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
    render();
    window.requestAnimationFrame(onFrame);
}
console.log(gfx.canvas);

window.requestAnimationFrame(onFrame);