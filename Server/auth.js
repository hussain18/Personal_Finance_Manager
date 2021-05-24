const jwt = require('jsonwebtoken')

// Authenticate user

// Authenticate tokens
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization
    const token = authHeader && authHeader
    if(token == null) return res.sendStatus(401)
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

// Create Tokens
const createTokens = (user) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1m'})
}


module.exports = {
    authenticateToken,
    createTokens
}