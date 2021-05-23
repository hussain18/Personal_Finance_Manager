const express = require('express')
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");


const app = express()
const PORT = '3001'

// Express Use
app.use(cors())
app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.send('Hooray Server is RUNNING :)')
})

app.get('/users', (req, res) => {
    res.json({userID: 'something',
        status: 'success'})
})

app.post('/posts', (req, res) => {
    console.log(req.body)
    res.json(req.body)
})

// Listening
app.listen(PORT, () => {
    console.log('Server is listening on port 3001\n')
})