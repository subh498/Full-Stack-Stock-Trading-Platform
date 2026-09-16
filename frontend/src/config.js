const rawDashboardUrl = process.env.REACT_APP_DASHBOARD_URL || 'http://localhost:3001';

export const DASHBOARD_URL = rawDashboardUrl.replace(/\/+$/, '');
