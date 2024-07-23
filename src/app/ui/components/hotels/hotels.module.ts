import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelsComponent } from './hotels.component';
import { ListComponent } from './list/list.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HotelsComponent,
    ListComponent,
  ],
  imports: [
    RouterModule.forChild([
      { path: "", component: HotelsComponent },
    ]),
    CommonModule,
  ]
})
export class HotelsModule { }
