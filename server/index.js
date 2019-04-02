const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const rental = require('./models/rental');
const FakeDb = require('./fake-db');
const rentalRoutes = require('./routes/rentals');

mongoose.connect(config.DB_URI, { useNewUrlParser: true, sslValidate: true }).then(()=>{
	const fakeDb = new FakeDb();
	console.log(config.DB_URI);
	fakeDb.seedDb();
	console.log(config.DB_URI);
}).catch((err) => {
    console.log(err.message);
});
const app = express();

app.use('/api/v1/rentals', rentalRoutes);

//const PORT = process.env.PORT || 3001;

app.listen(3001, function(){
	console.log(config.DB_URI);
	console.log("i am running");
});

// mongoose.connect('mongodb://localhost/testdb').then(() => {
// console.log("Connected to Database");
// }).catch((err) => {
//     console.log("Not Connected to Database ERROR! ", err);
// });