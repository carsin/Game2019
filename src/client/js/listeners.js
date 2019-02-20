// Listen for key activity
document.addEventListener("keydown", (e) => {
    // Store keyboard and mouse input
    input.keys[e.keyCode] = true;
    if (e.keyCode == 189) if (gfx.scale > 2) gfx.scale -= 1;
    if (e.keyCode == 187) if (gfx.scale < 8) gfx.scale += 1;
});

document.addEventListener("keyup", (e) => { input.keys[e.keyCode] = false; });

// Move camera with mouse
document.addEventListener("mousedown", (e) => {
    input.mouse.click = true;
    input.mouse.lastX = e.clientX;
    input.mouse.lastY = e.clientY;

    socket.emit("click", { x: input.mouse.x, y: input.mouse.y });
}, true);

document.addEventListener("mouseup", () => {
    input.mouse.click = false;
}, true);

document.addEventListener("mousemove", (e) => {

    input.mouse.x = (e.clientX + gfx.camera.xOffset) / (gfx.tileSize * gfx.scale);
    input.mouse.y = (e.clientY + gfx.camera.yOffset) / (gfx.tileSize * gfx.scale);

    if (input.mouse.click) {
        var xDiff = input.mouse.lastX - e.clientX;
        var yDiff = input.mouse.lastY - e.clientY;

        gfx.camera.xOffset = Math.round(gfx.camera.xOffset + xDiff);
        gfx.camera.yOffset = Math.round(gfx.camera.yOffset + yDiff);

        input.mouse.lastX = e.clientX;
        input.mouse.lastY = e.clientY;
    }
}, true);