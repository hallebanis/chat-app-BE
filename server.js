import express from 'express'
import dotenv from 'dotenv'
import authRoutes from './routes/authRoutes.js'
import { connectDb } from './db/dbConnector.js'
import cors from 'cors'

const app = express()
const PORT = process.env.APP_PORT || 5000

dotenv.config()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)

app.get('/', (_, res) => {
    res.send('serveris running!')
})


app.listen(PORT, () => { 
    console.log('server is runnin on PORT:', PORT) 
connectDb()
})