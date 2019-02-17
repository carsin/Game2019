var socket = io();
var canvas = document.getElementById("gameView");
var gfx = canvas.getContext("2d");

var resources = {
    textures: [],
    loadTexture: (name, path) => {
        var tex = new Image(8, 8);
        tex.src = path;
        resources.textures[name] = tex;
    }
};

resources.loadTexture("dirt", "../res/img/dirt.png");
resources.loadTexture("grass", "../res/img/grass.png");

socket.on("load map", (world) => {
    console.log("Loaded map with size " + world.xMax + "x" + world.yMax);
    renderMap(world);
});

// TODO: Render textures instead of rects.
function renderMap(world) {

    // TODO: permanent tileSize variable
    var tileSize = 8;

    for (var x = 0; x <= world.xMax; x++) {
        for (var y = 0; y <= world.yMax; y++) {

            var tex;

            switch (world.map[x][y]) {
                case "0": tex = resources.textures["dirt"]; break;
                case "1": tex = resources.textures["grass"]; break;
            }

            gfx.drawImage(tex, x * tileSize, y * tileSize, tileSize, tileSize);
        }
    }
}