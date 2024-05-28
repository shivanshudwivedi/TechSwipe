const express = require('express');
const Order = require('../models/order');
const router = express.Router();

// Create a new order
router.post('/', async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;
    const order = new Order(userId, items, totalAmount, 'pending');
    const orderId = await Order.create(order);
    res.status(201).json({ id: orderId });
  } catch (err) {
    console.error('Create Order Error:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// Get all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.findAll();
    res.json(orders);
  } catch (err) {
    console.error('Get All Orders Error:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// Get an order by ID
router.get('/:id', async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json(order);
  } catch (err) {
    console.error('Get Order by ID Error:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// Update order status
router.put('/:id/status', async (req, res) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;
    const updatedOrder = await Order.updateStatus(orderId, status);
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }
    res.json({ message: 'Order status updated successfully' });
  } catch (err) {
    console.error('Update Order Status Error:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// Get orders by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.findByUserId(userId);
    res.json(orders);
  } catch (err) {
    console.error('Get Orders by User ID Error:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

module.exports = router;
