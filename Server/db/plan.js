const models = require("../models");
const planModel = models.planModel;

const makePlan = async ({ username, amount, duration }) => {
  try {
    if (!username || !amount || !duration)
      throw new Error("Some data are missing");

    const plan = await getPlan(username);
    if (plan)
      return { success: false, message: "more than one plan not allowed" };

    //TODO: here plan that user wishes to make should be validated i.e. is user's saving amount is reasonable?

    const newPlanModel = new planModel({
      username: username,
      amount: amount,
      duration: duration,
    });

    await models.saveModel(newPlanModel);
    return { success: true };
  } catch (err) {
    console.log(err);
  }
};

const getPlan = async (username) => {
  try {
    if (!username) throw new Error("Username is null");

    const plan = await models.findOneModel(planModel, { username: username });
    return plan;
  } catch (err) {
    console.log(err);
  }
};

const removePlan = async (username) => {
  try {
    if (!username) throw new Error("username is null");

    await planModel.findOneAndDelete({ username: username });

    return { success: true, message: "plan deleted" };
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  makePlan,
  getPlan,
  removePlan,
};
