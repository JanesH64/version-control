import { NumberInput } from '@angular/cdk/coercion';
import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { debounce } from 'rxjs';
import { ErrorHandlerService } from '../services/error/error-handler.service';
import { NotificationService } from '../services/notification/notification.service';
import { UploadService } from '../services/upload/upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  fileControl: UntypedFormControl = new UntypedFormControl(undefined);

  uploadSub: any;
  uploadProgress: NumberInput = 0;
  uploadInProgress: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<FileUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private uploadService: UploadService,
    private notificationService: NotificationService,
    private errorHandlerService: ErrorHandlerService
  ) { }

  ngOnInit(): void {
  }

  startUpload(): void {
    let file: File = this.fileControl.value?.files[0];

    if(!file) {
      return; 
    }

    this.uploadProgress = 0;
    this.uploadInProgress = true;
    const upload$ = this.uploadService.uploadFile(file);

    this.uploadSub = upload$.subscribe(
      event => {
        if (event.type == HttpEventType.UploadProgress) {
          if (event.total) {  
            this.uploadProgress = Math.round(100 * (event.loaded / event.total));   
          }   

          if(this.uploadProgress === 100) {
            setTimeout(() => {
              this.closeDialog();
              this.notificationService.success("Upload succeeded!");
            }, 500);
          }
        }
      },
      error => {
        this.errorHandlerService.handleHttpErrorResponse(error);
        this.uploadInProgress = false;
      });
  }

  closeDialog(): void {
    this.uploadSub?.unsubscribe();
    this.dialogRef.close();
  }

  disableUpload(): boolean {
    return !this.fileControl.value?.files[0] || this.uploadInProgress;
  }

  


}
