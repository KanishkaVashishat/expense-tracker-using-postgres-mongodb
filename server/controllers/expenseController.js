const Expense = require("../models/postgres/Expense");
const { Op } = require("sequelize");

const addExpense = async (req, res) => {
  try {
    const { title, amount, category, type, date } = req.body;
      // Validation
    if (!title || !amount || !category || !type || !date) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (amount <= 0) {
      return res.status(400).json({
        message: "Amount must be greater than 0",
      });
    }

    if (type !== "Income" && type !== "Expense") {
      return res.status(400).json({
        message: "Type must be Income or Expense",
      });
    }


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
    const { search , category , sort ,page = 1, limit = 5 } = req.query;


    const whereCondition = {
      userId: req.user.id,
    };

    if (search) {
      whereCondition.title = {
        [Op.iLike]: `%${search}%`,
      };
    }
    if (category) {
  whereCondition.category = category;
}
let orderCondition = [["createdAt", "DESC"]];

if (sort === "oldest") {
  orderCondition = [["createdAt", "ASC"]];
}

if (sort === "highest") {
  orderCondition = [["amount", "DESC"]];
}

if (sort === "lowest") {
  orderCondition = [["amount", "ASC"]];
}
const offset = (page - 1) * limit;

    const expenses = await Expense.findAndCountAll({
      where: whereCondition,
      order: orderCondition,
      limit: Number(limit),
    offset: Number(offset),

    });

res.status(200).json({
  totalExpenses: expenses.count,
  currentPage: Number(page),
  totalPages: Math.ceil(expenses.count / limit),
  expenses: expenses.rows,
});
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