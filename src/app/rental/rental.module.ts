import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgPipesModule, UcWordsPipe } from 'ngx-pipes';
import { MapModule } from '../common/map/map.module';
import { Daterangepicker } from 'ng2-daterangepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { EditableModule } from '../common/components/editable/editable.module';
import { ImageUploadModule } from '../common/components/image-upload/image-upload.module';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';


import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemComponent } from './rental-list-item/rental-list-item.component';
import { RentalComponent } from './rental.component';
import { RentalDetailComponent } from './rental-detail/rental-detail.component';
import { RentalDetailBookingComponent } from './rental-detail/rental-detail-booking/rental-detail-booking.component';
import { RentalSearchComponent } from './rental-search/rental-search.component';
import { RentalCreateComponent } from './rental-create/rental-create.component';


import { RentalService } from './shared/rental.service';
import { BookingService } from '../booking/shared/booking.service';
import { HelperService } from '../common/service/helper.service';
import { UppercasePipe } from '../common/pipes/uppercase.pipe'



import { AuthGuard } from '../auth/shared/auth.guard';
import { RentalGuard } from './shared/rental.guard';
import { RentalUpdateComponent } from './rental-update/rental-update.component';



const routes: Routes = [
	{path: 'rentals', 
	component: RentalComponent,
	children: [
		{path: '', component: RentalListComponent},
		{path: 'new', component: RentalCreateComponent, canActivate: [AuthGuard]},
		{path: ':rentalId', component: RentalDetailComponent},
		{path: ':city/homes', component: RentalSearchComponent},
		{path: ':rentalId/edit', component: RentalUpdateComponent, canActivate: [AuthGuard, RentalGuard]}
		]
	}
]

@NgModule({
	declarations: [
		RentalListComponent,
    	RentalListItemComponent,
    	RentalComponent,
    	RentalDetailComponent,
    	UppercasePipe,
    	RentalDetailBookingComponent,
    	RentalSearchComponent,
    	RentalCreateComponent,
    	RentalUpdateComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
    	BrowserAnimationsModule,
    	HttpClientModule,
    	NgPipesModule,
    	MapModule,
    	Daterangepicker,
    	FormsModule,
    	EditableModule,
    	ImageUploadModule,
    	MatButtonModule, 
    	MatCheckboxModule,
    	MatCardModule
	],
	providers: [
		RentalService,
		HelperService,
		BookingService,
		UcWordsPipe,
		RentalGuard
	]
})
export class RentalModule {}