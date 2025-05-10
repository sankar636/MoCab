import { Server as socketIo } from 'socket.io';
// Or we can import const { Server } = require('socket.io');

import User from './models/user.model.js'
import Driver from './models/driver.model.js'

let io;

function initializeSocket(server) {
    io = socketIo(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        // socket is like user let you are a user or driver in this MoCab App then you are a socket and similarly other user are socket
        socket.on('join', async (data) => {
            const { userId, userType } = data;

            if(userType === 'user'){
                await User.findByIdAndUpdate(userId, {socketId: socket.id}); // this will update the socket id of user . this id flutuate every tyme refresh
            } else if(userType === 'driver'){
                await Driver.findByIdAndUpdate(userId, {socketId: socket.id})
            }
        })

        socket.on('update-location-driver', async (data) => {
            const {userId, location} = data;
            if(!location || !location.ltd || !location.lng){
                return socket.emit('error', {message: 'Invalid Location Data'})
            }

            await Driver.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }
            })
        })

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
            
        })
    })
}


const sendMessageToSocketId = (socketId, messageObject) => {
    console.log(messageObject);
    
    if(io){
        io.to(socketId).emit(messageObject.event, messageObject.data)
    }else{
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
