const express = require('express');
const Product = require('../models/product');
const router = express.Router();

// Create a new product
router.post('/', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { name, description, price, category, sellerId } = req.body;
    const product = new Product(name, description, price, category, sellerId);
    const productId = await Product.create(db, product);
    res.status(201).json({ id: productId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const products = await Product.findAll(db);
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a product by ID
router.get('/:id', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const productId = req.params.id;
    const product = await Product.findById(db, productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const productId = req.params.id;
    const { name, description, price, category } = req.body;
    const updatedProduct = await Product.update(db, productId, { name, description, price, category });
    if (updatedProduct === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const productId = req.params.id;
    const deletedProduct = await Product.delete(db, productId);
    if (deletedProduct === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Search products by name
router.get('/search', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { name } = req.query;
    const products = await Product.findByName(db, name);
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Filter products by category
router.get('/category/:category', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const category = req.params.category;
    const products = await Product.findByCategory(db, category);
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;