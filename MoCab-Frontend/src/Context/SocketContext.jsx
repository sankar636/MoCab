import React , { useContext, useEffect } from "react";

export const SocketContext = useContext()

const baseURL = import.meta.env.VITE_BASE_URL;

const socket = io(`${baseURL}`)

const SocketContext = ({children}) => {

    useEffect(() => {
        socket.on('connection', () => {
            console.log("Connected To Server");
        })

        socket.on('disconnect', () => {
            console.log("Disconnect From Server");            
        })

    },[])

    return (
        <SocketContext.Provider value={ {socket} }>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketProvider