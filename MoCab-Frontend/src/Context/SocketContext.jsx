import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const Socket = io(import.meta.env.VITE_BASE_URL, {
    withCredentials: true, // Ensure credentials are sent
    transports: ['websocket', 'polling'], // Explicitly specify transports
    path: '/socket.io', // Ensure the path matches the backend's Socket.IO configuration
});

const SocketProvider = ({ children }) => {
    useEffect(() => {
        // Basic connection logic
        Socket.on('connect', () => {
            console.log('Connected to server:', Socket.id); // Log when connected
            Socket.emit('join', { userType: 'user', userId: 'testUserId' }); // Emit a test join event
        });

        Socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        // Socket.on('error', (error) => {
        //     console.error('Socket error:', error); // Log any errors
        // });
    }, []);

    return (
        <SocketContext.Provider value={{ Socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;


// /*
// Listening to 'connection' on the client is incorrect:
// socket.on('connection', ...)  --> socket.on('connection', ...)


// */