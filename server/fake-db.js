const Rental = require('./models/rental');
const User = require('./models/user');
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
                  dailyRate: 43
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
                  dailyRate: 11
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
                  dailyRate: 23
            }];

            this.users = [{
                  username: "Test User",
                  email: "test@gmail.com",
                  password: "testtest"
            }];
      }

      async cleanDb(){
		//await Rental.remove({});
            await User.deleteMany({});
            await Rental.deleteMany({});
      }

      pushDataToDb(){
            const user = new User(this.users[0]);

            this.rentals.forEach((rental) => {
                  console.log("asadadsd");
                  
                  const newRental = new Rental(rental);
                  newRental.user = user;
                  console.log("wwwwww");
                  user.rentals.push(newRental)
                  newRental.save();
            })

            user.save()
      }

      async seedDb(){
            try{
                  await this.cleanDb();
                  this.pushDataToDb();   
            }
            catch(e){
                  console.log(e.message);
            }

      }
}

module.exports = fakeDb;