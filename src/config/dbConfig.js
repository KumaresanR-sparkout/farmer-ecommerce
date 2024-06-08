import mongoose from "mongoose"
import env from 'dotenv'
env.config()

export const dbConnection=async(req,res)=>{
    try{
        await mongoose.connect(process.env.MONGO)
        console.log('Database connected')
    }
    catch(error){
        console.log('Database connection error')
    }
}