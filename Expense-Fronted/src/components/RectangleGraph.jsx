import React, { useMemo } from "react";
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const RectangleGraph = ({ transactions = [], sales = [] }) => {
  const chartData = useMemo(() => {
    const expensePerMonth = new Array(12).fill(0);
    const salesPerMonth = new Array(12).fill(0);

    // Fill expensePerMonth
    transactions.forEach((txn) => {
      const date = new Date(txn.date);
      const month = date.getMonth(); // 0 = Jan
      expensePerMonth[month] += txn.amount;
    });

    // Fill salesPerMonth if available
    sales.forEach((sale) => {
      const date = new Date(sale.date);
      const month = date.getMonth();
      salesPerMonth[month] += sale.amount;
    });

    return {
      labels: monthLabels,
      datasets: [
        {
          label: "Sales ($)",
          data: salesPerMonth,
          backgroundColor: "rgba(54, 162, 235, 0.8)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 2,
        },
        {
          label: "Expenses ($)",
          data: expensePerMonth,
          backgroundColor: "rgba(255, 99, 132, 0.8)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 2,
        },
      ],
    };
  }, [transactions, sales]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: { color: "#333", font: { size: 14 } },
      },
      title: {
        display: true,
        text: "Sales & Expenses Overview",
        color: "#333",
        font: { size: 16 },
      },
    },
    scales: {
      x: { stacked: true, ticks: { color: "#666", font: { size: 12 } } },
      y: { stacked: true, beginAtZero: true, ticks: { color: "#666", font: { size: 12 } } },
    },
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] bg-white p-4 rounded-xl shadow-lg">
        <h2 className="text-center text-lg font-bold mb-2">Stacked Rectangle Graph</h2>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default RectangleGraph;
