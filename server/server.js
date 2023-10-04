//setup express server 
const express = require('express');
const path=require('path')
const { createServer } = require('node:http');
// 1.Integrating Socket.IO
const { Server } = require('socket.io');


const app = express();
const server = createServer(app);
// run socket.io server on app server
const io = new Server(server);

// handle home request
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'../server/index.html'))
});


// established connection
io.on('connection', (socket) => {
  console.log('a user connected');



  // listing message event from client side
  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });

// if connection disconnect
socket.on('disconnect', () => {
  console.log('user disconnected');
});
  
});

server.listen(5000, () => {
  console.log('server running at http://localhost:5000');
});