window.onload = () => {
    var socket = io();
    socket.emit("getChoice");
    socket.on("choice", (res) => {
        console.log(res)
        let c1 = res[0];
        let c2 = res[1];
        document.getElementById("fill").innerHTML = c1.name + c1.url + c2.name + c2.url;
    });
}