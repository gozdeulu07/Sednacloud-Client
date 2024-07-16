import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelsComponent } from './hotels.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ListComponent } from './list/list.component';



@NgModule({
  declarations: [
    HotelsComponent,
    ListComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: "", component: HotelsComponent },
    ]),
    CommonModule,
    MatTableModule,
    MatPaginator,
  ]
})
export class HotelsModule { }
