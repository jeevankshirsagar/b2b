// routes/report.js

const express = require('express');
const router = express.Router();
const ReportDBApi = require("../db/api/report");

// Define route to handle requests for the report data
router.get('/', async (req, res) => {
    try {
        // Call the method from ReportDBApi to fetch the report data
        const reportData = await ReportDBApi.getReportData();

        // Send the report data as a response
        res.json(reportData);
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'Something went wrooooooooong', details: error.message });
    }
});

module.exports = router;
