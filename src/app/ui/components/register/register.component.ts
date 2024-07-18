import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../services/common/custom-toastr.service';
import { UserService } from '../../../services/common/models/user.service';
import { User } from '../../../entities/user';
import { Create_User } from '../../../contracts/user/create_user';

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
      username: ["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(3)]],
      email: ["", [
        Validators.required,
        Validators.maxLength(250),
        Validators.email]],
      phone: ["", [
        Validators.required,
        Validators.pattern("^[0-9]{10}$"),]],
      age: ["", [
        Validators.required,
        Validators.min(18),
        Validators.max(100)]],
      gender: ["", [
        Validators.required,]],
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

  async onSubmit(user: User) {
    this.submitted = true;
    user.phone = "0" + user.phone;
    this.showSpinner(SpinnerType.SquareJellyBox);

    if (this.frm.invalid) {
      this.hideSpinner(SpinnerType.SquareJellyBox);
      return;
    }

    const resault: Create_User = await this.userService.createUser(user);
    if (resault.success) {
      this.hideSpinner(SpinnerType.SquareJellyBox);
      this.activatedRoute.queryParams.subscribe(params => {
        const returnUrl: string = params["returnUrl"]
        if (returnUrl) {
          this.router.navigate([returnUrl]);
        } else {
          this.router.navigate(["/login"]);
        }
      });
      this.toastrService.message(resault.message, "Success", {
        messageType: ToastrMessageType.Success,
        position: ToastrPosition.TopRight
      });
    } else {
      this.hideSpinner(SpinnerType.SquareJellyBox);
      this.toastrService.message(resault.message, "Error", {
        messageType: ToastrMessageType.Error,
        position: ToastrPosition.TopRight
      });
    }
  }
}
