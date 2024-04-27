const express = require("express");
const router = express.Router();
const { add, AllData } = require("../db/api/cmr");
const upload = require("../../middleware/multer"); // Import the single middleware directly

router.post("/addProduct", upload, (req, res, next) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file provided" });
  }
  add(req, res, next);
});

router.get("/allProducts", AllData);

module.exports = router;
