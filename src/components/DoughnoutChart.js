// DoughnutChart.js
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

export const DoughnutChart = ({ data }) => {
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
            return `${tooltipItem.label}: ₹${tooltipItem.raw.toFixed(2)}`;
          },
        },
      },
      datalabels: {
        color: "#fff",
        font: {
          weight: "bold",
          size: 12,
        },
        formatter: (value, ctx) => {
          let sum = ctx.chart._metasets[0].total;
          let percentage = ((value / sum) * 100).toFixed(1) + "%";
          return percentage;
        },
      },
      title: {
        display: true,
        text: "Watchlist Stock Prices",
        font: {
          size: 18,
        },
        color: "#222",
        padding: {
          top: 10,
          bottom: 30,
        },
      },
    },
    cutout: "65%", // for nice donut appearance
  };

  return <Doughnut data={data} options={options} />;
};
