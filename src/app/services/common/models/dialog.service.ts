import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ComponentType } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(dialogParameters: Partial<DialogParameters>): MatDialogRef<any> {
    const dialogRef = this.dialog.open(dialogParameters.componentType, {
      width: dialogParameters.options?.width,
      height: dialogParameters.options?.height,
      position: dialogParameters.options?.position,
      data: dialogParameters.data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (dialogParameters.afterClosed) {
        dialogParameters.afterClosed(result);
      }
    });

    return dialogRef;
  }
}

export class DialogParameters {
  componentType: ComponentType<any>;
  data: any;
  afterClosed?: (result: any) => void;
  options?: Partial<DialogOptions>;
}

export class DialogOptions {
  width?: string = "250px";
  height?: string;
  position?: DialogPosition;
}