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
    // promisifies it so that action is only taken when all the body has been received.
    readFromFile("./db/db.json").then((data) => {
        let parsed = JSON.parse(data) // parses data to JSON object.
        res.json(parsed[req.params.id]) // returns only the object with uuid that you had just selected.
    })
});


// POST notes and given them unique IDs
notes.post('/api/notes', (req, res) => {

    req.body.id = uuidv4();  // Adds the uuid to each object in the note array here.

    function readAppendRewrite(content, file) {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                console.error(err); // Error checking
            }
            else {
                let parsed = JSON.parse(data); // parses data to JSON object.
                parsed.push(content); // pushes the new req.body to the JSON object.
                writeToFile(file, parsed);  // Rewrites the database file with the new object.
            }
        })
    }
    readAppendRewrite(req.body, "./db/db.json"); // invokes function with passed values

    let notePost = {
        body: req.body
    }
    res.json(notePost); // hmmmm, could put inside readAppendRewrite???
});


// DELETE note by by filtering out unique ID and rewriting file.               // how is delete different from post? I am technically using this wrong?
notes.delete("/api/notes/:id", (req, res) => {

    let currentId = req.params.id; // Preps for filtering out this ID

    function readRemoveRewrite(content, file) {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            }
            else {
                let parsed = JSON.parse(data); // parses data to JSON object.
                let sansCurrentId = parsed.filter(note => note.id !== currentId); // Now that it is in a JSON obj, we filter out the currentId.
                writeToFile(file, sansCurrentId); // Rewrites the database file with the new object.
                res.json(sansCurrentId);
            }
        })
    }
    readRemoveRewrite(req.body, "./db/db.json"); // invokes function with passed values

});


module.exports = notes
