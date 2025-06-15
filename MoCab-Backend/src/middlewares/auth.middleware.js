import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import AsyncHandler from "../utils/AsyncHandler.js";
import jwt from 'jsonwebtoken'
import BlacklistedToken from "../models/blackListedToken.model.js";
import Driver from "../models/driver.model.js";


export const verifyJWT = AsyncHandler(async (req, res, next) => {
    // console.log("Cookies:", req.cookies);
    // console.log("Authorization Header:", req.header("Authorization"));

    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")

    // console.log("Token", token);
    if (!token) {
        throw new ApiError(400, "Unauthorized request")
    }
    
    const isBlacklistedToken = await BlacklistedToken.findOne({token: token})
    if(isBlacklistedToken){
        throw new ApiError(400,"Token has been blacklisted")
    }
    // console.log("At UserJwtmiddleware");
    
    try {
        // console.log("JWT_SECRET: ", process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded: ",decoded);
        
        const user = await User.findById(decoded?._id)

        if (!user) {
            throw new ApiError(401, "Invalid token");
        }

        req.user = user;

        return next();  // Continue to next middleware/handler
    } catch (error) {
        // throw new ApiError(401, "Invalid or expired token");
        if (error.name === 'TokenExpiredError') {
            throw new ApiError(401, "Token expired");
        }
        throw new ApiError(401, "Invalid token");
    }
})


/*
const isBlacklistedToken = await BlacklistedToken.findOne({token: token})
this part check
// Check if the token is blacklisted (e.g., logged out tokens).
// If found in the BlacklistedToken collection, deny access.
// This prevents reuse of JWTs after logout or forced expiration.

*/

//Jwt verrification for Driver

export const verifyDriverJWT = AsyncHandler(async (req, res, next) => {
    // console.log("Cookies:", req.cookies);
    // console.log("Authorization Header:", req.header("Authorization"));

    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")

    console.log("Token", token);
    if (!token) {
        throw new ApiError(400, "Unauthorized request")
    }

    const isBlacklistedToken = await BlacklistedToken.findOne({token: token})
    if(isBlacklistedToken){
        throw new ApiError(400,"Token has been blacklisted")
    }

    try {
        // console.log("JWT_SECRET: ", process.env.JWT_SECRET);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded: ",decoded);
        
        const driver = await Driver.findById(decoded?._id).select("-password");

        if (!driver) {
            throw new ApiError(401, "Invalid token");
        }

        req.driver = driver;
        
        return next();  // Continue to next middleware/handler
    } catch (error) {
        // throw new ApiError(401, "Invalid or expired token");
        if (error.name === 'TokenExpiredError') {
            throw new ApiError(401, "Token expired");
        }
        throw new ApiError(401, "Invalid token");
    }
})