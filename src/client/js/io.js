const socket = io();

socket.on("load map", (world) => {
    console.log("Loaded map with size " + world.xMax + "x" + world.yMax);
    worldData = world;
});