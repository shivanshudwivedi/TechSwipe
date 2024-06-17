const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

const cors = require('cors');
app.use(cors());

// Database connection

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/products', require('./routes/products'));
app.use('/api/sellers', require('./routes/sellers'));
app.use('/api/orders', require('./routes/orders'));
app.use('/api/recommendation', require('./routes/recommendationRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
