const app    = require("express")();
const express = require("express");
const server = require("http").Server(app);
const io     = require("socket.io")(server); 
const port   = 4000;
app.use(express.static("public/"));
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("*", (request, response) => {
    // response.writeHead("200", {"Content-Type": "text/plain"}); //("404.html");
    // response.write("Sorry, I can't not find your directory");
    // response.end();
    response.sendFile(__dirname + "/public/404.html");
});


/*
io.on('connection', (socket) => {
    console.log(`User connected`);
    // socket.emit('message', {manny: 'hey how are you?'});
    // socket.on('another event', (data) => {
    //     console.log(data)
    // })

    socket.on('message', (msg) => {
        console.log('message: ' + msg);
        io.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected`);
        io.emit("message", "user disconnected");
    });
})
*/
// Tech namespace
const tech = io.of('/tech');
tech.on('connection', (socket) => {
    console.log(`Browser accepted Connected`);
    socket.on('message', (msg) => {
        console.log('message' + msg);
        tech.emit("message", msg);
    });

    socket.on('disconnect', () => {
        console.log('Browser disconnected!');
        tech.emit("message", "user disconnected");
    })
});