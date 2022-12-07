const fs = require('fs');
const YouTube = require('youtube-node');
var youTube = new YouTube();
youTube.setKey('insert key here');

const getLinks = async (queries, links, callback, i) => {
    if (i == 0) return console.log(queries, links);
    if (queries.length == 0) return callback(links);
    let query = queries.pop();
    youTube.search(query, 2, (err, result) => {
        if (err) throw err;
        else {
            let Tresult = JSON.parse(JSON.stringify(result, null, 2));
            let videoId = Tresult.items[0].id.videoId || Tresult.items[1].id.videoId;
            console.log(videoId);
            if (!links.includes('https://www.youtube.com/watch?v=' + videoId)) links.push('https://www.youtube.com/watch?v=' + videoId);
            getLinks(queries, links, callback, i-1);
        }
    });        
};

fs.readFile("./request4.txt", 'utf8', async (err, data) => {
    if (err) throw err;
    let list = data.split("\r\n").map(x => x.split(" ").filter(x => x != "").join(" "));
    getLinks(list, [], (links) => fs.writeFile("./links4.txt", links.join("\n"), err => { if (err) throw err; }), 300);
});