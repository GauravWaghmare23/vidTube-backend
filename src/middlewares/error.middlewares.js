import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
    let customError = err;

    if (!(err instanceof ApiError)) {
        const statusCode =
            err.statusCode || err.name === "ValidationError" || err instanceof mongoose.Error ? 400 : 500;
        const message = err.message || "Something went wrong";
        customError = new ApiError(statusCode, message, [], err.stack);
    }

    const response = {
        success: false,
        statusCode: customError.statusCode,
        message: customError.message,
        errors: customError.errors,
        ...(process.env.NODE_ENV === "development" && { stack: customError.stack })
    };

    return res.status(customError.statusCode).json(response);
};

export { errorHandler };