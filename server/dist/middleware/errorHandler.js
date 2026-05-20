import { ZodError } from "zod";
export class ApiError extends Error {
    statusCode;
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
    }
}
export function notFoundHandler(req, _res, next) {
    next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`));
}
export function errorHandler(error, _req, res, _next) {
    if (error instanceof ZodError) {
        return res.status(400).json({
            message: "Validation failed",
            errors: error.flatten().fieldErrors
        });
    }
    if (error instanceof ApiError) {
        return res.status(error.statusCode).json({ message: error.message });
    }
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
}
