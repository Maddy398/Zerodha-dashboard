

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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom",
      labels: {
        color: "#333",
        font: {
          size: 14,
          family: "Segoe UI",
        },
      },
    },
    title: {
      display: true,
      text: "Portfolio Holdings Overview",
      color: "#333",
      font: {
        size: 20,
        family: "Segoe UI",
        weight: "bold",
      },
      padding: {
        top: 10,
        bottom: 30,
      },
    },
    tooltip: {
      backgroundColor: "#1f1f1f",
      titleColor: "#fff",
      bodyColor: "#eee",
      borderColor: "#333",
      borderWidth: 1,
      cornerRadius: 4,
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#333",
        font: {
          size: 12,
        },
      },
      grid: {
        display: false,
      },
    },
    y: {
      ticks: {
        color: "#333",
        font: {
          size: 12,
        },
        callback: (value) => `₹${value}`,
      },
      grid: {
        color: "#eee",
        borderDash: [5, 5],
      },
    },
  },
};

export function VerticalGraph({ data }) {
  return (
    <div style={{ height: "400px", width: "100%", padding: "2rem 0" }}>
      <Bar options={options} data={data} />
    </div>
  );
}

