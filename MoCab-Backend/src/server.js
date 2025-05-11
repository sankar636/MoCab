// const http = require('http');
import http from 'http'
import{ app }  from './app.js'
import { initializeSocket } from './socket.js';



const port = process.env.PORT || 5000;
console.log(port);
const server = http.createServer(app);

initializeSocket(server);

// Remove this block to avoid conflict
// app.get('/', (req, res) => {
//     res.send('<h1>Hello world</h1>');
// });

server.listen(port, (err) => {
    if (err) {
        console.error('Error starting the server:', err);
        return;
    }
    console.log(`Server is running on port ${port}`);
});

// server.listen(port, () => {
//     console.log(port);
//     console.log(`Server is running on port ${port}`);
// });

/*
io = socketIo(server, {
    cors: {
        origin: ['http://localhost:3000', 'https://your-production-site.com'],
        methods: ['GET', 'POST']
    }
});
*/