const rawApiUrl =
  process.env.REACT_APP_API_URL ||
  "https://full-stack-stock-trading-platform-nbcz.onrender.com";

export const API_BASE_URL = rawApiUrl.replace(/\/+$/, "");

