import nodemailer from "nodemailer";
import { env } from "../config/env.js";
export async function sendLeadNotification(lead) {
    if (!env.SMTP_ENABLED) {
        console.info("[lead-notification:mock]", {
            to: env.LEAD_NOTIFICATION_TO,
            leadId: lead.id,
            email: lead.email,
            phone: lead.phone
        });
        return;
    }
    const transporter = nodemailer.createTransport({
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        secure: env.SMTP_SECURE,
        auth: env.SMTP_USER && env.SMTP_PASS
            ? {
                user: env.SMTP_USER,
                pass: env.SMTP_PASS
            }
            : undefined
    });
    await transporter.sendMail({
        from: env.LEAD_NOTIFICATION_FROM,
        to: env.LEAD_NOTIFICATION_TO,
        subject: `New Codenixia lead: ${lead.name}`,
        text: [
            `Name: ${lead.name}`,
            `Email: ${lead.email}`,
            `Phone: ${lead.phone}`,
            `Message: ${lead.message}`
        ].join("\n")
    });
}
