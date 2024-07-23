import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { HotelsModule } from './hotels/hotels.module';
import { HotelDetailModule } from './hotel-detail/hotel-detail.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RegisterModule,
    LoginModule,
    HotelsModule,
    HotelDetailModule,
  ]
})
export class ComponentsModule { }
