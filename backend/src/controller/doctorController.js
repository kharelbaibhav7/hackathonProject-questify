import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import Doctor from "../models/doctorModel.js";
import { secretKey } from "../constant/constant.js";
import User from "../models/userModel.js";

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, secretKey, {
    expiresIn: "30d",
  });
};

// @desc    Register a new doctor
// @route   POST /api/doctors
// @access  Public
const createDoctorController = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    contactNumber,
    qualification,
    speciality,
    bio,
  } = req.body;

  const image = req.file ? `/uploads/${req.file.filename}` : null;

  const doctorExists = await Doctor.findOne({ email });

  if (doctorExists) {
    res.status(400);
    throw new Error("Doctor already exists");
  }

  const doctor = await Doctor.create({
    name,
    email,
    password,
    contactNumber,
    image,
    speciality,
    qualification,
    bio,
  });

  if (doctor) {
    res.status(201).json({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      contactNumber: doctor.contactNumber,
      qualification: doctor.qualification,
      patients: doctor.patients,
      speciality: doctor.speciality,
      image: doctor.image,
      bio: doctor.bio,
      createdAt: doctor.createdAt,
      updatedAt: doctor.updatedAt,
    });
  } else {
    res.status(400);
    throw new Error("Invalid doctor data");
  }
});

// @desc    Authenticate doctor and get token
// @route   POST /api/doctors/login
// @access  Public
const loginDoctorController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const doctor = await Doctor.findOne({ email }).select("+password");

  if (doctor && (await doctor.matchPassword(password))) {
    res.json({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      contactNumber: doctor.contactNumber,
      qualification: doctor.qualification,
      patients: doctor.patients,
      createdAt: doctor.createdAt,
      updatedAt: doctor.updatedAt,
      token: generateToken(doctor._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const getAllDoctors = asyncHandler(async (req, res) => {
  const doctors = await Doctor.find({}).populate("name", "speciality");
  res.json(doctors);
});

const getDoctorById = asyncHandler(async (req, res) => {
  const doctor = await Doctor.findById(req.params.id).populate(
    "name",
    "fullName"
  );

  if (doctor) {
    res.json(doctor);
  } else {
    res.status(404);
    throw new Error("Doctor not found");
  }
});

const addPatient = asyncHandler(async (req, res) => {
  const { patientId } = req.body;

  const doctor = await Doctor.findById(req.params.id);

  if (doctor) {
    doctor.patients.push(patientId);
    await doctor.save();
    res.json({ message: "Patient added" });
  } else {
    res.status(404);
    throw new Error("Doctor not found");
  }
});

const bookAppointment = asyncHandler(async (req, res) => {
  let doctorId = req.params.id;
  let doctor = await Doctor.findById(doctorId);
  // console.log(doctor);
  let addPatient = await Doctor.findByIdAndUpdate(doctorId, {
    $push: { patients: req.user._id },
  });
  res.json(await Doctor.findById(doctorId));
});

export {
  createDoctorController,
  loginDoctorController,
  getAllDoctors,
  getDoctorById,
  addPatient,
  bookAppointment,
};

// import asyncHandler from "express-async-handler";
// import Doctor from "../models/doctorModel.js";

// // @desc    Register a new doctor
// // @route   POST /api/doctors
// // @access  Public
// const createDoctorController = asyncHandler(async (req, res) => {
//   const { name, email, password, contactNumber, qualification } = req.body;

//   const doctorExists = await Doctor.findOne({ email });

//   if (doctorExists) {
//     res.status(400);
//     throw new Error("Doctor already exists");
//   }

//   const doctor = await Doctor.create({
//     name,
//     email,
//     password,
//     contactNumber,
//     qualification,
//   });

//   if (doctor) {
//     res.status(201).json({
//       _id: doctor._id,
//       name: doctor.name,
//       email: doctor.email,
//       contactNumber: doctor.contactNumber,
//       qualification: doctor.qualification,
//       patients: doctor.patients,
//       createdAt: doctor.createdAt,
//       updatedAt: doctor.updatedAt,
//     });
//   } else {
//     res.status(400);
//     throw new Error("Invalid doctor data");
//   }
// });

// export { createDoctorController };
