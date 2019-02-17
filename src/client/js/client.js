const socket = io();
const canvas = document.getElementById("gameView");
const gfx = canvas.getContext("2d");

socket.on("load map", (world) => {
    console.log("Loaded map with size " + world.xMax + "x" + world.yMax);
    renderMap(world);
});

// TODO: Render textures instead of rects.
function renderMap(world) {
    const tileSize = 8;
    for (var x = 0; x <= world.xMax; x++) {
        for (var y = 0; y <= world.yMax; y++) {
            switch (world.map[x][y]) {
                case "0": gfx.fillStyle = "green"; break;
                case "1": gfx.fillStyle = "blue"; break;
            }
            gfx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }

}