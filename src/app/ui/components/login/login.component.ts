import { Component } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent {
  constructor(
    spinner: NgxSpinnerService,
  ) {
    super(spinner);
  }

  login(usernameOrEmail: string, password: string) {
    
  }
}
