import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { Rental } from '../shared/rental.model';
import { RentalService } from '../shared/rental.service';

import { HttpErrorResponse } from '@angular/common/http';

@Component({
	selector: 'bwm-rental-search',
	templateUrl: './rental-search.component.html',
	styleUrls: ['./rental-search.component.scss']
})
export class RentalSearchComponent implements OnInit {

	rentals: Rental[] = [];	
	errors: any[] = [];
	city : string;
	constructor(private rentalService: RentalService,
		private route: ActivatedRoute) { }

	ngOnInit() {
		this.route.params.subscribe(
			(params) => {
				this.city = params['city'];
				this.getRentalByCity(this.city);
			}
			)
	}

	getRentalByCity(city: string) {
		this.rentals = [];
		this.errors = [];
		const rentalObservable = this.rentalService.getRentalByCity(city);
		rentalObservable.subscribe(
			(data: Rental[]) =>{
				this.rentals = data;
			},
			(err: HttpErrorResponse) =>{
				this.errors = err.error;
				console.log(err.error);
			},
			() => {
			}
			);
	}
}
