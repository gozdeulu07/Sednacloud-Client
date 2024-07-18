import { Component, ViewChild } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { List_Hotel } from '../../../../contracts/hotel/list_hotel';
import { HotelService } from '../../../../services/common/models/hotel.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../../../services/common/custom-toastr.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent extends BaseComponent {
  constructor(
    spinner: NgxSpinnerService,
    private hotelService: HotelService,
    private toastrService: CustomToastrService,
  ) {
    super(spinner);
  }

  displayedColumns: string[] = ['name', 'address', 'phone', 'email', 'star', 'photos', 'edit', 'delete'];
  dataSource: MatTableDataSource<List_Hotel> = null
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getHotels() {
    this.showSpinner(SpinnerType.SquareJellyBox);
    const allHotels: { totalCount: number, hotels: List_Hotel[] } =
      await this.hotelService.getAllHotels(this.paginator ? this.paginator.pageIndex : 0, this.paginator ? this.paginator.pageSize : 5,
        () => this.hideSpinner(SpinnerType.SquareJellyBox),
        errorMessage => {
          this.toastrService.message(errorMessage, "Error!", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopRight,
          });
          this.hideSpinner(SpinnerType.SquareJellyBox);
        });
    this.dataSource = new MatTableDataSource<List_Hotel>(allHotels.hotels);
    this.paginator.length = allHotels.totalCount;
  }

  addProductImages(id: string) {
    // this.dialogService.openDialog({
    //   componentType: SelectProductImageDialogComponent,
    //   data: id,
    //   options: {
    //     width: "1400px"
    //   }
    // });
  }

  async pageChanged() {
    await this.getHotels();
  }

  async ngOnInit() {
    await this.getHotels();
  }
}