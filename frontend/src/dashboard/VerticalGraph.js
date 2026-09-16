import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useTheme } from "../context/ThemeContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function VerticalGraph({ data }) {
  const { isDark } = useTheme();

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: isDark ? "#e6edf3" : "#444444",
        },
      },
      title: {
        display: true,
        text: "Portfolio Allocation (Holdings by Value)",
        color: isDark ? "#e6edf3" : "#333333",
        font: { size: 14, weight: "bold" },
      },
    },
    scales: {
      x: {
        ticks: { color: isDark ? "#9ca3af" : "#666666" },
        grid: { color: isDark ? "#2c3242" : "#f0f0f0" },
      },
      y: {
        ticks: { color: isDark ? "#9ca3af" : "#666666" },
        grid: { color: isDark ? "#2c3242" : "#f0f0f0" },
      },
    },
  };

  return (
    <div
      style={{
        height: "320px",
        background: "var(--card-bg, #ffffff)",
        border: "1px solid var(--border-color, #e0e3eb)",
        borderRadius: "8px",
        padding: "16px",
        marginTop: "24px",
      }}
    >
      <Bar options={options} data={data} />
    </div>
  );
}

export default VerticalGraph;
