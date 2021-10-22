// General Express declarations and requires
const express = require('express');
const routerApp = express();
const path = require('path');

routerApp.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/index.html"))
);

routerApp.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/notes.html"))
);

routerApp.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/index.html")) // always keep last
);


// Export this
module.exports = routerApp;

