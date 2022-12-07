window.onload = () => {
    var socket = io();
    var match = ["w4F1shqvCcQ", "_gWyMXpBcTY"];
    socket.emit("getChoice");
    socket.on("choice", (res) => {
        document.getElementById("music0").src = "https://www.youtube.com/embed/" + res[0];
        document.getElementById("music1").src = "https://www.youtube.com/embed/" + res[1];
        match = res;
    });
    document.getElementById("button0").onclick = () => {
        socket.emit("choice", match, 0);
    }
    document.getElementById("button1").onclick = () => {
        socket.emit("choice", match, 1);
    }
}