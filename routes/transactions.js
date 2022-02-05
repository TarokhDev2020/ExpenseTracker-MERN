const express = require("express");
const {getTransactions, addTransaction, deleteTransaction} = require("../controllers/transactions");

const router = express.Router();

router.route("/").get(getTransactions).post(addTransaction);
router.route("/:id").delete(deleteTransaction);

module.exports = router;