import { Router } from "express";
import { body } from 'express-validator'
const router = Router()

// import userController from '../controllers/user.controller.js' (not like this)
import { registerUser } from '../controllers/user.controller.js';

router.route('/register').post(
    [
        body('email').isEmail().withMessage("Invalid Email"),
        body('fullname.firstname').isLength({ min: 3 }).withMessage("First name must be at least 3 characters"),
        body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
    ],
    registerUser
)



export default router