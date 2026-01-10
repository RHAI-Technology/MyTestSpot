const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false 
  }
});


pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌Database Connection Error:', err.message);
  } else {
    console.log(' Supabase Connected at:', res.rows[0].now);
  }
});

module.exports = pool;