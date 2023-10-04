//setup express server 
const express = require('express');
const path=require('path')
const { createServer } = require('node:http');
// 1.Integrating Socket.IO
const { Server } = require('socket.io');


const app = express();
const server = createServer(app);
app.use(express.static(path.resolve(__dirname, "public")));
// run socket.io server on app server
const io = new Server(server);

// handle home request
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'../server/index.html'))
});

var wm = new WeakMap();
// established connection
io.on('connection', (socket) => {
  console.log('a user connected');
  
// username get
socket.on('sendUserName',(username)=>{
  wm.set(socket, username);

})


  //  to all users
socket.broadcast.emit('notifyNewUserJoinToEveryOne',wm.get(socket))


  // to new user only
socket.emit('newUserConnected',wm.get(socket))
  // to all connected except new user



// if connection disconnect
socket.on('disconnect', () => {
  wm.delete(socket);
  console.log('user disconnected');
});
  
});

server.listen(5000, () => {
  console.log('server running at http://localhost:5000');
});