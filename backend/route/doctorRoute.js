import express from 'express';
import { doctorAppointments, doctorList, doctorLogin } from '../controllers/doctorController.js';
const doctorRouter = express.Router();

doctorRouter.get('/list',doctorList);
doctorRouter.post('/login',doctorLogin);
doctorRouter.post('/appointments',doctorAppointments);

export default doctorRouter