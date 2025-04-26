import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { useMemo } from 'react';

// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart = ({ data }) => {
  // Group amounts by month using useMemo for performance
  const chartData = useMemo(() => {
    const monthlyTotals = new Array(12).fill(0); // Jan to Dec

    data.forEach((txn) => {
      const monthIndex = new Date(txn.date).getMonth(); // 0-11
      monthlyTotals[monthIndex] += txn.amount;
    });

    return {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Monthly Expenses ($)',
          data: monthlyTotals,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.3,
        },
      ],
    };
  }, [data]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Expense Trends' },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="w-full relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[500px]">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
