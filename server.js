import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/authRoutes.js'
import { connectDb } from './db/dbConnector.js'
import cors from 'cors'
import messageRoutes from './routes/messageRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express()
const PORT = process.env.APP_PORT || 5000

dotenv.config()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/users', userRoutes)

app.get('/', (_, res) => {
    res.send('serveris running!')
})


app.listen(PORT, () => { 
    console.log('server is runnin on PORT:', PORT) 
connectDb()
})