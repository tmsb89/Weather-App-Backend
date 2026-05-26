const historyModel = require("../models/history.model")

async function getHistory(req, res) {

    const history = await historyModel.find({
        user: req.user._id
    }).sort({ createdAt: -1 })

    res.status(200).json({
        history
    })
}

async function deleteHistory(req, res) {

    const { id } = req.params

    await historyModel.findByIdAndDelete(id)

    res.status(200).json({
        message: "History deleted successfully"
    })
}

module.exports = {
    getHistory,
    deleteHistory
}