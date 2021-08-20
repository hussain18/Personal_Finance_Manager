const models = require("../models");
const totals = require("./totals");
const loanModel = models.loanModel;

const makeLoan = async ({ username, amount, duration, isDebt, toPerson }) => {
  try {
    if (!username || !amount || !duration || isDebt === undefined)
      throw new Error("db.loan.js: Some data are missing");

    const canUpdateTotal = await totals.updateTotals({
      username: username,
      amount: amount,
      isDebt: isDebt,
    });

    if (!isDebt && !canUpdateTotal)
      return { success: false, message: "you can't lend the amount" };

    const newLoan = new loanModel({
      username: username,
      amount: amount,
      duration: duration,
      isDebt: isDebt,
      toPerson: toPerson,
    });

    await models.saveModel(newLoan);
    return { success: true };
  } catch (err) {
    console.log(err);
  }
};

const getLoans = async (username) => {
  try {
    if (!username) throw new Error("db.loan.js: username is null");

    const loans = await models.findModel(loanModel, { username: username });

    return loans;
  } catch (err) {
    console.log(err);
  }
};

const setLoanInactive = async (loanID, username) => {
  try {
    if (!loanID || !username)
      throw new Error("db.loan.js: loanID/username is null");

    // Update totals table
    const loan = await models.findOneModel(loanModel, { _id: loanID });
    const canUpdateTotal = await totals.updateTotals({
      username: username,
      amount: loan.amount,
      isDebt: !loan.isDebt,
    });

    if (!canUpdateTotal)
      return {
        success: false,
        message: "You don't have enough money to pay the debt",
      };

    await models.findOneAndUpdate(
      loanModel,
      { _id: loanID, username: username },
      { isActive: false }
    );

    return { success: true };
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  makeLoan,
  getLoans,
  setLoanInactive,
};
