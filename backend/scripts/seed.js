const pool = require('../db');

const productIds = [1,2,3,4,5,6,7,8,9,10];

const cities = [
  'Hyderabad',
  'Bangalore',
  'Mumbai',
  'Delhi',
  'Pune',
  'Chennai'
];

async function seedDatabase() {
  try {
    console.log('Starting database seed...');

    // USERS
    for (let i = 1; i <= 1000; i++) {
      await pool.query(
        `
        INSERT INTO users (name, email, city)
        VALUES ($1, $2, $3)
      `,
        [
          `User ${i}`,
          `user${i}@example.com`,
          cities[Math.floor(Math.random() * cities.length)],
        ]
      );
    }

    console.log('Users seeded');

    // ORDERS
    for (let i = 1; i <= 5000; i++) {
      const userId = Math.floor(Math.random() * 1000) + 1;

      const total =
        Math.floor(Math.random() * 1000) + 100;

      const orderResult = await pool.query(
        `
        INSERT INTO orders
        (user_id, total, status)
        VALUES ($1, $2, $3)
        RETURNING *
      `,
        [userId, total, 'PLACED']
      );

      const order = orderResult.rows[0];

      const itemCount =
        Math.floor(Math.random() * 3) + 1;

      for (let j = 0; j < itemCount; j++) {
        const productId =
          productIds[
            Math.floor(
              Math.random() * productIds.length
            )
          ];

        const quantity =
          Math.floor(Math.random() * 3) + 1;

        const itemPrice =
          Math.floor(Math.random() * 500) + 20;

        await pool.query(
          `
          INSERT INTO order_items
          (order_id, product_id, quantity, item_price)
          VALUES ($1, $2, $3, $4)
        `,
          [
            order.id,
            productId,
            quantity,
            itemPrice,
          ]
        );
      }

      // Events
      await pool.query(
        `
        INSERT INTO events
        (user_id, event_type, metadata)
        VALUES ($1, $2, $3)
      `,
        [
          userId,
          'PRODUCT_VIEW',
          JSON.stringify({
            source: 'homepage',
          }),
        ]
      );

      await pool.query(
        `
        INSERT INTO events
        (user_id, event_type, metadata)
        VALUES ($1, $2, $3)
      `,
        [
          userId,
          'ADD_TO_CART',
          JSON.stringify({
            source: 'product_page',
          }),
        ]
      );

      await pool.query(
        `
        INSERT INTO events
        (user_id, event_type, metadata)
        VALUES ($1, $2, $3)
      `,
        [
          userId,
          'ORDER_PLACED',
          JSON.stringify({
            order_id: order.id,
          }),
        ]
      );

      if (i % 500 === 0) {
        console.log(`${i} orders seeded`);
      }
    }

    console.log('Database seeding completed');

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seedDatabase();