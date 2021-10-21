const notes = require('express').Router();
const util = require('util');
const fs = require('fs');

// import of uuid (unique id tool)
const { v4: uuidv4 } = require('uuid');
// uuidv4();

console.log("3");
// GET notes saved on db.json
notes.get("/api/notes", (req, res) => {
    console.log("get request hit");
    // promisifies it so that action is only taken when all the body has been received 
    const readFromFile = util.promisify(fs.readFile);
    readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});


notes.post('/', (req, res) => {
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