import asyncHandler from "../utils/AsyncHandler";
import ApiError from "../utils/ApiError.js";
import Driver from "../models/driver.model.js";
import { validationResult } from "express-validator";
import ApiResponse from "../utils/ApiResponse.js";
import { createDriver } from "../services/driver.service.js";

const registerDriver = asyncHandler(async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(new ApiError(400, "Validation   errors", errors.array()));
    }
    const {fullname,email,password,vehicle} = req.body

    const existingDriver = await Driver.findOne({ email });
    if (existingDriver) {
        return res.status(409).json(new ApiError(409, "Driver with this email already exists"));
    }

    const newDriver = await createDriver({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname
        },
        email,
        password,
        vehicle: {
            color: vehicle.color,
            plate: vehicle.plate,
            vehicleType: vehicle.vehicleType,
            capacity: vehicle.capacity
        }
    });
    
    const token = await newDriver.generateAuthToken();
    console.log("Generated token", token);

    return res.status(200).json(
        new ApiResponse(200,"Driver register Successfully",{newDriver,token})
    )
})

const loginDriver = asyncHandler(async (req, res, next) => {

})

const logoutDriver = asyncHandler(async (req, res, next) => {

})

export {
    registerDriver,
    loginDriver,
    logoutDriver
}
