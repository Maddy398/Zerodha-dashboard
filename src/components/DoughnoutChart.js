import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

export const DoughnutChart = ({ data }) => {
  const vibrantColors = [
    "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
    "#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#2ecc71",
  ];

  // Enhance data object with consistent colors if not already set
  const enhancedData = {
    ...data,
    datasets: data.datasets.map((dataset) => ({
      ...dataset,
      backgroundColor: vibrantColors.slice(0, dataset.data.length),
      borderColor: "#fff",
      borderWidth: 2,
      hoverOffset: 12,
    })),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#333",
          font: {
            size: 14,
            weight: "bold",
          },
        },
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const label = tooltipItem.label || "";
            const value = tooltipItem.raw || 0;
            return `${label}: ₹${value.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`;
          },
        },
      },
      title: {
        display: true,
        text: "Watchlist Stock Prices",
        font: {
          size: 20,
        },
        color: "#222",
        padding: {
          top: 10,
          bottom: 20,
        },
      },
    },
    cutout: "65%", // doughnut center size
  };

  return <Doughnut data={enhancedData} options={options} />;
};

