// api for adding doctors
import validator from 'validator'
import bcrypt from 'bcrypt'
import {v2 as cloudinary}  from 'cloudinary';
import doctorModel from '../models/doctorModel.js';
import jwt from "jsonwebtoken"
import { appointmentModel } from '../models/appointmentModel.js';
const addDoctor = async(req,res)=>{
    try{
       const {name,email,password,speciality,degree,about,fees,address,experience} = req.body;
       const image_file = req.file;
      // console.log({name,email,password,speciality,degree,about,fees,address,experience},image_file);
     // check for all data 
     if(!name || !email || !password || !speciality || !degree || !address || !fees || !about || !experience){
        return res.json({
            success:false,
            message:"Some details are missing"
        })
     }
   //   let cnt = 0;
   //   for(let i = 0; i< name.length; i++){
   //        if(name[i] >= 'a' && name[i] <= 'z'){

   //        }else{
   //          cnt ++;
   //        }
   //   }
   //   if(cnt > 0){
   //    return  res.json({
   //       success:false,
   //       message:"Please enter valid Name"
   //   }) 
   //   }
     if(!validator.isEmail(email)){
        return res.json({
            success:false,
            message:"Please enter valid Email"
        }) 
     }
     if(password.length < 8 ){
        return res.json({
            success:false,
            message:"Please use strong password"
        })
     }
     // encrypt the password
     const salt = await bcrypt.genSalt(10);
     const hashedpassword = await bcrypt.hash(password,salt);

     // image url 
     const imageUpload = await cloudinary.uploader.upload(image_file.path,{resource_type:'image'})
     const imageUrl = imageUpload.secure_url;
     const doctordata = {
        name,
        email,
        password:hashedpassword,
        image:imageUrl,
        speciality,
        degree,
        experience,
        about,
        fees,
        address: JSON.parse(address),
        date:Date.now()
     }
     const doctormodel = new doctorModel(doctordata);
     await doctormodel.save();
     res.json({
        success:true,
        message : "doctor added successfully"
     })
    }catch(error){
      console.log(error)
 res.send({
    success:false,
    message: "Something went wrong"
 })
    }
}
// api for sign up admin
const loginAdmin = async(req,res)=>{
    try{
      // match email and password 

       const {email,password} = req.body;
       if(email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD){
         
       }
       else{
         return res.json({
            success:false,
            message:"Not a legal admin"
         })
       }
       const token =  jwt.sign(
         email+password,
         process.env.JWT_TOKEN
       );
       res.json({
         success:true,
         token
       })
    }catch(error){
      console.log(error)
      res.send({
         success:false,
         message: "Something went wrong"
      })
    }
}
const allDoctors = async (req,res)=>{
   try {
      const doctors = await doctorModel.find({}).select("-password");
      res.json({
         success:true,
         doctors
      })
   } catch (error) {
      res.json({
         success:false,
         message:"Something went wrong"
      })
   }
}
const allAppointments = async(req,res)=>{
   try{
      const appointments = await appointmentModel.find({});
      return res.json({
         success:true,
         appointments
      })
   }
   catch(error){
     return res.json({
      success:false,
      message:error.message
     })
   }
}
export {addDoctor,loginAdmin,allDoctors,allAppointments}