require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const tradingRoutes = require("./routes/trading");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URI;

const app = express();

app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api", tradingRoutes);

// Health check endpoint
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    service: "Zerodha Clone Full-Stack Backend API",
    dbConnected: mongoose.connection.readyState === 1,
    endpoints: [
      "/api/auth/register",
      "/api/auth/login",
      "/api/auth/demo-login",
      "/api/auth/me",
      "/api/watchlist",
      "/api/holdings",
      "/api/positions",
      "/api/orders",
      "/api/orders/new",
      "/api/funds",
      "/api/funds/add",
      "/api/funds/withdraw",
    ],
  });
});

// Backward-compatible legacy aliases
app.get("/allHoldings", (req, res, next) => {
  req.url = "/holdings";
  tradingRoutes(req, res, next);
});

app.get("/allPositions", (req, res, next) => {
  req.url = "/positions";
  tradingRoutes(req, res, next);
});

app.get("/allOrders", (req, res, next) => {
  req.url = "/orders";
  tradingRoutes(req, res, next);
});

app.post("/newOrder", (req, res, next) => {
  req.url = "/orders/new";
  tradingRoutes(req, res, next);
});

app.delete("/order/:id", (req, res, next) => {
  req.url = `/orders/${req.params.id}`;
  tradingRoutes(req, res, next);
});

// Start Server & Connect MongoDB
app.listen(PORT, async () => {
  console.log(`🚀 Zerodha Backend API running on port ${PORT}!`);
  try {
    if (!uri) {
      throw new Error("MONGO_URI environment variable is not defined.");
    }
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
  }
});
