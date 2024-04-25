// routes/report.js

const express = require("express");
const router = express.Router();
const ReportDBApi = require("../db/api/report");

router.get("/", async (req, res) => {
  try {
    // Call the method from ReportDBApi to fetch the report data
    const reportData = await ReportDBApi.getReportData();

    // Send the report data as a response
    res.json(reportData);
  } catch (error) {
    // Log the error for debugging
    console.error("Error while fetching report data:", error);
    res
      .status(500)
      .json({ error: "Something went wrong", details: error.message });
  }
});

module.exports = router;
