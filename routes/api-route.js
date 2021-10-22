//================================================ Global variable declarations
const notes = require('express').Router();
const util = require('util');
const fs = require('fs');

// import of uuid (unique id tool)
const { v4: uuidv4 } = require('uuid');



//=================================================== Global read and write functions/variables
const readFromFile = util.promisify(fs.readFile);

function writeToFile(destination, content) {
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
        err ? console.error(err) : console.info(`\nData written to ${destination}`)
    )
};



//==================================================== GET, GET by ID, POST with new ID, DELETE
// GET notes saved on db.json
notes.get("/api/notes", (req, res) => {
    // promisifies it so that action is only taken when all the body has been received 
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});


// GET note by unique ID saved on db.json
notes.get("/api/notes/:id", (req, res) => {
    // promisifies it so that action is only taken when all the body has been received 
    readFromFile("./db/db.json").then((data) => {
        let parsed = JSON.parse(data)
        res.json(parsed[req.params.id])
    })
});


// POST notes and given them unique IDs
notes.post('/api/notes', (req, res) => {
    req.body.id = uuidv4();

    function readAndAppend(content, file) {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            }
            else {
                let parsedData = JSON.parse(data);
                parsedData.push(content);
                writeToFile(file, parsedData);
            }
        })
    }
    readAndAppend(req.body, "./db/db.json");

    let notePost = {
        body: req.body
    }
    res.json(notePost);
});


// DELETE note by by filtering out unique ID and rewriting file.
notes.delete("/api/notes/:id", (req, res) => {
    // console.log(req.params.id);
    let currentId = req.params.id;

    function readRemoveRewrite(content, file) {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            }
            else {
                let parsed = JSON.parse(data);
                let sansCurrentId = parsed.filter(note => note.id !== currentId);
                writeToFile(file, sansCurrentId);
                res.json(sansCurrentId);
            }
        })
    }
    readRemoveRewrite(req.body, "./db/db.json");

});


module.exports = notes
