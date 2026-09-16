import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useTheme } from "../context/ThemeContext";

ChartJS.register(ArcElement, Tooltip, Legend);

export function DoughnutChart({ data }) {
  const { isDark } = useTheme();

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: isDark ? "#e6edf3" : "#444444",
          boxWidth: 12,
          padding: 10,
          font: { size: 10 },
        },
      },
    },
  };

  return (
    <div style={{ padding: "16px", maxWidth: "280px", margin: "0 auto" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}

export default DoughnutChart;
