function GFX(tileSize, scale) {
    this.tileSize = tileSize;
    this.scale = scale;

    this.canvas = document.getElementById("gameView");
    this.ctx = this.canvas.getContext("2d");

    // Set up offscreen canvas
    this.canvas.offScreenCanvas = document.createElement("canvas");
    this.canvas.preCtx = this.canvas.offScreenCanvas.getContext("2d");

    this.fillScreen = () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.offScreenCanvas.width = this.canvas.width;
        this.canvas.offScreenCanvas.height = this.canvas.height;
        this.ctx.imageSmoothingEnabled = false;
        this.ctx.canvas.preCtx.imageSmoothingEnabled = false;
    };

    // Zoom and position of camera
    this.camera = {
        xOffset: 0,
        yOffset: 0,
    };

    // Render the map
    this.renderMap = (world) => {
        if (world == undefined) return;

        // Calculate bounds of rectangle to render
        var xStart = Math.floor(Math.max(0, this.camera.xOffset / (this.tileSize * this.scale * world.chunkSize)));
        var yStart = Math.floor(Math.max(0, this.camera.yOffset / (this.tileSize * this.scale * world.chunkSize)));
        var xEnd = Math.ceil(Math.min(world.mapSize / world.chunkSize, xStart + (this.canvas.width / (this.tileSize * this.scale * world.chunkSize)) + 1));
        var yEnd = Math.ceil(Math.min(world.mapSize / world.chunkSize, yStart + (this.canvas.height / (this.tileSize * this.scale * world.chunkSize)) + 1));
        // console.log("xStart: " + xStart + " | yStart: " + yStart + " | xEnd: " + xEnd + " | yEnd: " + yEnd);

        // From top left of screen to bottom right of screen
        for (var x = xStart; x < xEnd; x++) {
            for (var y = yStart; y < yEnd; y++) {
                for (var xa = 0; xa < world.chunkSize; xa++) {
                    for (var ya = 0; ya < world.chunkSize; ya++) {

                        // Choose texture based on tile id
                        switch (world.chunks[x][y].tiles[xa][ya]) {
                            case 0: tex = resources.textures["dirt"]; break;
                            case 1: tex = resources.textures["grass"]; break;
                        }

                        this.canvas.preCtx.drawImage(
                            tex,
                            ((x * world.chunkSize + xa) * this.tileSize) * this.scale - this.camera.xOffset,
                            ((y * world.chunkSize + ya) * this.tileSize) * this.scale - this.camera.yOffset,
                            this.tileSize * this.scale,
                            this.tileSize * this.scale
                        );
                    }
                }
                var tex;

            }
        }
    };

    this.render = () => {
        if (worldData === undefined) return;

        // Lock camera
        this.camera.xOffset = Math.max(0, Math.min((worldData.mapSize + 1) * this.scale * this.tileSize - this.canvas.width, this.camera.xOffset));
        this.camera.yOffset = Math.max(0, Math.min((worldData.mapSize + 1) * this.scale * this.tileSize - this.canvas.height, this.camera.yOffset));

        this.ctx.drawImage(this.canvas.offScreenCanvas, 0, 0);
        this.renderMap(worldData);
    };
}