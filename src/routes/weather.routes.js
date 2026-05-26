const express = require("express")
const weatherRouter = express.Router()

const { getCurrentWeather } = require("../controllers/weather.controller")
const authMiddleware = require("../middleware/auth.middleware")

weatherRouter.get("/:city", authMiddleware, getCurrentWeather)

module.exports = weatherRouter