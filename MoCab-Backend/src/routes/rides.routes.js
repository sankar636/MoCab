import { Router } from "express";
import { body, query } from "express-validator";

const router = Router()

import { createRideController } from "../controllers/rides.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

router.route('/create').post(
    [
        // body('userId').isString().isLength({min:24, max: 24}).withMessage("Invalid User Id"), // instead of this we can pass verifyJWT (for user authontication)
        verifyJWT,
        body('pickup').isString().isLength({min:3}).withMessage("Invalid Pickup Address"),
        body('destination').isString().isLength({min: 3}).withMessage("Invalid Destination Address"),
        body('vehicleType').isString().isIn(['auto', 'bike', 'car']).withMessage("Invalid Vehicletype ")
    ],
    createRideController
)

export default router