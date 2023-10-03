const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 5000;
const path=require('path')

app.get('/', function(req, res) {

    res.sendFile(path.join(__dirname,'../server/index.html'))
});




// established connection
io.on('connection', (socket) => {
    socket.emit('connect', {message: 'a new client connected'})
})



server.listen(port, function() {
  console.log(`Listening on port ${port}`);
});