import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import orderRouter from "./routes/orderRoute.js"
import dishRouter from "./routes/dishRoute.js"

import dotenv from 'dotenv';
dotenv.config(); // Ensure this is at the very top
const app = express()
const port = 4000

app.use(express.json())
app.use(cors())

// DB  Connection
connectDB();


// api endpoint
app.use("/api/dish", dishRouter)
app.use("/images", express.static('uploads'))
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
    res.send("API Working ")
})

app.listen(port, () => {
    console.log(`Server Started on http://localhost:${port}`)
})

