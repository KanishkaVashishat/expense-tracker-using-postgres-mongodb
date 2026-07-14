import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

function DashboardCharts({ dashboardData }) {

  const data = [
    {
      name: "Income",
      value: dashboardData.totalIncome,
    },
    {
      name: "Expense",
      value: dashboardData.totalExpense,
    },
  ];
  const monthlyData = [
  { month: "Jan", expense: 5000 },
  { month: "Feb", expense: 3000 },
  { month: "Mar", expense: 4500 },
  { month: "Apr", expense: 2500 },
  { month: "May", expense: 6000 },
  { month: "Jun", expense: 4000 },
];

  const COLORS = ["#5FA893", "#C1666B"];

  return (
    <div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginTop: "30px",
  }}
>

  {/* Pie Chart */}

  <div
    className="charts-container">
    <h2>Income vs Expense</h2>

    <div
      style={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <PieChart width={400} height={230}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={70}
          dataKey="value"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>

  </div>

  {/* Bar Chart */}

  <div
    style={{
      background: "#0F1E1B",
      padding: "10px",
      borderRadius: "12px",
    }}
  >
    <h2 >Monthly Expenses</h2>

    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={monthlyData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="expense" fill="#5FA893 " />
      </BarChart>
    </ResponsiveContainer>

  </div>

</div>
  );
}

export default DashboardCharts;