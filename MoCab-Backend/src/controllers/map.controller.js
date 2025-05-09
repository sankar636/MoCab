import { getAddressCoordinate, getDistanceTime, autoCompleteSuggession } from "../services/maps.service.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/AsyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import { validationResult } from 'express-validator';

// Get coordinates for a given address
const getCoordinates = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(new ApiError(400, "Validation errors", errors.array()));
    }

    const { address } = req.query;
    const coordinates = await getAddressCoordinate(address);

    if (!coordinates) {
        throw new ApiError(400, "Coordinates not generated");
    }

    return res.status(200).json(
        new ApiResponse(200, "Coordinates of the address", { coordinates })
    );
});

// Get distance and time between two addresses
const distanceTime = asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(new ApiError(400, "Validation errors", errors.array()));
    }

    const { origin, destination } = req.query;
    const result = await getDistanceTime(origin, destination);
    console.log("result", result);    
    if (!result) {
        throw new ApiError(400, "Distance and duration were not generated");
    }

    return res.status(200).json(
        new ApiResponse(200, "Distance and duration between the addresses", result)
    );
});


const getAutoCompleteSuggession = asyncHandler(async ( req, res) => {
    const { input } = req.query
    const suggession = await autoCompleteSuggession(input)
    if(!suggession){
        throw new ApiError(400,"Auto suggession result not found")
    }

    return res.status(200).json(
        new ApiResponse(200,"Auto completesuggession",suggession)
    )
})


export {
    getCoordinates,
    distanceTime,
    getAutoCompleteSuggession
};
