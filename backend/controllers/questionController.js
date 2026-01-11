const pool = require('../config/db');

exports.getQuestionsByTestId = async (req, res) => {
    try {
        const { testId } = req.params;
        const result = await pool.query(
            'SELECT id, subject, question_type, content, options, difficulty FROM questions WHERE test_id = $1', 
            [testId]
        );
        // We don't send 'correct_answer' to the frontend to prevent cheating via inspect element
        res.status(200).json({ success: true, count: result.rows.length, data: result.rows });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};