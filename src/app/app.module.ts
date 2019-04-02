import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
//import { RentalComponent } from './rental/rental.component';

import { RentalModule } from './rental/rental.module';
// import { MapComponent } from './common/map/map.component';


const routes: Routes = [
	{path: '', redirectTo: '/rentals', pathMatch: 'full'}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
    // MapComponent,
  ],
  imports: [
  	RouterModule.forRoot(routes),
    BrowserModule,
    RentalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
