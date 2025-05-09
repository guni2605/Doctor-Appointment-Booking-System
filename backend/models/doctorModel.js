import mongoose from "mongoose"
const doctorSchema = mongoose.Schema(
  {
    name:{
      type : String,
      required:true
    },
    email:{
      type : String,
      unique: true,
      required:true
    }
    ,password:{
      type : String,
      required:true
    },
    image:{
      type : String,
      required:true
    },
    speciality:{
      type:String,
      required:true
    },
    degree:{
     type:String,
     required:true
    },
    experience:{
      type:String,
      required:true
    },
    about:{
      type:String,
      required:true
    },available:{
      type:Boolean,
      required:true,
      default:true
    },
    fees:{
      type:Number,
      required:true
    },
    address:{
     type:Object,
     required:true
    },
    date:{
      type:Number,
      required:true
    },
    slots_booked:{
      type:Object,
      default:{}
    }

  },{minimize:false} // to avoid removal of empty object data spcae

)
const doctorModel = mongoose.model.doctor || mongoose.model("doctor",doctorSchema);
export default doctorModel;