const socket = io();
var canvas = document.getElementById("gameView");
var gfx = canvas.getContext("2d");

// TODO: Map is undefined for some reason.
socket.on("load map", (world) => {
    console.log("Loaded map with size " + world.xMax + "x" + world.yMax);
    renderMap(world);
});

// TODO: Render textures instead of rects.
function renderMap(world) {
    for (var x = 0; x <= world.xMax; x++) {
        for (var y = 0; y <= world.yMax; y++) {
            switch (world.map[[x, y]]) {
                case "0": gfx.fillStyle = "green"; break;
                case "1": gfx.fillStyle = "blue"; break;
            }
            gfx.fillRect(x, y, 1, 1);
        }
    }

}