const express = require('express');
const api = require('./routes/index.js');
const path = require('path');
// const { clog } = require('./middleware/clog');

const PORT = process.env.port;

const app = express();

// app.use(clog);
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api', api);

app.use(express.static('public'));

app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/pages/notes.html'))
);

app.get('*', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
