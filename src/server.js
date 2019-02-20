var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var World = require(__dirname + "/world.js");
var Entity = require(__dirname + "/entity.js");

var world = new World(200, 10);
new Entity("soldier", 0, 3, 3, world);

app.use(express.static(__dirname + "/client"));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/client/html/index.html");
});

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
    socket.on("disconnect", () => {
        console.log("A player disconnected");
    });
});

http.listen(13050, () => {
    console.log("Server started");
});

function hrtime() {
    var t = process.hrtime();
    return t[0] + t[1] / 1000000000;
}

// Timestamp of last tick
var lt = hrtime();

function tick() {
    now = hrtime();
    var delta = now - lt;
    lt = now;

    // Send chunks that have been updated
    var chunksToSend = [];
    for (var x = 0; x < world.lengthInChunks; x++) {
        for (var y = 0; y < world.lengthInChunks; y++) {
            var chunk = world.getChunk(x, y);
            if (chunk.updated) chunksToSend.push(chunk);
            chunk.updated = false;
        }
    }

    io.emit("entities", world.entities);
}

setInterval(tick, 1000 / 60);
