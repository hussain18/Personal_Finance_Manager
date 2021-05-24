const express = require('express')
const cors = require("cors")
const jwt = require('jsonwebtoken')
const auth = require('./auth.js')
require('dotenv').config()

app = express()
PORT = process.env.PORT || 3001

// Express Use
app.use(cors())
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))

// Auth assets
const authenticateToken = auth.authenticateToken
const createToken = auth.createTokens

// TEST...
let refreshTokens = []

app.get('/', (req, res) => {
    res.send('Hooray Server is RUNNING :)')
})

// Authoriztion Test...
app.get('/users',authenticateToken, (req, res) => {
    res.json({userID: 'something',
        status: 'success'})
})

app.post('/posts', (req, res) => {
    console.log(req.body)
    res.json(req.body)
})

// Authentication Test...
app.post('/login', (req, res) => {
    //User authentication

    //Token Creation 
    const userName = req.body.userName
    const user = {name: userName}

    const accessToken = createToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_ACCESS_TOKEN_SECRET)
    refreshTokens.push(refreshToken)
    res.json({accessToken: accessToken, refreshToken: refreshToken})
})

app.post('/refresh-token', (req, res) => {
    const refreshToken = req.body.token
    if(!refreshToken) return res.sendStatus(401)
    if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken,process.env.REFRESH_ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) return res.sendStatus(403)
        const accessToken = createToken({name: user.name})
        return res.json({token: accessToken})
    })
})

app.delete('/logout', (req, res) => {
    userToken = req.body.token
    if(!userToken) return res.sendStatus(400)
    refreshTokens = refreshTokens.filter((token) => token != req.body.token)
    return res.sendStatus(200)
})

// Listening
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})


// TODO: Up Next Task is to use mongoose to connect to database
// study: https://www.phpcodingstuff.com/blog/how-to-connect-mongoose-with-express-application.html