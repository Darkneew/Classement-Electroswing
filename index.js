const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server);
app.use(express.urlencoded({ extended: false }));

const port = 3000;

// requests
app.use("/", express.static("public"));

//sockets
io.on("connection", (socket) => {
  socket.on("getChoice", () => {
    socket.emit("choice",  [
      {
        name:"Travelin' Man",
        url:"https://www.youtube.com/watch?v=f6ZnkJXXaLk"
      },
      { 
        name:"Dancin' Under the Stars",
        url:"https://www.youtube.com/watch?v=qRL7j27EWWo"
      }
    ]);
  });
})

//listening 
server.listen(port, function () {
  console.log(`listening to port ${port}`);
});

