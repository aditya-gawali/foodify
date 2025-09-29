import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import dishRouter from "./routes/dishRoute.js"

import dotenv from 'dotenv';
dotenv.config(); // Ensure this is at the very top
const app = express()
const port = 4002

app.use(express.json())
app.use(cors())

// DB  Connection
connectDB();


// api endpoint
app.use("/api/dish", dishRouter)
app.use("/images", express.static('uploads'))


app.get("/api/dish", (req, res) => {
    res.send("Dish Service API is Working ")
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})

