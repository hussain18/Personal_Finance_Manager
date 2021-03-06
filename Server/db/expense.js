const models = require("../models");
const totals = require("./totals");
const expenseModel = models.expenseModel;

const create = async ({ username, amount }) => {
  try {
    if (!username || !amount)
      throw new Error("Username or amount is undefined");

    const canUpdate = await totals.updateTotals({
      username: username,
      expense: amount,
    });
    if (!canUpdate)
      return { success: false, message: "Not enough money to spend" };

    // Creating an expense model's data
    const expenseData = { username, amount };

    const newExpense = new expenseModel(expenseData);
    await models.saveModel(newExpense);
    return { success: true };
  } catch (err) {
    console.log(err);
  }
};

const getAll = async (username) => {
  try {
    if (!username) throw new Error("Username is undefined");
    const expenses = await models.findModel(expenseModel, {
      username: username,
    });
    return expenses;
  } catch (err) {
    console.log(err);
  }
};

const getLastDayExpense = async (username) => {
  try {
    // to get or create a record for today's expenses
    const today = new Date().toDateString();
    const todayExpense = await models.findOneModel(expenseModel, {
      username: username,
      dateAdded: today,
    });

    return todayExpense ? true : false;
  } catch (err) {
    console.log(err);
  }
};

const update = async ({ username, amount }) => {
  try {
    if (!username || !amount)
      throw new Error("db.expense.update(): username/amount is undefined");

    const canUpdate = await totals.updateTotals({
      username: username,
      expense: amount,
    });
    if (!canUpdate)
      return { success: false, message: "Not enough money to spend" };

    const today = new Date().toDateString();
    const oldExpense = await models.findOneModel(expenseModel, {
      username: username,
      dateAdded: today,
    });
    const newExpense = { amount: oldExpense.amount + amount };
    const updated = await models.findOneAndUpdate(
      expenseModel,
      { username: username, dateAdded: today },
      newExpense
    );
    return {success: true};
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  create,
  getAll,
  getLastDayExpense,
  update,
};
