import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Mongo connected")
    }catch(err){
        console.log("error occured",err)
    }
}

export default connectDB;
