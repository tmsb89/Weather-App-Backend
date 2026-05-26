const { getWeatherByCity } = require("../services/weather.service")
const historyModel = require("../models/history.model")

async function getCurrentWeather(req, res){
    try{
        const { city } = req.params

        const weatherData = await getWeatherByCity(city)
        
        await historyModel.create({
            user: req.user._id,
            city: weatherData.name,
            temperature: weatherData.main.temp,
            condition: weatherData.weather[0].main
        })

        res.status(200).json({
            city: weatherData.name,
            temprature: weatherData.main.temp,
            humidity: weatherData.main.humidity,
            condition: weatherData.weather[0].main,
            windSpeed: weatherData.wind.speed
        })

    } catch(error){
        res.status(500).json({
            message: "Failed to fetch weather data",
            error: error.response?.data || error.message
        })
    }
}

module.exports = {
    getCurrentWeather
}
