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


// established connection
let users={};
io.on('connection', (socket) => {

  // username get
  socket.on('new-user-join',data=>{
    
    // set username in object
users[socket.id]=data;
// socket.data+=gender;


// notify every one that new user join the chat
socket.broadcast.emit('notify-new-user-to-all',data.username);
// send self message to new user itself
socket.emit('self-welcome',data.username);
  }) 



//message get from user and send to all connected users
socket.on('send-message',message=>{
socket.broadcast.emit('receive-message',{data:users[socket.id],message})
})

// if connection disconnect
socket.on('disconnect', () => {


});
  
});

server.listen(5000, () => {
  console.log('server running at http://localhost:5000');
});