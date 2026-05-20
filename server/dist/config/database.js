import mysql from "mysql2/promise";
import { env } from "./env.js";
export const pool = mysql.createPool({
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});
export async function assertDatabaseConnection() {
    const connection = await pool.getConnection();
    try {
        await connection.ping();
    }
    finally {
        connection.release();
    }
}
