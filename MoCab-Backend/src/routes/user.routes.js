import { Router } from "express";
import { body } from 'express-validator'
const router = Router()

// import userController from '../controllers/user.controller.js' (not like this)
import { registerUser, loginUser,getUserProfile } from '../controllers/user.controller.js';
import { verifyJWT } from "../middlewares/auth.middleware.js";

router.route('/register').post(
    [
        body('email').isEmail().withMessage("Invalid Email"),
        body('fullname.firstname').isLength({ min: 3 }).withMessage("First name must be at least 3 characters"),
        body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
    ],
    registerUser
)

router.route('/login').post(
    [
        body('email').isEmail().withMessage("Invalid Email"),
        body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
    ],
    loginUser
)

router.route('/profile').get(verifyJWT,getUserProfile)

export default router

/*
Instead of the Router.route('/register').post(....) ----> we can also write
router.post('/register',
  [
    body('email').isEmail().withMessage("Invalid Email"),
    body('fullname.firstname').isLength({ min: 3 }).withMessage("First name must be at least 3 characters"),
    body('password').isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
  ],
  registerUser
);
Note-> Most secure applications do not tell users whether the email or password was incorrect — they just say “Invalid email or password” to avoid giving hints to attackers.
*/