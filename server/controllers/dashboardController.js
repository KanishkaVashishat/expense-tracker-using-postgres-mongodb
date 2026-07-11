const Expense = require("../models/postgres/Expense");

const getDashboard = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      where: {
        userId: req.user.id,
      },
    });

    let totalIncome = 0;
    let totalExpense = 0;

    expenses.forEach((expense) => {
      if (expense.type === "Income") {
        totalIncome += expense.amount;
      } else {
        totalExpense += expense.amount;
      }
    });

    const balance = totalIncome - totalExpense;

    res.status(200).json({
      totalIncome,
      totalExpense,
      balance,
      totalTransactions: expenses.length,
      expenses,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};