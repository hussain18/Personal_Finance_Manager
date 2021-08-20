const models = require("../models");
const totals = require("./totals");
const incomeModel = models.incomeModel;

const addIncome = async ({ username, amount }) => {
  try {
    if (!username || !amount)
      throw new Error("username or amount is undefined");

    await totals.updateTotals({ username: username, income: amount });

    newIncomeModel = new incomeModel({
      username: username,
      amount: amount,
    });

    const newIncome = await models.saveModel(newIncomeModel);
    return {success: true};
  } catch (err) {
    console.log(err);
  }
};

const getIncomes = async (username) => {
  try {
    if (!username) throw new Error("username is undefined");
    const incomes = await models.findModel(incomeModel, { username: username });
    return incomes;
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addIncome,
  getIncomes,
};
