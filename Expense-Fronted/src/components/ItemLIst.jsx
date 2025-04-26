import React from "react";
import { useTransaction } from "../contexts/TransactionContext";
import { motion } from "framer-motion";

const ItemList = () => {
  const { transactions, loading } = useTransaction();

  const categoryIcons = {
    food: "fa-solid fa-utensils",
    travel: "fa-solid fa-plane",
    shopping: "fa-solid fa-bag-shopping",
    bills: "fa-solid fa-file-invoice-dollar",
    entertainment: "fa-solid fa-film",
    other: "fa-solid fa-receipt",
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh] text-xl font-semibold font-sans text-gray-700">
        Loading your transactions...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc] font-sans px-4 py-6">
      <motion.h1
        className="text-4xl font-bold text-center text-gray-800 mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        All Transactions 💸
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 max-w-5xl mx-auto">
        {transactions.map((txn, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex items-center justify-between"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <i
                  className={`${
                    categoryIcons[txn.category] || categoryIcons["other"]
                  } text-xl text-blue-600`}
                ></i>
              </div>
              <div>
                <h2 className="text-lg font-semibold capitalize text-gray-800">{txn.category}</h2>
                <p className="text-sm text-gray-500">
                  {new Date(txn.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-green-600">${txn.amount}</h2>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
