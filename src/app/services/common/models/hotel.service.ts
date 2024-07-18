import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { List_Hotel } from '../../../contracts/hotel/list_hotel';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';

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
}
