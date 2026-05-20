import cors from "cors";
import express from "express";
import helmet from "helmet";
import { env } from "./config/env.js";
import { adminRouter } from "./routes/adminRoutes.js";
import { authRouter } from "./routes/authRoutes.js";
import { chatRouter } from "./routes/chatRoutes.js";
import { leadRouter } from "./routes/leadRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
export const app = express();
app.use(helmet());
app.use(cors({
    origin: env.CLIENT_ORIGIN.split(",").map((origin) => origin.trim()),
    credentials: true
}));
app.use(express.json({ limit: "1mb" }));
app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "codenixia-api" });
});
app.use("/api/auth", authRouter);
app.use("/api/leads", leadRouter);
app.use("/api/chat", chatRouter);
app.use("/api/admin", adminRouter);
app.use(notFoundHandler);
app.use(errorHandler);
