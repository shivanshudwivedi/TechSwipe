const express = require('express');
const Product = require('../models/product');
const router = express.Router();

// Create a new product
router.post('/', async (req, res) => {
  try {
    const { name, description, price, category, sellerId, imageUrl } = req.body;
    const product = new Product(name, description, price, category, sellerId, imageUrl);
    const productId = await Product.create(product);
    res.status(201).json({ id: productId });
  } catch (err) {
    console.error('Create Product Error:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    console.error('Get All Products Error:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// Get a product by ID
router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Get Product by ID Error:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, description, price, category } = req.body;
    const updatedProduct = await Product.update(productId, { name, description, price, category });
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error('Update Product Error:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const deletedProduct = await Product.delete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error('Delete Product Error:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// Search products by name
router.get('/search', async (req, res) => {
  try {
    const { name } = req.query;
    const products = await Product.findByName(name);
    res.json(products);
  } catch (err) {
    console.error('Search Products by Name Error:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

// Filter products by category
router.get('/category/:category', async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.findByCategory(category);
    res.json(products);
  } catch (err) {
    console.error('Filter Products by Category Error:', err);
    res.status(500).json({ error: 'Internal Server Error', details: err.message });
  }
});

module.exports = router;
