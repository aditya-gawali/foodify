import mongoose from "mongoose";

export const connectDB= async ()=>{
    await mongoose.connect('mongodb+srv://root:root123@cluster0.fo0r8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("DB Connected"))
}