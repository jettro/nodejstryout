var node_server_url='localhost';
var socket = new io.Socket();
socket.connect();

socket.on('connect', function() {
    writeMessage("Connected with the server");
});
socket.on('message', function(message){
    writeMessage("Received a message : " + message.announcement);
});
socket.on('disconnect', function(){
    writeMessage("Dis-connected from the server");
});

function writeMessage(message) {
    $("#message").prepend("<div>" + message + "</div>");
}

function sendMessage() {
    socket.send($("#newMessage").val());
    writeMessage("The message is send");
    $("#newMessage").val("")
}