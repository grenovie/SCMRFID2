const express = require("express");
const dotenv = require("dotenv");
const { connectDB, connectDB2 } = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const scannerRoutes = require("./routes/scannerRoutes");
const adminRoutes = require("./routes/adminRoutes");
const getDataRoutes = require("./routes/getDataRoutes");
const app = express();
dotenv.config();
connectDB();
// connectDB2();
app.use(express.json()); // to accept JSON data

app.get("/", (req, res) => {
  res.send("This is Server for Universidad De Manila (REST API)");
});

app.use("/api/user", userRoutes);
app.use("/api/tags", scannerRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/data", getDataRoutes);
app.listen(3002, console.log("Server Started on PORT 3002".yellow.bold));
