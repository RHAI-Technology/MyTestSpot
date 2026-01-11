const pool = require('../config/db');

exports.getAllSeries = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM test_series ORDER BY created_at DESC');
        res.status(200).json({ success: true, data: result.rows });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.getSeriesById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM test_series WHERE id = $1', [id]);
        if (result.rows.length === 0) return res.status(440).json({ message: "Series not found" });
        res.status(200).json({ success: true, data: result.rows[0] });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
};