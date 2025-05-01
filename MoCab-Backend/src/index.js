import connectDataBase from "./db/index.js";
import {app} from './app.js'

// configure dotenv
import dotenv from "dotenv";
dotenv.config({
    path: './.env'
});

connectDataBase()
.then(() => { 
    app.listen(process.env.PORT || 5000 , () => {
        console.log(`MongoDB connected on port ${process.env.PORT}`);
    })
}).catch((error) => {
    console.log("MongoDB connection faild ",error);
    
})


