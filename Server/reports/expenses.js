const dbExpense = require("../db").expense;

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
        day: date.getDay(),
        amount: expense.amount,
      };

      totalExpense += expense.amount;
      month.expenses.push({ ...dayReport });
    });

    month.total = totalExpense;
    // console.log(month) //test...
    report.push(JSON.parse(JSON.stringify(month)));
    return report;
  } catch (err) {
    console.log("reports.expenses.monthlyReport: ", err);
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
    console.log("reports.expenses.yearlyReport():", err);
  }
};

module.exports = yearlyReport;
