import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { ApiError } from "./errorHandler.js";
export function signAuthToken(payload) {
    const options = { expiresIn: env.JWT_EXPIRES_IN };
    return jwt.sign(payload, env.JWT_SECRET, options);
}
export function requireAuth(req, _res, next) {
    const header = req.headers.authorization;
    const token = header?.startsWith("Bearer ") ? header.slice(7) : null;
    if (!token) {
        return next(new ApiError(401, "Authentication required"));
    }
    try {
        req.user = jwt.verify(token, env.JWT_SECRET);
        return next();
    }
    catch {
        return next(new ApiError(401, "Invalid or expired token"));
    }
}
export function requireRole(role) {
    return (req, _res, next) => {
        if (req.user?.role !== role) {
            return next(new ApiError(403, "Insufficient permissions"));
        }
        return next();
    };
}
