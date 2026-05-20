import { Router } from "express";
import { submitLead } from "../controllers/leadController.js";
import { asyncHandler } from "../middleware/asyncHandler.js";
export const leadRouter = Router();
leadRouter.post("/", asyncHandler(submitLead));
