const express = require("express")
const authRouter = express.Router()
const { registerUser, loginUser, getProfile, logoutUser } = require("../controllers/auth.controller")
const authMiddleware = require("../middleware/auth.middleware")

authRouter.post("/register", registerUser)
authRouter.post("/login", loginUser)
authRouter.get("/profile", authMiddleware, getProfile)
authRouter.post("/logout", logoutUser)

module.exports = authRouter