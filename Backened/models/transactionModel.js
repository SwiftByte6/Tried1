const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
  
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
      },
      
    amount: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
    },
    description: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("transactions", transactionSchema);
