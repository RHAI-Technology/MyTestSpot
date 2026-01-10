require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const pool = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/', (req, res) => {
  res.send('Exam Portal Backend is Running...');
});

// Test Database Route
app.get('/api/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT current_database(), NOW()');
    res.json({
      success: true,
      message: "Connected to Supabase!",
      data: result.rows[0]
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});