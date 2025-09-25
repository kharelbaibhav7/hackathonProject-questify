import cors from "cors";
import { config } from "dotenv";
import express, { json } from "express";
import path from "path";
import { fileURLToPath } from "url";

// Load environment variables first
config();

import connectToMongoDb from "./src/connectDB/connectToMongoDB.js";
import { port } from "./src/constant/constant.js";
import errorMiddleware from "./src/middleware/errorMiddleware.js";
import aiRouter from "./src/router/aiRouter.js";
import doctorRouter from "./src/router/doctorRouter.js";
import forumRouter from "./src/router/forumRouter.js";
import aiReadingRouter from "./src/router/readingExerciseRouter.js";
import userRouter from "./src/router/userRouter.js";
import fundraisingRoutes from "./src/router/fundraisingRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "http://127.0.0.1:3000",
      "http://127.0.0.1:5173",
    ],
    credentials: true,
  })
);

// Serve static files from uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Debug middleware for uploads
app.use("/uploads", (req, res, next) => {
  console.log("Serving static file:", req.path);
  next();
});

const current_port = port || 8000;
app.listen(current_port, () => {
  console.log(`express app is listening at port ${current_port}`);
  connectToMongoDb();
});
app.use(json());
app.use("/api/users", userRouter);
app.use("/api/doctors", doctorRouter);
app.use("/api/ai-chat", aiRouter);
app.use("/api/forums", forumRouter);
app.use("/api/reading-exercises", aiReadingRouter);
app.use("/api/fundraising", fundraisingRoutes);

app.use(errorMiddleware);

// import express, { json } from 'express';
// import cors from 'cors';
// import { port } from './src/constant/constant.js';
// import errorMiddleware from './src/middleware/errorMiddleware.js';
// import connectToMongoDb from './src/connectDB/connectToMongoDB.js';
// import userRouter from './src/routes/userRouter.js'; // Import user routes

// // Initialize the Express application
// const app = express();

// // Enable Cross-Origin Resource Sharing (CORS)
// app.use(cors());

// // Parse incoming JSON requests
// app.use(json());

// // Connect to MongoDB
// connectToMongoDb();

// // Define the port to listen on
// const current_port = port || 8000;

// // Start the server and listen on the specified port
// app.listen(current_port, () => {
//   console.log(`Express app is listening at port ${current_port}`);
// });

// // Use user routes
// app.use('/api/users', userRouter);

// // Use custom error handling middleware
// app.use(errorMiddleware);
