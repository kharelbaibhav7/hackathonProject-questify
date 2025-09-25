import mongoose from "mongoose";
import { dbUrl } from "../constant/constant.js";

const connectToMongoDb = async () => {
  try {
    // console.log(dbUrl) 
    await mongoose.connect(dbUrl, {
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    });
    console.log("Application is connected to database successfully...");
  } catch (error) {
    console.log("MongoDB connection error:", error.message);
    console.log(
      "Please check your MongoDB Atlas configuration and network access settings."
    );
  }
};
export default connectToMongoDb;
