import bcrypt from "bcryptjs";
import { z } from "zod";
import { findUserByEmail } from "../models/userModel.js";
import { signAuthToken } from "../middleware/auth.js";
import { ApiError } from "../middleware/errorHandler.js";
const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8)
});
export async function login(req, res) {
    const payload = loginSchema.parse(req.body);
    const user = await findUserByEmail(payload.email.toLowerCase());
    if (!user) {
        throw new ApiError(401, "Invalid email or password");
    }
    const isPasswordValid = await bcrypt.compare(payload.password, user.password_hash);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid email or password");
    }
    const token = signAuthToken({
        id: user.id,
        email: user.email,
        role: user.role
    });
    res.json({
        token,
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    });
}
