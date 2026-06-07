const http = require('http');
const path = require('path');
const express = require('express');

const PORT = 3000;  

const app = express();

app.use('/public', express.static('public'));

app.get('/index', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, "index.html"));
});

const server = http.createServer(app);

async function startServer() {    
    server.listen(PORT, () => {
        console.log(`Listening on PORT ${PORT}...`);
    });
}

startServer();