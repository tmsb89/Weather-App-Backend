const jwt = require("jsonwebtoken")

function generateToken(user) {
    const token = jwt.sign({
        id: user._id,
        email: user.email
    }, process.env.JWT_SEC,
        {
            expiresIn: "7d"
        }
    )
    return token
}

module.exports = generateToken
