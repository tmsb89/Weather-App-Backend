const dns = require("dns")
const mongoose = require("mongoose")

dns.setServers(["8.8.8.8", "1.1.1.1"])

function connectToDb() {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connected to datatbase")
        })
        .catch((err) => {
            console.log(err)
        })
}

module.exports = connectToDb