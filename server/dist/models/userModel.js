import { pool } from "../config/database.js";
export async function findUserByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);
    return rows[0] ?? null;
}
