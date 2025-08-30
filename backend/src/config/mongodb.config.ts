import mongoose from 'mongoose'
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/alumniDB"
export const connectDB = async ()=>{
    try{
        await mongoose.connect(MONGO_URI)
        console.log("connected to mongodb")
    }catch(error){
        console.log("mongodb connection failed: ", error);
        process.exit(1);
    }
}