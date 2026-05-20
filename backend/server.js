const express = require('express');
const cors = require('cors');
const pool = require('./db');

const productsRoute = require('./routes/products');
const ordersRoute = require('./routes/orders');
const analyticsRoute = require('./routes/analytics');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/products', productsRoute);
app.use('/orders', ordersRoute);
app.use('/analytics', analyticsRoute);

// Root test route
app.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');

    res.json({
      message: 'Backend + PostgreSQL connected successfully',
      currentTime: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Database connection failed',
    });
  }
});

// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});