import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { RentalService } from '../shared/rental.service';
import { Rental } from '../shared/rental.model';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UcWordsPipe } from 'ngx-pipes';


@Component({
	selector: 'bwm-rental-update',
	templateUrl: './rental-update.component.html',
	styleUrls: ['./rental-update.component.scss']
})
export class RentalUpdateComponent implements OnInit {
	rental: Rental;

	rentalCategories: string[] = Rental.CATEGORIES;

	locationsSubject: Subject<any> = new Subject();

	constructor(private route: ActivatedRoute, 
		private rentalService: RentalService,
		private toastService: ToastrService,
		private upperCasePipe: UcWordsPipe) {
		this.transformLocation = this.transformLocation.bind(this);
	}

	ngOnInit() {
		this.route.params.subscribe(
			(params) => {
				this.getRental(params['rentalId']);
			}
			)
	}

	transformLocation(location: string): string {
		return this.upperCasePipe.transform(location);
	}


	getRental(rentalId: string){
		this.rentalService.getRentalById(rentalId).subscribe(
			(rental: Rental) => {
				this.rental = rental;
			});
	}

	updateRental(rentalId:string , rentalData: any) {
		this.rentalService.updateRental(rentalId, rentalData).subscribe(
			(updatedRental: Rental) => {
				this.rental = updatedRental;
				if(rentalData.city || rentalData.street){
					this.locationsSubject.next(this.rental.city +', ' + this.rental.street);
				}
			},
			(err: any) => {
				console.log(err.error.errors[0].detail)

				this.getRental(rentalId)
				this.toastService.error(err.error.errors[0].detail, 'Error!');
			})
	}

	countBedroomAssets(assetsNum: number) {
		return parseInt(<any>this.rental.bedrooms || 0, 10)+ assetsNum;
	}
}
