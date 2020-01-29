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
app.use(express.urlencoded({
  extended: true;
}));
app.use(express.json);

//STARTING SERVER
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
