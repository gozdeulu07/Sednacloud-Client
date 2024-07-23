import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from '../../../services/common/models/hotel.service';
import { SingleHotel } from '../../../contracts/hotel/single_hotel';

@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrl: './hotel-detail.component.scss'
})
export class HotelDetailComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private activatedRoute: ActivatedRoute,
    private hotelService: HotelService,
  ) {
    super(spinner);
  }

  singleHotel: SingleHotel;

  async ngOnInit() {
    let hotelId = this.activatedRoute.snapshot.paramMap.get('hotelId');
    this.singleHotel = await this.hotelService.getHotelById(hotelId as string);
  }


  getStarArray(): number[] {
    return Array(this.singleHotel?.star || 0).fill(0);
  }
}
