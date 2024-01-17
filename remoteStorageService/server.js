const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 4000;

app.get('/log/:folder/:file', (req, res) => {
    const folder = req.params.folder;
    const file = req.params.file;
    const filePath = path.join(__dirname, 'data', folder, file);
    if(!fs.existsSync(filePath)) {
        res.send("");
        res.end();
        return;
    }
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(data);
        }
    });
});

app.listen(port, () => {
    console.log(`Remote Storage Service is running on port ${port}`);
});
