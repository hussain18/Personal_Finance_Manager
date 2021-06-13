const mongoose = require('mongoose')
const user = require('./user')

// Database Connection
const connDB = () => {
    mongoose.connect("mongodb://localhost:27017/pfmDB", {
    useNewUrlParser: "true",
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
    })
    mongoose.connection.on("error", err => {
    console.log("DATABASE_CONNECTION_ERROR: \n", err)
    })
    mongoose.connection.on("connected", (err, res) => {
    console.log("DATABASE CONNECTION SUCCESSFUL")
    })
}

// Some demo database (it is not actual database it just represents it)
// Users should contain the followings:
// Full Name, user name, password, email
const users  = []

const getUserById = (username) => {
    const user =  users.filter((user) => user.username == username)
    if(user.length == 0 ) return null
    return user[0]
}

const addUser = (user) => {
    users.push(user)
}

const isUserUnique = (username) => {
    if(!username) return false
    const existingusers = users.filter((user) => user.username == username)
    if(existingusers.length > 0 ) return false
    return true
}

//test...
const allUsers = () => console.log(users)

module.exports = {
    getUserById,
    addUser,
    allUsers,
    isUserUnique,
    connDB,
    user,
}