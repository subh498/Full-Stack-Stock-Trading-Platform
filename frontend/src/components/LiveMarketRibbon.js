import React from "react";

const TICKERS = [
  { symbol: "NIFTY 50", price: "24,842.10", change: "+138.40 (+0.56%)", isUp: true },
  { symbol: "SENSEX", price: "81,720.50", change: "+412.30 (+0.51%)", isUp: true },
  { symbol: "BANKNIFTY", price: "51,324.90", change: "+365.10 (+0.72%)", isUp: true },
  { symbol: "RELIANCE", price: "2,982.50", change: "+32.10 (+1.09%)", isUp: true },
  { symbol: "TCS", price: "4,240.00", change: "-12.50 (-0.29%)", isUp: false },
  { symbol: "HDFCBANK", price: "1,648.20", change: "+18.40 (+1.13%)", isUp: true },
  { symbol: "INFY", price: "1,885.60", change: "+24.30 (+1.31%)", isUp: true },
  { symbol: "ICICIBANK", price: "1,224.80", change: "+9.20 (+0.76%)", isUp: true },
  { symbol: "TATAMOTORS", price: "1,042.15", change: "+14.60 (+1.42%)", isUp: true },
  { symbol: "BHARTIARTL", price: "1,520.40", change: "-5.80 (-0.38%)", isUp: false },
];

function LiveMarketRibbon() {
  const displayTickers = [...TICKERS, ...TICKERS]; // duplicate for seamless loop

  return (
    <div className="market-ribbon-wrapper">
      <div className="market-ribbon-track">
        {displayTickers.map((ticker, index) => (
          <div key={index} className="ribbon-item">
            <span style={{ color: "var(--text-secondary)", fontWeight: 600 }}>
              {ticker.symbol}
            </span>
            <span className="font-mono" style={{ color: "var(--text-primary)" }}>
              ₹{ticker.price}
            </span>
            <span
              className="font-mono"
              style={{
                color: ticker.isUp ? "var(--accent-bull, #10b981)" : "var(--accent-bear, #f43f5e)",
                fontSize: "0.78rem",
              }}
            >
              {ticker.isUp ? "▲ " : "▼ "}
              {ticker.change}
            </span>
            <span style={{ color: "var(--border-color)", margin: "0 8px" }}>|</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LiveMarketRibbon;
