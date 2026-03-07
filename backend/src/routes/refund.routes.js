const express = require("express");
const router = express.Router();

const { createRefund } = require("../controllers/refund.controller");

router.post("/", createRefund);

module.exports = router;