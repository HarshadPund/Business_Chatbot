import { Router } from "express";
import { getChatHistory, sendChatMessage } from "../controllers/chatController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
export const chatRouter = Router();
chatRouter.post("/", asyncHandler(sendChatMessage));
chatRouter.get("/:sessionId", asyncHandler(getChatHistory));
