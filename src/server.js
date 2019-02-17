var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

// World variables
var world = require(__dirname + "/world.js");

// Send html
app.use(express.static(__dirname + "/client"));

// Send static files
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/client/html/index.html");
});

// Connect event
io.on("connection", (socket) => {
    console.log("A player connected");

    // Send map to player initally
    console.log(world.world.map[100][100]);
    io.emit("load map", world.world)

    // Disconnect event
    socket.on("disconnect", () => {
        console.log("A player disconnected");
    });
});

// Start server
http.listen(13050, () => {
    console.log("Server started");
});
