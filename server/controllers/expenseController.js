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

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    await expense.update(req.body);

    res.status(200).json({
      message: "Expense Updated Successfully",
      expense,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!expense) {
      return res.status(404).json({
        message: "Expense not found",
      });
    }

    await expense.destroy();

    res.status(200).json({
      message: "Expense Deleted Successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
};