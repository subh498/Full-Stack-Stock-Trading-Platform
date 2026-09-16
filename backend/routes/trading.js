const express = require("express");
const { HoldingsModel } = require("../model/HoldingsModel");
const { PositionsModel } = require("../model/PositionsModel");
const { OrdersModel } = require("../model/OrdersModel");
const { UserModel } = require("../model/UserModel");
const { optionalAuthMiddleware } = require("../middleware/auth");

const router = express.Router();

// Initial Stock Master Data for Market & Watchlist
const initialStocks = [
  { name: "INFY", price: 1555.45, percent: "-1.60%", isDown: true },
  { name: "TCS", price: 3194.8, percent: "-0.25%", isDown: true },
  { name: "RELIANCE", price: 2112.4, percent: "+1.44%", isDown: false },
  { name: "HDFCBANK", price: 1522.35, percent: "+0.11%", isDown: false },
  { name: "TATAPOWER", price: 124.15, percent: "+19.15%", isDown: false },
  { name: "SBIN", price: 430.2, percent: "-0.34%", isDown: true },
  { name: "ITC", price: 207.9, percent: "+0.80%", isDown: false },
  { name: "WIPRO", price: 577.75, percent: "+0.32%", isDown: false },
  { name: "KPITTECH", price: 266.45, percent: "+3.54%", isDown: false },
  { name: "BHARTIARTL", price: 541.15, percent: "+2.99%", isDown: false },
  { name: "HINDUNILVR", price: 2417.4, percent: "+0.21%", isDown: false },
  { name: "ONGC", price: 116.8, percent: "-0.09%", isDown: true },
  { name: "M&M", price: 779.8, percent: "-0.01%", isDown: true },
];

// In-memory live stock state with dynamic realistic price variations
let liveStockState = initialStocks.map((s) => ({ ...s }));

// Helper to update dynamic price variations periodically
setInterval(() => {
  liveStockState = liveStockState.map((stock) => {
    const deltaPercent = (Math.random() * 0.4 - 0.2); // -0.2% to +0.2%
    const newPrice = Math.max(10, +(stock.price * (1 + deltaPercent / 100)).toFixed(2));
    const isDown = deltaPercent < 0;
    const sign = isDown ? "" : "+";
    return {
      ...stock,
      price: newPrice,
      percent: `${sign}${deltaPercent.toFixed(2)}%`,
      isDown,
    };
  });
}, 8000);

// GET /api/watchlist
router.get("/watchlist", (req, res) => {
  res.json(liveStockState);
});

// GET /api/holdings (or /allHoldings)
router.get("/holdings", async (req, res) => {
  try {
    const holdings = await HoldingsModel.find({});
    // Sync current price with liveStockState if available
    const enrichedHoldings = holdings.map((h) => {
      const live = liveStockState.find((s) => s.name === h.name);
      if (live) {
        const curPrice = live.price;
        const avgPrice = Number(h.avg) || curPrice;
        const netChg = (((curPrice - avgPrice) / avgPrice) * 100).toFixed(2);
        return {
          ...h.toObject(),
          price: curPrice,
          net: `${netChg >= 0 ? "+" : ""}${netChg}%`,
          day: live.percent,
          isLoss: netChg < 0,
        };
      }
      return h.toObject();
    });
    res.json(enrichedHoldings);
  } catch (err) {
    console.error("Error fetching holdings:", err);
    res.status(500).json({ error: "Failed to fetch holdings." });
  }
});

// GET /api/positions (or /allPositions)
router.get("/positions", async (req, res) => {
  try {
    const positions = await PositionsModel.find({});
    res.json(positions);
  } catch (err) {
    console.error("Error fetching positions:", err);
    res.status(500).json({ error: "Failed to fetch positions." });
  }
});

// GET /api/orders (or /allOrders)
router.get("/orders", async (req, res) => {
  try {
    const orders = await OrdersModel.find({}).sort({ createdAt: -1, _id: -1 });
    res.json(orders);
  } catch (err) {
    console.error("Error fetching orders:", err);
    res.status(500).json({ error: "Failed to fetch orders." });
  }
});

