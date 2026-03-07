const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
// const transactionRoutes = require("./routes/transaction.routes");
// const refundRoutes = require("./routes/refund.routes");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
// app.use("/api/transactions", transactionRoutes);
// app.use("/api/refunds", refundRoutes);

app.listen(PORT, async() => {
    try {
        await connectDB();
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.log(error);
    }
  
});



module.exports = app;