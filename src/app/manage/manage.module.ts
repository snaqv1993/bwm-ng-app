import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NgPipesModule } from 'ngx-pipes';

import { ManageComponent } from './manage.component';
import { ManageRentalBookingComponent } from './manage-rental/manage-rental-booking/manage-rental-booking.component';
import { ManageBookingComponent } from './manage-booking/manage-booking.component';
import { ManageRentalComponent } from './manage-rental/manage-rental.component';

import { FormatDatePipe } from '../common/pipes/format-date.pipe';


import { AuthGuard } from '../auth/shared/auth.guard';



const routes: Routes = [
{
	path: 'manage',
	component: ManageComponent,
	children: [
	{path: 'rentals', component: ManageRentalComponent, canActivate: [AuthGuard]},
	{path: 'bookings', component: ManageBookingComponent, canActivate: [AuthGuard]}
	]	
}
]

@NgModule({
	declarations: [
	ManageBookingComponent,
	ManageRentalComponent,
	FormatDatePipe,
	ManageRentalBookingComponent
	],
	imports: [
	RouterModule.forChild(routes),
	CommonModule,
	NgPipesModule
	],
	providers: [
	]
})
export class ManageModule { }
