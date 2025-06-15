
import AsyncHandler from '../utils/AsyncHandler.js'
import ApiError from '../utils/ApiError.js'
import User from '../models/user.model.js'
import { createUser } from '../services/user.service.js'
import { validationResult } from 'express-validator'
import ApiResponse from '../utils/ApiResponse.js'
import BlacklistedToken from '../models/blackListedToken.model.js'

const registerUser = AsyncHandler(async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req)
    if (!errors.isEmpty()) {  // i.e if error is not empty(means there is some error in body of userRouter)
        return res.status(400).json(new ApiError(400, "Validation   errors", errors.array()));
    }

    const { fullname, email, password } = req.body
    // don't need to hash password as password already hashed in user.model
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json(new ApiError(409, "User with this email already exists"));
    }
    const user = await createUser(
        {
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password
        }
    )
    console.log("User Data ", user);
    if (!user) {
        throw new ApiError(400, "User Not created")
    }
    // Generate auth token for the created user
    const token = await user.generateAuthToken();
    console.log("Generated token", token);

    return res.status(200).json(
        new ApiResponse(200, "User Registered Successfully", { user, token },)
    )
})

const loginUser = AsyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {  // i.e if error is not empty(means there is some error in body of userRouter)
        return res.status(400).json(new ApiError(400, "Validation   errors", errors.array()));
    }
    const { email, password } = req.body
    if (!email) {
        throw new ApiError(400, "Enter email")
    }

    /* // check the email and password at a time 
    const user = await User.findOne({email}).select('+password');
    if(!user){
        throw new ApiError(401, "Invalid email or password")
    }
    */

    /*
     // to check email and password seperatly
    */
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        throw new ApiError(401, "Invalid email")
    }
    const isValidPassword = await user.isPasswordCorrect(password)
    if (!isValidPassword) {
        throw new ApiError(401, "Invalid User Credentials")
    }

    const token = await user.generateAuthToken()
    // console.log("Generated Token", token);

    res.cookie('token', token,
        { httpOnly: true, }
    )// when we did not share any cookie in postman (Authorization Bearerar <token> ) then it will work

    return res.status(200).json(
        new ApiResponse(200, "User logedin Successfully", { user, token },)
    )
})

const getUserProfile = AsyncHandler(async (req, res, next) => {
    const userProfile = req.user
    if(!userProfile){
        throw new ApiError(401, "user profile not found")
    }
    return res.status(200)
        .json(
            userProfile
        )
})
/*
// this part cause error
const logoutUser = AsyncHandler(async (req, res, next) => {
    res.clearCookie('token')

    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "")

    await BlacklistedToken.create({ token }); // this will blacklist the token but may still have in localstorage or shared by anyone to avoid these mistake we have to update in middleware 

    return res.status(200)
        .json(
            new ApiResponse(200, "User Loged Out")
        )
})
*/
const logoutUser = AsyncHandler(async (req, res, next) => {
    res.clearCookie('token')
    // Get token BEFORE clearing it
    const token = req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");
    console.log("Token At Controller", token);

    // Blacklist the token if it exists
    if (token) {
        try {
            await BlacklistedToken.create({token}) 
        }catch (error) {
            if (error.code === 11000) {
                console.warn("Token is already blacklisted");
            } else {
                throw error;
            }
        }
    }

    return res.status(200).json(
        new ApiResponse(200, "User Logged Out")
    );
});


export {
    registerUser,
    loginUser,
    getUserProfile,
    logoutUser
};