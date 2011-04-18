function message(obj) {
    if ('message' in obj) {
        $("#message").prepend("<div>" + obj.message[0] + " : " + obj.message[1] + "</div>");
    } else if ('chat' in obj) {
        $("#chat").prepend("<div>" + obj.chat[0] + " : " + obj.chat[1] + "</div>");
    } else if ('users' in obj) {
        $(".user").remove();
        for (var i = 0; i < obj.users.length; i++) {
            $("#users").prepend("<div class='user'>" + obj.users[i] + "</div>")
        }
    } else if ('buffer' in obj) {
        for (var j in obj.buffer) message(obj.buffer[j]);
    } else if ('announcement' in obj) {
        $("#message").prepend("<div>" + obj.announcement + "</div>");
    } else {
		$("#message").prepend("<div>Unknown message type: " + obj + "</div>");
	}
}

function setName() {
    message({message: ['You','Name is set to: ' + $("#visitorName").val()]});
    socket.send({newName: $("#visitorName").val()});
    $("#visitorName").attr('readonly', true);
    $("#setNameButton").hide();
}

function sendMessage() {
    message({chat: ['You',$("#newMessage").val()]});
    socket.send({message: $("#newMessage").val()});
    $("#newMessage").val("");
}


var socket = new io.Socket(null, {rememberTransport: false});
socket.connect();

socket.on('message', function(obj) {
    message(obj);
});


socket.on('connect', function() {
    message({ message: ['System', 'Connected']});
    if ($("#visitorName").val() != '') {
        setName();
    }
});
socket.on('disconnect', function() {
    message({ message: ['System', 'Disconnected']});
});
socket.on('reconnect', function() {
    message({ message: ['System', 'Reconnected to server']});
});
socket.on('reconnecting', function(nextRetry) {
    message({ message: ['System', 'Attempting to re-connect to the server, next attempt in ' + nextRetry + 'ms']});
});
socket.on('reconnect_failed', function() {
    message({ message: ['System', 'Reconnected to server FAILED.']});
});
