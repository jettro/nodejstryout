function message(obj) {
    if ('message' in obj) {
        $("#message").prepend("<div>" + obj.message[0] + " : " + obj.message[1] + "</div>");
    } else if('chat' in obj) {
        $("#chat").prepend("<div>" + obj.chat[0] + " : " + obj.chat[1] + "</div>");
    } else {
        $("#message").prepend("<div>" + obj.announcement + "</div>");
    }
}

function setName() {
    message( {message: ['You','Name is set to: ' + $("#visitorName").val()]});
    socket.send({newName: $("#visitorName").val()});
}

function sendMessage() {
    message({chat: ['You',$("#newMessage").val()]});
    socket.send({message: $("#newMessage").val()});
    $("#newMessage").val("");
}


var socket = new io.Socket(null, {rememberTransport: false});
socket.connect();

socket.on('message', function(obj) {
    if ('buffer' in obj) {
        for (var i in obj.buffer) message(obj.buffer[i]);
    } else {
        message(obj);
    }
});


socket.on('connect', function() {
    message({ message: ['System', 'Connected']})
});
socket.on('disconnect', function() {
    message({ message: ['System', 'Disconnected']})
});
socket.on('reconnect', function() {
    message({ message: ['System', 'Reconnected to server']})
});
socket.on('reconnecting', function(nextRetry) {
    message({ message: ['System', 'Attempting to re-connect to the server, next attempt in ' + nextRetry + 'ms']})
});
socket.on('reconnect_failed', function() {
    message({ message: ['System', 'Reconnected to server FAILED.']})
});
