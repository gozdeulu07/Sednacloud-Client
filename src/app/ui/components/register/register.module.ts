import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RegisterComponent
  ],
  imports: [
    RouterModule.forChild([
      { path: "", component: RegisterComponent },
    ]),
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class RegisterModule { }
