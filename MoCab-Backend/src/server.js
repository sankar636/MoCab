// const http = require('http');
import http from 'http'
import app from './app.js'
import { initializeSocket } from './socket.js';
const port = process.env.PORT || 3000;

const server = http.createServer(app);

initializeSocket(server);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

/*
io = socketIo(server, {
    cors: {
        origin: ['http://localhost:3000', 'https://your-production-site.com'],
        methods: ['GET', 'POST']
    }
});
*/