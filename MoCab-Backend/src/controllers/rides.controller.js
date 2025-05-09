import asyncHandler from "../utils/AsyncHandler.js";
import { createRide } from "../services/rides.service.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { validationResult } from "express-validator";

const createRideController = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    
    const errors = validationResult(req)
    if (!errors.isEmpty()) { 
        return res.status(400).json(new ApiError(400, "Validation   errors", errors.array()));
    }

    const { pickup, destination, vehicleType } = req.body

    const ride = await createRide({
        // userId: userId, // we can use this whenever you pass userId in body. as we verify the user by verify JWT. So .
        userId:req.user._id,
        pickup, 
        destination,
        vehicleType
    })
    console.log("Ride",ride);
    
    if(!ride){
        throw new ApiError(400, "Error While Creating Ride At controller")
    }

    return res.status(200).json(
        new ApiResponse(200,"Ride Created Successfully",{ride})
    )

})

export {
    createRideController
}