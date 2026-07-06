const dotenv = require("dotenv")
const express = require('express');
const sequelize = require("./config/postgres");
const User = require("./models/postgres/User");

dotenv.config();


const app = express();
app.use(express.json());
const PORT = process.env.PORT||5000;

app.get("/",(req,res)=>{
    res.send("expense tracker api is running");
});
sequelize 
.authenticate()
.then(async()=>{
    
     console.log("✅ Connected to PostgreSQL");

    await sequelize.sync();

    console.log("✅ Tables synchronized");
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
    
});
})
 .catch((err) => {
    console.error("❌ PostgreSQL Connection Failed");
    console.error(err.message);
  })