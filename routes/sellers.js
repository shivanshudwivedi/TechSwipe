const express = require('express');
const Seller = require('../models/seller');
const router = express.Router();

// Seller registration
router.post('/register', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { name, email, password, address } = req.body;
    const existingSeller = await Seller.findByEmail(db, email);
    if (existingSeller) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    const seller = new Seller(name, email, password, address);
    const sellerId = await Seller.create(db, seller);
    res.status(201).json({ id: sellerId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Seller login
router.post('/login', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { email, password } = req.body;
    const seller = await Seller.findByEmail(db, email);
    if (!seller || seller.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    // TODO: Generate and return JWT token
    res.json({ message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get seller profile
router.get('/profile', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const sellerId = req.sellerId; // Assuming seller ID is available in the request after authentication
    const seller = await Seller.findById(db, sellerId);
    if (!seller) {
      return res.status(404).json({ error: 'Seller not found' });
    }
    res.json(seller);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update seller profile
router.put('/profile', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const sellerId = req.sellerId; // Assuming seller ID is available in the request after authentication
    const { name, email, address } = req.body;
    const updatedSeller = await Seller.update(db, sellerId, { name, email, address });
    if (updatedSeller === 0) {
      return res.status(404).json({ error: 'Seller not found' });
    }
    res.json({ message: 'Seller profile updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;