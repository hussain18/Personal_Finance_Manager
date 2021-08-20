const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const totalsSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    }, 
    totalIncome: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    totalExpense: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    },
    totalInHand: {
        type: Number,
        required: true,
        default: 0,
        min: 0
    }

})

module.exports = mongoose.model('totals', totalsSchema)