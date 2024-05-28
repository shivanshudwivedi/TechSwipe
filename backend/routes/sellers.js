const express = require('express');
const Seller = require('../models/seller');
const router = express.Router();

// Seller registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    const existingSeller = await Seller.findByEmail(email);
    if (existingSeller) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const seller = new Seller(name, email, password, address);
    const sellerId = await Seller.create(seller);
    res.status(201).json({ id: sellerId });
  } catch (err) {
    console.error('Seller Registration Error:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// Seller login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const seller = await Seller.findByEmail(email);
    if (!seller || seller.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    // TODO: Generate and return JWT token
    res.json({ message: 'Login successful' });
  } catch (err) {
    console.error('Seller Login Error:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// Get seller profile
router.get('/profile', async (req, res) => {
  try {
    const sellerId = req.sellerId; // Assuming seller ID is available in the request after authentication
    const seller = await Seller.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ error: 'Seller not found' });
    }
    res.json(seller);
  } catch (err) {
    console.error('Get Seller Profile Error:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// Update seller profile
router.put('/profile', async (req, res) => {
  try {
    const sellerId = req.sellerId; // Assuming seller ID is available in the request after authentication
    const { name, email, address } = req.body;
    const updatedSeller = await Seller.update(sellerId, { name, email, address });
    if (!updatedSeller) {
      return res.status(404).json({ error: 'Seller not found' });
    }
    res.json({ message: 'Seller profile updated successfully' });
  } catch (err) {
    console.error('Update Seller Profile Error:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

module.exports = router;
