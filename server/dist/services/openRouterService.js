import axios from "axios";
import { env } from "../config/env.js";
export async function generateAssistantReply(history, userMessage) {
    const systemPrompt = "You are Codenixia AI Business Automation Assistant. Answer business automation, course, CRM, lead generation, AI workflow, and digital operations questions with practical, concise guidance. Ask for lead details when the user shows buying intent.";
    const messages = [
        { role: "system", content: systemPrompt },
        ...history.slice(-12).map((item) => ({
            role: item.role === "assistant" ? "assistant" : "user",
            content: item.message
        })),
        { role: "user", content: userMessage }
    ];
    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
        model: env.OPENROUTER_MODEL,
        messages,
        temperature: 0.4,
        max_tokens: 700
    }, {
        headers: {
            Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json",
            "HTTP-Referer": env.OPENROUTER_SITE_URL,
            "X-Title": env.OPENROUTER_APP_NAME
        },
        timeout: 30000
    });
    const reply = response.data.choices?.[0]?.message?.content?.trim();
    if (!reply) {
        throw new Error("OpenRouter returned an empty response.");
    }
    return {
        reply,
        model: env.OPENROUTER_MODEL,
        usage: response.data.usage ?? null
    };
}
