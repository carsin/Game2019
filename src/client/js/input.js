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
    // Store keyboard and mouse input
    input.keys[e.keyCode] = true;
    if (e.keyCode == 189) if (scale > 2) scale -= 1;
    if (e.keyCode == 187) if (scale < 8) scale += 1;
});

document.addEventListener("keyup", (e) => { input.keys[e.keyCode] = false; });