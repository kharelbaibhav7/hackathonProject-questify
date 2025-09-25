import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
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
    age: {
      type: Number,
      required: [true, "Please enter your age"],
    },
    profession: {
      type: String,
      required: [true, "Please enter your profession"],
    },
    score: {
      type: Number,
      default: 0,
    },
    majorProblem: {
      type: String,
    },
    stutterLevel: {
      type: Number,
      default: 0,
    },
    journals: {
      type: [String],
      default: ["Today, I signed up here"],
    },
    gratitude: {
      type: [String],
      default: ["I'm grateful to be a part of this app"],
    },
    meditation: {
      type: [Number],
      default: [0],
    },
    myTomorrow: {
      type: [String],
      default: [],
    },
    timeSpent: {
      type: Number,
      default: 0,
    },
    additionalDescription: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified("password")) {
    return next();
  }

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
