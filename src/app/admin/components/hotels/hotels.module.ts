import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelsComponent } from './hotels.component';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ListComponent } from './list/list.component';
import { DeleteDirectiveModule } from '../../../directives/admin/delete.directive.module';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateComponent } from './create/create.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    HotelsComponent,
    ListComponent,
    CreateComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: "", component: HotelsComponent },
    ]),
    CommonModule,
    MatTableModule,
    MatPaginator,
    DeleteDirectiveModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
  ]
})
export class HotelsModule { }
