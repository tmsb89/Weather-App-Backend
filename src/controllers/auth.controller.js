const bcrypt = require("bcryptjs")
const generateToken = require("../utils/generateToken")
const userModel = require("../models/user.model")

async function registerUser(req, res){
    const { name, email, password } = req.body 

    const isUserAlreadyExists = await userModel.findOne({ email })

    if(isUserAlreadyExists){
        return res.status(409).json({
            message: "User Already exists, use another email"
        })
    } 

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        name, 
        email, 
        password: hash
    })

    const token = generateToken(user)

    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    })
}

async function loginUser(req, res) {
    const { password, email} = req.body
    
    const user = await userModel.findOne({email})

    if(!user){
        return res.status(404).json({
            message: "user not found",
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid){
        return res.status(401).json({
            message: "password Invalid"
        })
    }

    const token = generateToken(user)

    res.cookie("token", token)

    res.status(200).json({
        message: "User logged in successfully",
        token,
        user: {
            id: user._id,
            name: user.name,
            email: user.email
        }
    })
}

async function getProfile(req, res) {
    res.status(200).json({
        message: "Profile fetched successfully",
        user: req.user
    })
}

async function logoutUser(req, res) {

    res.clearCookie("token")

    res.status(200).json({
        message: "User logged out successfully"
    })
}

module.exports= {
    registerUser,
    loginUser,
    getProfile,
    logoutUser
}
