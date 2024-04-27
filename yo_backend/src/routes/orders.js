const express = require('express');

const OrdersService = require('../services/orders');
const OrdersDBApi = require('../db/api/orders');
const wrapAsync = require('../helpers').wrapAsync;

const router = express.Router();

router.post('/', wrapAsync(async (req, res) => {
  await OrdersService.create(req.body.data, req.currentUser);
  const payload = true;
  res.status(200).send(payload);
}));

router.put('/:id', wrapAsync(async (req, res) => {
  await OrdersService.update(req.body.data, req.body.id, req.currentUser);
  const payload = true;
  res.status(200).send(payload);
}));

router.delete('/:id', wrapAsync(async (req, res) => {
  await OrdersService.remove(req.params.id, req.currentUser);
  const payload = true;
  res.status(200).send(payload);
}));



// router.get('/', wrapAsync(async (req, res) => {
//   const userId = req.params.userId; // Get user ID from URL parameters
//   const payload = await OrdersDBApi.findAll({ userId }); // Pass user ID to DB API method

//   res.status(200).send(payload);
// }));


router.get('/', async (req, res) => {
  try {
    const filter = req.query.filter; // Assuming you're passing filters via query parameters
    const userId = req.params.userId; // Assuming user ID is stored in session

console.log("This is role mesg")    // Call the findAll method with the filter and currentUser
    const orders = await OrdersDBApi.findAll(filter, { userId });

    // Send the orders as a response
    res.json(orders);
  } catch (error) {
  // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/autocomplete', async (req, res) => {
  const payload = await OrdersDBApi.findAllAutocomplete(
    req.query.query,
    req.query.limit,
  );

  res.status(200).send(payload);
});

router.get('/:id', wrapAsync(async (req, res) => {
  const payload = await OrdersDBApi.findBy(
    { id: req.params.id },
  );

  res.status(200).send(payload);
}));

router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;