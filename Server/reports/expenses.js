const dbExpense = require('../db').expense;

// History Reports
const monthlyReport = async (username) => {
  try {
    const expenses = await dbExpense.getAll(username);
    const report = [];
    let month = new Object();
    let totalExpense = 0;

    expenses.map((expense) => {
      const date = new Date(expense.dateAdded);

      if (!month.name || !month.expenses) {
        month.name = date.getMonth();
        month.inYear = date.getFullYear();
        month.expenses = [];
      }

      if (date.getMonth() !== month.name) {
        month.total = totalExpense;
        report.push(JSON.parse(JSON.stringify(month)));
        month = {
          name: date.getMonth(),
          inYear: date.getFullYear(),
          expenses: [],
        };
      }

      const dayReport = {
        day: date.getDate(),
        amount: expense.amount,
      };

      totalExpense += expense.amount;
      month.expenses.push({ ...dayReport });
    });

    month.total = totalExpense;
    report.push(JSON.parse(JSON.stringify(month)));
    return report;
  } catch (err) {
    console.log('reports.expenses.monthlyReport: ', err);
  }
};

const yearlyReport = async (username) => {
  try {
    const eachMonth = await monthlyReport(username);
    const report = new Array();
    const year = new Object();
    let totalExpense = 0;

    eachMonth.map((month) => {
      const yearName = month.inYear;

      if (!year.name || !year.expenses) {
        year.name = yearName;
        year.expenses = new Array();
      }

      if (year.name !== yearName) {
        year.total = totalExpense;
        report.push(JSON.parse(JSON.stringify(year)));
        year = {
          name: yearName,
          expenses: new Array(),
        };
      }

      const reformedMonth = {
        name: month.name,
        expenses: [...month.expenses],
        total: month.total,
      };

      totalExpense += month.total;
      year.expenses.push({ ...reformedMonth });
    });

    year.total = totalExpense;
    report.push(JSON.parse(JSON.stringify(year)));

    return report;
  } catch (err) {
    console.log('reports.expenses.yearlyReport():', err);
  }
};

// Current Reports
const thisYearReport = async (username) => {
  const historyReport = await yearlyReport(username);
  const thisYear = new Date().getFullYear();

  return historyReport.filter((year) => year.name === thisYear)[0];
};

const thisMonthReport = async (username) => {
  const thisYearExpense = await thisYearReport(username);
  const historyReport = thisYearExpense.expenses;
  const thisMonth = new Date().getMonth();

  return historyReport.filter((month) => month.name === thisMonth)[0];
};

const todayReport = async (username) => {
  const thisMonthExpense = await thisMonthReport(username);
  const historyReport = thisMonthExpense.expenses;
  const today = new Date().getDate();

  return historyReport.filter((day) => day.day === today)[0];
};

module.exports = {
  thisYearReport,
  thisMonthReport,
  todayReport,
  yearlyReport,
};
