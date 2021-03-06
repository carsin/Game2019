const socket = io();

// Receive initial world data
socket.on("worldData", (data) => {
    worldData = { chunks: [], chunkSize: data.chunkSize, mapSize: data.mapSize };
    for (var x = 0; x < data.mapSize; x++) {
        worldData.chunks[x] = [];
        for (var y = 0; y < data.mapSize; y++) {
            worldData.chunks[x][y] = undefined;
        }
    }
});

socket.on("entities", (entities) => {
    worldData.entities = entities;
});

socket.on("chunks", (chunks) => {
    for (var i = 0; i < chunks.length; i++) {
        worldData.chunks[chunks[i].chunkX][chunks[i].chunkY] = chunks[i];
    }
});