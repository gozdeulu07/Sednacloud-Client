import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelDetailComponent } from './hotel-detail.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HotelDetailComponent,
  ],
  imports: [
    RouterModule.forChild([
      { path: "", component: HotelDetailComponent },
    ]),
    CommonModule,
  ]
})
export class HotelDetailModule { }
