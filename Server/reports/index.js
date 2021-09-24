const expenses = require('./expenses');
const incomes = require('./incomes');
const total = require('../db/totals');
const planReport = require('./plan');
const user = require('../db/user');
const dbLoans = require('../db/loan');

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const wholeReport = async (username) => {
  try {
    const expensesReport = await expenses.yearlyReport(username);
    const incomesReport = await incomes.yearlyReport(username);
    const report = new Array();

    expensesReport.map((yearExpenses) => {
      // Making each years expense report
      const thisYearIncome = incomesReport.filter(
        (years) => years.name === yearExpenses.name
      )[0];

      const yearReport = {
        name: yearExpenses.name,
        expense: yearExpenses.total,
        income: thisYearIncome.total,
        saving: thisYearIncome.total - yearExpenses.total,
        months: new Array(),
      };

      yearExpenses.expenses.map((monthExpenses) => {
        // Making each month of the year expense report
        const thisMonthIncome = thisYearIncome.incomes.filter(
          (month) => month.name === monthExpenses.name
        )[0];
        const monthReport = {
          name: MONTH_NAMES[monthExpenses.name],
          expense: monthExpenses.total,
          income: thisMonthIncome.total,
          saving: thisMonthIncome.total - monthExpenses.total,
          days: new Array(),
        };
        monthExpenses.expenses.map((dayExpense) => {
          // Making each day of the month expense report
          const todayIncome = parseInt(
            thisMonthIncome.total / MONTH_DAYS[monthExpenses.name]
          );
          monthReport.days.push({
            day: dayExpense.day,
            expense: dayExpense.amount,
            income: todayIncome,
            saving: todayIncome - dayExpense.amount,
          });
        });

        yearReport.months.push(JSON.parse(JSON.stringify(monthReport)));
      });

      report.push(JSON.parse(JSON.stringify(yearReport)));
    });

    return report;
  } catch (err) {
    console.log(err);
  }
};

const profileReport = async (username) => {
  const report = new Object();

  const thisMonthInReport = await incomes.thisMonthReport(username);
  const thisMonthExReport = await expenses.thisMonthReport(username);
  const todayExpenses = await expenses.todayReport(username);
  const totals = await total.getTotal(username);
  const dbUser = await user.getUser(username);

  const totalSaving = totals.totalInHand;

  const thisMonthIncome = thisMonthInReport.total;
  const thisMonthExpense = thisMonthExReport.total;
  const currentMonth = new Date().getMonth();

  const toSpendEveryday = Math.floor(
    thisMonthIncome / MONTH_DAYS[currentMonth]
  );

  // Getting status & amount of money to spend today
  report.incomeSurvived = toSpendEveryday >= thisMonthIncome - thisMonthExpense;
  const fromSavings = thisMonthIncome - thisMonthExpense <= 10;
  report.fromSavings = fromSavings;
  const noMoney = fromSavings && totalSaving <= toSpendEveryday;
  report.noMoney = noMoney;
  report.toSpendToday = noMoney ? totalSaving : toSpendEveryday;
  report.availableAmount = totalSaving;
  report.todayExpenses = todayExpenses.amount || 0;
  
  // User Related Report
  report.isIncomeRegular = dbUser.isIncomeRegular;
  report.hasPlan = dbUser.plan;
  report.incomeReceived = dbUser.incomeReceived;
  report.incomeAmount = dbUser.incomeAmount;
  report.userCompleteName = dbUser.completeName;
  
  // Plan Related Report
  if (!dbUser.plan) return report;
  
  const plan = await planReport(username);
  const toSaveEverDay = plan.dailySavings;

  report.canSaveMoney = toSpendEveryday > toSaveEverDay;
  report.planTotal = plan.total;
  report.planDuration = plan.duration;
  report.targetSave = plan.dailySavings;

  return report;
};

const debtReport = async (username) => {
  return dbLoans.getLoans(username);
};

module.exports = {
  wholeReport,
  profileReport,
  debtReport,
};
