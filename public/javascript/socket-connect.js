function writeMessage(message) {
    $("#message").prepend("<div>" + message + "</div>");
}

function sendMessage() {
    now.distributeMessage($("#newMessage").val());
    writeMessage("The message is send");
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
    $("#.person").remove();
    var tempAvailPersons = now.availablePersons;
    writeMessage("amount of persons : " + tempAvailPersons.length);
    for (var i = 0; i < tempAvailPersons.length; i++) {
        $("#availablePersons").append("<div class='person'>" + tempAvailPersons[i] + "</div>");
    }
};