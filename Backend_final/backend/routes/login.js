const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User.js'); // Adjust the path as needed

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid Username or Password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Password" });
    }

    // **Optional: JWT Token Generation**
    // Implement logic to generate a JWT token using user data (e.g., user.id)
    // const token = generateAuthToken(user);
    // res.json({ token });

    // **Without JWT**
    res.json({ message: "Login Successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
