import { bookAppointment, cancelAppointment, listAppointment, LoginUser, registerUser} from "../controllers/userController.js";
import express from 'express';
import authAdmin from "../middlewares/authAdmin.js";
import authUser from "../middlewares/authUser.js";
import { appointmentModel } from "../models/appointmentModel.js";

const userRoute = express.Router();
userRoute.post('/register',registerUser)
userRoute.post('/login',LoginUser)
userRoute.post('/book-appointment',authUser,bookAppointment)
userRoute.get('/list-appointment',authUser,listAppointment)
userRoute.post('/cancel-appointment',authUser,cancelAppointment)
export {userRoute}