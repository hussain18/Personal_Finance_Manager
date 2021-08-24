const mongoose = require('mongoose')
const user = require('./user')
const expense = require('./expense')
const income = require('./income')
const plan = require('./plan')
const loan = require('./loan')
const totals = require('./totals')

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

module.exports = {
    connDB,
    user,
    expense, 
    income,
    plan,
    loan,
}