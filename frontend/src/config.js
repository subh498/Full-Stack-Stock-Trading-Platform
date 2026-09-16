const rawApiUrl = process.env.REACT_APP_API_URL || "http://localhost:3002";

export const API_BASE_URL = rawApiUrl.replace(/\/+$/, "");
export const DASHBOARD_PATH = "/dashboard";
export const DASHBOARD_URL = "/dashboard";
