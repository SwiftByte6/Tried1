const express = require("express");


const { getAllTransactions, addTransaction } = require("../controls/transactionCtrl");


//router object
const router = express.Router();

//routes
//add trasaction post method
router.post('/add-transaction',addTransaction)

//get transaction
router.post('/get-transaction', getAllTransactions)

module.exports = router;

