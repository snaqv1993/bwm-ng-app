const express = require('express');
const router = express.Router();

const userController = require('../controllers/user');

const upload = require('../services/image-upload');
const singleUpload = upload.single('image');

router.post('/image-upload', userController.authMiddleware,  function(req, res){
	singleUpload(req, res, function(err) {
		if(err) {
			return  res.status(422).send({title: 'Image upload error', detail: err.message})
		}
		return res.json({'imageUrl': req.file.location})
	})
})

module.exports = router;