// POST /api/orders/new
router.post("/orders/new", optionalAuthMiddleware, async (req, res) => {
  try {
    const { name, qty, price, mode = "BUY" } = req.body;
    const parsedQty = Number(qty);
    const parsedPrice = Number(price);

    if (!name || isNaN(parsedQty) || parsedQty <= 0 || isNaN(parsedPrice) || parsedPrice <= 0) {
      return res.status(400).json({
        success: false,
        error: "Invalid order details. Please provide a valid stock name, quantity >= 1, and price > 0.",
      });
    }

    const orderMode = String(mode).toUpperCase() === "SELL" ? "SELL" : "BUY";
    const stockName = String(name).trim().toUpperCase();
    const totalCost = parsedQty * parsedPrice;

    // If authenticated user, validate funds & apply balance changes
    let user = null;
    if (req.user && req.user.id) {
      user = await UserModel.findById(req.user.id);
    } else {
      // Default to demo_trader if not explicitly authenticated
      user = await UserModel.findOne({ username: "demo_trader" });
    }

    if (user) {
      if (orderMode === "BUY") {
        if (user.funds < totalCost) {
          return res.status(400).json({
            success: false,
            error: `Insufficient margin! Required: ₹${totalCost.toFixed(2)}, Available: ₹${user.funds.toFixed(2)}. Please add funds.`,
          });
        }
        // Deduct balance
        user.funds -= totalCost;
        await user.save();

        // Update or create in Holdings
        let existingHolding = await HoldingsModel.findOne({ name: stockName });
        if (existingHolding) {
          const oldQty = Number(existingHolding.qty) || 0;
          const oldAvg = Number(existingHolding.avg) || parsedPrice;
          const newTotalQty = oldQty + parsedQty;
          const newAvgPrice = ((oldAvg * oldQty) + (parsedPrice * parsedQty)) / newTotalQty;
          const netChg = (((parsedPrice - newAvgPrice) / newAvgPrice) * 100).toFixed(2);

          existingHolding.qty = newTotalQty;
          existingHolding.avg = +newAvgPrice.toFixed(2);
          existingHolding.price = parsedPrice;
          existingHolding.net = `${netChg >= 0 ? "+" : ""}${netChg}%`;
          await existingHolding.save();
        } else {
          const newHolding = new HoldingsModel({
            name: stockName,
            qty: parsedQty,
            avg: parsedPrice,
            price: parsedPrice,
            net: "+0.00%",
            day: "+0.00%",
          });
          await newHolding.save();
        }
      } else if (orderMode === "SELL") {
        // Credit balance
        user.funds += totalCost;
        await user.save();

        // Reduce holding if exists
        let existingHolding = await HoldingsModel.findOne({ name: stockName });
        if (existingHolding) {
          const currentQty = Number(existingHolding.qty) || 0;
          if (parsedQty >= currentQty) {
            await HoldingsModel.findByIdAndDelete(existingHolding._id);
          } else {
            existingHolding.qty = currentQty - parsedQty;
            await existingHolding.save();
          }
        }
      }
    }

    // Save order in orders collection
    const newOrder = new OrdersModel({
      name: stockName,
      qty: parsedQty,
      price: parsedPrice,
      mode: orderMode,
    });
    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      message: `Order placed successfully! ${orderMode} ${parsedQty} ${stockName} @ ₹${parsedPrice.toFixed(2)}`,
      order: savedOrder,
      remainingFunds: user ? user.funds : null,
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ success: false, error: "Failed to place order in database." });
  }
});

// DELETE /api/orders/:id
router.delete("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await OrdersModel.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: "Order not found." });
    }
    res.json({ success: true, message: "Order canceled successfully!", id });
  } catch (err) {
    console.error("Error deleting order:", err);
    res.status(500).json({ success: false, error: "Failed to cancel order." });
  }
});

// GET /api/funds
router.get("/funds", optionalAuthMiddleware, async (req, res) => {
  try {
    let user = null;
    if (req.user && req.user.id) {
      user = await UserModel.findById(req.user.id);
    } else {
      user = await UserModel.findOne({ username: "demo_trader" });
    }

    const availableMargin = user ? user.funds : 100000;

    // Calculate total investment currently tied in holdings
    const holdings = await HoldingsModel.find({});
    const usedMargin = holdings.reduce(
      (sum, h) => sum + (Number(h.avg || 0) * Number(h.qty || 0)),
      0
    );

    res.json({
      success: true,
      availableMargin,
      usedMargin,
      availableCash: availableMargin,
      openingBalance: availableMargin + usedMargin,
    });
  } catch (err) {
    console.error("Error fetching funds:", err);
    res.status(500).json({ success: false, error: "Failed to retrieve funds data." });
  }
});

// POST /api/funds/add
router.post("/funds/add", optionalAuthMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;
    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ success: false, error: "Please provide a valid deposit amount." });
    }

    let user = null;
    if (req.user && req.user.id) {
      user = await UserModel.findById(req.user.id);
    } else {
      user = await UserModel.findOne({ username: "demo_trader" });
    }

    if (!user) {
      return res.status(404).json({ success: false, error: "User account not found." });
    }

    user.funds = (user.funds || 0) + parsedAmount;
    await user.save();

    res.json({
      success: true,
      message: `Successfully added ₹${parsedAmount.toFixed(2)} via UPI.`,
      newBalance: user.funds,
    });
  } catch (err) {
    console.error("Error adding funds:", err);
    res.status(500).json({ success: false, error: "Failed to deposit funds." });
  }
});

// POST /api/funds/withdraw
router.post("/funds/withdraw", optionalAuthMiddleware, async (req, res) => {
  try {
    const { amount } = req.body;
    const parsedAmount = parseFloat(amount);

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({ success: false, error: "Please enter a valid withdrawal amount." });
    }

    let user = null;
    if (req.user && req.user.id) {
      user = await UserModel.findById(req.user.id);
    } else {
      user = await UserModel.findOne({ username: "demo_trader" });
    }

    if (!user) {
      return res.status(404).json({ success: false, error: "User account not found." });
    }

    if (user.funds < parsedAmount) {
      return res.status(400).json({
        success: false,
        error: `Insufficient available funds. You can withdraw up to ₹${user.funds.toFixed(2)}.`,
      });
    }

    user.funds -= parsedAmount;
    await user.save();

    res.json({
      success: true,
      message: `Withdrawal of ₹${parsedAmount.toFixed(2)} initiated successfully.`,
      newBalance: user.funds,
    });
  } catch (err) {
    console.error("Error withdrawing funds:", err);
    res.status(500).json({ success: false, error: "Failed to withdraw funds." });
  }
});

module.exports = router;
