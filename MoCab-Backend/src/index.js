import connectDataBase from "./db/index.js";
import {app} from './app.js'

// configure dotenv
import dotenv from "dotenv";
dotenv.config({
    path: './.env'
});

import './server.js'; // Import server.js to initialize the server

connectDataBase()
    .then(() => {
        console.log("Database connected successfully.");
    })
    .catch((error) => {
        console.log("MongoDB connection failed", error);
    });