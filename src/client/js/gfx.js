var gfx = {
    canvas: document.getElementById("gameView"),
    ctx: gfx.canvas.getContext("2d"),
    
    fillScreen: () => {
        gfx.canvas.width = window.innerWidth;
        gfx.canvas.height = window.innerHeight;
        gfx.canvas.offScreenCanvas.width = canvas.width;
        gfx.canvas.offScreenCanvas.height = canvas.height;
        gfx.imageSmoothingEnabled = false;
        gfx.canvas.preGfx.imageSmoothingEnabled = false;
    },

    // Zoom and position of camera
    camera: {
        xOffset: 0,
        yOffset: 0,
        zoom: 1
    },

    // TODO: permanent tileSize variable
    tileSize: 8,
    scale: 4,

    // Render the map
    renderMap: (world) => {
        if (world == undefined) return;

        // Calculate bounds of triangle to render
        var xStart = Math.floor(Math.max(0, gfx.camera.xOffset / (gfx.tileSize * gfx.scale)));
        var yStart = Math.floor(Math.max(0, gfx.camera.yOffset / (gfx.tileSize * gfx.scale)));
        var xEnd = Math.ceil(Math.min(world.xMax, xStart + (gfx.canvas.width / (gfx.tileSize * gfx.scale))));
        var yEnd = Math.ceil(Math.min(world.yMax, yStart + (gfx.canvas.height / (gfx.tileSize * gfx.scale))));
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

                gfx.canvas.preGfx.drawImage(tex, (x * gfx.tileSize) * gfx.scale - gfx.camera.xOffset, (y * gfx.tileSize) * gfx.scale - gfx.camera.yOffset, gfx.tileSize * gfx.scale, gfx.tileSize * gfx.scale);
            }
        }
    },

    
    render: () => {
        if (worldData === undefined) return;

        // Lock camera
        gfx.camera.xOffset = Math.max(0, Math.min((worldData.xMax + 1) * gfx.scale * gfx.tileSize - gfx.canvas.width, gfx.camera.xOffset));
        gfx.camera.yOffset = Math.max(0, Math.min((worldData.yMax + 1) * gfx.scale * gfx.tileSize - gfx.canvas.height, gfx.camera.yOffset));

        gfx.drawImage(gfx.canvas.offScreenCanvas, 0, 0);
        renderMap(worldData);
    }
}

gfx.canvas.offScreenCanvas = document.createElement("canvas");
gfx.canvas.offScreenCanvas.width = canvas.width;
gfx.canvas.offScreenCanvas.heigh = canvas.height;
gfx.canvas.preGfx = canvas.offScreenCanvas.getContext("2d");

// Move camera with mouse
gfx.canvas.addEventListener("mousedown", (e) => {
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