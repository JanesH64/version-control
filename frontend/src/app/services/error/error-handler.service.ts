import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';
import { ErrorData } from '../../models/errorData';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    public dialog: MatDialog
    ) { }

  public handleError(message: string): void {
    let data: ErrorData = {
      message: message
    };

    this.dialog.open(ErrorDialogComponent, {
      data: data
    });
  }
}
