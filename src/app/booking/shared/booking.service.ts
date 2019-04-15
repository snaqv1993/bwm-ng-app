import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class BookingService {

	constructor(private http: HttpClient) { }

	public createBooking(booking:any): Observable<any>{
		return this.http.post('/api/v1/bookings', booking);
	}
}