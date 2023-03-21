const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  let user;

  socket.on('username', (username) => {
    console.log(`${username} connected!`);
    user = username;
  });

  socket.on('chat message', (msg, username) => {
    io.emit('chat message', msg, username);
    console.log(`${username} sent a message!`)
  });

  socket.on('disconnect', () => {
    console.log(`${user} disconnected`);
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});