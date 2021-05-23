const axios = require('axios').default

const SERVER_URL = 'http://localhost:3001'

async function GET(url) {
    const res = await axios.get(SERVER_URL+url)
    return res.data;
}

async function POST(url, body){
    const response = await axios.post(SERVER_URL+url, {s: 'success'}) 
    console.log(response.data)
}

module.exports = {
    GET,
    POST,
}
