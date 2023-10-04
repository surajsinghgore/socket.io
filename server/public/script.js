const socket = io();

// user name send to server
let username = prompt("Enter Your Name before Joining Into Chat");
socket.emit("sendUserName", username);
// set username
// welcome username set
document.getElementById("usernameshow").innerText = username;

// connect a new user greet welcome
socket.on("newUserConnected", (data) => {
    console.log(data)
  document.getElementById("welcome").style.display = "block";
  document.getElementById("usernameshow").innerText = username;
});

//  notify all user that new user join the chat
socket.on("notifyNewUserJoinToEveryOne", (data) => {
    console.log(data)
  document.getElementById("newUserjoin").style.display = "block";
  document.getElementById("newuserjoinname").innerText = username;
});




document.getElementById('forms').addEventListener('submit',(e)=>{

    e.preventDefault();
})
