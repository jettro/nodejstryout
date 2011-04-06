function writeMessage(message) {
    $("#message").prepend("<div>" + message + "</div>");
}

function sendMessage() {
    now.distributeMessage($("#newMessage").val());
    $("#newMessage").val("")
}

now.receiveMessage = function(name, message) {
    writeMessage(name + ": " + message);
};

now.newlyJoined = function(name) {
    writeMessage(name + " Joined");
};

now.hasLeft = function(name) {
    writeMessage(name + " Left");
};

now.refreshPersonsList = function() {
    $(".person").remove();
    for (var i = 0; i < now.availablePersons.length; i++) {
        $("#availablePersons").append("<div class='person'>" + now.availablePersons[i] + "</div>");
    }
};