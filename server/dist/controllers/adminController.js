import { z } from "zod";
import { countChatMessages, countChatSessions, listRecentChats } from "../models/chatModel.js";
import { countLeads, listLeads, updateLeadStatus } from "../models/leadModel.js";
export async function getAdminStats(_req, res) {
    const [totalLeads, totalChatMessages, totalChatSessions, recentLeads, recentChats] = await Promise.all([
        countLeads(),
        countChatMessages(),
        countChatSessions(),
        listLeads(5),
        listRecentChats(5)
    ]);
    res.json({
        totalLeads,
        totalChatMessages,
        totalChatSessions,
        recentLeads,
        recentChats
    });
}
export async function getLeads(req, res) {
    const query = z
        .object({
        limit: z.coerce.number().int().min(1).max(250).default(100)
    })
        .parse(req.query);
    const leads = await listLeads(query.limit);
    res.json({ leads });
}
export async function patchLeadStatus(req, res) {
    const params = z.object({ id: z.coerce.number().int().positive() }).parse(req.params);
    const body = z.object({ status: z.enum(["new", "contacted", "qualified", "closed"]) }).parse(req.body);
    const lead = await updateLeadStatus(params.id, body.status);
    res.json({ lead });
}
export async function getChatLogs(req, res) {
    const query = z
        .object({
        limit: z.coerce.number().int().min(1).max(250).default(100)
    })
        .parse(req.query);
    const chats = await listRecentChats(query.limit);
    res.json({ chats });
}
