import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  addGratitudeController,
  addJournalController,
  addMyTomorrowController,
  createUserController,
  descriptionController,
  getUserProfileController,
  loginUserController,
  readGratitudeController,
  readJournalController,
  updateMajorProblemController,
  updateStutterLevelController,
  updateUserScoreController,
} from "../controller/userController.js";

const userRouter = express.Router();

// Route for user registration
userRouter.post("/", createUserController);
userRouter.post("/details", protect, descriptionController);

// Route for getting user profile
userRouter.get("/profile", protect, getUserProfileController);

// Route for user login
userRouter.post("/login", loginUserController);

// Route for updating major problem
userRouter.put("/major-problem", protect, updateMajorProblemController);

// Route for updating stutter level
userRouter.put("/stutter-level", protect, updateStutterLevelController);

// Route for adding a journal entry
userRouter.post("/journals", protect, addJournalController);

// Route for reading all journal entries
userRouter.get("/journals", protect, readJournalController);

// Route for adding a gratitude entry
userRouter.post("/gratitude", protect, addGratitudeController);

// Route for reading all gratitude entries
userRouter.get("/gratitude", protect, readGratitudeController);

// Route for adding a "my tomorrow" entry
userRouter.post("/my-tomorrow", protect, addMyTomorrowController);

userRouter.post("/update-score", protect, updateUserScoreController);
export default userRouter;

// import express from "express";
// import { protect } from "../middleware/authMiddleware.js";
// import {
//   createUserController,
//   getUserProfileController,
//   loginUserController,
// } from "../controller/userController.js";

// const userRouter = express.Router();

// // Route for user registration
// userRouter.post("/", createUserController);

// // Route for getting user profile
// userRouter.get("/profile", protect, getUserProfileController);
// userRouter.post("/login", loginUserController);

// export default userRouter;
