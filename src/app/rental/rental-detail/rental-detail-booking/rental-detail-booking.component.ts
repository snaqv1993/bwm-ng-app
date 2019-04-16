import { Component, OnInit, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Booking } from '../../../booking/shared/booking.model';
import { Rental } from '../../shared/rental.model';
import { HelperService } from '../../../common/service/helper.service';
import { BookingService } from '../../../booking/shared/booking.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import { AuthService } from '../../../auth/shared/auth.service';


@Component({
	encapsulation: ViewEncapsulation.None,
	selector: 'bwm-rental-detail-booking',
	templateUrl: './rental-detail-booking.component.html',
	styleUrls: ['./rental-detail-booking.component.scss']
})
export class RentalDetailBookingComponent implements OnInit {

	@Input() rental: Rental;
	@ViewChild(DaterangePickerComponent)
	private picker: DaterangePickerComponent;

	newBooking: Booking;
	modalRef: any;

	daterange: any = {};
	bookedOutDates: any[] = [];
	errors: any[] = [];

	public options: any = {
		locale: { format: Booking.BOOKING_DATE_FORMAT },
		alwaysShowCalendars: false,
		opens: 'left',
		autoUpdateInput: false,
		isInvalidDate: this.checkForInvalidDates.bind(this)
	};

	constructor(private helper: HelperService, 
		private modalService: NgbModal,
		private bookingService: BookingService, 
		private toastService: ToastrService,
		public auth: AuthService) { }
	

	ngOnInit() {
		this.newBooking = new Booking();
		this.getBookedOutDates();
	}

	private checkForInvalidDates(date) {
		return this.bookedOutDates.includes(this.helper.getBookingDateFormat(date)) || date.diff(moment(), 'days') < 0;
	}

	private getBookedOutDates() {
		const bookings: Booking[] = this.rental.bookings;
		if(bookings && bookings.length > 0){
			bookings.forEach((booking: Booking) => {
				const dateRange = this.helper.getBookingRangeOfDates(booking.startAt, booking.endAt);
				this.bookedOutDates.push(...dateRange);
			});
		}
	}

	private resetDatePicker() {
		this.picker.datePicker.setStartDate(moment());
		this.picker.datePicker.setEndDate(moment());
		this.picker.datePicker.element.val('');
	}

	private addNewBookedOutDates(bookingData: any) {
		const dateRange = this.helper.getBookingRangeOfDates(bookingData.startAt, bookingData.endAt);
		this.bookedOutDates.push(...dateRange);
	}

	public openConfirmModal(content) {
		this.errors = [];
		this.modalRef = this.modalService.open(content)
		//console.log("Dassadadsd")
	}

	public createBooking() {
		this.newBooking.rental = this.rental;
		this.bookingService.createBooking(this.newBooking).subscribe(
			(bookingData: any) => {
				this.addNewBookedOutDates(bookingData);
				this.newBooking = new Booking();
				this.modalRef.close();
				this.resetDatePicker();
				this.toastService.success('Booking has been successfully created, Check your booking in "Manage Section"', 'Success!');
			},
			(errResponse: any) => {
				console.log(errResponse.error.errors);
				this.errors = errResponse.error.errors;
			})
		//console.log(this.newBooking);
	}

	public selectedDate(value: any, datepicker?: any) {
		this.options.autoUpdateInput = true;
		this.newBooking.startAt = this.helper.getBookingDateFormat(value.start);
		this.newBooking.endAt = this.helper.getBookingDateFormat(value.end);
		this.newBooking.days = -(value.start.diff(value.end, 'days'));
		this.newBooking.totalPrice = this.newBooking.days * this.rental.dailyRate;

		// console.log(this.newBooking);
	}

}