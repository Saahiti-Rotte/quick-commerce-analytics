const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
  try {
    const { user_id, items } = req.body;

    let total = 0;

    // Calculate total + validate stock
    for (const item of items) {
      const productResult = await pool.query(
        'SELECT * FROM products WHERE id = $1',
        [item.product_id]
      );

      const product = productResult.rows[0];

      if (!product) {
        return res.status(404).json({
          error: 'Product not found',
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          error: `Not enough stock for ${product.name}`,
        });
      }

      total += product.price * item.quantity;
    }

    // Create order
    const orderResult = await pool.query(
      `INSERT INTO orders (user_id, total, status)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [user_id, total, 'PLACED']
    );

    const order = orderResult.rows[0];

    // Create order items + deduct stock
    for (const item of items) {
      const productResult = await pool.query(
        'SELECT * FROM products WHERE id = $1',
        [item.product_id]
      );

      const product = productResult.rows[0];

      await pool.query(
        `INSERT INTO order_items
         (order_id, product_id, quantity, item_price)
         VALUES ($1, $2, $3, $4)`,
        [
          order.id,
          item.product_id,
          item.quantity,
          product.price,
        ]
      );

      await pool.query(
        `UPDATE products
         SET stock = stock - $1
         WHERE id = $2`,
        [item.quantity, item.product_id]
      );
    }

    // Log event
    await pool.query(
      `INSERT INTO events (user_id, event_type, metadata)
       VALUES ($1, $2, $3)`,
      [
        user_id,
        'ORDER_PLACED',
        JSON.stringify({
          order_id: order.id,
          total,
        }),
      ]
    );

    res.json({
      message: 'Order placed successfully',
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: 'Failed to place order',
    });
  }
});

module.exports = router;