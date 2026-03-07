const express = require("express");
const router = express.Router();

const {
  getTransactions,
  getTransactionById,
  createTransaction 
} = require("../controllers/transaction.controller");

router.get("/", getTransactions);
router.post("/add", createTransaction);
router.get("/:id", getTransactionById);

module.exports = router;