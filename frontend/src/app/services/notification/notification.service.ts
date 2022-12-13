import { DialogConfig } from '@angular/cdk/dialog';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { InfoDialogComponent } from 'src/app/info-dialog/info-dialog.component';
import { DvDialogConfig } from 'src/app/models/dvDialogConfig';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  snackBarConfig: MatSnackBarConfig = {
    horizontalPosition: "center",
    verticalPosition: "bottom",
    panelClass: "success-snackbar",
    duration: 3000
  }

  success(message: string) {
    this.snackBar.open(message, "OK", this.snackBarConfig);
  }

  confirm(config: DvDialogConfig) {
    this.dialog.open(InfoDialogComponent, {data: config})
  }
}
