const mongoose = require('mongoose')
const user = require('./user')
const expense = require('./expense')
const income = require('./income')
const plan = require('./plan')

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
    expense, 
    income,
    plan,
}