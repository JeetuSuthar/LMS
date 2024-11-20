import express from "express"
import dotenv from "dotenv"
import connectDB from "./database/db.js"
import userRoute from "./routes/user.route.js"
import  cookieParser from "cookie-parser"
import cors from "cors"
dotenv.config({});
//call db connection
connectDB();
const app=express();
app.use(express.json());
const PORT=process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:8080",
    credentials:true
}))

app.use("/api/v1/user",userRoute);

app.get("/home",(req,res)=>{
    res.status(200).json({
        success:true,
        msg:"Hello Node"
    })
})

app.listen(PORT,()=>{
console.log(`Server is listening at ${PORT}`)
})