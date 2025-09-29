import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import orderRouter from "./routes/orderRoute.js"

import dotenv from 'dotenv';
dotenv.config(); // Ensure this is at the very top
const app = express()
const port = 4004

app.use(express.json())
app.use(cors())

// DB  Connection
connectDB();


// api endpoint
app.use("/api/order", orderRouter)

app.get("/api/order", (req, res) => {
    res.send("order service API is Working ")
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})

