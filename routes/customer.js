// routes/customer.js
const express = require('express');
const { addCustomer } = require('../controllers/customerController');

const router = express.Router();

router.post('/', addCustomer);

module.exports = router;
