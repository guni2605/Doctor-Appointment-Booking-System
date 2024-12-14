import validator from "validator";
import bcrypt from 'bcrypt'
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken"
import doctorModel from "../models/doctorModel.js";
import { appointmentModel } from "../models/appointmentModel.js";
const registerUser = async(req,res)=>{
    try{
       const {name,email,password} = req.body;
       if(!name || !password || !email){
        return res.json({
          success:false,
          message:"Missing Deails"
        })
       }
       if(!validator.isEmail(email)){
        return res.json({
          success:false,
          message:"enter a valid email"
        })
       }
       if(password.length < 8){
        return res.json({
          success:false,
          message:"Use a strong password"
        })
       }
       const salt = await bcrypt.genSalt(10)
       const hashedPassword = await bcrypt.hash(password,salt);
       const userData = {
        name,
        password:hashedPassword,
        email
       }
       const newUser = new userModel(userData);
       const user = newUser.save()

       const token = jwt.sign({id:user._id,},
        process.env.JWT_TOKEN,

       )
       res.json({success:true,
        token
       })

    }catch(error){
       res.json({
        success:false,
        message:error.message
       })
    }
}
const LoginUser = async(req,res)=>{
  try {
    const {email,password} = req.body;
    const user = await userModel.findOne({email})
    if(!user){
     return  res.json({succes:false, message:"user not found"})
    }
    const isMatch = bcrypt.compare(password,user.password)
    if(isMatch){
      const token = jwt.sign({id:user._id},process.env.JWT_TOKEN)
      res.json({
        success:true,
        token
      })
    }else{
      res.json({success:false,
        message:"invalid credentials"
      })
    }
  } catch (error) {
    res.json({success:false,
      message:error.message
    })
  }
}
// api to book appointment
const bookAppointment = async(req,res)=>{
  try{
    const {docId,userId,slotDate,slotTime} = req.body
    console.log(docId,userId,slotDate,slotTime)
    const docData = await doctorModel.findById(docId).select("-password")
    if(!docData.available){
      return res.json({
        success:false,
        message:"Doctor not available"
      })
    }
    let slots_booked = docData.slots_booked
    if(slots_booked[slotDate]){
      if(slots_booked[slotDate].includes(slotTime)){
        return res.json({
          success:false,
          message:"Slot not available"
        })
      }else{
        slots_booked[slotDate].push(slotTime)
      }
    }else{
      slots_booked[slotDate] = []
      slots_booked[slotDate].push(slotTime)
    }
    const userData = await userModel.findById(userId).select("-password")

    delete docData.slots_booked;
    const appointmentData = {
      userId,
      docId,
      userData,
      docData,
      amount:docData.fees,
      slotTime,
      slotDate,
      date: Date.now()
    }
    const newAppointment = new appointmentModel(appointmentData)
    await newAppointment.save()
    // save new slot data
    await doctorModel.findByIdAndUpdate(docId,{slots_booked})
    res.json({
      success:true,
      message: "appointment Booked"
    })
  }catch(error){
    res.json({success:false,
      message:error.message
    })
  }
}
const listAppointment = async(req,res)=>{
  try {
    const {userId} = req.body
    const appointments = await appointmentModel.find({userId})
    res.json({
      success:true,
      appointments
    })
  } catch (error) {
    res.json({success:false,
      message:error.message
    })
  }
}
const cancelAppointment = async(req,res)=>{
  try{
       const {userId,appointmentId} = req.body;
       const appointmentData = await appointmentModel.findById(appointmentId)
       if(appointmentData.userId != userId){
        return res.json({
          success:false,
          message:"Unauthorised action"
        })
       }
       await appointmentModel.findByIdAndUpdate(appointmentId,{cancelled:true})
       // remove slot data 
       const {docId,slotTime,slotDate} = appointmentData;
       const doctorData = await doctorModel.findById(docId)
       let slots_booked = doctorData.slots_booked
       slots_booked[slotDate] = slots_booked[slotDate].filter(e=> e !== slotTime)
       res.json({
        success:true,
        message:"Appointment cancelled"
       })
  }catch(error){
    res.json({success:false,
      message:error.message
    })
  }
}
export {registerUser,LoginUser,bookAppointment,listAppointment,cancelAppointment}
