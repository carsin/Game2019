var world = {
    map: [],
    xMax: 200,
    yMax: 200,

    initMap: () => {
        console.log("Building map with size " + world.xMax + "x" + world.yMax);
        for (var x = 0; x <= world.xMax; x++) {
            world.map[x] = [];
            for (var y = 0; y <= world.yMax; y++) {
                world.map[x][y] = String(Math.round(Math.random()));
            }
        }
    }
}

world.initMap();

module.exports = { world }