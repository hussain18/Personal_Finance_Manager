const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userModel =  require('./userModel')
const planModel =  require('./planModel')
const expenseModel =  require('./expenseModel')
const incomeModel =  require('./incomeModel')

const saveModel = (model) => {
    model.save()
    .catch(err => console.log('MODEL_SAVING_ERROR: \n',err))
}

const findOneModel = (model, condition) => {
    model.findOne(condition)
    .exec((err, model) => {
        if (err) return handleError(err)
        return model
    })
}

const findModel = (model, condition) => {
    model.find(condition) 
    .exec((err, results) => {
        if (err) return handleError(err)
        return results
    })
}

module.exports = {
    userModel,
    planModel,
    expenseModel,
    incomeModel,
    saveModel,
    findOneModel,
    findModel,
}