const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// Get all questions for a specific test ID
router.get('/:testId', async (req, res) => {
    try {
        const { testId } = req.params;
        const result = await pool.query(
            'SELECT * FROM questions WHERE test_id = $1', 
            [testId]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;