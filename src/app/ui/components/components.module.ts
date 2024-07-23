import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { HotelsModule } from './hotels/hotels.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RegisterModule,
    LoginModule,
    HotelsModule,
  ]
})
export class ComponentsModule { }
