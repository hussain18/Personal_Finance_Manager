const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userModel =  require('./userModel')
const planModel =  require('./planModel')
const expenseModel =  require('./expenseModel')
const incomeModel =  require('./incomeModel')

const saveModel = async (model) => {
    try {
        if (!model) throw new Error("No/Null/Undefined Model passed")
        await model.save(model)
    } catch (err) {
        console.log('MODEL_SAVING_ERROR: \n',err)
    }
}

const findOneModel = async (model, condition) => {

    try{
        const record = await model.findOne(condition).exec()
        return record
    } catch (err) {
        return handleError(err)
    }
}

const findModel = async (model, condition) => {
    try{
        const records = await model.find(condition).exec()
        return records
    } catch (err) {
        return handleError(err)
    }
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