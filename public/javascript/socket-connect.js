var lastLog = -1;

function writeMessage(message) {
    $("#message").prepend("<div>" + message + "</div>");
}

function writeLog() {
    var start = (lastLog > 0)?lastLog:0;
    lastLog = now.logs.length;
    for (var i = start; i < now.logs.length; i++) {
        $("#logs").prepend("<div>" + now.logs[i]  + "</div>")
    }
}

function cleanLog() {
    now.cleanLogs();
}

function sendMessage() {
    now.distributeMessage($("#newMessage").val());
    $("#newMessage").val("");
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
        $(".person").remove();
        for (var i = 0; i < now.availablePersons.length; i++) {
            $("#availablePersons").append("<div class='person'>" + now.availablePersons[i] + "</div>");
        }
    };

    now.name = prompt("What's your name?", "")
});