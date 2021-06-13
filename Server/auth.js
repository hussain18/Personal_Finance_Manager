const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const db = require('./db')

// Authenticate user
const authenticateUser = async (user) => {
    const password = user.password
    const username = user.username

    if(!username || !password) return false

    const dbUser = await db.user.getUser(username) 
    if(!dbUser) return false

    const hash = dbUser.password

    try{
        console.log(dbUser)
        console.log(hash, password)//test...
        const result = await bcrypt.compare(password, hash)
        return result
    } catch (err) {
        console.log('USER_PASSWORD_MATCHING_ERROR: \n' + err) 
        return false;
    }
}

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
    // TODO: should think of how much expiration time is the best
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1m'})
}


module.exports = {
    authenticateToken,
    createTokens,
    authenticateUser,
}