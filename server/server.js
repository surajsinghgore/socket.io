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
  socket.on('new-user-join',username=>{
    // set username in object
users[socket.id]=username;



// notify every one that new user join the chat
socket.broadcast.emit('notify-new-user-to-all',username);
// send self message to new user itself
socket.emit('self-welcome',username);


  }) 





// if connection disconnect
socket.on('disconnect', () => {


});
  
});

server.listen(5000, () => {
  console.log('server running at http://localhost:5000');
});