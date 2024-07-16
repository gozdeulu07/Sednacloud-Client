import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomToastrService } from '../../../services/common/custom-toastr.service';
import { UserService } from '../../../services/common/models/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastrService: CustomToastrService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
    super(spinner);
  }

  frm: FormGroup;
  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      name: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)]],
      surname: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)]],
      username: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)]],
      email: ["", [
        Validators.required,
        Validators.maxLength(250),
        Validators.email]],
      password: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(6)]],
      passwordConfirm: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(6),
      ]],
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let pass = group.get('password').value;
        let confirmPass = group.get('passwordConfirm').value;
        var a = pass == confirmPass && confirmPass == pass ? null : { notSame: true };
        return a;
      }
    });
  }

  submitted: boolean = false;
  get component() {
    return this.frm.controls;
  }

  async onSubmit() {
    this.submitted = true;
    this.showSpinner(SpinnerType.BallSpinClockwise);

    if (this.frm.invalid) {
      this.hideSpinner(SpinnerType.BallSpinClockwise);
      return;
    }
  }
}
