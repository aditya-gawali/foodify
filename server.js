import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import cartRouter from "./routes/cartRoute.js"


import dotenv from 'dotenv';
dotenv.config(); // Ensure this is at the very top
const app = express()
const port = 4003

app.use(express.json())
app.use(cors())

// DB  Connection
connectDB();


// api endpoint
app.use("/api/cart", cartRouter)

app.get("/api/cart", (req, res) => {
    res.send("cart service API is Working ")
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})

