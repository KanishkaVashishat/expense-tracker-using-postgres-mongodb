function SummaryCards({ dashboardData }) {
  return (
    <div className="summary-cards">

      <div className="card income">
        <h3>Total Income</h3>
        <h2>₹ {dashboardData.totalIncome}</h2>
      </div>

      <div className="card expense">
        <h3>Total Expense</h3>
        <h2>₹ {dashboardData.totalExpense}</h2>
      </div>

      <div className="card balance">
        <h3>Balance</h3>
        <h2>₹ {dashboardData.balance}</h2>
      </div>

      <div className="card transaction">
        <h3>Transactions</h3>
        <h2>{dashboardData.totalTransactions}</h2>
      </div>

    </div>
  );
}

export default SummaryCards;