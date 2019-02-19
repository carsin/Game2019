var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

// World variables
var World = require(__dirname + "/world.js");
var world = new World(200, 10);

// Send html
app.use(express.static(__dirname + "/client"));

// Send static files
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/client/html/index.html");
});

// Connect event
io.on("connection", (socket) => {
    console.log("A player connected");

    io.emit("worldData", { mapSize: world.worldSize, chunkSize: world.chunkSize });

    // Send map to player initally
    var chunksToSend = [];
    for (var x = 0; x < world.lengthInChunks; x++) {
        for (var y = 0; y < world.lengthInChunks; y++) {
            chunksToSend.push(world.getChunk(x, y));
        }
    }

    io.emit("chunks", chunksToSend);

    // Disconnect event
    socket.on("disconnect", () => {
        console.log("A player disconnected");
    });
});

// Start server
http.listen(13050, () => {
    console.log("Server started");
});
