const Database = require("better-sqlite3");
const fs = require("fs");

var db = new Database("./database.db");
db.prepare(
    `
    CREATE TABLE matches (
      music TEXT NOT NULL,
      opponent TEXT NOT NULL,
      wins INTEGER NOT NULL CHECK(wins >= 0) DEFAULT 1,
      total INTEGER NOT NULL CHECK(total >= 0) DEFAULT 2
    )
  `
  ).run();

fs.readFile("./ids.txt", 'utf8', async (err, data) => {
    if (err) throw err;
    let list = data.split("\r\n");
    let insertMatch = db.prepare("INSERT INTO matches(music, opponent) VALUES(?, ?)");
    for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list.length; j++) {
            if (i == j) continue;
            insertMatch.run(list[i], list[j]);
        }
    }
    db.close();
});