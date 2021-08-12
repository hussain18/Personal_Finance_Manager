const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    dateAdded: {
        type: String,
        default: new Date().toDateString(),
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