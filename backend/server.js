const express = require('express');
const { createServer } = require('node:http');
const cors = require('cors'); 
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173/',
        methods: ['GET', 'POST']
    }
});

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend server is running');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
