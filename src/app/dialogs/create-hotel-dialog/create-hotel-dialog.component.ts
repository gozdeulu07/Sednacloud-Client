import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../services/common/http-client.service';
import { SpinnerType } from '../../base/base.component';
import { Create_Hotel } from '../../contracts/hotel/create_hotel';
import { HotelService } from '../../services/common/models/hotel.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/common/custom-toastr.service';

@Component({
  selector: 'app-create-hotel-dialog',
  templateUrl: './create-hotel-dialog.component.html',
  styleUrl: './create-hotel-dialog.component.scss'
})
export class CreateHotelDialogComponent extends BaseDialog<CreateHotelDialogComponent> {
  constructor(
    private spinner: NgxSpinnerService,
    private hotelService: HotelService,
    private toastrService: CustomToastrService,
    dialogRef: MatDialogRef<CreateHotelDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateHotelDialogState,
  ) {
    super(dialogRef)
  }

  create(name: HTMLInputElement, email: HTMLInputElement, phone: HTMLInputElement, address: HTMLInputElement, description: HTMLInputElement, star: HTMLInputElement,) {
    this.spinner.show(SpinnerType.SquareJellyBox);
    const create_hotel: Create_Hotel = new Create_Hotel();
    create_hotel.name = name.value;
    create_hotel.email = email.value;
    create_hotel.phone = phone.value;
    create_hotel.address = address.value;
    create_hotel.description = description.value;
    create_hotel.star = parseInt(star.value);

    this.hotelService.createHotel(create_hotel, () => {
      this.spinner.hide(SpinnerType.SquareJellyBox);
      this.toastrService.message("New Hotel Successfuly Created!", "Success!", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      });
    }, errorMessage => {
      this.spinner.hide(SpinnerType.SquareJellyBox);
      this.toastrService.message("While Creating New Hotel Error Occurred!", "Error!", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      });
    });
  }
}

export enum CreateHotelDialogState {
  Create,
  Cancel
}