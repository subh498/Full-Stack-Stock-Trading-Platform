const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/UserModel");
const { authMiddleware, JWT_SECRET } = require("../middleware/auth");

const router = express.Router();

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    if (!fullName || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "All fields (fullName, username, email, password) are required.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        error: "Password must be at least 6 characters long.",
      });
    }

    const cleanUsername = username.trim().toLowerCase();
    const cleanEmail = email.trim().toLowerCase();

    // Check existing
    const existingUser = await UserModel.findOne({
      $or: [{ username: cleanUsername }, { email: cleanEmail }],
    });

    if (existingUser) {
      if (existingUser.username === cleanUsername) {
        return res.status(400).json({ success: false, error: "Username already taken." });
      }
      return res.status(400).json({ success: false, error: "Email already registered." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      fullName: fullName.trim(),
      username: cleanUsername,
      email: cleanEmail,
      password: hashedPassword,
      funds: 100000, // ₹1 Lakh initial margin
    });

    const savedUser = await newUser.save();
    const token = generateToken(savedUser);

    res.status(201).json({
      success: true,
      message: "Registration successful! Welcome to Zerodha Kite.",
      token,
      user: {
        id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        fullName: savedUser.fullName,
        funds: savedUser.funds,
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ success: false, error: "Server error during registration." });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body; // identifier can be username or email

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        error: "Please enter your username/email and password.",
      });
    }

    const cleanIdentifier = identifier.trim().toLowerCase();
    const user = await UserModel.findOne({
      $or: [{ username: cleanIdentifier }, { email: cleanIdentifier }],
    });

    if (!user) {
      return res.status(401).json({ success: false, error: "Invalid username or email." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Incorrect password." });
    }

    const token = generateToken(user);

    res.json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        funds: user.funds,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, error: "Server error during login." });
  }
});

// POST /api/auth/demo-login
router.post("/demo-login", async (req, res) => {
  try {
    const demoUsername = "demo_trader";
    let user = await UserModel.findOne({ username: demoUsername });

    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("Password123!", salt);
      user = new UserModel({
        fullName: "Demo Trader",
        username: demoUsername,
        email: "demo@zerodha-kite.com",
        password: hashedPassword,
        funds: 100000,
      });
      await user.save();
    }

    const token = generateToken(user);

    res.json({
      success: true,
      message: "Logged in as Demo Trader!",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        funds: user.funds,
      },
    });
  } catch (err) {
    console.error("Demo login error:", err);
    res.status(500).json({ success: false, error: "Server error during demo login." });
  }
});

// GET /api/auth/me
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found." });
    }
    res.json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        funds: user.funds,
      },
    });
  } catch (err) {
    console.error("Auth /me error:", err);
    res.status(500).json({ success: false, error: "Server error fetching user profile." });
  }
});

module.exports = router;
