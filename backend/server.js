const express = require('express');
const { createServer } = require('node:http');
const { join } = require('path'); 
const app = express();
const server = createServer(app);
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '../frontend/index.html');
});

server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});

app.use('/frontend', express.static('frontend'));