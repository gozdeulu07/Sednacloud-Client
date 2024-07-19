import { Component, EventEmitter, Output } from '@angular/core';
import { BaseComponent } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { DialogService } from '../../../../services/common/models/dialog.service';
import { CreateHotelDialogComponent } from '../../../../dialogs/create-hotel-dialog/create-hotel-dialog.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})

export class CreateComponent extends BaseComponent {
  constructor(
    spinner: NgxSpinnerService,
    private dialogService: DialogService,
  ) {
    super(spinner);
  }

  @Output() newHotelCreated: EventEmitter<void> = new EventEmitter<void>();


  addHotel() {
    this.dialogService.openDialog({
      componentType: CreateHotelDialogComponent,
      options: {
        width: "590px"
      },
      afterClosed: () => {
        this.newHotelCreated.emit();
      }
    })
  }
}
