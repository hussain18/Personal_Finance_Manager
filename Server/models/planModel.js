const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planSchema = new Schema({
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
        unique: true
    }

})

const planModel = mongoose.model('plan', planSchema)

module.exports = planModel