import express from "express";
const router = express.Router();
import {
  applyEventController,
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
} from "../controllers/eventController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, createEvent).get(getAllEvents);
router.route("/:id/apply").post(protect, applyEventController);
router.route("/:id").delete(protect, deleteEvent).get(getEventById);

export default router;
