const express = require('express');
const { createServer } = require('node:http');
const cors = require('cors'); 
const { Server } = require('socket.io');

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    }
});

const rooms = new Map();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend server is running');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

io.on('connection', (socket) => {
    console.log('User connected', socket.id);

    socket.on('join_room', (roomID) => {
        socket.join(roomID);
        console.log(`User: ${socket.id} joined room: ${roomID}`);

        if (rooms.has(roomID)) {
        if (io.sockets.adapter.rooms.get(roomID).size > 1) {
            socket.emit('syncCanvas', rooms.get(roomID));
        }}
        else {
            rooms.set(roomID, []);
        }
    });

    socket.on('drawing', (data) => {
        const {roomID, offsetX, offsetY} = data;
        
        if (!rooms.has(roomID)) {
            rooms.set(roomID, []);
        }

        rooms.get(roomID).push({offsetX, offsetY});
        socket.to(roomID).emit('drawing', data);
    });

    socket.on('clearCanvas', (roomID) => {
        rooms.set(roomID, []);
        socket.to(roomID).emit('clearCanvas');
    });
    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
    });
});

io.on('connect_error', (err) => {
    console.error('WebSocket connection error:', err);
});