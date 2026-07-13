import { useEffect, useState } from "react";
import API from "../services/api";
import "./Dashboard.css";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import SummaryCards from "../components/SummaryCards";
import DashboardCharts from "../components/DashboardCharts";
import RecentTransactions from "../components/RecentTransactions";


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

        <SummaryCards dashboardData={dashboard} />
        <DashboardCharts dashboardData={dashboard} />


        <RecentTransactions expenses={dashboard.expenses} />

      </div>
      </div>
    
  </>
);

}
export default Dashboard;