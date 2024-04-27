const express = require("express");
const router = express.Router();
const SettingsService = require("../services/settings");
const wrapAsync = require("../helpers").wrapAsync;

// POST a new setting
router.post(
  "/",
  wrapAsync(async (req, res) => {
    const { text, description } = req.body;
    try {
      await SettingsService.createOrUpdateSetting(text, description);
      res
        .status(200)
        .json({
          success: true,
          message: "Setting created or updated successfully",
        });
    } catch (error) {
      console.error("Error creating or updating setting:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  })
);

router.get("/", async (req, res) => {
  try {
    const settings = await SettingsService.getAllSettings();
    res.status(200).json({ success: true, settings });
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Update a setting by ID
router.put("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const { text, description } = req.body;
    try {
      await SettingsService.updateSettingById(id, text, description);
      res.status(200).json({
        success: true,
        message: "Setting updated successfully",
      });
    } catch (error) {
      console.error("Error updating setting:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }));
  
  // Delete a setting by ID
  router.delete("/:id", wrapAsync(async (req, res) => {
    const { id } = req.params;
    try {
      await SettingsService.deleteSettingById(id);
      res.status(200).json({
        success: true,
        message: "Setting deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting setting:", error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }));

module.exports = router;
