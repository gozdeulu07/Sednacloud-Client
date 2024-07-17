import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/common/auth.service';
import { UserAuthService } from '../../../services/common/models/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent {
  constructor(
    spinner: NgxSpinnerService,
    private authService: AuthService,
    private userAuthService: UserAuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    super(spinner);
  }

  login(usernameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.SquareJellyBox);

    this.userAuthService.login(usernameOrEmail, password, () => {

      this.authService.identityCheck();

      this.activatedRoute.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"]
        if (returnUrl) {
          this.router.navigate([returnUrl]);
        } else {
          this.router.navigate([""]);
        }
      });

      this.hideSpinner(SpinnerType.SquareJellyBox);
    });
  }
}
