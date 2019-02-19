function GFX(tileSize, scale) {
    this.tileSize = tileSize,
    this.scale = scale,

    this.canvas = document.getElementById("gameView"),
    this.ctx = this.canvas.getContext("2d"),

    // Set up offscreen canvas
    this.canvas.offScreenCanvas = document.createElement("canvas");
    this.canvas.preCtx = this.canvas.offScreenCanvas.getContext("2d");
    this.canvas.offScreenCanvas.width = this.canvas.width;
    this.canvas.offScreenCanvas.heigh = this.canvas.height;

    fillScreen = () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.offScreenCanvas.width = this.canvas.width;
        this.canvas.offScreenCanvas.height = this.canvas.height;
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.canvas.preCtx.imageSmoothingEnabled = false;
    },

    // Zoom and position of camera
    this.camera = {
        xOffset: 0,
        yOffset: 0,
        zoom: 1
    },

    // Render the map
    renderMap = (world) => {
        if (world == undefined) return;

        // Calculate bounds of triangle to render
        var xStart = Math.floor(Math.max(0, this.camera.xOffset / (this.tileSize * this.scale)));
        var yStart = Math.floor(Math.max(0, this.camera.yOffset / (this.tileSize * this.scale)));
        var xEnd = Math.ceil(Math.min(world.xMax, xStart + (this.canvas.width / (this.tileSize * this.scale))));
        var yEnd = Math.ceil(Math.min(world.yMax, yStart + (this.canvas.height / (this.tileSize * this.scale))));
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

                this.canvas.preCtx.drawImage(tex, (x * this.tileSize) * this.scale - this.camera.xOffset, (y * this.tileSize) * this.scale - this.camera.yOffset, this.tileSize * this.scale, this.tileSize * this.scale);
            }
        }
    },

    
    render = () => {
        if (worldData === undefined) return;

        // Lock camera
        this.camera.xOffset = Math.max(0, Math.min((worldData.xMax + 1) * this.scale * this.tileSize - this.canvas.width, this.camera.xOffset));
        this.camera.yOffset = Math.max(0, Math.min((worldData.yMax + 1) * this.scale * this.tileSize - this.canvas.height, this.camera.yOffset));

        this.ctx.drawImage(this.canvas.offScreenCanvas, 0, 0);
        renderMap(worldData);
    }
}