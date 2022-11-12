import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddDialogData } from './addDialogData';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrls: ['./add-new.component.scss']
})
export class AddNewComponent implements OnInit {

  nameControl: UntypedFormControl = new UntypedFormControl('', [Validators.required, Validators.minLength(1)])

  constructor(
    public dialogRef: MatDialogRef<AddNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddDialogData,
  ) { }

  ngOnInit(): void {
  }

  public create(): void {
    if(this.nameControl.valid) {
      this.dialogRef.close(this.nameControl.value)
    }
  }

  public cancel(): void {
    this.dialogRef.close();
  }

}
