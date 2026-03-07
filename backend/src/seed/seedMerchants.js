require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const connectDB = require("../config/db");
const Merchant = require("../models/merchant.model");

const seedMerchants = async () => {
  try {
    await connectDB();

    const password = await bcrypt.hash("Test@1234", 3);

    await Merchant.create([
      {
        name: "Merchant 1",
        email: "merchant1@test.com",
        passwordHash: password
      },
      {
        name: "Merchant 2",
        email: "merchant2@test.com",
        passwordHash: password
      }
    ]);

    console.log("Merchants seeded successfully");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedMerchants();