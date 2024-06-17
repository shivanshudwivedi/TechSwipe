const express = require('express');
const router = express.Router();
const Cart = require('../models/cart');

// Get all cart items
router.get('/', async (req, res) => {
  try {
    const cartItems = await Cart.findAll();
    res.json(cartItems);
  } catch (err) {
    console.error('Get Cart Items Error:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// Add an item to the cart
router.post('/', async (req, res) => {
    try {
      const { productId, quantity } = req.body;
      const cartItem = new Cart(productId, quantity);
      const addedItem = await Cart.addItem(cartItem);
      res.status(201).json(addedItem);
    } catch (err) {
      console.error('Add to Cart Error:', err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  });

// Update the quantity of a cart item
router.put('/:itemId', async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const { quantity } = req.body;
    const updatedItem = await Cart.updateQuantity(itemId, quantity);
    if (!updatedItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    res.json(updatedItem);
  } catch (err) {
    console.error('Update Cart Item Error:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// Remove an item from the cart
router.delete('/:itemId', async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const removedItem = await Cart.removeItem(itemId);
    if (!removedItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    res.json(removedItem);
  } catch (err) {
    console.error('Remove Cart Item Error:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// Clear the entire cart
router.delete('/:itemId', async (req, res) => {
    try {
      const itemId = req.params.itemId;
      await Cart.removeItem(itemId);
      res.json({ message: 'Cart item removed successfully' });
    } catch (err) {
      console.error('Remove Cart Item Error:', err);
      res.status(500).json({ error: 'Internal Server Error', details: err.message });
    }
  });

module.exports = router;