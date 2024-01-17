// src/server.js

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const RemoteStorage = require('./RemoteStorage');
const LogSearch = require('./LogSearch');

const app = express();
const port = process.env.PORT || 3000;

const storage = new RemoteStorage();
const logSearch = new LogSearch(storage);

app.use(bodyParser.json());

app.get('/log/search', async (req, res) => {
    const { searchKeyword, from, to } = req.query; // Use req.query to get parameters from the query string.

    try {
        const result = await logSearch.search(searchKeyword, new Date(from), new Date(to));
        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// actual call to check output, above api also can be hit
setTimeout(async () => {
    console.log(await logSearch.search("Database", new Date("2023-11-25T00:00:00"), new Date("2023-11-26T08:00:00")))
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


module.exports = app;


