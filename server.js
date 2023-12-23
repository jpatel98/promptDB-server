require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import cors module
const userRoutes = require("./routes/userRoutes");
const promptRoutes = require("./routes/promptRoutes");

const app = express();
app.use(cors()); // Use cors module

app.use(express.json()); // For parsing JSON request bodies

// Routes
app.use("/api/users", userRoutes);
app.use("/api/prompts", promptRoutes);

// Error Handling Middleware
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ error: error.message });
});

const PORT = process.env.PORT || 8080;

// connect to db using mongoose
mongoose
  .connect(process.env.MONGO_DB_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });
