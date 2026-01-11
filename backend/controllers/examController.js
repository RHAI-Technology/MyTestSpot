const pool = require('../config/db');

// Start the exam session
exports.startSession = async (req, res) => {
    const { userId, testId } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO exam_sessions (user_id, test_id, status) VALUES ($1, $2, $3) RETURNING *',
            [userId, testId, 'ongoing']
        );
        res.status(201).json({ success: true, session: result.rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

// Log Malpractice (Full-screen exit / Tab switch)
exports.logMalpractice = async (req, res) => {
    try {
        const { sessionId } = req.params;
        const result = await pool.query(
            'UPDATE exam_sessions SET malpractice_count = malpractice_count + 1 WHERE id = $1 RETURNING malpractice_count',
            [sessionId]
        );
        
        const count = result.rows[0].malpractice_count;
        let action = 'warn';
        
        if (count >= 5) { // Auto-flag after 5 attempts
            await pool.query("UPDATE exam_sessions SET status = 'flagged' WHERE id = $1", [sessionId]);
            action = 'terminate';
        }

        res.status(200).json({ success: true, count, action });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};