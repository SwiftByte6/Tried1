import React, { useState } from "react";
import { motion } from "framer-motion";

const CreateExpense = () => {
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const userid = localStorage.getItem("userid");

  const type = "expense";
  const reference = "self"; // Placeholder, can be a select later


  const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (
    expenseName.trim() === "" ||
    amount === "" ||
    isNaN(amount) ||
    category.trim() === "" ||
    date.trim() === ""
  ) {
    alert("Please fill all fields properly");
    return;
  }

    const newTransaction = {
      userid,
      amount: Number(amount),
      type,
      category,
      reference,
      description: expenseName,
      date,
    };

    try {
      setLoading(true);
      console.log("Submitting:", newTransaction);

      const res = await fetch("https://tried1.onrender.com/api/v1/transaction/add-transaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTransaction),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Transaction added successfully!");
        setExpenseName("");
        setAmount("");
        setCategory("");
        setDate("");
      } else {
        console.error(data);
        alert(data.message || "Failed to add transaction");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };




  return (
    <div className="flex flex-col items-center px-4 py-6 w-full">
      <div className="grid md:grid-cols-2 gap-6 w-full max-w-6xl">
        {/* Pie Chart Placeholder */}
        <motion.div
          className="bg-white md:mt-0  mt-15 shadow-lg w-full h-[40vh] md:h-[50vh] rounded-2xl flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="text-gray-400 font-bold text-xl w-full h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <video
              className="w-full h-full object-cover rounded-2xl"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/v1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </motion.div>
        </motion.div>


        {/* Form */}
        <motion.div
          className="bg-white shadow-2xl w-full h-auto p-6 rounded-2xl"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <h1 className="font-bold text-3xl text-center mb-4">Add New Expense</h1>

          <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
            {/* Description */}
            <motion.input
              type="text"
              value={expenseName}
              onChange={(e) => setExpenseName(e.target.value)}
              className="bg-gray-200 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter the Expense"
              whileFocus={{ scale: 1.02 }}
            />

            {/* Amount */}
            <motion.input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="bg-gray-200 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Amount"
              whileFocus={{ scale: 1.02 }}
            />

            {/* Category */}
            <div className="w-full">
              <label className="block text-lg font-bold mb-1">Expense Category</label>
              <motion.select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-3 border rounded-lg shadow-sm bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                whileFocus={{ scale: 1.02 }}
              >
                <option value="" disabled>Select a category</option>
                <option value="food">🍕 Food</option>
                <option value="travel">✈️ Travel</option>
                <option value="shopping">🛍️ Shopping</option>
                <option value="bills">📑 Bills</option>
                <option value="entertainment">🎬 Entertainment</option>
              </motion.select>
              {category && <p className="mt-1 text-green-600">{`Selected: ${category}`}</p>}
            </div>

            {/* Date */}
            <motion.input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-gray-200 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              whileFocus={{ scale: 1.02 }}
            />

            {/* Submit */}
            <motion.button
              type="submit"
              className="bg-blue-500 text-white rounded-3xl p-3 w-full font-bold text-xl mt-2"
              whileHover={{ scale: 1.05, backgroundColor: "#2563EB" }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Floating Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl mt-4">
  {[
    {
      title: "💸 Money Quote",
      content: `"Too many people spend money they haven’t earned, to buy things they don’t want, to impress people they don’t like." – Will Rogers`,
      delay: 0.2,
      bg: "bg-orange-50",
    },
    {
      title: "😅 Expense Mood",
      content: "Me after buying coffee for ₹400: 'It’s an investment in happiness ☕️'",
      delay: 0.4,
      bg: "bg-pink-50",
    },
    {
      title: "💡 Fun Money Fact",
      content: "The word 'salary' comes from 'sal', meaning salt — Romans were paid in it!",
      delay: 0.6,
      bg: "bg-teal-50",
    },
  ].map((item, index) => (
    <motion.div
      key={index}
      className={`${item.bg} w-full h-[150px] rounded-2xl shadow-xl p-4 flex flex-col justify-between`}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: item.delay }}
    >
      <p className="text-sm font-semibold text-gray-700">{item.title}</p>
      <p className="text-[14px] text-gray-600 mt-2 italic">{item.content}</p>
    </motion.div>
  ))}
</div>

    </div>
  );
};

export default CreateExpense;
