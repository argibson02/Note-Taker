const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = 3001;
// const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));