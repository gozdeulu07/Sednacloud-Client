import { Component, Inject, OnInit } from '@angular/core';
import { HotelService } from '../../services/common/models/hotel.service';
import { DialogService } from '../../services/common/models/dialog.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/common/custom-toastr.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SingleHotel } from '../../contracts/hotel/single_hotel';
import { BaseDialog } from '../base/base-dialog';
import { SpinnerType } from '../../base/base.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-hotel-detail-dialog',
  templateUrl: './hotel-detail-dialog.component.html',
  styleUrl: './hotel-detail-dialog.component.scss'
})
export class HotelDetailDialogComponent extends BaseDialog<HotelDetailDialogComponent> implements OnInit {



  constructor(
    private hotelService: HotelService,
    private dialogService: DialogService,
    private spinner: NgxSpinnerService,
    private toastrService: CustomToastrService,
    dialogRef: MatDialogRef<HotelDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {
    super(dialogRef);
  }

  singleHotel: SingleHotel;

  displayedColumns: string[] = ['name', 'phone', 'email', 'star', 'starRating'];
  dataSource;

  async ngOnInit(): Promise<void> {
    this.spinner.show(SpinnerType.SquareJellyBox);
    this.singleHotel = await this.hotelService.getHotelById(this.data as string);
    this.dataSource = new MatTableDataSource<any>([this.singleHotel]);
    this.spinner.hide(SpinnerType.SquareJellyBox);
  }
}