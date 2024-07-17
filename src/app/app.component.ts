import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from './base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './services/common/auth.service';
import { Router } from '@angular/router';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/common/custom-toastr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent extends BaseComponent {
  constructor(
    spinner: NgxSpinnerService,
    public authService: AuthService,
    private toastrService: CustomToastrService,
    private router: Router,
  ) {
    super(spinner);
    authService.identityCheck();
  }

  signOut() {
    this.showSpinner(SpinnerType.BallSpinClockwise);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastrService.message("Session Ended", "The session is closed.", {
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.TopRight
    })
    this.hideSpinner(SpinnerType.BallSpinClockwise);
  }

}
