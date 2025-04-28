
import  User  from '../models/user.model.js'
import ApiError from '../utils/ApiError.js'

// This will only create a user not other think(like hashing of password and checking the user already exist or not)
const createUser = async({email,password,firstname,lastname})=>{
    if(!email || !password || !firstname){
        throw new ApiError(400,'All field are required')
    }
    const user = await User.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password
    })
    return user
}

export {
    createUser
}