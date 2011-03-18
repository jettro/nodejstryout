var node_server_url='/';
var socket = new io.Socket(node_server_url);
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
