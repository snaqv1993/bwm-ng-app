const Rental = require('./models/rental');
const Booking = require('./models/booking');
const User = require('./models/user');
const mongoose = require('mongoose');
const fakeDBData = require('./data.json');

class fakeDb {
	constructor(){
		this.rentals = fakeDBData.rentals;

            this.users = fakeDBData.users;
      }

      async cleanDb(){
		//await Rental.remove({});
            await User.deleteMany({});
            await Rental.deleteMany({});
            await Booking.deleteMany({});
      }

      pushDataToDb(){
            const user = new User(this.users[0]);
            const user2 = new User(this.users[1]);

            this.rentals.forEach((rental) => {
                  console.log("asadadsd");
                  
                  const newRental = new Rental(rental);
                  newRental.user = user;
                  console.log("wwwwww");
                  user.rentals.push(newRental)
                  newRental.save();
            })

            user.save()
            user2.save()
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