const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware to read JSON data
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB connected");
})
.catch((error) => {
    console.log(error);
});

// Authentication routes
app.use("/api/auth", require("./routes/authRoutes"));

// Start server
app.listen(3000, () => {
    console.log("Server running on port 3000");
});