import mongoose from "mongoose";
import bcrypt from "bcrypt";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: 6,
      select: false,
    },
    contactNumber: {
      type: String,
      required: [true, "Please enter your contact number"],
    },
    qualification: {
      type: String,
      required: [true, "Please enter your qualification"],
    },
    speciality: {
      type: String,
      required: [true, "Please enter your speciality"],
    },
    image: {
      type: String,
      // required: [true, "Please enter your image"],
    },
    bio: {
      type: String,
    },
    patients: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password using bcrypt
doctorSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) {
    return next();
  }

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare entered password with hashed password
doctorSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Doctor = mongoose.model("Doctor", doctorSchema);

export default Doctor;

// import mongoose from "mongoose";
// import bcrypt from "bcrypt";

// const doctorSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Please enter your name"],
//     },
//     email: {
//       type: String,
//       required: [true, "Please enter your email"],
//       unique: true,
//       match: [
//         /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
//         "Please add a valid email",
//       ],
//     },
//     password: {
//       type: String,
//       required: [true, "Please enter your password"],
//       minlength: 6,
//       select: false,
//     },
//     contactNumber: {
//       type: String,
//       required: [true, "Please enter your contact number"],
//       match: [/^\d{10}$/, "Please add a valid contact number"],
//     },
//     qualification: {
//       type: String,
//       required: [true, "Please enter your qualification"],
//     },
//     patients: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Patient",
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   }
// );

// // Encrypt password using bcrypt
// doctorSchema.pre("save", async function (next) {
//   // Only run this function if password was actually modified
//   if (!this.isModified("password")) {
//     return next();
//   }

//   // Hash the password with cost of 12
//   this.password = await bcrypt.hash(this.password, 12);
//   next();
// });

// const Doctor = mongoose.model("Doctor", doctorSchema);

// export default Doctor;
