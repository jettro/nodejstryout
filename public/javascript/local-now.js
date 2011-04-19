function writeMessage(obj) {
    $("#message").prepend("<div>" + obj.message[0] + " : " + obj.message[1] + "</div>");
}

function writeChat(obj) {
    $("#chat").prepend("<div>" + obj.chat[0] + " : " + obj.chat[1] + "</div>");
}

function sendMessage() {
    now.distributeMessage($("#newMessage").val());
    $("#newMessage").val("");
}

function setName() {
    writeMessage({message:['You',"Name is set to: " + $("#visitorName").val()]});
    now.setName($("#visitorName").val());
}

$(document).ready(function() {

    now.receiveMessage = function(message) {
        writeChat(message);
    };

    now.newlyJoined = function(name) {
        writeMessage({message:['System', name + " Joined"]});
        refreshPersonsList();
    };

    now.hasLeft = function(name) {
        writeMessage({message:['System', name + " Left"]});
        refreshPersonsList();
    };

    now.bufferedMessages = function(obj) {
        for (var j in obj.buffer) writeChat(obj.buffer[j]);
    };

    now.refreshAvailablePersons = function(obj) {
        $(".user").remove();
        for (var i = 0; i < obj.users.length; i++) {
            $("#users").prepend("<div class='user'>" + obj.users[i] + "</div>")
        }
    };
});