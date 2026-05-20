const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'quick_commerce',
  password: 'Eshu@23022009',
  port: 5432,
});

module.exports = pool;