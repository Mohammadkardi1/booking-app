import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoute from './routes/auth.js'
import hotelsRoute from './routes/hotels.js'
import roomsRoute from './routes/rooms.js'
import usersRoute from './routes/users.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
dotenv.config()


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log("connected to mongoDB")
    } catch (error) {
        throw error 
    }
}

// app.get('/', (req, res) => {
//     res.status(500).send("Home endpoint")
// })

// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
//   });

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!")
})
 
// middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/hotels', hotelsRoute)
app.use('/api/rooms', roomsRoute)
app.use('/api/users', usersRoute)


// To handle error
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500; 
    const errorMessage = "Something went wrong (the next method is executed)"

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage, 
        stack: err.stack
    })
})

app.listen(8000, () => {
    connect()
    console.log("Connected to backed...")
})