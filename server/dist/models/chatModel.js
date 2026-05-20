import { pool } from "../config/database.js";
export async function createChatMessage(input) {
    const [result] = await pool.execute("INSERT INTO chats (session_id, role, message, model, token_usage) VALUES (?, ?, ?, ?, ?)", [
        input.sessionId,
        input.role,
        input.message,
        input.model ?? null,
        input.tokenUsage ? JSON.stringify(input.tokenUsage) : null
    ]);
    const message = await findChatMessageById(result.insertId);
    if (!message) {
        throw new Error("Chat message was created but could not be loaded.");
    }
    return message;
}
export async function findChatMessageById(id) {
    const [rows] = await pool.query("SELECT * FROM chats WHERE id = ? LIMIT 1", [id]);
    return rows[0] ?? null;
}
export async function listMessagesBySession(sessionId, limit = 20) {
    const [rows] = await pool.query("SELECT * FROM chats WHERE session_id = ? ORDER BY created_at DESC LIMIT ?", [sessionId, limit]);
    return rows.reverse();
}
export async function listRecentChats(limit = 100) {
    const [rows] = await pool.query("SELECT * FROM chats ORDER BY created_at DESC LIMIT ?", [limit]);
    return rows;
}
export async function countChatMessages() {
    const [rows] = await pool.query("SELECT COUNT(*) AS total FROM chats");
    return rows[0]?.total ?? 0;
}
export async function countChatSessions() {
    const [rows] = await pool.query("SELECT COUNT(DISTINCT session_id) AS total FROM chats");
    return rows[0]?.total ?? 0;
}
