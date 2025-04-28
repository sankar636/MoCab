
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
  
export { 
    registerUser

};