import asyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import Driver from "../models/driver.model.js";
import { validationResult } from "express-validator";
import ApiResponse from "../utils/ApiResponse.js";
import { createDriver } from "../services/driver.service.js";
import BlacklistedToken from "../models/blackListedToken.model.js";

const registerDriver = asyncHandler(async (req, res, next) => {
    console.log(req.body);    
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
        
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email,
        password,
        color: vehicle.color,
        plate: vehicle.plate,
        vehicleType: vehicle.vehicleType,
        capacity: vehicle.capacity
        
    });
    
    const token = await newDriver.generateAuthToken();
    console.log("Generated token", token);

    return res.status(200).json(
        new ApiResponse(200,"Driver register Successfully",{newDriver,token})
    )
})

const loginDriver = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(new ApiError(400, "Validation   errors", errors.array()));
    }

    const {email,password} = req.body
    if(!email){
        throw new ApiError(400,"Enter email")
    }

    const driver = await Driver.findOne({email}).select("+password")
    if(!driver){
        throw new ApiError(401,"Invalid Email")
    }
    const isValidPassword = await driver.isPasswordCorrect(password)
    if(!isValidPassword){
        throw new ApiError(401,"Invalid Driver Credential")
    }

    const token = await driver.generateAuthToken()
    
    res.cookie('token',token,{httpOnly: true})

    return res.status(200).json(
        new ApiResponse(200,"Driver LoggedIn Successfully",{driver,token})
    )
})

const driverProfile = asyncHandler(async(req, res, next) => {
    const profileOfDriver = req.driver
    if(!profileOfDriver){
        throw new ApiError(401,"Driver Profile not found")
    }
    return res.status(200).json(
        profileOfDriver
    )
})
const logoutDriver = asyncHandler(async (req, res, next) => {
    res.clearCookie('token') // delete previous cookies

    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")

    await BlacklistedToken.create({token})

    return res.status(200).json(
        new ApiResponse(200,"driver LoggedOut Successfully")
    )
})


export {
    registerDriver,
    loginDriver,
    logoutDriver,
    driverProfile
}
