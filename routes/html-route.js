// General Express declarations and requires
const express = require('express');
const routerApp = express();
const path = require('path');

console.log("2");
// Loop in the notes API by requiring it
const notesApiRouter = require("./api-route"); //<-- why not this one?


// Set the URL route to look for /notes to access the notes API
// routerApp.use("/notes", notesApiRouter);

routerApp.use("/notes", notesApiRouter); //<-- why not this one?



routerApp.get("/notes", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/notes.html"))
);

routerApp.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "../public/index.html"))
);



// routerApp.get("/", (req, res) => {
//     console.log(_dirname);
// })

// function routes() {
// routerApp.get("/notes", (req, res) =>
//     res.sendFile(path.join(__dirname, "../public/notes.html"))
// );

// routerApp.get("*", (req, res) =>
//     res.sendFile(path.join(__dirname, "../public/index.html"))
// );
// };

// Export this
module.exports = routerApp;

