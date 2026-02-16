import express from 'express'
import authRoutes from './routes/authRoute.js'
import connectDB from './db/connectDB.js'
import dotenv from 'dotenv'

dotenv.config()
const app = express()

app.use(express.json())
const PORT = process.env.PORT || 5000

// Authentication Routes
app.use("/api/auth", authRoutes)


app.listen(PORT, () => {
    connectDB()
    console.log("Server running on port 5000", PORT)
})

