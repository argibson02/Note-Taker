// General Express declarations and requires
const express = require('express');
const routerApp = require("express").Router();

// Loop in the notes API by requiring it
const notesApiRouter = require("./api-route");

// Set the URL route to look for /notes to access the notes API
routerApp.use("/notes", notesApiRouter);

// Export this
module.exports = routerApp;

