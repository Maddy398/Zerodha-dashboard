import React from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register the necessary Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const VerticalGraph = ({ data }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false, // allow the height to expand
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: false, // we used a separate card title
        text: "LTP Bar Chart",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            // Show ₹ symbol in tooltip
            const value = context.parsed.y;
            return `₹ ${value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Instrument Name",
          font: {
            size: 14,
            weight: "500",
          },
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45,
          autoSkip: false,
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: "LTP (₹)",
          font: {
            size: 14,
            weight: "500",
          },
        },
        ticks: {
          callback: (val) =>
            "₹ " +
            val.toLocaleString(undefined, {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            }),
          font: {
            size: 12,
          },
        },
        grid: {
          color: "rgba(0,0,0,0.1)",
        },
        beginAtZero: true,
      },
    },
  };

  // Fix container height with inline style (adjust as needed)
  return (
    <div style={{ height: "400px", position: "relative" }}>
      <Bar data={data} options={options} />
    </div>
  );
};

export default VerticalGraph;
