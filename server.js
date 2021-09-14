const express = require('express');
const app = express();
const http = require('http').createServer(app);



const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));//
//app.get("/",(req,res) => {
 //   res.sendFile (__dirname+"/index.html");
//})

http.listen(PORT,(req,res)=> {
    console.log(`SERVER IS RUUNNING AT PORT NUMBER ${PORT} `);
})
const io = require('socket.io')(http);
const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', na =>{
        console.log("New User", na);
        users[socket.id]=na;
        socket.broadcast.emit('user-joined',na);
    });
    socket.on('send', message => {
        socket.broadcast.emit('receive',{message: message, na: users[socket.id]})
    })
    socket.on('disconnect', message => {
        socket.broadcast.emit('left',users[socket.id]);
        delete users[socket.id];
    })
})

