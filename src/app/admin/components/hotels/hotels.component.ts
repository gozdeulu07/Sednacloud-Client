import { Component, ViewChild } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService } from '../../../services/common/custom-toastr.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrl: './hotels.component.scss'
})
export class HotelsComponent extends BaseComponent {
  constructor(spinner: NgxSpinnerService) {
    super(spinner);
  }

  @ViewChild(ListComponent) listComponents: ListComponent;

  newHotelCreated() {
    this.listComponents.getHotels();
  }
}
