// server.js
require('dotenv').config(); // Add this line at the top of server.js
const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Middleware to parse incoming JSON requests (from req.body)
app.use(express.json());

// Import routes
const loginRoute = require("./routes/login.js");
const registerRoute = require("./routes/reg.js"); // Corrected path

// Use routes
app.use('/api', loginRoute);
app.use('/api', registerRoute); // Added /api prefix for clarity

// MongoDB connection and server start
const PORT = process.env.PORT || 8000;
mongoose
  .connect("mongodb+srv://harshalchaudhary03:Harshal123@cluster0.y4ryysd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });
