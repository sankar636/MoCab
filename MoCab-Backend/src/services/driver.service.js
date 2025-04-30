import Driver from "../models/driver.model.js";
import ApiError from "../utils/ApiError.js";

const createDriver = async({
    firstname,lastname,email,password,color,plate,vehicleType,capacity
}) => {
    if(!firstname || !email || !password || !color || !plate || !vehicleType || !capacity){
        throw new ApiError(400,"All Fields are Required")
    }

    const driver = await Driver.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle:{
            color,
            plate,
            vehicleType,
            capacity
        }
        // firstname:fullname.firstname,
        // lastname:fullname.lastname,
        // email,
        // password,
        // color: vehicle.color,
        // capacity: vehicle.capacity,
        // plate: vehicle.plate,
        // vehicleType:vehicle.vehicleType

    })
    return driver
}

export {
    createDriver
}