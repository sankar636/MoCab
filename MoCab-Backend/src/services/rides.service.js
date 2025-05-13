import ApiError from "../utils/ApiError.js"
import { getDistanceTime } from "./maps.service.js"
import crypto from 'crypto'
import Rides from '../models/rides.model.js'
import Driver from "../models/driver.model.js";
import { sendMessageToSocketId } from "../socket.js";

const getFare = async (pickup, destination) => {
    if (!pickup || !destination) {
        throw new ApiError(400, "Pickup and Destination are required")
    }

    const distanceTime = await getDistanceTime(pickup, destination)

    // Parse distance and duration from text
    // const distanceInKm = parseFloat(distanceTime.distance.replace(" km", ""));
    const distanceStr = distanceTime.distance;
    const kmMatch = distanceStr.match(/[\d,\.]+/); // extract the number with comma or dot
    const distanceInKm = kmMatch ? parseFloat(kmMatch[0].replace(",", "")) : 0;
    // console.log("Distance", distanceInKm);

    const durationInMins = parseFloat(distanceTime.duration.replace(" mins", ""));
    // console.log("Duration", durationInMins);


    const baseFare = {
        auto: 30,
        car: 50,
        bike: 20
    }
    const perKmRate = {
        auto: 10,
        car: 15,
        bike: 8
    }
    const perMinuteRate = {
        auto: 2,
        car: 3,
        bike: 1.5
    }
    /*
    optional  
    const nightCharge = {
        auto: 20,
        car: 30,
        bike: 15
    };

    const hour = new Date(rideTime).getHours();
    const isNight = hour >= 22 || hour < 6;
    */

    const fare = {
        auto: Math.round(baseFare.auto + ((distanceInKm) * perKmRate.auto) + ((durationInMins) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceInKm) * perKmRate.car) + ((durationInMins) * perMinuteRate.car)),
        bike: Math.round(baseFare.bike + ((distanceInKm) * perKmRate.bike) + ((durationInMins) * perMinuteRate.bike))
    }

    return fare
}

const generateOTP = () => {
    const otp = crypto.randomInt(100000, 999999).toString() // it give random 6 digit otp number
    return otp
}

const createRide = async ({ userId, pickup, destination, vehicleType }) => {
    if (!userId || !pickup || !destination || !vehicleType) {
        throw new ApiError(400, "All Fields are required");
    }

    const fare = await getFare(pickup, destination);
    // console.log("Fare", fare);
    const OTP = generateOTP();
    // console.log("OTP is", OTP);

    const ride = await Rides.create({
        userId,
        pickupLocation: pickup,
        destinationLocation: destination,
        otp: OTP,
        fare: fare[vehicleType]
    });

    return ride;
};

const confirmRide = async ({ rideId, driver }) => {
    if (!rideId) {
        throw new ApiError(400, "Ride ID is required");
    }

    // Update the status and driver ID in the ride
    await Rides.findByIdAndUpdate(
        { _id: rideId },
        {
            status: "accepted",
            driverId: driver._id
        }
    );

    const ride = await Rides.findOne({ _id: rideId })
        .populate("userId")
        .populate("driverId")
        .select("+otp");
    // console.log("Ride For Confirm Ride",ride);
    
    if (!ride) {
        throw new ApiError(400, "Ride not confirmed or found");
    }

    return ride;
};

const startRide = async ({ rideId, otp, driverId }) => {
    if (!rideId || !otp) {
        throw new ApiError(400, "Ride Id and OTP are required");
    }

    const ride = await Rides.findOne({ _id: rideId })
        .populate('userId')
        .populate('driverId')
        .select('+otp');

    if (!ride) {
        throw new ApiError(400, "Ride not found");
    }
    if (ride.status !== 'accepted') {
        throw new ApiError(400, "Ride not accepted");
    }
    if (ride.otp !== otp) { // Fix: Compare `ride.otp` with the passed `otp`
        throw new ApiError(400, "Invalid OTP");
    }

    await Rides.findByIdAndUpdate(
        { _id: rideId },
        {
            status: "in-processed",
        }
    );
    return ride;
}

const endRide = async ({ rideId, driverId }) => {
    if (!rideId) {
        throw new ApiError(400, "Ride Id is required");
    }

    const ride = await Rides.findById({ _id: rideId }).populate('userId');

    if (!ride) {
        throw new ApiError(400, "Ride not found");
    }

    if (ride.status !== "in-processed") {
        throw new ApiError(400, "Ride is not in process");
    }

    // if (ride.driverId.toString() !== driverId.toString()) {
    //     throw new ApiError(403, "Driver is not authorized to end this ride");
    // }

    await Rides.findByIdAndUpdate(
        { _id: rideId },
        {
            status: "completed",
        }
    );

    return ride;
};

export {
    getFare,
    createRide,
    confirmRide,
    startRide,
    endRide
}


/*
const generateOTP = (num) => {
    const min = Math.pow(10, num - 1) // 100000(for num = 6)
    const max = Math.pow((10,num) - 1) // 999999(for num = 6)
    const otp = crypto.randomInt(min,max).toString()
    return otp
}

if you want to send 4 disit OTP then num = 4 and if you want 6 digit OTP then num = 6

*/


