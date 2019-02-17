const socket = io();

socket.on("load map", (world) => {
    console.log("Loaded map with size " + world.world.xMax + "x" + world.world.yMax);
});