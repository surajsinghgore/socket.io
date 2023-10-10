
# Socket.io

Socket.IO is a library that enables real-time, bidirectional and event-based communication between the browser and the server. It consists of: a Node. js server: Source | API. a Javascript client library for the browser (which can be also run from Node.


## Socket.io

Official Website =>
https://socket.io

Project Example => https://livechat-q9ns.onrender.com

## Integrated socket.io in project
installation Process

1.Load Script In head
```http
  <script src="/socket.io/socket.io.js"></script>
```
2.Initialize socket.io on client side
```http
 const socket = io("/");
```
#### Server Side Setup
create Node, Express Server
```http
  npm i express,socket.io
```
setup node server
```http
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


// established socket.io connection 
io.on('connection', (socket) => {
  //if user connected 
  console.log('a user connected');


// if connection disconnect
socket.on('disconnect', () => {
  

  console.log('user disconnect');
});
  
});


server.listen(5000, () => {
  console.log('server running at http://localhost:5000');
});
```
Now next-step is to handle events
| names of event | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `socket.on` | `event` | **Lisiting** use to listen events |
| `socket.emit` | `event` | **Firing** use to fire an event |

1.Client to server
```http
client=> [Firing Event]

 const socket = io("/");
 socket.emit('event-name',data-send-to-server);


server=> [Lisiting Event]
socket.on('event-name-which-fires',(data)=>{
console.log(data);
})

```
2.Server to Client

```http
server=> [Firing Event]

 socket.emit('event-name',data-send-to-server);


client=> [Lisiting Event]

 const socket = io("/");
 socket.emit('event-name-which-fires',(data)=>{
console.log(data);
})
```
#### Various Important Attributes In Socket.io


| Name | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `io.emit()`      | `all` | **all rooms**. use to display information to all clients in namespace |
| `socket.emit()`      | `event` | **Locally**. use to display information to newly connected user |
| `io.sockets.emit()`      | `event` | **All**. use to display information to all connected users new,old both|
| `socket.broadcast.emit()`      | `event` | **Existing**. use to display information to all connect users except new user|

#### save data

```http
let users={};

io.on('connection', (socket) => {

//save data of connected client
socket.on('new-user-join',data=>{
users[socket.id]=data;
})


//get information of current client

 socket.broadcast.emit('user-disconnect',users[socket.id]);

})


```


#### make private rooms


```http

 socket.join('room-name');

//send informations in room
socket.broadcast.in(roomcode).emit("event-name", data);

 // send self message to new user itself
 socket.emit("self-welcome", username);

//number of active users in particular room 
const cout=(await io.in('roomname').fetchSockets()) .length;


// send message to all connected users in room
socket.in(roomcode).emit("receive-message", data);


//number of active users in room
socket.broadcast.in(roomcode).emit("event-name",data);
```
