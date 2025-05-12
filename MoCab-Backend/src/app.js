import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
// import router from './routes/user.routes.js'
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN, // Ensure this matches the frontend's URL
    credentials: true // Allow credentials (cookies, headers)
}))

// const allowedOrigins = [
//     'http://localhost:5173',
//     'https://xvr7b560-5173.inc1.devtunnels.ms/', // for Codespaces
//     'http://localhost:5000', // if using forwarded port in VS Code
//     // Add more if needed
//   ];
  
//   app.use(cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.preview.app.github.dev')) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     credentials: true // if you're using cookies or authorization headers
//   }));

app.use(express.json({
    limit:"50kb"
}))

app.use(express.urlencoded({
    extended:true,
    limit: "16kb"
}))

app.use(express.static("public"))

app.use(cookieParser())

// app.get('/', (req, res) => {
//         res.send('<h1>Hello world</h1>');
//     });

import userRouter from './routes/user.routes.js'
// routes declaration user
app.use('/user', userRouter)

import driverRouter from './routes/driver.routes.js'
//routes declaration for driver
app.use('/driver',driverRouter)
//Routes decclaration of map
import mapRouter from './routes/map.routes.js'
app.use('/map',mapRouter)

// router Declaration of Rides
import rideRouter from './routes/rides.routes.js'
app.use('/ride',rideRouter)


export { app }