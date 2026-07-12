import { useEffect, useState } from "react";
import API from "../services/api";
import "./Dashboard.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    totalTransactions: 0,
    expenses: [],
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("/dashboard");
      setDashboard(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
  <>
    <Navbar />

    <div style={{ display: "flex" }}>
      <Sidebar />

      <div className="dashboard">

        {/* Keep ALL your existing dashboard code here */}

        <h1>Expense Tracker Dashboard</h1>

        <div className="cards">

          <div className="card income">
            <h2>Total Income</h2>
            <h3>₹ {dashboard.totalIncome}</h3>
          </div>

          <div className="card expense">
            <h2>Total Expense</h2>
            <h3>₹ {dashboard.totalExpense}</h3>
          </div>

          <div className="card balance">
            <h2>Balance</h2>
            <h3>₹ {dashboard.balance}</h3>
          </div>

          <div className="card transactions">
            <h2>Transactions</h2>
            <h3>{dashboard.totalTransactions}</h3>
          </div>

        </div>

        <div className="recent">

          <h2>Recent Transactions</h2>

          <table>

            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Type</th>
              </tr>
            </thead>

            <tbody>

              {dashboard.expenses.map((expense) => (
                <tr key={expense.id}>
                  <td>{expense.title}</td>
                  <td>{expense.category}</td>
                  <td>₹ {expense.amount}</td>
                  <td>{expense.type}</td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>
    </div>
  </>
);

}
export default Dashboard;