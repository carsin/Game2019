const express = require("express");
const app = express();

const io = require("socket.io")(13049);

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/html/index.html");
});

app.listen(13050, function() {
    console.log("Server started");
});