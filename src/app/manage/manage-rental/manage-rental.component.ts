import { Component, OnInit } from '@angular/core';
import { RentalService } from '../../rental/shared/rental.service';
import { Rental } from '../../rental/shared/rental.model';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'bwm-manage-rental',
	templateUrl: './manage-rental.component.html',
	styleUrls: ['./manage-rental.component.scss']
})
export class ManageRentalComponent implements OnInit {

	rentals: Rental[];
	rentalDeleteIndex: number;	

	constructor(private rentalService: RentalService, private toastService: ToastrService) { }

	ngOnInit() {

		this.rentalService.getUserRentals().subscribe(
			(data: Rental[]) => {
				this.rentals = data;
			},
			(err) => {
				console.log(err.error.errors);
			} 
			)
	}

	deleteRental(rentalId: string) {
		//console.log( rentalId + " " + this.rentals[rentalId]._id);
		this.rentalService.deleRentalById(rentalId).subscribe(
			(data: any) => {
				this.rentals.splice(this.rentalDeleteIndex, 1);
				this.rentalDeleteIndex = undefined;
				this.toastService.success('Rental successfully deleted', 'Success!')
			},
			(err) => {
				this.toastService.error(err.error.errors[0].detail, "Failed!");
			})
	}
}
