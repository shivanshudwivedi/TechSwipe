const express = require('express');
const connect = require('./database');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const sellersRouter = require('./routes/sellers');
const ordersRouter = require('./routes/orders');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/sellers', sellersRouter);
app.use('/api/orders', ordersRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Connect to the database
connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  });