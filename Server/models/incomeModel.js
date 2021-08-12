const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
    amount: {
        type: Number,
        required: true,
        min: 1
    },
    date: {
        type: String,
        default: new Date().toUTCString(),
        required: true,
    },
    username: {
        type: String,
        required:true,
    }

})

const incomeModel = mongoose.model('income', incomeSchema)

module.exports = incomeModel