import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useMemo } from "react";

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data }) => {
  const chartData = useMemo(() => {
    const categoryTotals = {};
    data.forEach((txn) => {
      const category = txn.category || "Other";
      categoryTotals[category] = (categoryTotals[category] || 0) + txn.amount;
    });

    const labels = Object.keys(categoryTotals);
    const values = Object.values(categoryTotals);

    const backgroundColors = [
      "rgba(255, 0, 102, 0.8)",
      "rgba(0, 191, 255, 0.8)",
      "rgba(255, 215, 0, 0.8)",
      "rgba(34, 255, 34, 0.8)",
      "rgba(153, 51, 255, 0.8)",
      "rgba(255, 99, 132, 0.8)", // fallback colors
      "rgba(54, 162, 235, 0.8)",
    ];

    const borderColors = backgroundColors.map((color) =>
      color.replace("0.8", "1")
    );

    return {
      labels,
      datasets: [
        {
          label: "Expense Distribution ($)",
          data: values,
          backgroundColor: backgroundColors.slice(0, labels.length),
          borderColor: borderColors.slice(0, labels.length),
          borderWidth: 2,
          hoverOffset: 8,
        },
      ],
    };
  }, [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top", labels: { color: "#333" } },
      title: { display: true, text: "Expense Breakdown", color: "#333" },
    },
  };

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px]">
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
};

export default DoughnutChart;
