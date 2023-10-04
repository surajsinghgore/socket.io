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


//! broadcasting io.emit()
// this will emit the event to all connected sockets
// every one
// only to new joiner not to all connected
io.emit('some event', {
  someProperty: 'some value',
  otherProperty: 'other value'
}); 

// this will give msg to new joiner not every one
io.on('connection', (socket) => {
  socket.broadcast.emit('hi');
});

// every one all new + all joiner
socket.on('chat message', (msg) => {
  io.emit('chat message', msg);
});
// if connection disconnect
socket.on('disconnect', () => {
  console.log('user disconnected');
});
  
});

server.listen(5000, () => {
  console.log('server running at http://localhost:5000');
});