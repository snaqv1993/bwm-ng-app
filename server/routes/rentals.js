const express = require('express');
const router = express.Router();
const rental = require('../models/rental');

const userController = require('../controllers/user');

router.get('/secret', userController.authMiddleware, function(res, res){
	res.json({"secret": true});
})

router.get('', function(req, res){
	rental.find({})
	 .select('-bookings')
	 .exec(function(err, foundRentals) {
	 	return res.json(foundRentals);
	 })

});

router.get('/:id', function(req, res){
	const rentalId = req.params.id;
console.log(rentalId)
	rental.findById(rentalId)
	.populate('user', 'username -_id')
	.populate('bookings', 'startAt endAt -_id')
	.exec(function(err, foundRentals) {
		if(err){
			return res.status(422).send({errors: [{title: 'Rental Error!', detail: 'Could not find a rental with that ID'}]});
		}
		return res.json(foundRentals);
	})
});

module.exports = router;