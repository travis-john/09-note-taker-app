// GLOBAL VARIABLES
const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const fs = require('fs');
const util = require('util');
const app = express();
const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

// DEFINING PORT AND ALLOWING FOR HEROKU'S PORT
const PORT = process.env.PORT || 3000;

// CONFIGURING EXPRESS
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//DEFINING FROM WHERE STATIC FILES ARE SERVED
app.use(express.static(path.join(__dirname, 'public')));

//ROUTES
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

//STARTING SERVER
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
