const express = require('express')
const cors = require("cors")
const jwt = require('jsonwebtoken')
const auth = require('./auth.js')
const bcrypt = require('bcrypt')
const db = require('./db')
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
const saltRound = 10

app.get('/', (req, res) => {
    res.send('Hooray Server is RUNNING :)')
})

// Authorization Test...
app.get('/users',authenticateToken, (req, res) => {
    res.json({userID: 'something',
        status: 'success'})
})

app.post('/posts', (req, res) => {
    console.log(req.body)
    res.json(req.body)
})

// Authentication routes
app.post('/login', (req, res) => {
    const user = req.body

    if (!user) return res.sendStatus(400)

    //User authentication
    auth.authenticateUser(user).then((result) => {
        if(!result) return res.sendStatus(400)

        //Token Creation 
        const userName = user.username
        const User = {name: userName}

        const accessToken = createToken(User)
        const refreshToken = jwt.sign(User, process.env.REFRESH_ACCESS_TOKEN_SECRET)
        res.json({accessToken: accessToken, refreshToken: refreshToken})

    })

})

app.post('/signup', (req, res) => {
    const userData = req.body

    if (!userData) return res.sendStatus(400)

    const password = userData.password
    const username = userData.username
    if (!password || !db.isUserUnique(username)) return res.sendStatus(400)

    bcrypt.hash(password, saltRound, (err,hash) => {
        if (err) {
            console.log(err)
            return res.sendStatus(500)
        }

        userData.password = hash
        db.addUser(userData)
        db.allUsers()
        
        // create jwt token
        const User = {name: username}
        const accessToken = createToken(User)
        const refreshToken = jwt.sign(User, process.env.REFRESH_ACCESS_TOKEN_SECRET)
        res.json({accessToken: accessToken, refreshToken: refreshToken})
    })

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


// Listening
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})


// TODO: Up Next Task is to use mongoose to connect to database
// study: https://www.phpcodingstuff.com/blog/how-to-connect-mongoose-with-express-application.html