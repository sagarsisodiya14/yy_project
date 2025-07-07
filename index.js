const express = require("express");
const connectDB = require('./config/db');
const cors = require("cors");
require('dotenv').config();
const app=express();
app.use(cors());
app.use(express.json());

const categoryRoutes = require("./routes/categoryRoutes");
app.use("/api/categories", categoryRoutes);

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: err.message || "Internal Server Error" });
});
connectDB();
app.use("/api/products", require("./routes/productRoutes"));
app.listen(3000,()=>{
    console.log("server running on port 3000");
})