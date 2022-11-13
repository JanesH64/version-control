import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private snackBar: MatSnackBar
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
}
