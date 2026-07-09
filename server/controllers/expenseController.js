const Expense = require("../models/postgres/Expense");

const addExpense = async (req, res) => {
  try {
    const { title, amount, category, type, date } = req.body;

    const expense = await Expense.create({
      title,
      amount,
      category,
      type,
      date,
      userId: req.user.id,
    });

    res.status(201).json({
      message: "Expense Added Successfully",
      expense,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll({
      where: {
        userId: req.user.id,
      },
    });

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addExpense,
  getExpenses,
};