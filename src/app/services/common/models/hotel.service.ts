import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { List_Hotel } from '../../../contracts/hotel/list_hotel';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';
import { SingleHotel } from '../../../contracts/hotel/single_hotel';
import { Create_Hotel } from '../../../contracts/hotel/create_hotel';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  constructor(private httpClientService: HttpClientService) { }

  //Get All Hotel Function
  async getAllHotels(page: number = 0, size: number = 5, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalCount: number, hotels: List_Hotel[] }> {
    const observable: Observable<{ totalCount: number, hotels: List_Hotel[] }> = this.httpClientService.get<{ totalCount: number, hotels: List_Hotel[] }>({
      controller: "hotels",
      queryString: `page=${page}&size=${size}`
    });

    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack()).catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message));

    return await promiseData;
  }

  // Get Hotel By Id
  async getHotelById(id: string, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    const observable: Observable<SingleHotel> = this.httpClientService.get<SingleHotel>({
      controller: "hotels"
    }, id);

    const promiseData = firstValueFrom(observable);
    promiseData.then(value => successCallBack())
      .catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message));

    return await promiseData;
  }

  async createHotel(hotel: Create_Hotel, successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void) {
    debugger
    const observable: Observable<any> = this.httpClientService.post({
      controller: "hotels",
    }, hotel);

    const promiseData = firstValueFrom(observable);
    promiseData.then(successCallBack).catch((errorResponse: HttpErrorResponse) => errorCallBack(errorResponse.message));

    return await promiseData as { succeeded: boolean };
  }
}
