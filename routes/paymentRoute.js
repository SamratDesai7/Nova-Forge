const express = require('express');
const router = express.Router(); // Renamed the variable to follow conventional naming

const bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

const path = require('path');
// Removed setting the view engine and views here, as it should be done in the main Express app

const paymentController = require('../controllers/paymentController');

router.get('/', paymentController.renderProductPage);
router.post('/createOrder', paymentController.createOrder);

module.exports = router;