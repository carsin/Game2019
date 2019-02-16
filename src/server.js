const express = require("express");
const app = express();
const http = require("http").Server(app);

const io = require("socket.io")(http);

app.use(express.static(__dirname + "/client"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/client/html/index.html");
});

io.on("connection", () => {
    console.log("connnectioon");
});

http.listen(13050, () => {
    console.log("Server started");
});
