import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../booking/shared/booking.service';
import { Booking } from '../../booking/shared/booking.model';

@Component({
	selector: 'bwm-manage-booking',
	templateUrl: './manage-booking.component.html',
	styleUrls: ['./manage-booking.component.scss']
})
export class ManageBookingComponent implements OnInit {

	bookings: Booking[];

	constructor(private bookingService: BookingService) { }

	ngOnInit() {
		this.bookingService.getUserBooking().subscribe(
			(data: Booking[]) => {
				this.bookings = data;
			},
			(err) => {
				console.log(err.error.errors);
			} 
			)
	}

}
