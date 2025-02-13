import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken"
import {appointmentModel} from "../models/appointmentModel.js";
const changeAvailability = async(req,res)=>{
   try {
        const {docId} = req.body;
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})
        res.json({
          success:true,
          message:"availibility Change"
        })
   } catch (error) {
    console.log(error)
      res.json({
        success:false,
        message:error
      })
   }
}
const doctorList = async(req,res)=>{
  try {
    const doctors = await doctorModel.find({}).select("-password -email");
    res.json({
      success:true,
      doctors
    })
  } catch (error) {
    res.json({
      success:false,
      message:error
    })
  }
}
const doctorLogin = async (req,res)=>{
  const {email,password} = req.body;
 const doctor =  await doctorModel.findOne({email});
 //console.log(doctor)
 if(!doctor){
  return res.json({
    status:false,
    message:"No records found"
  })
 }
 const token = await jwt.sign({id : doctor._id},
  process.env.JWT_TOKEN
 )
 return res.json({
  success:true,token,id:doctor._id
 })
}
const doctorAppointments = async (req,res)=>{
 try {
  const {docId} = req.body;
  const appointments = await appointmentModel.find({docId}).select("-docData -userData.image");
  appointments.sort((a, b) => (
    a.slotDate > b.slotDate ? 1 : b.slotDate > a.slotDate ? -1 : 0));
  console.log(appointments)
  res.json({
    success:true,
    appointments
  })
 } catch (error) {
  console.log(error)
    res.json({
      success:false,
      message:error
    })
 }
}
export {changeAvailability,doctorList,doctorLogin,doctorAppointments}