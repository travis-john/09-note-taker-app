// GLOBAL VARIABLES
const express = require('express'),
      path = require('path'),
      db = require('./db/db.json'),
      fs = require('fs'),
      util = require('util'),
      app = express(),
      writeFile = util.promisify(fs.writeFile),
      readFile = util.promisify(fs.readFile);

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

//GETTING AND PARSING THE NOTES JSON FILE
app.get('/api/notes', (req,res) => {
  readFile('./db/db.json', 'utf-8').then(function(data){
    // console.log(data);
    data = JSON.parse(data);
    return res.json(data);
  });
});

//WRITING NEW NOTES TO DB.JSON
app.post('/api/notes', (req, res) => {

  let newNote = req.body;

  //READING BEFORE ADDING NEW NOTE TO DB.JSON
  readFile('./db/db.json', 'utf-8').then(function(data) {

    //PARSING JSON
    data = JSON.parse(data);

    //PUSHING NEW NOTE TO DB.JSON
    data.push(newNote);

    //APPENDING THE NEW NOTE TO THE DB.JSON
    data[data.length - 1].id = data.length - 1;

    //WRITING NEW DB.JSON FILE AFTER THE NEW NOTE HAS BEEN ADDED TO THE ARRAY
    writeFile('./db/db.json', JSON.stringify(data));
  });

  //CONFIRMING THAT NEW NOTE HAS BEEN CREATED
  res.send('created new note');
});

//DELETING NOTES FROM APP
app.delete('/api/notes/:id', (req, res) =>{

  let id = req.params.id;
  console.log(id);

  //READING JSON FILE
  readFile('./db/db.json', 'utf-8').then(function(data){

    //TURNING OBJECT TO STRING
    data = JSON.parse(data);

    //SPLICE TO REMOVE SPECIFIC NOTE
    data.splice(id, 1);

    //LOOPING THROUGH ARRAY TO RESET ID
    for(let i = 0; i < data.length; i++){
      data[i].id = i;
    }

    //WRITING FILE WITH UPDATED CHANGES
    writeFile('./db/db.json', JSON.stringify(data));
  })

  res.send('deleted')
})


//STARTING SERVER
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
