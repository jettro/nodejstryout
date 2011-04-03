var node_server_url='localhost';
var socket = new io.Socket();
socket.connect();
socket.on('connect', function() {
    alert('Connected to the server');
});
socket.on('message', function(){
    alert('Receiving a message');
});
socket.on('disconnect', function(){
    alert('Disconnected from server');
});
