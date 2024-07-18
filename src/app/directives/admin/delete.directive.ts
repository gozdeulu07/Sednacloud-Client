import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent, DeleteDialogState } from '../../dialogs/delete-dialog/delete-dialog.component';
import { HttpClientService } from '../../services/common/http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/common/custom-toastr.service';
import { DialogService } from '../../services/common/models/dialog.service';

declare var $: any;

@Directive({
  selector: '[appDelete]'
})
export class DeleteDirective {

  constructor(
    private element: ElementRef,
    private _renderer: Renderer2,
    private httpClientService: HttpClientService,
    private spinner: NgxSpinnerService,
    private toastrService: CustomToastrService,
    public dialog: MatDialog,
    private dialogService: DialogService,
  ) {
    const ico = _renderer.createElement("i");
    ico.setAttribute("class", "bi bi-trash3-fill");
    ico.setAttribute("style", "font-size: 22px; color: red;");
    ico.setAttribute("title", "Delete");
    _renderer.appendChild(element.nativeElement, ico);
  }

  @Input() id: string;
  @Input() controller: string;
  @Output() callback: EventEmitter<any> = new EventEmitter;

  @HostListener("click")
  async onClick() {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteDialogState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.SquareJellyBox);
        const td: HTMLTableCellElement = this.element.nativeElement;
        debugger
        this.httpClientService.delete({
          controller: this.controller
        }, this.id).subscribe({
          next: (data) => {
            $(td.parentElement).animate({
              opacity: 0,
              left: "+=50",
              height: "toogle"
            }, 700, () => {
              this.callback.emit();
              this.toastrService.message(`Selected ${this.controller == 'roles' ? 'role' : 'product'} successfully deleted.`, "Success!", {
                messageType: ToastrMessageType.Success,
                position: ToastrPosition.TopRight
              })
            });
          }, error: (errorResponse: HttpErrorResponse) => {
            this.spinner.hide(SpinnerType.SquareJellyBox);
            this.toastrService.message("An error occurred while deleting the selected product.", "Error!", {
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopRight
            });
          }
        });
      }
    });
  }
}