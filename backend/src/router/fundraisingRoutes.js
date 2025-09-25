import express from "express";
import {
  createFundraising,
  getAllFundraisings,
  getFundraisingById,
  donateToFundraising,
} from "../controller/fundraisingController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(protect, upload.single("image"), createFundraising)
  .get(getAllFundraisings);

router.route("/:id").get(getFundraisingById);
router.route("/:id/donate").post(protect, donateToFundraising);

export default router;
