const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    merchantId: {
      type: String,
      ref: "Merchant",
      required: true,
      index: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "USD",
    },

    status: {
      type: String,
      enum: ["success", "failed", "pending", "refunded"],
      required: true,
      index: true,
    },

    paymentMethod: {
      type: String,
      default: "Card",
    },

    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  }
);

module.exports = mongoose.model("Transaction", transactionSchema);