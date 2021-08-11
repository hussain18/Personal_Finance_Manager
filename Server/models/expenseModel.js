const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    year: {
        type: String,
        required: true,
    },
    month: {
        type: String,
        required: true,
    },
    day: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0
    },
    username: {
        type: String,
        required:true,
    }

})

const expenseModel = mongoose.model('expense', expenseSchema)

module.exports = expenseModel