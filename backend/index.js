import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import { connectDB } from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import adminRouter from "./route/adminRoute.js"
import doctorRouter from "./route/doctorRoute.js"
import { userRoute } from "./route/userRoute.js"
// app config
const app = express()
dotenv.config({
  path: "./.env"
})
connectDB()
connectCloudinary()
// middlewares
app.use(express.json())
app.use(cors({
  origin : process.env.ORIGIN
}))
// request handle
app.get('/',(req,res)=>{
  res.send("API working")
})
// admin route
app.use('/api/admin',adminRouter);
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRoute)
app.listen(process.env.PORT,()=>{
  console.log("your server is running at http://localhost:4000")
})
