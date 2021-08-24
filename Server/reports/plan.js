const dbPlan = require("../db").plan;

const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const planReport = async (username) => {
  try {
    const plan = await dbPlan.getPlan(username);
    const report = new Object();
    const amount = plan.amount;
    const startMonth = new Date(plan.Date).getMonth();
    const duration = plan.duration;

    report.dailySavings = _getEveryDaySavings(amount, duration, startMonth);

    report.monthlySavings = _getEveryMonthSavings(
      report.dailySavings,
      duration,
      startMonth
    );

    return report;
  } catch (e) {
    console.log("reports.plan.planReport():", e);
  }
};

// Helper functions
const _getEveryDaySavings = (amount, duration, startMonth) => {
  const monthDays = MONTH_DAYS.slice(startMonth, startMonth + duration).reduce(
    (sum, days) => (sum += days)
  );

  return parseInt(amount / monthDays);
};

const _getEveryMonthSavings = (dailySavings, duration, startMonth) => {
  const monthlySavings = new Array();

  MONTH_DAYS.slice(startMonth, startMonth + duration).map((days, month) => {
    monthlySavings.push({
      monthName: month + startMonth,
      saving: days * dailySavings,
    });
  });

  return monthlySavings;
};

module.exports = planReport;
