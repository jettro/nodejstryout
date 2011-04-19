var technology = process.argv[2];
console.log("Provided argument is %s",technology);
if (technology ==  "nowjs") {
    console.log("Starting the nowjs variant of the sample");
    require("./app-nowjs");
} else {
    console.log("Starting the socketio variant of the sample");
    require("./app-socketio");
}

