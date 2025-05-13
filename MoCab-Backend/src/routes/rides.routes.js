import { Router } from "express";
import { body, query } from "express-validator";

const router = Router()

import { confirmRideController, createRideController, getFareController, startRideController } from "../controllers/rides.controller.js";
import { verifyDriverJWT, verifyJWT } from "../middlewares/auth.middleware.js";

router.route('/create').post(
    [
        // body('userId').isString().isLength({min:24, max: 24}).withMessage("Invalid User Id"), // instead of this we can pass verifyJWT (for user authontication)
        verifyJWT,
        body('pickup').isString().isLength({ min: 3 }).withMessage("Invalid Pickup Address"),
        body('destination').isString().isLength({ min: 3 }).withMessage("Invalid Destination Address"),
        body('vehicleType').isString().isIn(['auto', 'bike', 'car']).withMessage("Invalid Vehicletype ")
    ],
    createRideController
)

router.route('/getfare').get(
    [
        verifyJWT,
        query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
        query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    ],
    getFareController
)

router.route('/confirm').post(
    [
        verifyDriverJWT,
        body('rideId').isMongoId().withMessage("Invalid Ride Id")
    ],
    confirmRideController
);

router.route('/start').get(
    [
        verifyDriverJWT,
        query('rideId').isMongoId().withMessage("Invalid Ride Id"),
        query('otp').isString().isLength({min:6, max: 6}).withMessage('Invalid OTP')
    ],
    startRideController
)

// router.route('/end').post()

export default router