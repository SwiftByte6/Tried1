// src/components/StatsCard.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const StatsCard = ({ statsData }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [tempValue, setTempValue] = useState("");

  const handleEditClick = (index, currentAmount) => {
    setEditingIndex(index);
    setTempValue(currentAmount.replace("$", ""));
  };

  const handleSave = (index) => {
    statsData[index].amount = `$${parseFloat(tempValue).toFixed(2)}`;
    setEditingIndex(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl mx-auto mt-10"
    >
      {statsData.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.2 }}
          viewport={{ once: true }}
          className="bg-white shadow-xl p-6 rounded-3xl flex items-center justify-between h-[18vh] md:h-[15vh] lg:h-[20vh] relative cursor-pointer"
          onClick={() => handleEditClick(index, item.amount)}
        >
          <div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-semibold">{item.title}</h3>
            {editingIndex === index ? (
              <div className="flex items-center space-x-2 mt-2">
                <input
                  type="number"
                  value={tempValue}
                  onChange={(e) => setTempValue(e.target.value)}
                  className="border px-2 py-1 w-24 text-lg"
                />
                <button
                  onClick={() => handleSave(index)}
                  className="text-sm bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <p className={`font-bold mt-2 text-3xl md:text-4xl ${item.color}`}>{item.amount}</p>
            )}
          </div>
          <i className={`${item.icon} text-5xl md:text-6xl text-gray-400`}></i>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsCard;
