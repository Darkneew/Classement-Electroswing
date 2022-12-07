const port = 3000;
const alea = 5;

const express = require("express");
var db = new require("better-sqlite3")("./database.db");
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server);
app.use(express.urlencoded({ extended: false }));

// requests
const matchRequest = db.prepare(
  `
  SELECT music, opponent FROM matches
  ORDER BY total LIMIT ?
  `);
const addWin = db.prepare(
  `
  UPDATE matches SET wins=(
    SELECT wins FROM matches WHERE music=? and opponent=?
  ) + 1, total = (
    SELECT total FROM matches WHERE music=? and opponent=?
  ) + 1 WHERE music=? and opponent=?
  `);
const addLoss = db.prepare(
    `
    UPDATE matches SET wins=(
      SELECT wins FROM matches WHERE music=? and opponent=?
    ), total = (
      SELECT total FROM matches WHERE music=? and opponent=?
    ) + 1 WHERE music=? and opponent=?
    `);

// get match to vote for
const getMatch = () => {
  let matches = matchRequest.all(alea * 5);
  let m = matches[Math.floor(Math.random()*matches.length)];
  return [m.music, m.opponent]
}

// requests
app.use("/", express.static("public"));

//sockets
io.on("connection", (socket) => {
  socket.on("getChoice", () => {
    socket.emit("choice",  getMatch());
  });
  socket.on("choice", (match, i) => { // i the index of the winner
    console.log("A user chose " + match[i] + " over " + match[1-i]);
    addLoss.run(match[1-i], match[i], match[1-i], match[i], match[1-i], match[i]);
    addWin.run(match[i], match[1-i], match[i], match[1-i], match[i], match[1-i]);
    socket.emit("choice",  getMatch());
  });
})

// Stop the server
process.on("SIGHUP", () => process.exit(128 + 1));
process.on("SIGINT", () => process.exit(128 + 2));
process.on("SIGTERM", () => process.exit(128 + 15));
process.on("exit", () => {
  db.close();
});


//listening 
server.listen(port, function () {
  console.log(`listening to port ${port}`);
});

