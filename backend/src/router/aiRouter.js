import express from "express";
import getAiResponse from "../controller/aiChatAssistantController.js";
import { protect } from "../middleware/authMiddleware.js";

const aiRouter = express.Router();

aiRouter.post("/", protect, getAiResponse);

export default aiRouter;
