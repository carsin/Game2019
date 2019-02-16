const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

// World variables
var world = require(__dirname + "/world.js");
world.test();

// Send html
app.use(express.static(__dirname + "/client"));

// Send static files
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/client/html/index.html");
});

// Connect event
io.on("connection", (socket) => {
    console.log("A player connected");

    // Disconnect event
    socket.on("disconnect", () => {
        console.log("A player disconnected");
    });
});

// Start server
http.listen(13050, () => {
    console.log("Server started");
});
