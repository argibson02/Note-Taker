// General Express declarations and requires
const express = require('express');
const path = require('path');
const routerApp = require('./routes/html-route');

// Our PORt is either 3000 for local or the host (Heroku) PORT
const PORT = process.env.PORT || 3000;

// Invoke express
const app = express();

// JSONify and use the body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Gives express access to the files in the "public" folder
app.use(express.static('public'));

// If /notes is used, we defer to the router in html-route for further instructions
app.use("/notes", routerApp);

// Get for landing page
app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "/public/index.html"))
);

// may not need this because of the router
// app.get("/notes", (req, res) =>
//     res.sendFile(path.join(__dirname, "/public/notes.html"))
// );

// Listener
app.listen(PORT, () =>
console.log(`Note is listening and available in at http://localhost${PORT}`)
);