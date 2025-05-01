import { Router } from "express";
import { body } from "express-validator";

const router = Router()

import { registerDriver, loginDriver, logoutDriver, driverProfile } from "../controllers/driver.controller.js";
// import { verifyDriverJWT } from "../middlewares/auth.middleware.js";

router.route('/register').post( 
    [
        body('email').isEmail().withMessage("Invalid Email"),
        body('fullname.firstname').isLength({ min: 3 }).withMessage("First name must be at least 3 characters"),
        body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
        body('vehicle.color').isLength({ min: 3 }).withMessage("Color must be atleast 3 character"),
        body('vehicle.vehicleType').isIn(["car","bike","auto"]).withMessage("Invalid Vahicle Type"),
        body('vehicle.capacity').isInt({ min: 1 }).withMessage("Capacity must be atleast 1"),
        body('vehicle.plate').isLength({ min: 8 }).withMessage("Plate must be atleast 8 character")
    ],
    registerDriver
)

router.route('/login').post(
    [
        body('email').isEmail().withMessage("Invalid Email"),
        body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    ],
    loginDriver
)
// router.route('/profile').get(verifyDriverJWT,driverProfile)

// router.route('/logout').post(verifyDriverJWT,logoutDriver)

export default router