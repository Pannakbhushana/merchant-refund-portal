const Transaction = require("../models/transaction.model");
const Refund = require("../models/refund.model");
const TransactionStatusEvent = require("../models/transactionStatusEvent.model");
const mongoose = require("mongoose");

exports.createRefund = async (req, res) => {
    try {
        const merchantId = req.merchant.merchantId;
        const { transactionId, amount, reason } = req.body;

        if (!transactionId || !amount || !reason) {
            return res.status(400).json({
                message: "transactionId, amount and reason are required",
            });
        }

        const transaction = await Transaction.findOne({
            _id: transactionId,
            merchantId,
        });

        if (transaction && transaction.merchantId !== merchantId) {
            return res.status(403).json({
                message: "You cannot refund another merchant's transaction",
            });
        }

        if (!transaction) {
            return res.status(404).json({
                message: "Transaction not found",
            });
        }

        if (transaction.status !== "success") {
            return res.status(400).json({
                message: "Only successful transactions are eligible for refund",
            });
        }

        const existingRefund = await Refund.findOne({ transactionId });

        if (existingRefund) {
            return res.status(400).json({
                message: "This transaction has already been refunded",
            });
        }

        const transactionDate = new Date(transaction.createdAt);
        const now = new Date();

        const daysDifference =
            (now - transactionDate) / (1000 * 60 * 60 * 24);

        if (daysDifference > 30) {
            return res.status(400).json({
                message: "Refund request must be within 30 days of transaction",
            });
        }

        if (amount > transaction.amount) {
            return res.status(400).json({
                message: "Refund amount cannot exceed transaction amount",
            });
        }

        const refund = await Refund.create({
            transactionId,
            merchantId,
            amount,
            reason,
        });

        transaction.status = "refunded";
        await transaction.save();

        await TransactionStatusEvent.create({
            transactionId,
            status: "refunded",
        });

        res.status(201).json({
            message: "Refund created successfully",
            refund,
        });
    } catch (error) {
        res.status(500).json({
            message: "Refund failed",
            error: error.message,
        });
    }
};