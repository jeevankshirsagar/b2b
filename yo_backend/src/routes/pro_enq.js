const express = require('express');

const passport = require('passport');
const FeedbackService = require('../services/pro_enq');
const FeedbackDBApi = require('../db/api/feedback');
const wrapAsync = require('../helpers').wrapAsync;

const router = express.Router();

router.post('/add', wrapAsync(async (req, res) => {
  await FeedbackService.createEnquiry(req.body, req.currentUser || { id: "7facf8cc-0af5-448a-a17c-84bbf22f2ded", email: "admin@yodigital.com" });
  res.status(200).send({ success: true });
}));


module.exports = router;