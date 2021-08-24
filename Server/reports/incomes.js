const dbIncomes = require("../db").income;

const monthlyReport = async (username) => {
  try {
    const incomes = await dbIncomes.getIncomes(username);
    const report = [];
    let month = new Object();
    let totalIncome = 0;

    incomes.map((income) => {
      const date = new Date(income.date);

      if (!month.name || !month.incomes) {
        month.name = date.getMonth();
        month.inYear = date.getFullYear();
        month.incomes = [];
      }

      if (date.getMonth() !== month.name) {
        month.total = totalIncome;
        report.push(JSON.parse(JSON.stringify(month)));
        month = {
          name: date.getMonth(),
          inYear: date.getFullYear(),
          incomes: [],
        };
      }

      const dayReport = {
        day: date.getDay(),
        amount: income.amount,
      };

      totalIncome += income.amount;
      month.incomes.push({ ...dayReport });
    });

    month.total = totalIncome;
    report.push(JSON.parse(JSON.stringify(month)));
    return report;
  } catch (err) {
    console.log("reports.incomes.monthlyReport: ", err);
  }
};

const yearlyReport = async (username) => {
  try {
    const eachMonth = await monthlyReport(username);
    const report = new Array();
    const year = new Object();
    let totalIncome = 0;

    eachMonth.map((month) => {
      const yearName = month.inYear;

      if (!year.name || !year.incomes) {
        year.name = yearName;
        year.incomes = new Array();
      }

      if (year.name !== yearName) {
        year.total = totalIncome;
        report.push(JSON.parse(JSON.stringify(year)));
        year = {
          name: yearName,
          incomes: new Array(),
        };
      }

      const reformedMonth = {
        name: month.name,
        incomes: [...month.incomes],
        total: month.total,
      };

      totalIncome += month.total;
      year.incomes.push({ ...reformedMonth });
    });

    year.total = totalIncome;
    report.push(JSON.parse(JSON.stringify(year)));

    return report;
  } catch (err) {
    console.log("reports.incomes.yearlyReport():", err);
  }
};

module.exports = yearlyReport;
