import express from "express";
import {
  bookAppointment,
  createDoctorController,
  getAllDoctors,
  getDoctorById,
  loginDoctorController,
} from "../controller/doctorController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const doctorRouter = express.Router();

// @route   POST /api/doctors
// @desc    Register a new doctor
// @access  Public
doctorRouter.post("/", upload.single("image"), createDoctorController);
doctorRouter.post("/login", loginDoctorController);
doctorRouter.post("/appoint/:id", protect, bookAppointment);
doctorRouter.get("/", getAllDoctors);
doctorRouter.get("/:id", getDoctorById);

export default doctorRouter;
