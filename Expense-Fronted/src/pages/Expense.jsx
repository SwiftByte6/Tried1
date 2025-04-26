import React, { useState, useContext, useEffect } from 'react';
import LineChart from '../components/LineChart';
import RecentCard from '../components/RecentCard';
import DoughnutChart from '../components/DoughnutChart';
import { motion } from 'framer-motion';
import BarChart from '../components/BardChart';
import RectangleGraph from '../components/RectangleGraph';
import ItemLIst from '../components/ItemLIst';
import { TransactionContext } from '../contexts/TransactionContext'; // Assuming you use context// Assuming you use context

const Expense = () => {
  const [ispopUp, setIspopUP] = useState(false);
  const { transactions, loading } = useContext(TransactionContext); // Context provides transactions
  const [filteredData, setFilteredData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all"); // for dynamic filter

  // Sort and get latest 5 transactions
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  // Dynamic filtering for graphs
  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredData(transactions);
    } else {
      const filtered = transactions.filter(txn => txn.category === selectedCategory);
      setFilteredData(filtered);
    }
  }, [transactions, selectedCategory]);

  return (
    <div className="relative w-full flex-1">
      {/* Popup for Item List */}
      {ispopUp && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-[1000] flex items-center justify-center px-4">
          <div className="relative w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-y-auto max-h-[90vh] p-5 sm:p-8 md:p-10">
            {/* Top Bar */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Items List</h1>
              <button
                onClick={() => setIspopUP(false)}
                className="text-gray-600 hover:text-red-500 text-lg font-medium transition"
              >
                <i className="fa-solid fa-xmark text-2xl"></i>
              </button>
            </div>

            {/* Item List */}
            <ItemLIst />
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className="min-h-screen w-full px-4 py-6 flex flex-col items-center space-y-8 md:space-y-10">
        {/* Line Chart */}
        <motion.div
          className="bg-white w-full mt-13 md:mt-0 max-w-screen-xl shadow-lg md:p-4 rounded-2xl overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <LineChart data={filteredData} />
        </motion.div>

        {/* Recent + Doughnut */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-screen-xl">
          <motion.div
            className="bg-white w-full h-auto md:h-[55vh] p-4 rounded-2xl shadow-lg overflow-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="flex justify-between">
              <h1 className="font-bold text-2xl md:text-3xl mb-4">List of Expenses</h1>
              <span
                className="text-2xl md:text-3xl underline cursor-pointer"
                onClick={() => setIspopUP(true)}
              >
                see all
              </span>
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : (
              recentTransactions.map((txn, i) => (
                <RecentCard
                  key={txn._id}
                  category={txn.category}
                  amount={txn.amount}
                  date={txn.date}
                  iconClass={getIconClass(txn.category)}
                />
              ))
            )}
          </motion.div>

          {/* Doughnut Chart */}
          <motion.div
            className="bg-white w-full h-[250px] md:h-[55vh] p-4 rounded-2xl shadow-lg flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
          >
            <DoughnutChart data={filteredData} />
          </motion.div>
        </div>

        {/* Bar and Rectangle Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-screen-xl">
          <motion.div
            className="bg-white w-full h-[250px] md:h-[55vh] col-span-1 lg:col-span-2 p-4 rounded-2xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <BarChart data={filteredData} />
          </motion.div>

          <motion.div
            className="bg-white w-full h-[250px] md:h-[55vh] p-4 rounded-2xl shadow-lg overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <RectangleGraph data={filteredData} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Icon getter for RecentCard
const getIconClass = (category) => {
  switch (category.toLowerCase()) {
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

export default Expense;
