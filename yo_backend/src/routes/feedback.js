const express = require('express');

const passport = require('passport');
const FeedbackService = require('../services/feedback');
const FeedbackDBApi = require('../db/api/feedback');
const wrapAsync = require('../helpers').wrapAsync;

const router = express.Router();

router.post('/add', wrapAsync(async (req, res) => {
  await FeedbackService.createEnquiry(req.body, req.currentUser || { id: "7facf8cc-0af5-448a-a17c-84bbf22f2ded", email: "admin@yodigital.com" });
  res.status(200).send({ success: true });
}));

router.put('/:id', wrapAsync(async (req, res) => {
  const { id } = req.params;
  
  try {
    await FeedbackService.update(id, req.body.data);  // Pass the id directly
    const payload = true;
    res.status(200).json({ success: true, payload });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
}));

router.delete('/:id', passport.authenticate('jwt', {session: false}), wrapAsync(async (req, res) => {
  await FeedbackService.remove(req.params.id, req.currentUser);
  const payload = true;
  res.status(200).send(payload);
}));

router.get('/get', wrapAsync(async (req, res) => {
  const payload = await FeedbackDBApi.findAll(
    req.query,
  );

  res.status(200).send(payload);
}));
router.get('/autocomplete', async (req, res) => {
  const payload = await FeedbackDBApi.findAllAutocomplete(
    req.query.query,
    req.query.limit,
  );

  res.status(200).send(payload);
});

router.get('/:id', wrapAsync(async (req, res) => {
  const payload = await FeedbackDBApi.findBy(
    { id: req.params.id },
  );

  res.status(200).send(payload);
}));

router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;