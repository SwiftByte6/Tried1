import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useMemo } from "react";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const BarChart = ({ revenueData = [] }) => {
  const chartData = useMemo(() => {
    const monthlyRevenue = new Array(12).fill(0);

    revenueData.forEach((item) => {
      const month = new Date(item.date).getMonth(); // Jan = 0
      monthlyRevenue[month] += item.amount;
    });

    return {
      labels: monthLabels,
      datasets: [
        {
          label: "Monthly Revenue ($)",
          data: monthlyRevenue,
          backgroundColor: [
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
            "rgba(255, 159, 64, 0.8)",
            "rgba(255, 99, 132, 0.8)",
            "rgba(54, 162, 235, 0.8)",
            "rgba(255, 206, 86, 0.8)",
            "rgba(75, 192, 192, 0.8)",
            "rgba(153, 102, 255, 0.8)",
            "rgba(255, 159, 64, 0.8)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 2,
          hoverBorderWidth: 3,
          hoverBorderColor: "#fff",
        },
      ],
    };
  }, [revenueData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top", labels: { color: "#333" } },
      title: { display: true, text: "Revenue Growth", color: "#333" },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: "#666", font: { size: 12 } },
      },
      x: {
        ticks: { color: "#666", font: { size: 12 } },
      },
    },
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
