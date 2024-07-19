import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { HotelDetailDialogComponent } from './hotel-detail-dialog/hotel-detail-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CreateHotelDialogComponent } from './create-hotel-dialog/create-hotel-dialog.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    DeleteDialogComponent,
    HotelDetailDialogComponent,
    CreateHotelDialogComponent,
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatTableModule,
    MatPaginator,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class DialogsModule { }
