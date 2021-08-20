const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loanSchema = new Schema({
    amount: {
        type: Number,
        required: true,
        min: 100
    },
    duration: {
        type: Number,
        required: true,
        min: 1,
    }, 
    Date: {
        type: String,
        default: new Date().toDateString(),
        required: true
    },
    username: {
        type: String,
        required:true,
    },
    isDebt: {
        type: Boolean,
        required: true,
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    toPerson: {
        type: String,
        default: 'Unknown'
    }
})

const loadModel = mongoose.model('loan', loanSchema)

module.exports = loadModel