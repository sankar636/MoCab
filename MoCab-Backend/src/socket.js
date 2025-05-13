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
        // console.log(`Client connected: ${socket.id}`); // Log when a client connects

        socket.on('join', async (data) => {
            console.log('Join event received:', data); // Log the join event
            try {
                const { userId, userType } = data;

                if (userType === 'user') {
                    await User.findByIdAndUpdate(userId, { socketId: socket.id });
                    console.log(`User socketId updated: ${socket.id}`);
                } else if (userType === 'driver') {
                    await Driver.findByIdAndUpdate(userId, { socketId: socket.id });
                    console.log(`Driver socketId updated: ${socket.id}`);
                }
            } catch (error) {
                console.error('Error in join handler:', error);
                socket.emit('error', { message: 'Server error in join event' });
            }
        });

        socket.on('update-location-driver', async (data) => {
            try {
                const { userId, location } = data;
        
                if (!location || typeof location.lat !== 'number' || typeof location.lng !== 'number') {
                    console.error("Invalid location data received:", location);
                    return socket.emit('error', { message: 'Invalid Location Data' });
                }
        
                console.log("Updating driver location:", { userId, location });
        
                await Driver.findByIdAndUpdate(userId, {
                    location: {
                        type: 'Point',
                        coordinates: [location.lng, location.lat] // GeoJSON requires [longitude, latitude]
                    }
                });
        
                console.log("Driver location updated successfully for userId:", userId);
        
                // Optionally confirm success
                socket.emit('location-updated', { message: 'Location updated successfully' });
        
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
    // console.log(messageObject);

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
