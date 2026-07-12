const dotenv = require("dotenv")
const express = require('express');
const sequelize = require("./config/postgres");
const User = require("./models/postgres/User");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const Expense = require("./models/postgres/Expense");
const expenseRoutes = require("./routes/expenseRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const cors = require("cors");
dotenv.config();


const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api/expenses", expenseRoutes);
app.use("/api/dashboard", dashboardRoutes);
const PORT = process.env.PORT||5000;

app.get("/",(req,res)=>{
    res.send("expense tracker api is running");
});
app.get("/profile",authMiddleware,(req,res)=>{
    res.json({
        message : "welcome to the profile"
    })
})
sequelize.authenticate()
.then(async () => {

    console.log("Connected to PostgreSQL");

    await sequelize.sync();

    console.log("Database Synced");

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });

})

     .catch((err) => {
    console.error("❌ PostgreSQL Connection Failed");
    console.error(err.message);
});
 