const express = require('express');
const User = require('./models/User');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password,firstName ,lastName } = req.body;
      
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
      firstName,
      lastName
    });

    const savedUser = await newUser.save();

    res.json({ message: 'User Created Successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error Creating User' });
  }
});

module.exports = router;
