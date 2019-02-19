function Input() {
    this.keys = new Array(256);
    this.mouse = {
        lastX: 0,
        lastY: 0,
        x: 0,
        y: 0,
        click: false
    }
};

// Listen for key activity
document.addEventListener("keydown", (e) => {
    // Store keyboard and mouse input
    input.keys[e.keyCode] = true;
    if (e.keyCode == 189) if (scale > 2) scale -= 1;
    if (e.keyCode == 187) if (scale < 8) scale += 1;
});

document.addEventListener("keyup", (e) => { input.keys[e.keyCode] = false; });

// Move camera with mouse
document.addEventListener("mousedown", (e) => {
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

        gfx.camera.xOffset = Math.round(gfx.camera.xOffset + xDiff);
        gfx.camera.yOffset = Math.round(gfx.camera.yOffset + yDiff);

        input.mouse.lastX = e.clientX;
        input.mouse.lastY = e.clientY;
    }
}, true);