import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
// import router from './routes/user.routes.js'
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({
    limit:"50kb"
}))

app.use(express.urlencoded({
    extended:true,
    limit: "16kb"
}))

app.use(express.static("public"))

app.use(cookieParser())

import userRouter from './routes/user.routes.js'
// routes declaration user
app.use('/user', userRouter)

import driverRouter from './routes/driver.routes.js'
//routes dexlaration for driver
app.use('/driver',driverRouter)


export { app } 