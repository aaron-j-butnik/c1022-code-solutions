const dataJSON = require('./data.json');
const express = require('express');
const fs = require('fs');
const app = express();

app.get('/api/notes', (req, res) => {
  const notes = [];
  for (const prop in dataJSON.notes) {
    notes.push(dataJSON.notes[prop]);
  }
  res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  if (id < 0) {
    res.status(400).json({ error: 'id must be a positive integer' });
  } else if (dataJSON.notes[id] === undefined) {
    res.status(404).json({ error: `cannot find note with id ${id}` });
  } else {
    res.status(200).json(dataJSON.notes[id]);
  }
});

app.use(express.json());

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  const id = dataJSON.nextId;
  dataJSON.nextId++;
  newNote.id = id;
  dataJSON.notes[id] = newNote;

  if (!newNote.content) {
    res.status(400).json({ error: 'Content is a required field.' });
  } else {
    const createdNote = JSON.stringify(dataJSON, null, 2);
    fs.writeFile('data.json', createdNote, err => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'An unexpected error occurred.' });
      }
      res.status(201).json(dataJSON.notes[id]);
    });
  }
});

app.listen(3000, () => {
  //  eslint-disable-next-line no-console
  console.log('Listening on port 3000');
});
