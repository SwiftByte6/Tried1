import React, { useState } from "react";
import { motion } from "framer-motion";
import RecentCard from "./RecentCard";
import MyBarChart from "./BarChartHome";
import NavbarTop from "./NavbarTop";
import { useTransaction } from "../contexts/TransactionContext"; // ✅ use custom hook

const Main = () => {
  const { transactions, loading } = useTransaction(); // ✅ Hook first!
  const userId = localStorage.getItem("userid");

  if (!userId) {
    return <p>No user ID found in localStorage</p>;
  }

  const [ExpenseLimit, setExpenseLimit] = useState(8000); // Set default limit
  
  // Ensure hooks are not inside conditionals
  const handleExpenseLimitChange = (e) => {
    setExpenseLimit(e.target.value);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const userTransactions = transactions.filter(txn => txn.userid.toString() === userId);
  const totalExpense = userTransactions.reduce((sum, txn) => sum + txn.amount, 0);

  // Sort and get recent 5 transactions
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  const DueAmount = ExpenseLimit - totalExpense;
  const stats = [
    {
      title: "Total Expenses",
      amount: `$${totalExpense}`,
      color: "text-green-500",
      icon: "fa-solid fa-money-bill-wave",
    },
    {
      title: "Remaining Amount",
      amount: `$${DueAmount}`,
      color: `${DueAmount > 0 ? "text-green-700" : "text-red-700"}`,
      icon: "fa-solid fa-wallet",
    },
    {
      title: "Expenses Limit",
      amount: `$${ExpenseLimit}`,
      color: "text-red-600",
      icon: "fa-solid fa-chart-pie",
    },
  ];

  // Category to Font Awesome icon mapper
  const getIconClass = (category) => {
    switch (category?.toLowerCase()) {
      case "food":
        return "fa-solid fa-utensils";
      case "travel":
        return "fa-solid fa-plane";
      case "shopping":
        return "fa-solid fa-bag-shopping";
      case "bills":
        return "fa-solid fa-file-invoice";
      case "entertainment":
        return "fa-solid fa-film";
      default:
        return "fa-solid fa-receipt";
    }
  };

  // Group transactions by category and sum the amounts
  const chartData = transactions.reduce((acc, txn) => {
    const found = acc.find((item) => item.category === txn.category);
    if (found) {
      found.amount += txn.amount;
    } else {
      acc.push({ category: txn.category, amount: txn.amount });
    }
    return acc;
  }, []);

  // Get the top spending category (for insights box)
  const topCategory =
    chartData.length > 0
      ? chartData.reduce((max, item) =>
        item.amount > max.amount ? item : max,
        chartData[0])
      : {};

  return (
    <div className="w-full min-h-screen mt-16 md:mt-0 md:p-6 bg-gray-100">
      <NavbarTop />

      {/* Top Stats */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto mt-10"
      >
        {stats.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white shadow-xl p-6 rounded-3xl flex items-center justify-between h-[18vh] md:h-[15vh] lg:h-[20vh] relative"
          >
            <div>
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">{item.title}</h3>
              <p className={`font-bold mt-2 text-3xl md:text-4xl ${item.color}`}>{item.amount}</p>
            </div>
            <i className={`${item.icon} text-5xl md:text-6xl text-gray-400`}></i>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Transactions + Chart */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="flex flex-col lg:flex-row w-full max-w-6xl h-auto lg:h-[75vh] gap-6 mt-10 mx-auto rounded-3xl"
      >
        {/* Recent Expenses */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2 bg-white rounded-3xl p-6 shadow-lg"
        >
          <h1 className="font-bold text-2xl md:text-3xl">Recent Expenses</h1>
          <div className="space-y-4 mt-4 overflow-auto max-h-[50vh] pr-2">
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : recentTransactions.length === 0 ? (
              <p className="text-gray-500">No transactions found.</p>
            ) : (
              recentTransactions.map((txn, i) => (
                <motion.div
                  key={txn._id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <RecentCard
                    category={txn.category}
                    amount={txn.amount}
                    date={txn.date}
                    iconClass={getIconClass(txn.category)}
                  />
                </motion.div>
              ))
            )}
          </div>
          <div className="mt-6">
            <h2 className="font-semibold text-xl">Set Expense Limit</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="number"
                value={ExpenseLimit}
                onChange={handleExpenseLimitChange}
                className="bg-gray-200 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mt-2"
                placeholder="Enter your expense limit"
              />
            </form>
          </div>
        </motion.div>

        {/* Chart */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="w-full lg:w-1/2 bg-white rounded-3xl p-6 flex flex-col items-center shadow-lg"
        >
          <h1 className="font-bold text-2xl md:text-3xl">Expense Overview</h1>

          {/* Pass the chartData to MyBarChart */}
          <MyBarChart expenses={chartData} />

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="h-[20vh] w-full md:w-[90%] bg-gray-300 rounded-3xl mt-4 flex items-center justify-center px-4 text-center"
          >
            {topCategory.category ? (
              <p className="text-sm sm:text-base md:text-lg font-medium text-gray-700">
                <span className="font-semibold">Insight:</span> You've spent the most on{" "}
                <span className="text-red-600 font-semibold">{topCategory.category}</span>{" "}
                this month, totaling ${topCategory.amount.toFixed(2)}. Consider evaluating this area for potential savings.
              </p>
            ) : (
              <p className="text-gray-600">No spending data available for analysis.</p>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Main;
