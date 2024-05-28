const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// User registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User(name, email, hashedPassword, address);
    const userId = await User.create(user);
    res.status(201).json({ id: userId });
  } catch (err) {
    console.error('Registration Error:', err); // Log the error details
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    const token = jwt.sign({ userId: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    console.error('Login Error:', err); // Log the error details
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// Middleware to verify JWT token
function verifyToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  jwt.verify(token, 'your_jwt_secret', (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
}

// Get user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Get Profile Error:', err); // Log the error details
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// Update user profile
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const userId = req.userId;
    const { name, email, address } = req.body;
    const updatedUser = await User.update(userId, { name, email, address });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User profile updated successfully' });
  } catch (err) {
    console.error('Update Profile Error:', err); // Log the error details
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

module.exports = router;
