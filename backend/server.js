require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Import Routes
const testSeriesRoutes = require('./routes/testSeries');
const questionRoutes = require('./routes/questions');
const examRoutes = require('./routes/exam');

// Use Routes
app.use('/api/series', testSeriesRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/exam', examRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));