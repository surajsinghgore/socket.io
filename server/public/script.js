const socket = io();

// user name send to server
// let username='suraj';
let username = prompt("Enter Your Name before Joining Into Chat");

// send new username to server
socket.emit("new-user-join", username);
// self welcome message to current user
socket.on('self-welcome',username=>{
  document.getElementById('welcome').style.display="block";
  document.getElementById('usernameshow').innerText=username;
})
// notify every one that new user join the chat
socket.on('notify-new-user-to-all',username=>{

  document.getElementById('newUserjoin').style.display="block";
  document.getElementById('newuserjoinname').innerText=username;

})
document.getElementById("usernameshow").innerText = username;




document.getElementById('forms').addEventListener('submit',(e)=>{

    e.preventDefault();
})
