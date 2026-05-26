const express = require("express")
const historyRouter = express.Router()

const {
    getHistory,
    deleteHistory
} = require("../controllers/history.controller")

const authMiddleware = require("../middleware/auth.middleware")

historyRouter.get("/", authMiddleware, getHistory)

historyRouter.delete("/:id", authMiddleware, deleteHistory)

module.exports = historyRouter