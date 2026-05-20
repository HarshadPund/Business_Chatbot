import crypto from "node:crypto";
import { z } from "zod";
import { createChatMessage, listMessagesBySession } from "../models/chatModel.js";
import { generateAssistantReply } from "../services/openRouterService.js";
const chatSchema = z.object({
    sessionId: z.string().trim().min(8).max(64).optional(),
    message: z.string().trim().min(1).max(4000)
});
export async function sendChatMessage(req, res) {
    const payload = chatSchema.parse(req.body);
    const sessionId = payload.sessionId ?? crypto.randomUUID();
    const history = await listMessagesBySession(sessionId, 20);
    const userMessage = await createChatMessage({
        sessionId,
        role: "user",
        message: payload.message
    });
    const aiResponse = await generateAssistantReply(history, payload.message);
    const assistantMessage = await createChatMessage({
        sessionId,
        role: "assistant",
        message: aiResponse.reply,
        model: aiResponse.model,
        tokenUsage: aiResponse.usage
    });
    res.status(201).json({
        sessionId,
        messages: [userMessage, assistantMessage],
        reply: assistantMessage.message
    });
}
export async function getChatHistory(req, res) {
    const params = z.object({ sessionId: z.string().min(8).max(64) }).parse(req.params);
    const messages = await listMessagesBySession(params.sessionId, 100);
    res.json({ sessionId: params.sessionId, messages });
}
