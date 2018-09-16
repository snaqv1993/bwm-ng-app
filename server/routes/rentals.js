const express = require('express');
const router = express.Router();
const rental = require('../models/rental');

router.get('', function(req, res){
	rental.find({} , function(err, foundRentals){
		res.json(foundRentals);
	});
});

router.get('/:id', function(req, res){
	const rentalId = req.params.id;

	rental.findById(rentalId, function(err, foundRentals){
		if(err){
			console.log("asass");
			res.status(422).send({errors: [{title: 'Rental Error!', detail: 'Could not find a rental with that ID'}]});
		}
		res.json(foundRentals);
	});
});

module.exports = router;