const express = require("express");
const app = express();

const socket = require("socket.io");

let server = app.listen(3000, function() {
  console.log("Node server running...");
});

const io = socket(server);
io.on('connection', (socket) => {
  socket.on("movement", (data) => {
    socket.broadcast.emit("movement", data);
  });
});

app.use(express.static("public"));