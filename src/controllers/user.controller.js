import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../model/User.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async (requestAnimationFrame, res) => {
    // res.status(200).json({
    //     message: "Hello nodeJs"
    // })

    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, ElementInternals
    // check for images, check for avatar
    // upload them to cloudinary , avatar
    // create user object - create entry in db
    // remove passsword and refresh token field from response 
    // check for user creation
    // return res

    const {fullName, email, username, password} = requestAnimationFrame.body
    console.log("email: " , email)

    if(
        [fullName,email,username,password].some ((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All fields required")
    }

    const existedUser = User.findOne({
        $or: [{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409, "User with username/email already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar is required")
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar) {
        throw new ApiError(400, "Avatar is required")
    }

    const user = await User.create ({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(User._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering")
    }

    return res.status(200).json(
        new ApiRespone(200, createdUser, "User Registered Successfully!")
    )


})

export {registerUser}