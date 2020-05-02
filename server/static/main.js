
var socket = io();
socket.connect('http://localhost:3000');
//if we receive a chat message from the server then add it to the messages div
socket.on('chat', (msg)=>{
    console.log(msg)
     var chatmess = msg.usr + ": " + msg.msg;
    document.getElementById("messages").innerHTML += "<p>"+chatmess+"</p>";
});
//If we receive a typing message from server add to typing div
socket.on('type', (msg)=>{document.getElementById("typing").innerHTML = msg;});

function buttonclick(){
    //On button click then send chat message to the server
    var user = document.getElementById("name").value;
    var msg = document.getElementById("message").value;
    if (user == '') {
        alert("Please enter a username.");
        return;
    };
    socket.emit('chat', {'usr': user, 'msg': msg})
    document.getElementById("message").value = ""
};

document.addEventListener('input', event => {
    //when typing in message box then send this to server as a typing type
    if (document.activeElement.id == "message"){
        var texttyping = document.getElementById("message").value
        socket.emit('type', texttyping);
    }
});