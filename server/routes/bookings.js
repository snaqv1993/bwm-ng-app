const express = require('express');
const router = express.Router();


const bookingController = require('../controllers/booking');
const userController = require('../controllers/user');

router.post('', userController.authMiddleware, bookingController.createBooking);

module.exports = router;