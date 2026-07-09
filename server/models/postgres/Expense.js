const { DataTypes } = require("sequelize");
const sequelize = require("../../config/postgres");

const Expense = sequelize.define(
  "Expense",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    type: {
      type: DataTypes.ENUM("Income", "Expense"),
      allowNull: false,
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "expenses",
    timestamps: true,
  }
);

module.exports = Expense;