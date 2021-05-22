const express = require('express')


const app = express()
const PORT = '3001'

app.get('/', (req, res) => {
    res.send({start: "Hello world"})
})

// Listening
app.listen(PORT, () => {
    console.log('Server is listening on port 3001\n')
})