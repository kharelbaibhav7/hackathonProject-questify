import express from "express";
import readingExerciseController from "../controller/readingExerciseController.js";

const aiReadingRouter = express.Router();

aiReadingRouter.post("/", readingExerciseController);

export default aiReadingRouter;
