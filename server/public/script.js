const socket = io();

// user name send to server
// let username='suraj';
let username = prompt("Enter Your Name before Joining Into Chat");
let gender = prompt("Enter Your Gender before Joining Into Chat");

// send new username to server
socket.emit("new-user-join", {username,gender});
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



// send message to server so that all users receive it
document.getElementById('forms').addEventListener('submit',(e)=>{
    e.preventDefault();
  
    let messageInput=document.getElementById('msg').value;
    socket.emit('send-message',messageInput);
    var elements = document.getElementById("message_container");
    let time=(new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }));
   elements.innerHTML+=`
   <div class="msg right-msg">
   <div
    class="msg-img"
    style="background-image:  url(${(gender.slice(0,1)=='m')? 'boy.svg': 'girl.png'})"
   ></div>

   <div class="msg-bubble">
     <div class="msg-info">
       <div class="msg-info-name">YOU</div>
       <div class="msg-info-time">${time}</div>
     </div>
     <div class="msg-text">
     ${messageInput}

     </div>
   </div>
 </div>
   `;
   

    document.getElementById('msg').value="";
})


// message receive which is send by any other connected user
socket.on('receive-message',data=>{
let {username,gender}=data.data;
let {message}=data;


var elements = document.getElementById("message_container");
    let time=(new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" }));
   elements.innerHTML+=`
   <div class="msg left-msg">
   <div
    class="msg-img"
    style="background-image: url(${(gender.slice(0, 1)=='m')? 'boy.svg': 'girl.png'})"
   ></div>

   <div class="msg-bubble">
     <div class="msg-info">
       <div class="msg-info-name">${username}</div>
       <div class="msg-info-time">${time}</div>
     </div>

     <div class="msg-text">
      ${message}
     </div>
   </div>
 </div> `;

})