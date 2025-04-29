
import asyncHandler from '../utils/AsyncHandler.js'
import ApiError from '../utils/ApiError.js'
import  User  from '../models/user.model.js'
import { createUser } from '../services/user.service.js'
import { validationResult } from 'express-validator'
import ApiResponse from '../utils/ApiResponse.js'

const registerUser = asyncHandler(async(req,res) => {
    console.log(req.body);
    const errors = validationResult(req)
    if(!errors.isEmpty()){  // i.e if error is not empty(means there is some error in body of userRouter)
        return res.status(400).json(new ApiError(400, "Validation   errors", errors.array()));
    }
    
    const {fullname,email,password} = req.body
    // don't need to hash password as password already hashed in user.model
    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(409).json(new ApiError(409, "User with this email already exists"));
    }
    const user = await createUser({
        firstname: fullname.firstname,
        lastname:fullname.lastname,
        email,
        password
    })

    // Generate auth token for the created user
    const token = await user.generateAuthToken();
    console.log("Generated token", token);
    
    return res.status(201).json(
        new ApiResponse(200, "User Registered Successfully", {user,token},)
    )    
})
  
const loginUser = asyncHandler(async(req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){  // i.e if error is not empty(means there is some error in body of userRouter)
        return res.status(400).json(new ApiError(400, "Validation   errors", errors.array()));
    }
    const {email,password} = req.body
    if(!email){
        throw new ApiError(400,"Enter email")
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
    const user = await User.findOne({email}).select('+password');
    if(!user){
        throw new ApiError(401, "Invalid email")
    }
    const isValidPassword = await user.isPasswordCorrect(password)
    if(!isValidPassword){
        throw new ApiError(401,"Invalid User Credentials")
    }
    
    const token =await  user.generateAuthToken()
    console.log("Generated Token", token);

    return res.status(200).json(
        new ApiResponse(200, "User logedin Successfully", {user,token},)
    )   
})

const getUserProfile = asyncHandler(async(req,res,next) => {
    return res.status(200)
        .json(
            req.user
        )
})
export { 
    registerUser,
    loginUser,
    getUserProfile
};