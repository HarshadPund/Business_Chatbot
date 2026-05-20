import { pool } from "../config/database.js";
export async function createLead(input) {
    const [result] = await pool.execute("INSERT INTO leads (name, email, phone, message, source) VALUES (?, ?, ?, ?, ?)", [input.name, input.email, input.phone, input.message, input.source ?? "website"]);
    const lead = await findLeadById(result.insertId);
    if (!lead) {
        throw new Error("Lead was created but could not be loaded.");
    }
    return lead;
}
export async function findLeadById(id) {
    const [rows] = await pool.query("SELECT * FROM leads WHERE id = ? LIMIT 1", [id]);
    return rows[0] ?? null;
}
export async function listLeads(limit = 100) {
    const [rows] = await pool.query("SELECT * FROM leads ORDER BY created_at DESC LIMIT ?", [limit]);
    return rows;
}
export async function updateLeadStatus(id, status) {
    await pool.execute("UPDATE leads SET status = ? WHERE id = ?", [status, id]);
    return findLeadById(id);
}
export async function countLeads() {
    const [rows] = await pool.query("SELECT COUNT(*) AS total FROM leads");
    return rows[0]?.total ?? 0;
}
