import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/AsyncHandler.js";
import jwt from 'jsonwebtoken'


export const verifyJWT = asyncHandler(async (req, res, next) => {
    // console.log("Cookies:", req.cookies);
    // console.log("Authorization Header:", req.header("Authorization"));

    const token = req.cookies?.token
        || req.header("Authorization")?.replace("Bearer ", "")

    console.log("Token", token);
    if (!token) {
        throw new ApiError(400, "Unauthorized request")
    }

    try {
        // console.log("JWT_SECRET: ", process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded: ",decoded);
        
        const user = await User.findById(decoded?._id).select("-password");

        if (!user) {
            throw new ApiError(401, "Invalid token");
        }

        req.user = user;
        next();  // Continue to next middleware/handler
    } catch (error) {
        // throw new ApiError(401, "Invalid or expired token");
        if (error.name === 'TokenExpiredError') {
            throw new ApiError(401, "Token expired");
        }
        throw new ApiError(401, "Invalid token");
    }
})

