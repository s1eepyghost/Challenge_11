const notes = require("../db/db.json");
const fs = require('fs');

module.exports = function(app) {
  app.get("/api/notes", function(req, res) {
    return res.json(notes);
  });
  app.get("/api/notes/:note", function(req, res) {
    let chosen = req.params.note;
  
    for (var i = 0; i < notes.length; i++) {
      if (chosen === notes[i].id) {
        return res.json(chosen);
      }
      else {
        return res.json(false);
      }
    }
  });

app.post("/api/notes", function(req, res) {
    for (i = 0; i < notes.length; i++) {
    var newNote = 
      { 
        title: req.body.title, 
        text: req.body.text,
        id: i
      }
    }
      
    notes.push(newNote);
    res.json(newNote);
    let notesString = JSON.stringify(notes);

    fs.writeFile("./db/db.json", notesString, function (err) {
      if (err) throw err;
      console.log('Note added!');
    });
  });

  app.delete("/api/notes/:id", function(req, res) {
    let chosen = req.params.id;
    let deleteObj = notes.find(user => user.id == chosen); 
    let deleteIndex = notes.indexOf(deleteObj); 
    notes.splice(deleteIndex,1); 
    res.send(deleteObj); 

    let notesString = JSON.stringify(notes);

    fs.writeFile("./db/db.json", notesString, function (err) {
      if (err) throw err;
      console.log('Note deleted!');
    });
  });
};