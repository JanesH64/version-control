import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ErrorDialogComponent } from '../../error-dialog/error-dialog.component';
import { ErrorData } from '../../models/errorData';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) { }

  snackBarConfig: MatSnackBarConfig = {
    horizontalPosition: "center",
      verticalPosition: "bottom",
      panelClass: "error-snackbar",
      duration: 3000
  }

  openErrorDialog(message: string): void {
    let data: ErrorData = {
      message: message
    };

    this.dialog.open(ErrorDialogComponent, {
      data: data
    });
  }

  handleErrorMessage(error: string): void {
    this.snackBar.open(error, "Read", this.snackBarConfig);
  }

  handleHttpErrorResponse(error: HttpErrorResponse): void {
    this.snackBar.open(error.message, "Read", this.snackBarConfig);
  }
}
