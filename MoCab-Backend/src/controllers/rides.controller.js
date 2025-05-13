import asyncHandler from "../utils/AsyncHandler.js";
import { createRide, getFare, confirmRide, startRide } from "../services/rides.service.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { validationResult } from "express-validator";
import { sendMessageToSocketId } from "../socket.js";
import { driverInTheRadious, getAddressCoordinate } from "../services/maps.service.js";
import Rides from "../models/rides.model.js";

const createRideController = asyncHandler(async (req, res, next) => {
    // console.log("DATA comes fron body", req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(new ApiError(400, "Validation errors", errors.array()));
    }

    const { pickup, destination, vehicleType } = req.body;

    const ride = await createRide({
        userId: req.user._id,
        pickup,
        destination,
        vehicleType
    });
    res.status(200).json(ride)
    ride.otp = '' // Read the comment below to understand it 
    // console.log("Ride", ride);
    if (!ride) {
        throw new ApiError(400, "Error While Creating Ride At controller");
    }


    // get the pickup coordinate of the user
    const pickUpCoordinate = await getAddressCoordinate(pickup)
    if (!pickUpCoordinate) {
        throw new ApiError(400, "No pickup address found of user")
    }
    // console.log("Pickup coordinates:", pickUpCoordinate);

    const driverWithInRadius = await driverInTheRadious(pickUpCoordinate.lng, pickUpCoordinate.lat, 10); // latitude, longitude of the user and last one is the radius around the user
    // console.log("Drivers within radius:", driverWithInRadius);

    if (!driverWithInRadius || driverWithInRadius.length === 0) {
        throw new ApiError(400, "No driver within your nearby area");
    }

    // add data of user in the ride model
    const rideWithUser = await Rides.findOne({ _id: ride._id }).populate('userId')
    if (!rideWithUser) {
        throw new ApiError(400, "User not there in the ride ")
    }
    //send message to the driver about the user and location, and fare etc
    // console.log(rideWithUser);

    driverWithInRadius.map(driver => {
        // console.log(driver, ride);        
        sendMessageToSocketId(driver.socketId, {
            event: 'new-ride',
            data: rideWithUser
        })
    })


    // return res.status(200).json(
    //     new ApiResponse(200, "Ride Created Successfully", { ride })
    // );
});

const getFareController = asyncHandler(async (req, res, next) => {
    // console.log(req.query);

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json(new ApiError(400, "Validation   errors", errors.array()));
    }

    const { pickup, destination } = req.query

    if (!pickup || !destination) {
        throw new ApiError(400, "Pickup and destination fields are required")
    }

    const fare = await getFare(pickup, destination)

    return res.status(200).json(
        new ApiResponse(200, "Fare", { fare })
    )
})

const confirmRideController = asyncHandler(async (req, res, next) => {
    // console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(new ApiError(400, "Validation errors", errors.array()));
    }

    const { rideId } = req.body;
    const driver = req.driver; // Assuming `verifyDriverJWT` middleware adds driver info to req

    const ride = await confirmRide({ rideId, driver });

    
    if (!ride) {
        throw new ApiError(400, "Error While Confirming Ride At controller");
    }
    // if the ride is confirmed(generated) then send the message to the socket 
    console.log("User Socket Id At confirmRide Controller", ride.userId.socketId);
    
    sendMessageToSocketId(ride.userId.socketId , {
        event: 'confirm-ride',
        data: ride
    }) // this message will triger to user that ride was confirmed by the driver

    return res.status(200).json(
        new ApiResponse(200, "Ride Confirmed Successfully", { ride })
    );
});

const startRideController = asyncHandler(async(req,res) => {
    console.log("StartRide",req.query);    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(new ApiError(400, "Validation errors", errors.array()));
    }

    const { otp, rideId } = req.query

    const driverId = req.driver
    console.log("Driver Id",driverId);
    
    const ride = await startRide({rideId, otp, driverId})
    if(!ride){
        throw new ApiError(400,"Ride is not found")
    }
    console.log("Ride",ride);
    
    sendMessageToSocketId(ride.userId.socketId,{
        event:'started-ride',
        data: ride
    })

    return res.status(200).json(
        new ApiResponse(200, "Ride start Successfully", { ride })
    );
})

export {
    createRideController,
    getFareController,
    confirmRideController,
    startRideController
};

/*
    const rideWithUser = await Rides.findOne({ _id: ride._id }).populate('userId')
populate is used to add user data in the usedId of the ride model . User Data have OTP also so to not send otp to to ride we have been make the ride.opt to empty before 
*/