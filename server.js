import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"


import dotenv from 'dotenv';
dotenv.config(); // Ensure this is at the very top
const app = express()
const port = 4001

app.use(express.json())
app.use(cors())

// DB  Connection
connectDB();


// api endpoint
app.use("/api/user", userRouter)


app.get("/api/user", (req, res) => {
    res.send("User API is Working ")
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})

