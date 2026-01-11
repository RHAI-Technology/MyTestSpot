const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Get all available test series (JEE, NEET, etc.)
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM test_series ORDER BY created_at DESC');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;