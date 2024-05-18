const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const RecommendationModel = require('../recommendationModel');

// Get product recommendations for a user
router.post('/recommend', async (req, res) => {
  try {
    const db = req.app.locals.db;
    const { userId, preferences } = req.body;

    // Fetch all products from the database
    const products = await Product.findAll(db);

    // Create a new instance of the recommendation model
    const recommendationModel = new RecommendationModel();

    // Train the model with products and user preferences
    await recommendationModel.train(products, preferences);

    // Get recommended products for the user
    const recommendedProducts = await recommendationModel.predict(products, preferences);

    res.json({ recommendedProducts });
  } catch (error) {
    console.error('Error getting product recommendations:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;