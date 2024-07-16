import { Component } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends BaseComponent {
  constructor(
    spinner: NgxSpinnerService,
    private toastrService: CustomToastrService,
  ) {
    super(spinner);
  }

  //toastr test
  a() {
    this.toastrService.message("Test deneme", "Test", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight
    })
  }
}
