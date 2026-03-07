const Transaction = require("../models/transaction.model");

exports.getTransactions = async (req, res) => {
  try {
    const merchantId = req.merchant.merchantId;
    const {
      page = 1,
      limit = 10,
      status,
      search,
      fromDate,
      toDate,
    } = req.query;

    const query = {
      merchantId,
    };

    if (status && status !== "All") {
      query.status = status;
    }

    if (search) {
      query.transactionId = { $regex: search, $options: "i" };
    }

    if (fromDate || toDate) {
      query.createdAt = {};

      if (fromDate) {
        query.createdAt.$gte = new Date(fromDate);
      }

      if (toDate) {
        query.createdAt.$lte = new Date(toDate);
      }
    }

    const skip = (page - 1) * limit;

    const transactions = await Transaction.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Transaction.countDocuments(query);

    res.json({
      data: transactions,
      meta: {
        page: Number(page),
        totalPages: Math.ceil(total / limit),
        totalRecords: total,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch transactions",
      error: error.message,
    });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const merchantId = req.merchant.merchantId;
    const { id } = req.params;

    const transaction = await Transaction.findOne({
      _id: id,
      merchantId,
    });

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch transaction",
      error: error.message,
    });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const { transactionId, amount, currency, status, customerEmail } = req.body;

    const merchantId = req.merchant.merchantId;

    const transaction = await Transaction.create({
      transactionId,
      merchantId,
      amount,
      currency,
      status,
      customerEmail,
      paymentMethod: "Card",
      createdAt: new Date(),
    });

    res.status(201).json({
      message: "Transaction created successfully",
      data: transaction,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create transaction",
      error: error.message,
    });
  }
};