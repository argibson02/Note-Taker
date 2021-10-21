const notes = require('express').Router();
const util = require('util');
const fs = require('fs');

// import of uuid (unique id tool)
const { v4: uuidv4 } = require('uuid');

const readFromFile = util.promisify(fs.readFile);


// GET notes saved on db.json
notes.get("/api/notes", (req, res) => {
    console.log("get request hit");
    // promisifies it so that action is only taken when all the body has been received 
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));    
});

// need to add id
// notes.get("/api/notes/:id", (req, res) => {
//     console.log("id get request hit");
//     // promisifies it so that action is only taken when all the body has been received 
//     readFromFile("./db/db.json").then((data) => {
//         let parsed = JSON.parse(data)
//         res.json(parsed[req.params.id])   
//     })
// });




notes.post('/api/notes', (req, res) => {
    req.body.id = uuidv4();

    function writeToFile(destination, content) {
    fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
      err ? console.error(err) : console.info(`\nData written to ${destination}`)
    )};

    function readAndAppend(content, file) {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            }
            else {
                const parsedData = JSON.parse(data);
                parsedData.push(content);
                writeToFile(file, parsedData);
            }
        })
    }
    readAndAppend(req.body, "./db/db.json");

    console.log(req.body);
    const notePost = {
        body: req.body
    }
    res.json(notePost);
});


module.exports = notes
