

// const mongoose = require("mongoose");
// const transactionModel = require("../models/transactionModel");

// // 🔍 GET all transactions for a user
// const getAllTransactions = async (req, res) => {
//   try {
//     const { userid } = req.body;

//     // ✅ Validate userid
//     if (!userid || !mongoose.Types.ObjectId.isValid(userid)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid or missing userid",
//       });
//     }

//     const transactions = await transactionModel.find({
//        userid: new mongoose.Types.ObjectId(userid),
    
//     });

//     res.status(200).json(transactions);
//   } catch (error) {
//     console.error("Error fetching transactions:", error);
//     res.status(500).json({ message: "Error fetching transactions", error: error.message });
//   }
// };

// // ➕ ADD a new transaction
// const addTransaction = async (req, res) => {
//   try {
//     const { userid, amount, type, category, reference, description, date } = req.body;

//     // ✅ Validate required fields
//     if (!userid || !amount || !type || !category || !reference || !description || !date) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }

//     // ✅ Validate userid
//     if (!mongoose.Types.ObjectId.isValid(userid)) {
//       return res.status(400).json({
//         success: false,
//         message: "Invalid User ID",
//       });
//     }

//     const newTransaction = new transactionModel({
//       userid,
//       amount,
//       type,
//       category,
//       reference,
//       description,
//       date,
//     });

//     await newTransaction.save();

//     res.status(201).json({
//       success: true,
//       message: "Transaction Created",
//       newTransaction,
//     });
//   } catch (error) {
//     console.error("Error adding transaction:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error while adding transaction",
//       error: error.message,
//     });
//   }
// };

// module.exports = {
//   getAllTransactions,
//   addTransaction,
// };
const mongoose = require("mongoose");
const transactionModel = require("../models/transactionModel");

// 🔍 GET all transactions for a user
const getAllTransactions = async (req, res) => {
  try {
    const { userid } = req.body;

    // ✅ Validate userid (basic string check)
    if (!userid) {
      return res.status(400).json({
        success: false,
        message: "Missing userid",
      });
    }

    const transactions = await transactionModel.find({ userid });

    res.status(200).json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ message: "Error fetching transactions", error: error.message });
  }
};

// ➕ ADD a new transaction
const addTransaction = async (req, res) => {
  try {
    const { userid, amount, type, category, reference, description, date } = req.body;

    // ✅ Validate required fields
    if (!userid || !amount || !type || !category || !reference || !description || !date) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // ✅ Optionally validate userid as a valid string, not ObjectId
    if (typeof userid !== 'string') {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID format",
      });
    }

    const newTransaction = new transactionModel({
      userid,
      amount,
      type,
      category,
      reference,
      description,
      date,
    });

    await newTransaction.save();

    res.status(201).json({
      success: true,
      message: "Transaction Created",
      newTransaction,
    });
  } catch (error) {
    console.error("Error adding transaction:", error);
    res.status(500).json({
      success: false,
      message: "Server error while adding transaction",
      error: error.message,
    });
  }
};

module.exports = {
  getAllTransactions,
  addTransaction,
};
