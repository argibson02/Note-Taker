const express = require('express');
const notes = require('express').Router();
const db = require('../db/db.json')
const path = require('path');
const util = require('util');
const fs = require('fs');

// import of uuid (unique id tool)
const { v4: uuidv4 } = require('uuid');
uuidv4();


// GET notes saved on db.json
notes.get("/api/notes", (req, res) => {
    console.log("get request hit");
    // promisifies it so that action is only taken when all the body has been received 
    util.promisify(fs.readFile('../db/db.json', null, 1))
    .then((data) => require.json(JSON.parse(data)));
    console.log(data);
})








module.exports = notes