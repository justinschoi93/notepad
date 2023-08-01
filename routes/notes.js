const notes = require('express').Router();
const fs = require('fs');

const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
    console.info(`${req.method} request made for api/notes!!!!!!!!`);

    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

notes.post('/', (req, res) => {
    console.info(`${req.method} request made for api/notes!!!!!!!!`);

    const { title, text } = req.body;
    

    const newNote = {
        title,
        text,
    }
    // readAndAppend(newNote, './db/db.json');
    
})
module.exports = notes;