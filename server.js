#!/usr/bin/env node


const clearRequire = require('clear-require');
const http = require("http");
const port = parseInt(process.env.PORT) || 3000;
const server = http.createServer();

let app = require("./app");



server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
server.on("request", (req, res) => {
    app(req, res);
});

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }

// handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error("Port " + port + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error("Port " + port + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    let addr = server.address();
    console.log("webapp Listening on " + addr.port);
}

/**
 * process TERM/INT signal handler
 */
function gracefulShutdown() {
    console.log("stopping webapp");
    server.close( () => {
        console.log("webapp stopped successfully");
        process.exit();
    })
}

/**
 * process HUP signal handler
 */
function reloadApp(){
    clearRequire.all();
    app = require("./app");
    console.log("webapp reloaded");
}

// listen for TERM signal .e.g. kill
process.on ('SIGTERM', gracefulShutdown);

// listen for INT signal e.g. Ctrl-C
process.on ('SIGINT', gracefulShutdown);

// listen for HUP signal e.g reload
process.on ('SIGHUP', reloadApp);
