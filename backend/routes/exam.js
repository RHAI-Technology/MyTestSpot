const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// 1. Start a new exam session
router.post('/start', async (req, res) => {
    const { userId, testId } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO exam_sessions (user_id, test_id) VALUES ($1, $2) RETURNING *',
            [userId, testId]
        );
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Log Malpractice (Tab switch/Minimize)
router.patch('/malpractice/:sessionId', async (req, res) => {
    try {
        const { sessionId } = req.params;
        const result = await pool.query(
            'UPDATE exam_sessions SET malpractice_count = malpractice_count + 1 WHERE id = $1 RETURNING malpractice_count',
            [sessionId]
        );
        res.json({ success: true, count: result.rows[0].malpractice_count });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;