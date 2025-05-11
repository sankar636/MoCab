import ApiError from "../utils/ApiError.js"
import { getDistanceTime } from "./maps.service.js"
import crypto from 'crypto'
import Rides from '../models/rides.model.js'

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
    console.log("Distance", distanceInKm);

    const durationInMins = parseFloat(distanceTime.duration.replace(" mins", ""));
    console.log("Duration", durationInMins);


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

const createRide = async (
    {
        userId,
        pickup,
        destination,
        vehicleType,
    }
) => {
    if (!userId || !pickup || !destination || !vehicleType) {
        throw new ApiError(400, "All Fields are required")
    }

    const fare = await getFare(pickup, destination);
    console.log("Fare", fare);
    const OTP = generateOTP()
    console.log("OTP is", OTP);

    const ride = await Rides.create({
        userId,
        pickupLocation: pickup,
        destinationLocation: destination,
        otp: OTP,
        fare: fare[vehicleType]
    })

    return ride
}

const confirmRide = async ({ rideId, driver }) => {
    // if(!rideId || !driver){

    // }
}

const startRide = async ({ rideId, otp, driver }) => {

}

const endRide = async ({ rideId, driver }) => {

}
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


