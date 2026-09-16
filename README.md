# Nexvoro | Next-Generation Quantitative & Multi-Asset Trading Platform

A unified, modern full-stack MERN platform built for algorithmic and retail execution, featuring high-frequency simulated tickers, real-time portfolio tracking, margin accounting, and dual Dark/Light aesthetics.

---

## 🌟 Key Platform Capabilities

1. **Unified Full-Stack Architecture**:
   - Consolidated `backend` and `frontend` into a single, clean workspace with root orchestration.
   - Run both server and client with a single command: `npm run dev`.

2. **Secure Authentication & Guarded Terminal**:
   - Secure JWT token-based authentication with `bcryptjs` password hashing.
   - Protected route guarding on `/dashboard/*`: unauthenticated users are seamlessly directed to login.
   - **One-Click Demo Trader Login** (`demo_trader` / `Password123!`) with ₹1,00,000 initial simulated trading capital.
   - Self-service onboarding and registration integrated directly with MongoDB.

3. **Real Database Operations & Trading Logic**:
   - **Watchlist**: Real-time simulated market price ticks with live price changes and flash indicators.
   - **Order Execution**: Buying stock validates available margin, deducts capital from user's account in MongoDB, and automatically adds or updates weighted average cost in the user's holdings collection. Selling stock credits funds and reduces holding quantity.
   - **Orders Book**: View real executed orders with a one-click **Cancel** button that removes and settles the order in MongoDB.
   - **Capital & Funds Management**: Real margin tracking with **+ Add Funds** modal (UPI simulation) and **Withdraw** options updating balance in database.
   - **Portfolio Summary & Holdings**: Dynamically computed current values, total investments, and live P&L with responsive Chart.js visual charts.

4. **FinTech Aesthetics with Adaptive Dark & Light Modes**:
   - High-contrast electric blue, cyan, and emerald design system.
   - Seamless **Dark Mode** and **Light Mode** toggle (Sun/Moon switch).
   - Preference persists across browser reloads via `localStorage`.
   - Charts, tables, modals, and tickers automatically adapt their palettes to the active theme.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm run install:all
```
*(Installs root, backend, and frontend packages)*

### 2. Seed Database
```bash
npm run seed
```
*(Seeds demo trader account, holdings, and positions into MongoDB)*

### 3. Run the Platform
```bash
npm run dev
```
- **Frontend Web Application**: `http://localhost:3000`
  - Public Platform: `http://localhost:3000/`
  - Sign in: `http://localhost:3000/login`
  - Sign up: `http://localhost:3000/signup`
  - Trading Terminal: `http://localhost:3000/dashboard`
- **Backend API Engine**: `http://localhost:3002`

---

## 📂 Project Structure

```
nexvoro/
├── backend/                  # Node.js + Express + MongoDB REST API
│   ├── index.js              # Server entry point with REST endpoints
│   ├── middleware/auth.js    # JWT verification middleware
│   ├── model/                # Mongoose models (UserModel, HoldingsModel, etc.)
│   ├── routes/
│   │   ├── auth.js           # Register, Login, Demo-Login, Profile (/api/auth)
│   │   └── trading.js        # Watchlist, Holdings, Positions, Orders, Funds (/api/*)
│   ├── schemas/              # Mongoose database schemas
│   ├── seed.js               # Database seeder (demo account & sample assets)
│   └── .env                  # Port (3002) and MONGO_URI
├── frontend/                 # Unified React Single-Page Application
│   ├── src/
│   │   ├── context/
│   │   │   ├── AuthContext.js    # Global auth state & JWT token handling
│   │   │   └── ThemeContext.js   # Dark / Light mode toggle state
│   │   ├── components/
│   │   │   ├── ProtectedRoute.js # Guards /dashboard routes
│   │   │   └── ThemeToggle.js    # Sun/Moon switch
│   │   ├── landing_page/         # Public platform pages & auth screens
│   │   │   ├── home/             # Algorithmic & multi-asset trading hero
│   │   │   ├── about/            # Nexvoro Research Group & Engineering
│   │   │   ├── products/         # Nexvoro Web, Pulse, Quant API
│   │   │   ├── pricing/          # Zero brokerage equity & transparent pricing
│   │   │   ├── support/          # Nexvoro Support Portal & Knowledge Base
│   │   │   ├── login/            # Nexvoro Trade login & Demo Login
│   │   │   ├── signup/           # Account registration
│   │   │   ├── Navbar.js         # Dynamic navbar with auth badge
│   │   │   └── Footer.js         # Nexvoro Technologies disclaimer & links
│   │   ├── dashboard/            # Nexvoro Trading Terminal
│   │   │   ├── TopBar.js         # Live indices & user profile
│   │   │   ├── Menu.js           # Tab navigation
│   │   │   ├── WatchList.js      # Live market watchlist & search
│   │   │   ├── Summary.js        # Real margin & P&L summary
│   │   │   ├── Holdings.js       # Live portfolio & allocation chart
│   │   │   ├── Positions.js      # Day open positions
│   │   │   ├── Orders.js         # Order book with cancel capability
│   │   │   ├── Funds.js          # UPI deposit & withdrawal modal
│   │   │   ├── BuyActionWindow.js# Order placement window
│   │   │   ├── VerticalGraph.js  # Holdings bar chart
│   │   │   ├── DoughnutChart.js  # Market allocation chart
│   │   │   └── Dashboard.css     # Nexvoro terminal styling
│   │   ├── config.js             # API base URL configuration
│   │   ├── index.css             # Nexvoro theme design system CSS tokens
│   │   └── index.js              # Main route dispatcher
│   └── public/
│       ├── media/images/         # Vector brand assets & emblems
│       └── index.html            # Main HTML wrapper
└── package.json              # Root orchestrator script
```

---

## 🔑 Demo Account Credentials
- **User ID / Username**: `demo_trader`
- **Password**: `Password123!`
- *(Or click the **"⚡ One-Click Demo Trader Login"** button on the login screen for instant access!)*
