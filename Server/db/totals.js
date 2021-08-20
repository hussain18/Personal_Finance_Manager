const models = require("../models");
const totalsModel = models.totalsModel;

const updateTotals = async (updatingData) => {
  try {
    const username = updatingData.username;
    const expense = updatingData.expense;
    const income = updatingData.income;
    const amount = updatingData.amount;
    let canUpdate = true; //check whether update can happen

    if (!username)
      throw new Error("db.totals.js: updateTotals(): Some data are missing");

    // Getting totals
    let total = await getTotal(username);

    if (!total) {
      canUpdate = false;
      total = _newTotal(username);
    }

    // Updating total
    if (!expense && !income && !amount) return false;

    if (expense && canUpdate)
      canUpdate = await _updateWithExpense(username, expense, total);
    if (income) canUpdate = await _updateWithIncome(username, income, total);
    if (amount) canUpdate = await _updateWithDebt(updatingData, total);

    return canUpdate;
  } catch (err) {
    console.log(err);
  }
};

const getTotal = async (username) => {
  try {
    if (!username)
      throw new Error("db.totals.js: getTotal(): username is null");

    const total = await models.findOneModel(totalsModel, {
      username: username,
    });

    return total;
  } catch (err) {
    console.log(err);
  }
};

// Helpers
const _newTotal = async (username) => {
  try {
    const newTotal = new totalsModel({
      username: username,
    });

    await models.saveModel(newTotal);
    return { success: true };
  } catch (err) {
    console.log(err);
  }
};

const _updateWithIncome = async (username, income, total) => {
  const newTotalIncome = total.totalIncome + income;
  const newTotalInHand = total.totalInHand + income;

  await models.findOneAndUpdate(
    totalsModel,
    { username: username },
    { totalIncome: newTotalIncome, totalInHand: newTotalInHand }
  );

  return true;
};

const _updateWithExpense = async (username, expense, total) => {
  const newTotalExpense = total.totalExpense + expense;
  const newTotalInHand = total.totalInHand - expense;

  if (newTotalInHand < 0) return false;

  await models.findOneAndUpdate(
    totalsModel,
    { username: username },
    { totalExpense: newTotalExpense, totalInHand: newTotalInHand }
  );

  return true;
};

const _updateWithDebt = async (updatedData, total) => {
  const newTotalInHand = updatedData.isDebt
    ? total.totalInHand + updatedData.amount
    : total.totalInHand - updatedData.amount;

  if (newTotalInHand < 0) return false;

  await models.findOneAndUpdate(
    totalsModel,
    { username: updatedData.username },
    { totalInHand: newTotalInHand }
  );

  return true;
};

module.exports = {
  updateTotals,
  getTotal,
};
