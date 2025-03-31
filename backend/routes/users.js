const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Route for users authentication
router.post('/login', async (req, res) => {
  try {
    // Gets the username and password from the body of the request
    const { username, password } = req.body;

    // Searches for the user in the database
    const user = await User.findOne({ username });

    // If the user does not exist, it sends an error response
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Calls the method in charge of validating the password
    const validPassword = await user.comparePassword(password);

    // If the password is invalid, it sends an error response
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Creates a JWT token with the user ID
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Send response with JWT token
    res.json({ token });
  } catch (error) {
    // Handles errors and sends an error response
    res.status(500).json({ message: error.message });
  }
});

// Route for user logout
router.post('/logout', (req, res) => {
  res.json({ message: 'Logout successful' });
});

module.exports = router;