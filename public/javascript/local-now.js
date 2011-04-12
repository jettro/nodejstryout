function writeMessage(message) {
    $("#message").prepend("<div>" + message + "</div>");
}

function sendMessage() {
    now.distributeMessage($("#newMessage").val());
    $("#newMessage").val("");
}

function setName() {
    writeMessage("Name is set to: " + $("#visitorName").val());
    now.name = $("#visitorName").val();
    now.ready(function() {
        now.setName();
    });
//    now.enterGeneralRoom();
}

$(document).ready(function() {

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
        writeMessage("refreshing available users");
        $(".person").remove();
        for (var i in now.availablePersons) {
            writeMessage(now.availablePersons[i]);
            $("#availablePersons").append("<div class='person'>" + now.availablePersons[i] + "</div>");
        }
    };


});