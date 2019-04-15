const express = require('express');
const router = express.Router();
const Rental = require('../models/rental');
const User = require('../models/user');
const {normalizeErrors} = require('../helpers/mongoose')

const userController = require('../controllers/user');

router.get('/secret', userController.authMiddleware, function(res, res){
	res.json({"secret": true});
})


router.get('/:id', function(req, res){
	const rentalId = req.params.id;
	console.log(rentalId)
	Rental.findById(rentalId)
	.populate('user', 'username -_id')
	.populate('bookings', 'startAt endAt -_id')
	.exec(function(err, foundRentals) {
		if(err){
			return res.status(422).send({errors: [{title: 'Rental Error!', detail: 'Could not find a rental with that ID'}]});
		}
		return res.json(foundRentals);
	})
});

router.post('', userController.authMiddleware, function(req, res) {
	const { title,  city,  street, category, image, shared, bedrooms, description, dailyRate } = req.body;
	const user = res.locals.user;

	const rental = new Rental({title,  city,  street, category, image, shared, bedrooms, description, dailyRate});
	rental.user = user;
	Rental.create(rental, function(err, newRental) {
		if(err) {
			return res.status(422).send({errors: normalizeErrors(err.errors)}, function(){})
		}
		User.update({_id: user.id}, { $push: {rentals: newRental}})
		return res.json(newRental)
	})
})

router.get('', function(req, res){
	const city = req.query.city;
	const query = city ? {city: city.toLowerCase()} : {};
	
	Rental.find(query)
	.select('-bookings')
	.exec(function(err, foundRentals) {
		if(err) {
			return res.status(422).send({errors: normalizeErrors(err.errors)})
		}

		if(city && foundRentals.length === 0) {
			return res.status(422).send({title: "No Rental Found!" , detail: `There are no rentals for the city ${city}` })
		}
		return res.json(foundRentals);
	})
});



	module.exports = router;