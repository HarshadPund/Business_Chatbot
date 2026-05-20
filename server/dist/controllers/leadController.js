import { z } from "zod";
import { createLead } from "../models/leadModel.js";
import { sendLeadNotification } from "../services/notificationService.js";
const leadSchema = z.object({
    name: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(255),
    phone: z
        .string()
        .trim()
        .min(7)
        .max(30)
        .regex(/^[+()\-\s0-9]+$/, "Phone number can include digits, spaces, +, -, and parentheses"),
    message: z.string().trim().min(10).max(2000)
});
export async function submitLead(req, res) {
    const payload = leadSchema.parse(req.body);
    const lead = await createLead({
        ...payload,
        email: payload.email.toLowerCase()
    });
    await sendLeadNotification(lead);
    res.status(201).json({
        lead,
        automation: {
            type: "lead_notification",
            status: "triggered"
        },
        welcomeMessage: `Thanks, ${lead.name}. Our automation team has received your details and can help map the next best AI workflow for your business.`
    });
}
