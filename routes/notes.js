const notes = require('express').Router();
const fs = require('fs');
const uuid = require('../helpers/uuid');

const { readAndAppend, readFromFile } = require('../helpers/fsUtils');

notes.get('/', (req, res) => {
    console.info(`${req.method} request made for api/notes!!!!!!!!`);

    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

notes.post('/', (req, res) => {
    console.info(`${req.method} request made for api/notes!!!!!!!!`);

    const { title, text } = req.body;
    
    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        readAndAppend(newNote, './db/db.json');

        const response = {
            status: 'success', 
            body: newNote,
            
        };

        res.json(response);
    } else {
        res.json('Error in posting feedback');        
    }
    
    
})
module.exports = notes;