const expenses = require('./expenses');
const plan = require('./plan');
const incomes = require('./incomes');
const total = require('../db/totals');
const planReport = require('./plan');
const user = require('../db/user');

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
    const expensesReport = await expenses(username);
    const incomesReport = await incomes(username);
    const report = new Array();

    // console.log(expensesReport)//test...

    expensesReport.map((yearExpenses) => {
      // Making each years expense report
      const thisYearIncome = incomesReport.filter(
        (years) => years.name === yearExpenses.name
      )[0];
      console.log(thisYearIncome); //test...

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

  const income = await incomes(username);
  const expense = await expenses(username);
  const totals = await total.getTotal(username);
  const plan = await planReport(username)
  const dbUser = await user.getUser(username);

  const totalSaving = totals.totalInHand
  const thisMonthIncome = income[income.length - 1].total;
  const thisMonthExpense = expense[expense.length - 1].total;
  const currentMonth = new Date().getMonth()

  const toSpendEveryday = Math.floor(thisMonthIncome/MONTH_DAYS[currentMonth])
  const toSaveEverDay = plan.dailySavings

  // Getting status & amount of money to spend today
  report.canSaveMoney = toSpendEveryday > toSaveEverDay 
  report.incomeSurvived = toSpendEveryday >= (thisMonthIncome - thisMonthExpense) 
  const fromSavings = (thisMonthIncome - thisMonthExpense) <= 10 
  report.fromSavings = fromSavings
  const noMoney = (fromSavings && (totalSaving <= toSpendEveryday))
  report.noMoney = noMoney
  report.toSpendToday = noMoney ? totalSaving : toSpendEveryday
  report.availableAmount = totalSaving

  // User Related Report
  report.isIncomeRegular = dbUser.isIncomeRegular
  report.hasPlan = dbUser.plan
  report.incomeReceived = dbUser.incomeReceived
  report.incomeAmount = dbUser.incomeAmount
  report.userCompleteName = dbUser.completeName
  
  // Plan Related Report
  report.planTotal = plan.total
  report.planDuration = plan.duration
  report.targetSave = plan.dailySavings

  return report
};

const debtReport = async () => {
  // Creates a report object for profile page
};

module.exports = {
  wholeReport,
  profileReport,
  debtReport,
};
