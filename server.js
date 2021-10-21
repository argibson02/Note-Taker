// General Express declarations and requires
const express = require('express');


// Our PORt is either 3000 for local or the host (Heroku) PORT
const PORT = process.env.PORT || 3001;

// Invoke express
const app = express();

// JSONify and use the body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// const routerApp = require('./routes/html-route');
// const notesApiRouter = require("./routes/api-route");
// routerApp.use("/notes", notesApiRouter);
// app.use("/" , routerApp);

const routerApp = require('./routes/html-route');
const notesApiRouter = require("./routes/api-route");
app.use('/', notesApiRouter);
app.use('/', routerApp);


// Listener
app.listen(PORT, () =>
console.log(`Node is listening and available at http://localhost${PORT}/`)
);