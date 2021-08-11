const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    completeName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    }, 
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    isIncomeRegular: {
        type: Boolean,
        required: true,
    }, 
    incomeAmount: {
        type: Number,
        min: 0,
    },
    expenses: [{
        type: String,
        required: false,
    }],
    Incomes: [{
        type: String,
        required: false,
    }],
    plan: {
        type: String,
        required: false,
    }

})

module.exports = mongoose.model('user', userSchema)