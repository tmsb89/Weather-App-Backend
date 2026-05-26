const express = require("express")
const cors = require("cors")
const authRouter = require("./routes/auth.routes")
const weatherRouter = require("./routes/weather.routes")
const historyRouter = require("./routes/history.routes")

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/weather", weatherRouter)
app.use("/api/history", historyRouter)

module.exports = app