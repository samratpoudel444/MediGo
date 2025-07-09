// DoughnutChart.js
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ labels, count }) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Distribution",
        data: count,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", 
          "rgba(54, 162, 235, 0.6)", 
          "rgba(255, 206, 86, 0.6)", 
          "rgba(75, 192, 192, 0.6)", 
        ],
        borderColor: ["#fff"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
    },
  };

  return <Doughnut data={chartData} options={options} />;
};

export default DoughnutChart;
