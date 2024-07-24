import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HotelService } from '../../../../services/common/models/hotel.service';
import { List_Hotel } from '../../../../contracts/hotel/list_hotel';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent implements OnInit {

  constructor(spinner: NgxSpinnerService,
    private hotelService: HotelService,
    private activatedRoute: ActivatedRoute,
  ) {
    super(spinner);
  }

  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number = 12;
  pageList: number[] = [];
  hotels: List_Hotel[];

  async ngOnInit() {

    this.activatedRoute.params.subscribe({
      next: async (paramas) => {
        this.currentPageNo = parseInt(paramas["pageNo"] ?? 1);

        const data: { totalCount: number, hotels: List_Hotel[] } = await this.hotelService.getAllHotels(this.currentPageNo - 1, this.pageSize, () => {

        }, errorMessage => {

        });

        this.hotels = data.hotels;

        this.totalProductCount = data.totalCount;
        this.totalPageCount = Math.ceil(data.totalCount / this.pageSize);
        this.pageList = []

        debugger 

        if (this.currentPageNo - 3 <= 0) {
          for (let i = 1; i <= 7; i++)
            this.pageList.push(i);
        }

        else if (this.currentPageNo + 3 >= this.totalPageCount) {
          for (let i = this.totalPageCount - 6; i <= this.totalPageCount; i++)
            this.pageList.push(i);
        }

        else {
          for (let i = this.currentPageNo - 3; i <= this.currentPageNo + 3; i++)
            this.pageList.push(i);
        }

      }
    });
  }

  getStarArray(hotel: List_Hotel): number[] {
    return Array(hotel.star || 0).fill(0);
  }
}
