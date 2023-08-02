const notes = require('express').Router();
const fs = require('fs');
const uuid = require('../helpers/uuid');


// GET: /api/notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request made for api/notes!!!!!!!!`);

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        res.json(JSON.parse(data))
    })
})

// POST: /api/notes
notes.post('/', (req, res) => {
    console.info(`${req.method} request made for api/notes!!!!!!!!`);

    const { title, text } = req.body;
   

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuid(),
        };

        

        fs.readFile('./db/db.json', 'utf8', (error, data) => {
           const result = JSON.parse(data);
            result.push(newNote);
           fs.writeFile('./db/db.json', JSON.stringify(result), (err, data) => {
            res.json(result);
           } )
        })
    }

})

notes.delete(`/:id`, (req, res) => {
    console.info(`${req.method} request made for api/notes!!!!!!!!`);

    const noteId = req.params.id;

    fs.readFile('./db/db.json','utf8', (err, data) => { 

        const array = JSON.parse(data);
        const newArray = array.filter((obj) => {
            return obj.id !== noteId;
        })

        console.log(newArray);
        // res.json(newArray) 
        fs.writeFile('./db/db.json', JSON.stringify(newArray), (err) => {
            res.json(newArray);
        });
    })

    //fs.readFile --> string
    //parse string into array
    //req.params to identify index
    //.filter out index
    //convert back into string
    //fs.writeFile

})

module.exports = notes;