const express = require('express');
const Order = require('../models/order');
const router = express.Router();

// Create a new order
router.post('/', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { userId, items, totalAmount } = req.body;
    const order = new Order(userId, items, totalAmount, 'pending');
    const orderId = await Order.create(db, order);
    res.status(201).json({ id: orderId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const orders = await Order.findAll(db);
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get an order by ID
router.get('/:id', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const orderId = req.params.id;
    const order = await Order.findById(db, orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update order status
router.put('/:id/status', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const orderId = req.params.id;
    const { status } = req.body;
    const updatedOrder = await Order.updateStatus(db, orderId, status);
    if (updatedOrder === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order status updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get orders by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const userId = req.params.userId;
    const orders = await Order.findByUserId(db, userId);
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;