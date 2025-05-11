import { Server as socketIo } from 'socket.io';
// import { WebSocketServer } from 'ws'; // Import WebSocketServer for Node.js environments

import User from './models/user.model.js'
import Driver from './models/driver.model.js'

let io;

function initializeSocket(server) {
    io =new socketIo(server, {
        cors: {
            origin: process.env.CORS_ORIGIN, // Ensure this matches the frontend's URL
            methods: ['GET', 'POST'],
            credentials: true // Ensure credentials are supported
        },
        transports: ['websocket', 'polling'], // Explicitly specify transports
        path: '/socket.io', // Ensure the path matches the frontend's Socket.IO configuration
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`); // Log when a client connects

        socket.on('join', async (data) => {
            console.log('Join event received:', data); // Log the join event
            try {
                const { userId, userType } = data;

                if (userType === 'user') {
                    await User.findByIdAndUpdate(userId, { socketId: socket.id });
                } else if (userType === 'driver') {
                    await Driver.findByIdAndUpdate(userId, { socketId: socket.id });
                }
            } catch (error) {
                console.error('Error in join handler:', error);
                socket.emit('error', { message: 'Server error in join event' });
            }
        });

        socket.on('update-location-driver', async (data) => {
            try {
                const { userId, location } = data;

                if (!location || !location.ltd || !location.lng) {
                    return socket.emit('error', { message: 'Invalid Location Data' });
                }

                await Driver.findByIdAndUpdate(userId, {
                    location: {
                        ltd: location.ltd,
                        lng: location.lng
                    }
                });
            } catch (error) {
                console.error('Error in update-location-driver handler:', error);
                socket.emit('error', { message: 'Server error in location update' });
            }
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`); // Log when a client disconnects
            // optionally clean up the socketId in DB here if needed
        });
    });

}


const sendMessageToSocketId = (socketId, messageObject) => {
    console.log(messageObject);

    if (io) {
        io.to(socketId).emit(messageObject.event, messageObject.data)
    } else {
        console.log("Socket.io not initialized.");
    }
}

export {
    initializeSocket,
    sendMessageToSocketId
}

/*
sendMessageToSocketId ---> used for
Utility function to send a custom message to a specific connected client by their socketId.

Example usage: notify a user when a captain is nearby.


*/
