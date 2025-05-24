import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend
);

// Chart options
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

// Component that renders the Line chart
export function VerticalGraph({ data }) {
  return (
    <div style={{ height: "400px", width: "100%", padding: "2rem 0" }}>
      <Line options={options} data={data} />
    </div>
  );
}

