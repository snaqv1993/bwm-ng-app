const Rental = require('./models/rental');
const mongoose = require('mongoose');

class fakeDb {

	constructor(){
		this.rentals = [{
                  title: "Nice view on beach",
                  city: "San Francisco",
                  street: "Main street",
                  category: "condo",
                  image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
                  bedrooms: 4,
                  shared: true,
                  description: "Very nice apartment in center of the city.",
                  dailyRate: 43,
                  _id: "4eb6e7e7e9b7f4194e000002"
                  },
                  {
                  title: "Modern apartment in CBD",
                  city: "New York",
                  street: "Time Square",
                  category: "apartment",
                  image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
                  bedrooms: 1,
                  shared: false,
                  description: "Very nice apartment in center of the city.",
                  dailyRate: 11,
                  _id: "4eb6e7e7e9b7f4194e000003"
                  },
                  {
                  title: "Old house in nature",
                  city: "Spisska Nova Ves",
                  street: "Banicka 1",
                  category: "house",
                  image: "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg",
                  bedrooms: 5,
                  shared: true,
                  description: "Very nice apartment in center of the city.",
                  dailyRate: 23,
                  _id: "4eb6e7e7e9b7f4194e000004"
		}]
	}

	async cleanDb(){
		//await Rental.remove({});
            await Rental.deleteMany({});
	}

	pushRentalsToDb(){
		this.rentals.forEach((rental) => {
                  //var id = mongoose.Types.ObjectId('4edd40c86762e0fb12000003');
                  //console.log(id)
			console.log("asadadsd");
			const newRental = new Rental(rental);
			console.log("wwwwww");

			newRental.save();
		})
	}

	seedDb(){
            try{
               this.cleanDb();
            this.pushRentalsToDb();   
            }
            catch(e){
                  console.log(e.message);
            }
		
	}
}

module.exports = fakeDb;