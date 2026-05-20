import dotenv from "dotenv";
import { z } from "zod";
dotenv.config();
const booleanFromEnv = z.preprocess((value) => {
    if (typeof value === "string") {
        return ["true", "1", "yes", "on"].includes(value.toLowerCase());
    }
    return value;
}, z.boolean());
const envSchema = z.object({
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    PORT: z.coerce.number().default(5000),
    CLIENT_ORIGIN: z.string().default("http://localhost:5173"),
    OPENROUTER_API_KEY: z.string().min(1, "OPENROUTER_API_KEY is required"),
    OPENROUTER_MODEL: z.string().default("openai/gpt-4o-mini"),
    OPENROUTER_SITE_URL: z.string().url().default("http://localhost:5173"),
    OPENROUTER_APP_NAME: z.string().default("Codenixia AI Business Automation Assistant"),
    DB_HOST: z.string().default("localhost"),
    DB_PORT: z.coerce.number().default(3306),
    DB_USER: z.string().default("root"),
    DB_PASS: z.string().default(""),
    DB_NAME: z.string().default("codenixia_ai_assistant"),
    JWT_SECRET: z.string().min(16, "JWT_SECRET must be at least 16 characters"),
    JWT_EXPIRES_IN: z.string().default("1d"),
    SMTP_ENABLED: booleanFromEnv.default(false),
    SMTP_HOST: z.string().optional(),
    SMTP_PORT: z.coerce.number().default(587),
    SMTP_SECURE: booleanFromEnv.default(false),
    SMTP_USER: z.string().optional(),
    SMTP_PASS: z.string().optional(),
    LEAD_NOTIFICATION_TO: z.string().email().default("admin@codenixia.com"),
    LEAD_NOTIFICATION_FROM: z.string().email().default("no-reply@codenixia.com")
});
const parsed = envSchema.safeParse(process.env);
if (!parsed.success) {
    console.error("Invalid environment configuration", parsed.error.flatten().fieldErrors);
    process.exit(1);
}
export const env = parsed.data;
